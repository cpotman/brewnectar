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
});
