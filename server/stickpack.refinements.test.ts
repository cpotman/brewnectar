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

  it("uses stronger human gut-brain evidence and moves the three-study Alpha-GPC card below higher-evidence ingredients", () => {
    expect(source).toContain("https://www.nature.com/articles/s41467-024-46116-y");
    expect(source).toContain("https://pmc.ncbi.nlm.nih.gov/articles/PMC10636234/");
    expect(source).toContain("https://pmc.ncbi.nlm.nih.gov/articles/PMC11663957/");
    expect(source).toContain("BrewNectar contains a lower 2 g inulin dose");
    expect(source).toContain("BrewNectar's prebiotic and dose differ");
    expect(source).not.toContain("Bacillus coagulans Survival and Adhesion");
    expect(source).not.toContain("Inulin Increases Bifidobacteria in Humans");

    const lTheanineIndex = source.indexOf('name: "L-Theanine", dose: "200 mg"');
    const lionsManeIndex = source.indexOf('name: "Lion\'s Mane", dose: "500 mg');
    const ashwagandhaIndex = source.indexOf('name: "Ashwagandha", dose: "300 mg');
    const alphaGpcIndex = source.indexOf('name: "Alpha-GPC", dose: "500 mg (50%)"');
    expect(lTheanineIndex).toBeGreaterThan(-1);
    expect(lionsManeIndex).toBeGreaterThan(lTheanineIndex);
    expect(ashwagandhaIndex).toBeGreaterThan(lionsManeIndex);
    expect(alphaGpcIndex).toBeGreaterThan(ashwagandhaIndex);
  });

  it("uses clear Compounding Effect milestones without the rejected timing claims", () => {
    expect(source).toContain('period: "Day 1"');
    expect(source).toContain('period: "Week 2"');
    expect(source).toContain('period: "Week 6"');
    expect(source).toContain('period: "Week 12"');
    expect(source).not.toContain('period: "Week 1"');
    expect(source).not.toContain('period: "2 Weeks"');
    expect(source).not.toContain('period: "2 Months"');
    expect(source).not.toContain('period: "3 Months"');
    expect(source).toContain('title: "Your Coffee Feels More Dialed In"');
    expect(source).toContain('title: "The Routine Gets Easier to Trust"');
    expect(source).toContain('title: "Your Baseline Feels Steadier"');
    expect(source).toContain('title: "The Full Routine Has Had Time to Work"');
    expect(source).not.toContain("Rhodiola is the fastest adaptogen");
    expect(source).not.toContain("Cordyceps lands at three weeks");
  });

  it("uses the smaller requested comparison set and warm gradient emphasis", () => {
    expect(source).toContain('{ feature: "Only contains mushrooms", icon: CircleOff, brew: false, other: true }');
    expect(source).toContain('{ feature: "Keep your own coffee", icon: Coffee, brew: true, other: false, highlight: true }');
    expect(source).toContain('row.highlight ? "font-bold text-gradient-warm"');
    expect(source).toContain("row.brew ? (");
    expect(source).not.toContain('{ feature: "Contains adaptogens"');
    expect(source).not.toContain('{ feature: "Contains Lion\'s Mane"');
  });

  it("uses the revised benefit-led hero copy without the removed members claim", () => {
    expect(source.match(/Take Back Your Mental Clarity with BrewNectar Stick Packs/g)).toHaveLength(3);
    expect(source).not.toContain("Stay Focused &amp; Clear with BrewNectar Stick Packs");
    expect(source.match(/Best Seller/g)).toHaveLength(2);
    expect(source).not.toContain("Now Shipping");
    expect(source).not.toContain("Thousands of</strong> members");
    expect(source).not.toContain("BrewNectar Brain + Gut Stick Packs");
  });

  it("uses plan-dependent image gift cards with grayscale locked states in both offers", () => {
    expect(source).toContain("stickpack-gift-masterclass_283e8b36.png");
    expect(source).toContain("stickpack-gift-la-marzocco_113c18e8.webp");
    expect(source.match(/<PlanGiftCards selectedPlan=\{selectedPlan\} onSelectPlan=\{setSelectedPlan\} \/>/g)).toHaveLength(2);
    expect(source).toContain('const masterclassSelected = selectedPlan !== "one-time"');
    expect(source).toContain('const machineSelected = selectedPlan === "3mo" || selectedPlan === "2mo"');
    expect(source).toContain("grayscale contrast-75 opacity-70");
    expect(source).toContain("SUBSCRIBE TO UNLOCK");
    expect(source).toContain("2+ MONTHS TO UNLOCK");
  });

  it("underlines the three specified causes in the discipline callout", () => {
    expect(source.match(/font-medium underline decoration-\[#D97706\] decoration-2 underline-offset-4/g)).toHaveLength(3);
    expect(source).toContain(">broken sleep</span>");
    expect(source).toContain(">inflamed gut</span>");
    expect(source).toContain(">no raw material</span>");
  });

  it("shows full stick-pack order totals with per-bag subtitles instead of monthly prices", () => {
    expect(source).toContain('id: "3mo", name: "3-Month Supply", savings: "Save 49%", price: "$74.95", perDay: "$0.89/day", billed: "$24.98 per bag"');
    expect(source).toContain('id: "2mo", name: "2-Month Supply", savings: "Save 39%", price: "$59.95", perDay: "$1.07/day", billed: "$29.98 per bag"');
    expect(source).toContain('id: "1mo", name: "1-Month Supply", savings: "Save 18%", price: "$39.95", perDay: "$1.43/day", billed: "$39.95 per bag"');
    expect(source).toContain('id: "one-time", name: "One-Time Purchase", savings: "", price: "$49", perDay: "$1.75/day", billed: "$49 per bag"');
    expect(source.match(/Subscribe & Save up to 49%/g)).toHaveLength(2);
    expect(source).not.toContain("Subscribe & Save up to 45%");
    expect(source.match(/\{plan\.billed\}/g)).toHaveLength(2);
    expect(source.match(/\{plan\.price\}/g)).toHaveLength(2);
    expect(source.match(/\{currentPlan\.price\}/g)).toHaveLength(3);
    expect(source.match(/font-display text-lg sm:text-xl font-bold text-\[#1C1917\]/g)).toHaveLength(2);
    expect(source).toContain('font-display font-bold text-[#1C1917] text-base">{currentPlan.price}');
    expect(source).not.toContain('font-display text-xl sm:text-2xl font-bold text-[#1C1917]">{plan.price}');
    expect(source).not.toContain('>/mo</span>');
    expect(source).not.toContain('&& "/MO"');
    expect(source).not.toContain('&& "/mo"');
    expect(source).not.toMatch(/Billed \$|every (?:12|8|4) weeks|One-time payment/);
  });

  it("keeps expanded Evidence focused on the linked study cards", () => {
    expect(source).toContain("https://www.nature.com/articles/s41467-024-46116-y");
    expect(source).toContain("https://pmc.ncbi.nlm.nih.gov/articles/PMC10636234/");
    expect(source).toContain("https://pmc.ncbi.nlm.nih.gov/articles/PMC11663957/");
    expect(source).not.toMatch(/Study Timing|Time Horizon|timing:|pullStat:|pullLabel:/);
    expect(source).not.toMatch(/item\.timing|item\.pullStat|item\.pullLabel|evidenceItem\.timing|evidenceItem\.pullStat|evidenceItem\.pullLabel/);
    expect(source).not.toMatch(/30540517|17445349/);
  });

  it("orders the lower page as Evidence, testimonials, repeated offer, then FAQ", () => {
    expect(source).toContain("Lower-page conversion flow: Evidence → Stories → Offer → FAQ");
    expect(source).toContain('className="order-1 py-14 md:py-20 bg-[#FDFBF7]"');
    expect(source).toContain('className="order-2 py-12 md:py-16 relative overflow-hidden"');
    expect(source).toContain('className="order-3 pt-10 md:pt-14 pb-8 md:pb-10 bg-[#FDFBF7]"');
    expect(source).toContain('className="order-4 py-14 md:py-20 bg-white"');
  });

  it("integrates the final CTA with a warm responsive coffee lifestyle background", () => {
    expect(source).toContain("/manus-storage/stickpack-final-cta-coffee-v2_7ce522e5.jpg");
    expect(source).toContain("bg-[position:68%_center]");
    expect(source).toContain("md:bg-center");
    expect(source).toContain("from-[#FDF7EC]/95");
    expect(source).toContain("Keep your coffee. Lose the fog.");
    expect(source).toContain("Your coffee, upgraded");
    expect(source).not.toContain('bg-gradient-to-br from-[#1C1917] to-[#292524]');
  });

  it("presents User-Reported Outcomes as an icon-led three-column summary", () => {
    expect(source).toContain("User-Reported Outcomes");
    expect(source).toContain("relative max-w-3xl mx-auto px-4 sm:px-6");
    expect(source).toContain("rounded-[24px]");
    expect(source).toContain("px-3 py-5");
    expect(source).toContain("py-10 md:py-12 relative overflow-hidden");
    expect(source).toContain("grid grid-cols-3 divide-x divide-orange-100");
    expect(source).toContain("<Brain size={21}");
    expect(source).toContain("<Zap size={21}");
    expect(source).toContain("<Coffee size={21}");
    expect(source.match(/text-gradient-warm/g)?.length).toBeGreaterThanOrEqual(4);
    expect(source).toContain("border-t border-orange-100 pt-3 text-center");
    expect(source).toContain("*Based on internal customer surveys; individual results may vary.");
  });

  it("presents the comparison with product visuals, row icons, and compact mobile column markers", () => {
    expect(source.match(/comparison-brewnectar-user_16c697c8\.png/g)).toHaveLength(2);
    expect(source.match(/comparison-mushroom-user_7ea4d14f\.png/g)).toHaveLength(1);
    expect(source).not.toContain("comparison-mushroom-scene-v2_e357fcac.png");
    expect(source).toContain("aria-label=\"BrewNectar and mushroom coffee product comparison\"");
    expect(source).toContain("All the benefits.");
    expect(source).toContain("None of the compromise.");
    expect(source).toContain("Often earthy.");
    expect(source).toContain("Limited benefits.");
    expect(source).toContain("More than mushrooms. Your coffee, upgraded.");
    expect(source).toContain("<row.icon size={16}");
    expect(source).toContain("icon: Luggage");
    expect(source).toContain("icon: CircleOff");
    expect(source.match(/grid-cols-\[minmax\(0,1fr\)_80px_94px\]/g)).toHaveLength(2);
    expect(source.match(/md:grid-cols-\[minmax\(0,1fr\)_120px_140px\]/g)).toHaveLength(2);
    expect(source).toContain("right-[94px] w-[80px]");
    expect(source).toContain("md:right-[140px] md:w-[120px]");
    expect(source).toContain("mt-20 max-w-3xl");
    expect(source).toContain("-top-[72px]");
    expect(source).toContain("h-[132px] w-[198px]");
    expect(source).toContain("drop-shadow-md sm:hidden");
    expect(source).not.toContain("drop-shadow-md md:hidden");
    expect(source).not.toContain(">Feature</");
  });

  it("keeps the desktop comparison product labels centered, matched, and unwrapped", () => {
    expect(source.match(/inline-flex min-w-\[136px\].*whitespace-nowrap/g)).toHaveLength(2);
    expect(source).toContain(">Mushroom Coffee</span>");
    expect(source).toContain(">BrewNectar</span>");
  });

  it("uses the corrected onset answer in both stick-pack FAQ surfaces", () => {
    expect(source.match(/Many people notice an initial shift in 10–15 minutes/g)).toHaveLength(2);
    expect(source.match(/Broader support may carry through the day/g)).toHaveLength(2);
    expect(source.match(/across days, weeks, and months/g)).toHaveLength(2);
    expect(source).not.toContain("L-Theanine is included for calmer focus alongside your coffee");
  });
});
