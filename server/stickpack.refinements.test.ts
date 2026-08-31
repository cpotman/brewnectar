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

  it("uses Alpha-GPC consistently and removes every Citicoline and Cognizin reference", () => {
    expect(source).toContain('name: "Alpha-GPC", dosage: "500 mg (50%)"');
    expect(source).toContain('name: "Alpha-GPC", dose: "500 mg (50%)"');
    expect(source).toContain('Alpha-GPC (50%) 500mg');
    expect(source).toContain("https://pubmed.ncbi.nlm.nih.gov/39683633/");
    expect(source).toContain("https://pmc.ncbi.nlm.nih.gov/articles/PMC8235064/");
    expect(source).toContain("https://pmc.ncbi.nlm.nih.gov/articles/PMC5629791/");
    expect(source).not.toMatch(/citicoline|cognizin/i);
  });

  it("uses clear Compounding Effect milestones without the rejected timing claims", () => {
    expect(source).toContain('title: "Your Coffee Feels More Dialed In"');
    expect(source).toContain('title: "The Routine Gets Easier to Trust"');
    expect(source).toContain('title: "Your Baseline Feels Steadier"');
    expect(source).toContain('title: "The Full Routine Has Had Time to Work"');
    expect(source).not.toContain("Rhodiola is the fastest adaptogen");
    expect(source).not.toContain("Cordyceps lands at three weeks");
  });

  it("uses the smaller requested comparison set and warm gradient emphasis", () => {
    expect(source).toContain('{ feature: "Only contains mushrooms", brew: false, other: true }');
    expect(source).toContain('{ feature: "Keep your own coffee", brew: true, other: false, highlight: true }');
    expect(source).toContain('row.highlight ? "font-bold text-gradient-warm"');
    expect(source).toContain("row.brew ? (");
    expect(source).not.toContain('{ feature: "Contains adaptogens"');
    expect(source).not.toContain('{ feature: "Contains Lion\'s Mane"');
  });

  it("uses the revised benefit-led hero copy without the removed members claim", () => {
    expect(source.match(/Stay Focused &amp; Clear with BrewNectar Stick Packs/g)).toHaveLength(3);
    expect(source.match(/Best Seller/g)).toHaveLength(2);
    expect(source).not.toContain("Now Shipping");
    expect(source).not.toContain("Thousands of</strong> members");
    expect(source).not.toContain("BrewNectar Brain + Gut Stick Packs");
  });

  it("shows full stick-pack order totals with per-bag subtitles instead of monthly prices", () => {
    expect(source).toContain('id: "3mo", name: "3-Month Supply", savings: "Save 45%", price: "$81", perDay: "$0.96/day", billed: "$27 per bag"');
    expect(source).toContain('id: "2mo", name: "2-Month Supply", savings: "Save 35%", price: "$64", perDay: "$1.14/day", billed: "$32 per bag"');
    expect(source).toContain('id: "1mo", name: "1-Month Supply", savings: "Save 27%", price: "$36", perDay: "$1.29/day", billed: "$36 per bag"');
    expect(source).toContain('id: "one-time", name: "One-Time Purchase", savings: "", price: "$49", perDay: "$1.75/day", billed: "$49 per bag"');
    expect(source.match(/\{plan\.billed\}/g)).toHaveLength(2);
    expect(source.match(/\{plan\.price\}/g)).toHaveLength(2);
    expect(source.match(/\{currentPlan\.price\}/g)).toHaveLength(3);
    expect(source).not.toContain('>/mo</span>');
    expect(source).not.toContain('&& "/MO"');
    expect(source).not.toContain('&& "/mo"');
    expect(source).not.toMatch(/Billed \$|every (?:12|8|4) weeks|One-time payment/);
  });
});
