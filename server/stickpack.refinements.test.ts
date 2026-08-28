import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const source = readFileSync(
  resolve(process.cwd(), "client/src/pages/StickPack.tsx"),
  "utf8",
);

describe("stick-pack content and pacing refinements", () => {
  it("uses the shared pre-expanded PDP FAQ in all four product-information placements", () => {
    expect(source.match(/<PdpInfoAccordion/g)).toHaveLength(4);
    expect(source).toContain('q: "Is it safe?"');
    expect(source).toContain('q: "What does it taste like?"');
    expect(source).toContain('q: "How fast will I feel it?"');
    expect(source).not.toContain('title: "Is It Safe?"');
    expect(source).not.toContain("openPdpFaq");
    expect(source).not.toContain("onFaqToggle");
  });

  it("uses larger readable typography throughout the PDP popouts", () => {
    expect(source).toContain('text-[15px] md:text-base font-medium');
    expect(source).toContain('text-sm md:text-[15px] font-bold');
    expect(source).toContain('text-sm md:text-[15px] text-[#57534E]');
  });

  it("uses the revised ingredient heading and removes the comparison CTA", () => {
    expect(source).toContain("Every Ingredient Carefully Chosen.");
    expect(source).not.toContain("The Complete Stack.");
    expect(source).not.toContain("Choose BrewNectar");
  });

  it("removes the two requested questions from the lower FAQ", () => {
    expect(source).not.toContain("Why sticks instead of the syrup?");
    expect(source).not.toContain("Can I cancel my subscription?");
  });

  it("removes the previous extra-large repeated section padding", () => {
    expect(source).not.toContain('className="py-20 md:py-28');
  });
});
