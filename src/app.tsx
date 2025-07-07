import headLogo from "/head.jpg";
import officialData from "./assets/official";
import unofficialData from "./assets/unofficial";
import type { JSX } from "preact/jsx-runtime";
import { useEffect, useRef, useState } from "preact/hooks";
// @ts-ignore
import Typewriter from 'typewriter-effect/dist/core';

type LinkData = {
  image: string | JSX.Element;
  title: string;
  description: string;
  href: string;
};

export function App() {
  const official: LinkData[] = officialData;
  const unofficial: LinkData[] = unofficialData;
  const typeRef = useRef<HTMLParagraphElement | null>(null);
  const [isLive, setIsLive] = useState(false);
  const [isBirthDay, setIsBirthday] = useState(false);
  useEffect(() => {
    const today = new Date();
    const birthday = new Date(today.getFullYear(), 6, 7); // July
    if (
      today.getMonth() === birthday.getMonth() &&
      today.getDate() === birthday.getDate()
    ) {
      setIsBirthday(true);
    }
    if (typeRef.current) {
      const typewriter = new Typewriter(typeRef.current, {
        loop: false,
        delay: 50,
      });
      typewriter
        .typeString("Assign me a mission, and I will ensure its completion.")
        .start();
    }
    fetch("/api/checklive")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 0) {
          setIsLive(data.live);
        } else {
          console.error("Failed to fetch live status:", data);
        }
      });
  }, []);
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
            {isBirthDay ? <>
              <img src="/birthday-hat.png" class="birthday-hat" alt="Birthday Hat" width={61} height={116} />
            </> : null}
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
          <p class="splash-subhead" ref={typeRef} style={{ minHeight: '3em', lineHeight: '1.5em' }}>
            <noscript>Assign me a mission, and I will ensure its completion.</noscript>
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
            <div style={{ width: "100%" }} class="def">
              <div class="card-wrapper">
                <img
                  src="/behind.png"
                  alt="behind"
                  class="behind-popout"
                />
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
              </div>
            </div>
          ))}
          <hr
            style={{
              width: "100%",
              margin: "20px 0",
              border: "1px solid rgb(142, 142, 142)",
            }}
          />
          {unofficial.map((linkCard) => (
            <div style={{ width: "100%" }} class="def">
              <div class="card-wrapper">
                <img
                  src="/behind.png"
                  alt="behind"
                  class="behind-popout"
                />
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
              </div>
            </div>
          ))}
        </div>
        <div class="footer"></div>
      </div>
    </>
  );
}
