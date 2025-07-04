export const onRequest = async (context) => {
  const { env } = context;
  if (!env.CF_ACCOUNT_ID || !env.CF_KEY) {
    return new Response(
      JSON.stringify({
        status: 500,
        error: "Cloudflare account ID or key is not set",
      })
    );
  }
  if (!env.HAIBAREI_HOME_PAGE) {
    return new Response(
      JSON.stringify({
        status: 500,
        error: "KV namespace 'HAIBAREI_HOME_PAGE' is not set",
      })
    );
  }
  // Get last live status from KV
  const last = await env.HAIBAREI_HOME_PAGE.get("last_live_status")
    .then((lastLiveStatus) => {
      if (lastLiveStatus) {
        try {
          const parsedStatus = JSON.parse(lastLiveStatus);
          return {
            live: parsedStatus.live,
            time: parsedStatus.time,
          };
        } catch (error) {
          return {
            live: false,
            time: 0,
          };
        }
      } else {
        return {
          live: false,
          time: 0,
        };
      }
    })
    .catch((error) => {
      return {
        live: false,
        time: 0,
      };
    });
  if (last.time && last.time > Date.now() - 60 * 1000 * 5) {
    return new Response(
      JSON.stringify({
        live: last.live,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
  return fetch(
    `https://api.cloudflare.com/client/v4/accounts/${env.CF_ACCOUNT_ID}/browser-rendering/scrape`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.CF_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: "https://api.live.bilibili.com/room/v1/Room/get_info?room_id=31914326",
        elements: [
          {
            selector: "pre",
          },
        ],
      }),
    }
  )
    .then((res) => res.json())
    .then(async (data) => {
      if (data.success) {
        const udata = JSON.parse(
          data.result[0].results[0].text.replace("\\", "")
        );
        const isLive = udata.data.live_status === 1;
        let saved = false;
        try {
          await env.HAIBAREI_HOME_PAGE.put(
            "last_live_status",
            JSON.stringify({
              live: isLive,
              time: Date.now(),
            })
          );
          saved = true;
        } catch (error) {
          console.error("Error saving live status to KV:", error);
        }

        return new Response(
          JSON.stringify({
            live: isLive,
            saved: saved,
          })
        );
      } else {
        throw new Error("Failed to fetch live status");
      }
    })
    .catch(async (error) => {
      console.error("Error fetching live status:", error);
      let saved = false;
      try {
        await env.HAIBAREI_HOME_PAGE.put(
          "last_live_status",
          JSON.stringify({
            live: isLive,
            time: Date.now(),
          })
        );
        saved = true;
      } catch (error) {
        console.error("Error saving live status to KV:", error);
      }
      return new Response(
        JSON.stringify({
          status: 500,
          error: "Failed to fetch live status",
          saved: saved,
        })
      );
    });
};
