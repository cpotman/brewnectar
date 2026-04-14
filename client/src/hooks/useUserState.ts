import { useState, useEffect } from "react";

/**
 * Detects the user's US state from their IP address using a free geolocation API.
 * Falls back to "United States" if detection fails or user is outside the US.
 */
export function useUserState() {
  const [region, setRegion] = useState<string>("United States");

  useEffect(() => {
    const controller = new AbortController();

    async function detect() {
      try {
        // Try ip-api.com first (free, no key, 45 req/min)
        const res = await fetch("http://ip-api.com/json/?fields=status,countryCode,regionName", {
          signal: controller.signal,
        });
        const data = await res.json();
        if (data.status === "success" && data.countryCode === "US" && data.regionName) {
          setRegion(data.regionName);
          return;
        }
        // If not US, keep the country-level fallback
        if (data.status === "success" && data.regionName) {
          setRegion(data.regionName);
        }
      } catch {
        // Silently fall back to default
      }
    }

    detect();
    return () => controller.abort();
  }, []);

  return region;
}
