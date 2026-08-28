# Shipping Calendar and Notice Verification

The stick-pack ship-by helper now advances exactly one calendar day and no longer skips Saturdays or Sundays. Regression examples confirm that a Friday order displays Saturday and a Saturday order displays Sunday. On Friday, August 28, 2026, both offer blocks correctly render **Sat, Aug 29**.

At 390 pixels wide, each stock notice presents **In Stock** on the first line, followed by a subtle divider and the complete ship-by message on the second line. The date is kept together with `whitespace-nowrap`, avoiding the previous awkward wrap. At 1280 pixels, the same content remains a compact single row with the vertical separator restored.

All 24 automated tests pass, and the production build succeeds.

