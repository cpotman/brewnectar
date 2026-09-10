# Stick-Pack Timeline and Comparison Breakpoint Verification

The Compounding Effect timeline now uses the exact milestone sequence **Day 1, Week 2, Week 6, and Week 12**. The existing outcome-led milestone copy remains compatible with those periods and contains no direct references to the retired Week 1, two-week, two-month, or three-month labels.

The duplicate BrewNectar image was caused by overlapping breakpoints: the desktop editorial scene became visible at `sm`, while the mobile marker remained visible until `md`. The mobile marker now hides at `sm`, so only one BrewNectar image can render from 640 through 767 pixels.

Full-page checks at 390, 700, and 1280 pixels confirm the intended single-image composition and timeline layout. All 36 automated tests pass, and the production build succeeds.

