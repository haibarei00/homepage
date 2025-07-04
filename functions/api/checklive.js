export const onRequest = () => {
    return fetch('https://api.live.bilibili.com/room/v1/Room/get_info?room_id=31914326').then((res) => res.json()).then((data) => {
        const isLive = data.data.live_status === 1;
        return new Response(JSON.stringify({
                live: isLive,
                title: data.data.title
            })
        );
    }).catch((error) => {
        console.error("Error fetching live status:", error);
        return new Response(JSON.stringify({
            status: 500,
            error: "Failed to fetch live status"
        }));
    });
};