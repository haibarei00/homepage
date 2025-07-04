import headLogo from "/head.jpg";
import "./app.css";
import officialData from "./assets/official";
import unofficialData from "./assets/unofficial";
import type { JSX } from "preact/jsx-runtime";
import { useEffect, useState } from "preact/hooks";

type LinkData = {
  image: string | JSX.Element;
  title: string;
  description: string;
  href: string;
};

export function App() {
  const official: LinkData[] = officialData;
  const unofficial: LinkData[] = unofficialData;
  const [isLive, setIsLive] = useState(false);
  useEffect(() => {
    fetch("/api/checklive").then((res) => res.json()).then((res) => {
      if (res.status === 0) {
        const data = res.data;
        setIsLive(data.live);
      } else {
        console.error("Failed to fetch live status:", res);
      }
    });
  }, [])
  return (
    <>
      <div class="splash-container">
        <div class="splash">
          <p class="avatar-container">
            <img
              src={headLogo}
              class={`splash-head ${isLive ? "splash-head-live" : ""}`}
              alt="Head Logo"
              width={150}
              height={150}
            />
            {isLive ? (
              <>
                <a
                  class="overlay-link"
                  href={"https://live.bilibili.com/31914326"}
                  style={{ width: "150px", height: "150px" }}
                ></a>
                <div class="live-badge">LIVE</div>
              </>
            ) : null}
          </p>
          <p class="splash-subhead" style={{ fontSize: "1.6rem" }}>
            灰羽零
          </p>
          <p class="splash-subhead">
            Assign me a mission, and I will ensure its completion.
          </p>
          <p>
            Profile🪽
            <br />
            Name: Haiba Rei
            <br />
            Birthday: July 7th
            <br />
            Likes: cinnamon roll and puppies
            <br />
            Dislikes: chocolate and sticky things
          </p>
          {official.map((linkCard) => (
            <p style={{ width: "100%" }}>
              <a href={linkCard.href} target="_blank" class="card">
                <div class="card-icon">
                  {typeof linkCard.image === "string" ? (
                    <img src={linkCard.image} alt="icon" class="card-icon" />
                  ) : (
                    <div>{linkCard.image}</div>
                  )}
                </div>
                <div class="card-content">
                  <div class="card-title">{linkCard.title}</div>
                  <div class="card-description">{linkCard.description}</div>
                </div>
              </a>
            </p>
          ))}
          <hr
            style={{
              width: "100%",
              margin: "20px 0",
              border: "1px solid rgb(142, 142, 142)",
            }}
          />
          {unofficial.map((linkCard) => (
            <p style={{ width: "100%" }}>
              <a href={linkCard.href} target="_blank" class="card">
                <div class="card-icon">
                  {typeof linkCard.image === "string" ? (
                    <img src={linkCard.image} alt="icon" class="card-icon" />
                  ) : (
                    <div>{linkCard.image}</div>
                  )}
                </div>
                <div class="card-content">
                  <div class="card-title">{linkCard.title}</div>
                  <div class="card-description">{linkCard.description}</div>
                </div>
              </a>
            </p>
          ))}
        </div>
        <div class="footer"></div>
      </div>
    </>
  );
}
