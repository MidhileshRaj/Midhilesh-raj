import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Midhilesh Raj – Flutter Developer & Software Engineer, Kerala";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  // about_me_pic.jpg is PNG data despite its extension
  const photo = await readFile(join(process.cwd(), "public/about_me_pic.jpg"), "base64");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#000",
          color: "#fff",
        }}
      >
        <img
          src={`data:image/png;base64,${photo}`}
          alt=""
          width={520}
          height={630}
          style={{ objectFit: "cover", objectPosition: "center 20%" }}
        />
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 64px",
            borderLeft: "6px solid #ffeb12",
          }}
        >
          <div style={{ fontSize: 22, letterSpacing: 8, color: "#ffeb12", marginBottom: 24 }}>
            PORTFOLIO
          </div>
          <div style={{ fontSize: 84, fontWeight: 700, lineHeight: 1 }}>Midhilesh Raj</div>
          <div style={{ fontSize: 38, color: "#ffeb12", marginTop: 28, lineHeight: 1.25 }}>
            Flutter Developer & Software Engineer
          </div>
          <div style={{ fontSize: 28, color: "rgba(255,255,255,0.6)", marginTop: 20 }}>
            Mobile App Development Lead
          </div>
          <div style={{ fontSize: 28, color: "rgba(255,255,255,0.6)", marginTop: 6 }}>
            Kerala, India
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
