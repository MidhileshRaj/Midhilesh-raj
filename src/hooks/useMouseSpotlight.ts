import { useRef, useCallback } from "react";

export function useMouseSpotlight(
  color = "255,235,18",
  radius = 700,
  intensity = 0.05
) {
  const overlayRef = useRef<HTMLDivElement>(null);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const el = overlayRef.current;
      if (!el) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.opacity = "1";
      el.style.background = `radial-gradient(${radius}px circle at ${x}px ${y}px, rgba(${color},${intensity}), transparent 40%)`;
    },
    [color, radius, intensity]
  );

  const onMouseLeave = useCallback(() => {
    if (overlayRef.current) overlayRef.current.style.opacity = "0";
  }, []);

  return { overlayRef, onMouseMove, onMouseLeave };
}
