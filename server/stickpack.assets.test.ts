import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const stickPackSource = readFileSync(
  resolve(process.cwd(), "client/src/pages/StickPack.tsx"),
  "utf8",
);

describe("stick-pack product assets", () => {
  it("links the five supplied PDP gallery images", () => {
    const galleryAssets = [
      "/manus-storage/pdp-1_8ab85442.png",
      "/manus-storage/pdp-2_ad59f8c8.png",
      "/manus-storage/pdp-3_e2aa3464.png",
      "/manus-storage/pdp-4_c76fef49.png",
      "/manus-storage/pdp-5_dc161adc.png",
    ];

    for (const asset of galleryAssets) {
      expect(stickPackSource).toContain(asset);
    }
  });

  it("uses the supplied background behind Sound familiar", () => {
    expect(stickPackSource).toContain(
      'soundFamiliarBackground: "/manus-storage/sound-familiar-background_73d0caf1.png"',
    );
    expect(stickPackSource).toContain("src={IMAGES.soundFamiliarBackground}");
    expect(stickPackSource).toContain(">Sound familiar?</p>");
  });

  it("links the four regenerated ingredient visuals", () => {
    const ingredientAssets = [
      "/manus-storage/ingredient-cordyceps-regenerated_777447ce.png",
      "/manus-storage/ingredient-ashwagandha-v2_66934589.png",
      "/manus-storage/ingredient-rhodiola-v2_5bb7e26c.png",
      "/manus-storage/ingredient-prebiotic-probiotic-v4_9aef7528.png",
    ];

    for (const asset of ingredientAssets) {
      expect(stickPackSource).toContain(asset);
    }
  });

  it("keeps under-card Evidence details on mobile and uses a wide panel on desktop", () => {
    expect(stickPackSource).toContain(
      'className="overflow-hidden mt-3 lg:hidden"',
    );
    expect(stickPackSource).toContain('className="hidden lg:block mt-6"');
    expect(stickPackSource).toContain('mode="wait"');
    expect(stickPackSource).toContain('"grid-cols-3"');
  });
});
