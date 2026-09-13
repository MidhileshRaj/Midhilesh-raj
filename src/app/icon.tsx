import { ImageResponse } from "next/og";

// Google Search shows favicons that are a multiple of 48px square.
export const size = { width: 96, height: 96 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#000",
          color: "#ffeb12",
          fontSize: 50,
          fontWeight: 700,
          letterSpacing: -2,
          borderRadius: 20,
        }}
      >
        MR
      </div>
    ),
    { ...size }
  );
}
