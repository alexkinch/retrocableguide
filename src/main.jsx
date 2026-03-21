import { createRoot } from "react-dom/client";
import { APP_CONFIG } from "./config.js";
import { CrtOverlay } from "./components/crt-overlay.jsx";
import RetroCableGuide from "./pages/guide-page.jsx";
import MosaicPage from "./pages/mosaic-page.jsx";

const path = window.location.pathname.replace(/\/+$/, "") || "/";
const F_UI = "Futura, 'Futura PT', 'Century Gothic', Arial, sans-serif";

function HomePage() {
  const brand = (APP_CONFIG.guideBrand || "cable").toUpperCase();

  const linkStyle = {
    color: "#ffffff",
    textDecoration: "none",
    fontFamily: F_UI,
    fontWeight: 700,
    fontSize: "24px",
    letterSpacing: "1px",
    border: "2px solid rgba(255,255,255,0.5)",
    padding: "12px 28px",
    minWidth: "180px",
    textAlign: "center",
    transition: "border-color 0.2s",
  };

  return (
    <div
      style={{
        width: "720px",
        height: "576px",
        background: "linear-gradient(170deg, #0c0c3a 0%, #060620 50%, #02020e 100%)",
        color: "#ffffff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{
        position: "absolute",
        inset: 0,
        background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(40,40,120,0.25), transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        lineHeight: 1,
        marginBottom: "8px",
      }}>
        <span style={{
          fontFamily: F_UI,
          fontWeight: 900,
          fontSize: "52px",
          letterSpacing: "5px",
          color: "#e8d400",
        }}>{brand}</span>
        <span style={{
          fontFamily: "Georgia, 'Times New Roman', serif",
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: "20px",
          color: "rgba(255,255,255,0.6)",
          marginTop: "2px",
          letterSpacing: "1px",
        }}>channel</span>
        <span style={{
          fontFamily: "Georgia, 'Times New Roman', serif",
          fontStyle: "italic",
          fontWeight: 700,
          fontSize: "58px",
          color: "#ffffff",
          marginTop: "-8px",
          letterSpacing: "1px",
        }}>Guide</span>
      </div>
      <div style={{ display: "flex", gap: "24px", marginTop: "32px", position: "relative" }}>
        <a href="/guide" style={linkStyle}>Guide</a>
        <a href="/mosaic" style={linkStyle}>Mosaic</a>
      </div>
      <CrtOverlay />
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  path === "/mosaic"
    ? <MosaicPage />
    : path === "/guide"
      ? <RetroCableGuide />
      : <HomePage />,
);
