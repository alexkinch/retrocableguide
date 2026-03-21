import { APP_CONFIG } from "../config.js";

export function CrtOverlay() {
  if (!APP_CONFIG.crtEffect) return null;

  return (
    <div style={{
      position: "absolute",
      inset: 0,
      pointerEvents: "none",
      zIndex: 10,
    }}>
      <div style={{
        position: "absolute",
        inset: 0,
        background: "repeating-linear-gradient(180deg, transparent 0px, transparent 1px, rgba(0,0,0,0.15) 1px, rgba(0,0,0,0.15) 2px)",
        mixBlendMode: "multiply",
      }} />
      <div style={{
        position: "absolute",
        inset: 0,
        background: "radial-gradient(ellipse 120% 120% at 50% 50%, transparent 50%, rgba(0,0,0,0.45) 80%, rgba(0,0,0,0.8) 100%)",
      }} />
      <div style={{
        position: "absolute",
        inset: 0,
        background: "radial-gradient(ellipse 90% 90% at 50% 50%, rgba(255,255,255,0.03) 0%, transparent 70%)",
      }} />
    </div>
  );
}
