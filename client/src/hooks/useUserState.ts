import { useState, useEffect } from "react";

/**
 * Detects the user's US state from their IP address using free HTTPS geolocation APIs.
 * Falls back to "United States" if detection fails or user is outside the US.
 */
export function useUserState() {
  const [region, setRegion] = useState<string>("United States");

  useEffect(() => {
    const controller = new AbortController();

    async function detect() {
      try {
        // ipapi.co — free HTTPS, 1k/day, no key needed
        const res = await fetch("https://ipapi.co/json/", {
          signal: controller.signal,
        });
        const data = await res.json();
        if (data.country_code === "US" && data.region) {
          setRegion(data.region);
          return;
        }
        // Non-US: show country name
        if (data.country_name) {
          setRegion(data.country_name);
        }
      } catch {
        // First API failed, try fallback
        try {
          const res2 = await fetch("https://ipwho.is/", {
            signal: controller.signal,
          });
          const data2 = await res2.json();
          if (data2.success && data2.country_code === "US" && data2.region) {
            setRegion(data2.region);
            return;
          }
          if (data2.success && data2.country) {
            setRegion(data2.country);
          }
        } catch {
          // Silently fall back to default
        }
      }
    }

    detect();
    return () => controller.abort();
  }, []);

  return region;
}
