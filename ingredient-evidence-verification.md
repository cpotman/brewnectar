# Ingredient and Evidence Verification

Desktop and mobile full-page captures show all four regenerated ingredient visuals in the existing two-row carousel with no failed placeholders. Cordyceps, Ashwagandha, Rhodiola Rosea, and Prebiotic Fiber + Probiotics share the established square crop, warm cream-and-honey lighting, tactile botanical detail, shallow depth of field, and text-free presentation.

Interactive desktop testing opened the Citicoline Evidence entry and confirmed a single full-width panel measuring approximately 1201 × 372 pixels. Its three study cards render as three equal columns of approximately 368 pixels each rather than stacking vertically.

A separate headless Chromium session emulated a true 390 × 844 mobile viewport and opened the same Citicoline entry. The original under-card panel displayed at 358 × 634 pixels with all three studies, the button changed to **Tap to close**, and the desktop panel remained hidden. In that mobile session, all four regenerated ingredient images completed successfully at 1920-pixel natural width. Regression coverage locks in both responsive variants.

The complete automated suite passes 14 tests, and the production build succeeds.
