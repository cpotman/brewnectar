import { useState, useEffect } from "react";

/**
 * Tracks the gap between the layout viewport and the visual viewport.
 * On mobile browsers, when the bottom toolbar hides/shows during scrolling,
 * the visual viewport height changes but `position: fixed; bottom: 0` still
 * references the layout viewport — creating a visible gap.
 *
 * This hook returns the offset (in px) that a fixed-bottom element should
 * apply as `bottom` to stay pinned to the actual visual bottom.
 */
export function useVisualViewport() {
  const [bottomOffset, setBottomOffset] = useState(0);

  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;

    const update = () => {
      // The gap = layout viewport height - (visual viewport height + visual viewport offsetTop)
      // When browser chrome hides, visualViewport.height grows and offsetTop stays 0,
      // but the layout viewport (window.innerHeight) may lag behind.
      // We want: bottom offset = window.innerHeight - (vv.height + vv.offsetTop)
      const gap = window.innerHeight - (vv.height + vv.offsetTop);
      setBottomOffset(Math.max(0, gap));
    };

    vv.addEventListener("resize", update);
    vv.addEventListener("scroll", update);
    // Also listen to window resize for orientation changes
    window.addEventListener("resize", update);

    update();

    return () => {
      vv.removeEventListener("resize", update);
      vv.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return bottomOffset;
}
