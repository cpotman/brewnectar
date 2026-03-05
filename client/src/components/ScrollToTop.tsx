import { useEffect } from "react";
import { useLocation } from "wouter";

/**
 * Scrolls to the top of the page whenever the route changes.
 * Place this inside the Router or App component.
 */
export default function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location]);

  return null;
}
