/*
  BrewNectar Brain + Gut Stick Pack — Product Page
  Built from scratch per the stick pack brief.
  Argument: Keep your coffee. It works on the first morning. The doses are real.
  Architecture: Offer sandwich with ingredient deep-dive as center of gravity.
*/
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Star,
  Check,
  X as XIcon,
  ChevronDown,
  ArrowRight,
  Clock,
  Beaker,
  Brain,
  Zap,
  Shield,
  Leaf,
  Coffee,
  Package,
  ThermometerSun,
  Heart,
  ShieldCheck,
  Truck,
  RotateCcw,
} from "lucide-react";

/* ─── Fade-up wrapper ─── */
function FadeUp({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Product images (placeholders) ─── */
const IMAGES = {
  hero: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030542116/gR7c7MRQNrXJ4W4LDnTdRi/product-hero-clean-2JryfYKGcicCXzETS5MKKr.webp",
  lifestyle: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030542116/gR7c7MRQNrXJ4W4LDnTdRi/lifestyle-pour-bright-Gx24uHuFzUnhzZ4wLHqXvY.webp",
  stir: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030542116/gR7c7MRQNrXJ4W4LDnTdRi/how-stir-3pNJBKzkQVwxqm57DvYdyL.webp",
  lockin: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030542116/gR7c7MRQNrXJ4W4LDnTdRi/how-lockin-BGjMpAAVV2Cfd7diTUnZWZ.webp",
};

/* ─── Plan data ─── */
const PLANS = [
  {
    id: "3mo",
    label: "3-Month Supply",
    badge: "BEST VALUE",
    badgeColor: "bg-[#B45309] text-white",
    savings: "Save 45%",
    price: "$27",
    perDay: "$0.96/day",
    billing: "Billed $81 every 12 weeks",
    boxes: "3 boxes (84 stick packs)",
    perks: [
      "\u{1F393} Exclusive Focus & Clarity Masterclass ($25 value)",
      "\u{1F4B0} Maximum savings — lowest price per serving",
      "\u{1F512} Lock in savings — price guaranteed even if we raise it",
      "\u{1F6E1}\uFE0F Try it 30 days — keep the box. Full refund, no questions.",
      "\u{1F3C6} La Marzocco Espresso Machine ($4500) Giveaway entries",
      "\u{1F69A} Fast & FREE Shipping",
      "\u{1F504} Cancel or pause anytime",
    ],
  },
  {
    id: "2mo",
    label: "2-Month Supply",
    badge: "MOST POPULAR",
    badgeColor: "bg-[#D97706] text-white",
    savings: "Save 35%",
    price: "$32",
    perDay: "$1.14/day",
    billing: "Billed $64 every 8 weeks",
    boxes: "2 boxes (56 stick packs)",
    perks: [],
  },
  {
    id: "1mo",
    label: "1-Month Supply",
    badge: "",
    badgeColor: "",
    savings: "Save 27%",
    price: "$36",
    perDay: "$1.29/day",
    billing: "Billed $36 every 4 weeks",
    boxes: "1 box (28 stick packs)",
    perks: [],
  },
];

/* ─── Ingredient data ─── */
const INGREDIENTS = [
  {
    name: "Citicoline",
    dose: "500 mg",
    clock: "Clock 1 — First Morning",
    pullStat: "14%",
    pullLabel: "increase in brain ATP markers after 6 weeks",
    headline: "The ingredient that let researchers photograph focus.",
    mechanism: "Citicoline (CDP-choline) fuels phospholipid synthesis in neuronal membranes, increases cerebral metabolism, and raises noradrenaline and dopamine levels in the central nervous system. It’s not a stimulant — it’s raw material your brain uses to build and fire.",
    evidence: "A Harvard/McLean Hospital study used magnetic resonance spectroscopy to look directly inside the frontal lobes of 16 healthy adults after six weeks of citicoline at 500 mg/day. In the anterior cingulate cortex — the region governing sustained attention — phosphocreatine rose 7%, ATP markers rose 14%, and the PCr/Pi ratio rose 32%. These are direct measurements of cellular energy inside a living brain.",
    onset: "Acute attentional effects within 1–3 hours. Full membrane-building benefits at 6–12 weeks.",
  },
  {
    name: "L-Theanine",
    dose: "200 mg",
    clock: "Clock 1 — First Morning",
    pullStat: "200mg",
    pullLabel: "nearly 3× the L-Theanine in our syrup",
    headline: "The reason “keep your coffee” isn’t a convenience — it’s the design.",
    mechanism: "Caffeine blocks adenosine receptors and raises noradrenaline, driving alertness — and, at higher doses, jitter. L-Theanine raises alpha-wave activity and modulates GABA and glutamate, damping the anxious-arousal side without touching alertness. Alert calm instead of wired.",
    evidence: "A meta-analysis of 10 acute randomized trials found the L-Theanine/caffeine combination improved alertness and attentional-switching accuracy. Alpha waves recorded in occipital and parietal regions within ~40 minutes of a 200 mg dose. The 2:1 ratio with a standard 95 mg cup is the canonical pairing.",
    onset: "30–50 minutes. First cup. Calm-focus window roughly 2–3 hours.",
  },
  {
    name: "Lion’s Mane Extract",
    dose: "500 mg (10:1 ≈ 5 g raw)",
    clock: "Clock 4 — Month Two+",
    pullStat: "≈5g",
    pullLabel: "raw equivalent vs ~250 mg in typical mushroom coffee",
    headline: "The dose the category pretends it’s giving you.",
    mechanism: "Contains hericenones and erinacines — compounds that promote nerve growth factor (NGF) synthesis and support neuroplasticity. At 10:1 concentration, 500 mg delivers roughly 5 g of raw mushroom equivalent.",
    evidence: "Mori’s trial in adults aged 50–80 at 3 g/day found cognitive improvements at weeks 8, 12, and 16. Gains disappeared 4 weeks after stopping — honest justification for staying subscribed. Typical mushroom coffees deliver ~250 mg against trials that used 3 g/day.",
    onset: "8–16 weeks. This is the compounding tail. Say so honestly.",
  },
  {
    name: "Rhodiola Rosea",
    dose: "300 mg (10:1)",
    clock: "Clock 2 — First Two Weeks",
    pullStat: "2wk",
    pullLabel: "when the afternoon wall stops showing up",
    headline: "The fastest adaptogen in the stack.",
    mechanism: "Adaptogenic modulation of the HPA axis and monoamine pathways, with acute upregulation of catecholamines. Buffers stress-cortisol peaks rather than suppressing baseline cortisol.",
    evidence: "Three independent RCTs across distinct fatigued populations. Olsson 2009 enrolled 132 patients with stress-related burnout over 12 weeks. Separate trials in night-shift physicians and military cadets found objective improvements in calculation speed and error rate.",
    onset: "Around two weeks of daily use. Faster than ashwagandha on fatigue endpoints.",
  },
  {
    name: "Ashwagandha",
    dose: "300 mg (10:1)",
    clock: "Clock 3 — Weeks 3–8",
    pullStat: "83.5%",
    pullLabel: "sleep efficiency after 10 weeks (from 75.6%)",
    headline: "You can’t out-caffeinate a bad night.",
    mechanism: "Every focus product asks a sleep-deprived brain to perform harder. This one works on the reason it’s depleted. Ashwagandha acts on the HPA axis, reducing cortisol — the upstream cause of poor sleep and next-day fog.",
    evidence: "A meta-analysis of 5 RCTs in 400 participants found significant effects on overall sleep quality. An insomnia/anxiety RCT found sleep-onset latency significantly shorter and sleep efficiency improved from 75.6% to 83.5% over 10 weeks. Take it in the morning; the payoff shows up in how you sleep.",
    onset: "4–8 weeks. Do not promise better sleep tonight.",
  },
  {
    name: "Cordyceps",
    dose: "300 mg (10:1)",
    clock: "Clock 3 — Weeks 3–8",
    pullStat: "10.9%",
    pullLabel: "VO2max improvement after 3 weeks",
    headline: "More oxygen to the organ that burns 20% of your body’s supply.",
    mechanism: "Cordycepin is an adenosine analogue that activates AMPK, a cellular energy sensor promoting mitochondrial biogenesis and oxidative metabolism. More oxygen delivery means more substrate for cognitive work.",
    evidence: "An RCT in 28 healthy adults using C. militaris at 4 g/day: after three weeks, VO2max improved by 10.9% versus no change in placebo. One week wasn’t enough — three weeks was.",
    onset: "~3 weeks of daily use.",
  },
  {
    name: "Prebiotic Fiber (Inulin)",
    dose: "2,000 mg",
    clock: "Clock 3 — Weeks 3–8",
    pullStat: "2g",
    pullLabel: "prebiotic fiber feeding beneficial gut bacteria",
    headline: "Feed what’s already there.",
    mechanism: "Inulin from chicory root is a prebiotic fiber that selectively feeds Bifidobacteria — the beneficial bacteria your gut needs to maintain barrier integrity and produce short-chain fatty acids that cross the blood-brain barrier.",
    evidence: "A 6-week trial at 10 g/day significantly increased Bifidobacteria. Pairing a prebiotic with a probiotic is the standard approach: one adds beneficial bacteria, the other feeds what’s already there.",
    onset: "Gradual gut environment improvement over 3–6 weeks.",
  },
];

/* ─── Comparison table rows ─── */
const COMPARISON_ROWS = [
  { feature: "Keep your own coffee", brew: true, other: false, brewNote: "Add to any cup", otherNote: "Replaces it" },
  { feature: "Your full caffeine", brew: true, other: false, brewNote: "~95 mg, your cup", otherNote: "~35–50 mg" },
  { feature: "Works on day one", brew: true, other: false, brewNote: "", otherNote: "8+ weeks" },
  { feature: "Lion’s Mane at research dose", brew: true, other: false, brewNote: "≈5 g equivalent", otherNote: "~250 mg typical" },
  { feature: "Clinical-dose citicoline", brew: true, other: false, brewNote: "500 mg", otherNote: "None" },
  { feature: "Supports sleep quality", brew: true, other: false, brewNote: "", otherNote: "" },
  { feature: "Probiotic that survives hot coffee", brew: true, other: false, brewNote: "", otherNote: "" },
  { feature: "Prebiotic fiber", brew: true, other: false, brewNote: "", otherNote: "" },
  { feature: "Tastes good in your cup", brew: true, other: false, brewNote: "Subtly sweet", otherNote: "Earthy, bitter" },
  { feature: "Single-serve, travel-ready", brew: true, other: false, brewNote: "", otherNote: "Tub or pouch" },
  { feature: "Precision dose every serving", brew: true, other: false, brewNote: "", otherNote: "Scoop variance" },
];

/* ─── FAQ data ─── */
const FAQ_ITEMS = [
  { q: "Do I have to give up my coffee?", a: "No. That’s the whole point. One stick pack goes into whatever you’re already drinking — hot, iced, latte, espresso. Nothing about your morning changes except how your brain performs." },
  { q: "What does it taste like?", a: "Very subtly sweet with a mild almond note — like an amaretto latte, not a supplement. It enhances your coffee rather than masking it. And no, there are no almonds or nuts of any kind. Completely nut-free." },
  { q: "Won’t 4 grams of powder make it gritty?", a: "No. The formula dissolves fully in 5–10 seconds of stirring, hot or iced. No sludge, no grit, no residue at the bottom of the cup." },
  { q: "Doesn’t hot coffee kill the probiotic?", a: "Not this one. Bacillus coagulans forms a spore coat that’s been tested specifically in brewed coffee and tea. Published data shows 92% survival through simulated digestion. Most probiotics can’t make that claim." },
  { q: "How fast will I feel it?", a: "L-Theanine and citicoline have acute effects within 30–50 minutes — calmer focus, less jitter. Rhodiola builds over two weeks. Ashwagandha and Lion’s Mane compound over months. The Four Clocks framework explains the full timeline." },
  { q: "I’ve tried nootropics before and they didn’t work.", a: "Most nootropics underdose ingredients or use single-mechanism formulas. This has 500 mg citicoline (clinical dose), 200 mg L-Theanine (the canonical caffeine pairing), and Lion’s Mane at roughly 5 g raw equivalent. Plus it works on sleep and gut — the two upstream causes most products ignore." },
  { q: "Why sticks instead of the syrup?", a: "Travel-ready (no fridge, no bottle to leak), precision-dosed (no scoop variance), nearly 3× the L-Theanine (200 mg vs 75 mg), plus a probiotic and prebiotic the syrup doesn’t have. Different formula, same brand." },
  { q: "Can I cancel my subscription?", a: "One click, anytime, no hoops. We bill every 4 weeks (not monthly — that’s 13 cycles per year, stated plainly). Pause or cancel from your account page." },
  { q: "Who shouldn’t take this?", a: "Not recommended during pregnancy or breastfeeding. Consult your doctor if you’re on medication, particularly for thyroid conditions. Contains ashwagandha." },
];

/* ─── Main component ─── */
export default function StickPack() {
  const [selectedPlan, setSelectedPlan] = useState("3mo");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [openIngredient, setOpenIngredient] = useState<number | null>(0);

  const currentPlan = PLANS.find(p => p.id === selectedPlan) || PLANS[0];

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <Navbar />

      {/* ═══════════════════════════════════════════════════════
          SECTION 1: HERO / OFFER BLOCK (Top of Sandwich)
      ═══════════════════════════════════════════════════════ */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left: Product Image */}
            <div className="lg:sticky lg:top-36">
              <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-[#FEF3C7] to-[#FDFBF7] shadow-warm-lg">
                <img
                  src={IMAGES.hero}
                  alt="BrewNectar Brain + Gut Stick Packs"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Thumbnails */}
              <div className="flex gap-3 mt-4">
                {[IMAGES.hero, IMAGES.lifestyle, IMAGES.stir, IMAGES.lockin].map((img, i) => (
                  <div key={i} className="w-20 h-20 rounded-xl overflow-hidden border-2 border-transparent hover:border-[#D97706] transition-colors cursor-pointer shadow-warm">
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              {/* Trust strip */}
              <div className="flex items-center justify-center gap-6 mt-6 text-sm text-[#78716C]">
                <span className="flex items-center gap-1.5"><ShieldCheck size={16} className="text-[#D97706]" /> 30-Day Guarantee</span>
                <span className="flex items-center gap-1.5"><Truck size={16} className="text-[#D97706]" /> Free Shipping</span>
                <span className="flex items-center gap-1.5"><RotateCcw size={16} className="text-[#D97706]" /> Cancel Anytime</span>
              </div>
            </div>

            {/* Right: Offer */}
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-[#1C1917] leading-tight mb-3">
                BrewNectar Brain + Gut<br />Nootropic Stick Packs
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className={i < 4 ? "fill-[#D97706] text-[#D97706]" : "fill-[#D97706]/40 text-[#D97706]/40"} />
                  ))}
                </div>
                <span className="text-sm text-[#57534E]"><strong>4.3</strong> from <strong>500+</strong> reviews</span>
              </div>

              {/* Benefit checklist */}
              <div className="space-y-2 mb-6 p-4 rounded-2xl bg-[#FFFBEB] border border-[#FDE68A]/50">
                {[
                  "Works in the coffee you already drink",
                  "Feel it on your first morning — not in two months",
                  "500 mg citicoline + 200 mg L-Theanine",
                  "Lion’s Mane at ~5 g raw equivalent",
                  "A probiotic that survives hot coffee",
                  "Subtly sweet almond flavor — no nuts, no mushroom taste",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <Check size={16} className="text-[#059669] mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-[#1C1917] leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>

              {/* Nut-free callout */}
              <div className="flex items-center gap-2 mb-6 px-3 py-2 rounded-xl bg-emerald-50 border border-emerald-200/50 text-sm text-emerald-800">
                <Shield size={14} /> <strong>Almond flavor, zero almonds.</strong> Completely nut-free.
              </div>

              {/* Plan selector */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-display font-bold text-lg text-[#1C1917]">Select Your Plan:</h3>
                  <span className="text-xs font-semibold text-[#D97706] border border-[#D97706] rounded-full px-3 py-1">Subscribe & Save up to 45%</span>
                </div>

                <div className="space-y-3">
                  {PLANS.map((plan) => (
                    <button
                      key={plan.id}
                      onClick={() => setSelectedPlan(plan.id)}
                      className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 relative ${
                        selectedPlan === plan.id
                          ? "border-[#D97706] bg-white shadow-warm"
                          : "border-stone-200 bg-white hover:border-stone-300"
                      }`}
                    >
                      {plan.badge && (
                        <span className={`absolute -top-2.5 right-4 text-[10px] font-bold px-2.5 py-0.5 rounded-full ${plan.badgeColor}`}>
                          {plan.badge}
                        </span>
                      )}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            selectedPlan === plan.id ? "border-[#D97706]" : "border-stone-300"
                          }`}>
                            {selectedPlan === plan.id && <div className="w-2.5 h-2.5 rounded-full bg-[#D97706]" />}
                          </div>
                          <div>
                            <span className="font-bold text-[#1C1917]">{plan.label}</span>
                            <span className="ml-2 text-sm text-[#059669] font-semibold">({plan.savings})</span>
                            <p className="text-xs text-[#78716C] mt-0.5">{plan.billing}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-2xl font-bold text-[#1C1917]">{plan.price}</span>
                          <span className="text-sm text-[#57534E]">/mo</span>
                          <p className="text-xs text-[#A8A29E]">{plan.perDay}</p>
                        </div>
                      </div>

                      {/* Perks for selected plan */}
                      {selectedPlan === plan.id && plan.perks.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-stone-100 space-y-1.5">
                          {plan.perks.map((perk, i) => (
                            <p key={i} className="text-sm text-[#44403C] flex items-start gap-2">
                              <Check size={14} className="text-[#059669] mt-0.5 flex-shrink-0" />
                              {perk}
                            </p>
                          ))}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* One-time purchase */}
              <p className="text-center text-sm text-[#78716C] mb-4">
                <button className="underline hover:text-[#D97706] transition-colors">One Time Purchase $49</button>
              </p>

              {/* CTA Button */}
              <button className="w-full py-4 px-8 rounded-full bg-gradient-to-r from-[#B45309] via-[#D97706] to-[#B45309] text-white font-bold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2 group">
                START MY PLAN • {currentPlan.price}/MO
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Guarantee under CTA */}
              <div className="mt-4 p-3 rounded-xl border border-stone-200 bg-stone-50 flex items-start gap-3">
                <ShieldCheck size={20} className="text-[#059669] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-sm text-[#1C1917]">30-Day Keep-the-Box Guarantee</p>
                  <p className="text-xs text-[#78716C]">Don’t love it? Keep the box. Full refund, no questions.</p>
                </div>
              </div>

              {/* Trust row */}
              <div className="flex items-center justify-between mt-4 text-xs text-[#78716C]">
                <span className="flex items-center gap-1"><Truck size={12} /> Free shipping</span>
                <span>•</span>
                <span>Ships within 24 hours</span>
                <span>•</span>
                <span className="flex items-center gap-1"><RotateCcw size={12} /> Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 2: PROBLEM AGITATION
      ═══════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-[#FDFBF7]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <FadeUp>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D97706] mb-4">Sound familiar?</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1C1917] mb-12 leading-tight">
              You’re not losing your edge.<br />Your brain is running on empty.
            </h2>
          </FadeUp>

          <div className="space-y-4 mb-12">
            {[
              { icon: "\u{1F4D6}", text: "Reading the same paragraph three times and still not knowing what it said." },
              { icon: "\u{1F4BB}", text: "Opening a new tab instead of starting the thing that actually matters." },
              { icon: "\u23F0", text: "The 2 PM wall, where the work is still there and you aren’t." },
              { icon: "\u2615", text: "The third coffee that does nothing except make you anxious." },
              { icon: "\u{1F6AA}", text: "Walking into a room and standing there, waiting for the reason to come back." },
              { icon: "\u{1F4CB}", text: "Ending a full day of being busy with nothing you’d actually call finished." },
            ].map((item, i) => (
              <FadeUp key={i} delay={i * 0.05}>
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-stone-100 shadow-warm hover:shadow-warm-lg hover:-translate-y-0.5 transition-all duration-200">
                  <span className="text-xl flex-shrink-0">{item.icon}</span>
                  <p className="text-[#44403C] leading-relaxed">{item.text}</p>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp>
            <div className="relative p-8 rounded-3xl bg-white border border-stone-200 shadow-warm-lg overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D97706] via-[#F59E0B] to-[#D97706]" />
              <h3 className="font-display text-xl font-bold text-[#1C1917] mb-3">It isn’t discipline.</h3>
              <p className="text-[#44403C] leading-relaxed">
                A brain running on broken sleep, an inflamed gut, and no raw material for its own neurotransmitters is doing exactly what it should under those conditions. You can’t willpower your way out of a supply problem.
              </p>
            </div>
          </FadeUp>

          {/* Invalidations */}
          <div className="mt-10 space-y-3">
            {[
              { label: "More coffee", text: "stopped working because caffeine only blocks the signal that you’re tired. It never addressed why." },
              { label: "Mushroom coffee", text: "asked you to give up a drink you liked, cut your caffeine to a third, and deliver nothing for eight weeks." },
              { label: "Most nootropics", text: "are underdosed, single-mechanism, and aimed at the brain while ignoring the two upstream causes." },
            ].map((item, i) => (
              <FadeUp key={i} delay={i * 0.05}>
                <div className="p-5 rounded-2xl bg-gradient-to-br from-[#FFFBEB] to-[#FEF3C7] border border-[#FDE68A]/50">
                  <p className="text-[#44403C] leading-relaxed">
                    <strong className="text-[#B45309]">{item.label}</strong> {item.text}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 3: HOW WE SOLVE IT (The Turn)
      ═══════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-20 bg-[#FDFBF7]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <FadeUp>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1C1917] mb-10">
              Three causes. One stick pack.
            </h2>
          </FadeUp>

          <div className="space-y-4">
            {[
              { cause: "Your brain lacks the raw materials for focus", solution: "Citicoline at 500 mg — a clinical dose — plus L-Theanine to make your existing caffeine work properly" },
              { cause: "You’re running a sleep deficit you can’t out-caffeinate", solution: "Ashwagandha, which works on the reason you’re depleted rather than the symptom" },
              { cause: "Your gut is inflamed, and that reaches your head", solution: "A prebiotic and a probiotic that actually survives hot coffee" },
            ].map((row, i) => (
              <FadeUp key={i} delay={i * 0.08}>
                <div className="grid md:grid-cols-[1fr_3rem_1fr] gap-4 items-center p-6 rounded-2xl bg-white border border-stone-100 shadow-warm hover:shadow-warm-lg hover:-translate-y-0.5 transition-all">
                  <p className="text-[#78716C] text-sm leading-relaxed">{row.cause}</p>
                  <div className="hidden md:flex w-10 h-10 rounded-full bg-gradient-to-br from-[#D97706] to-[#B45309] items-center justify-center text-white mx-auto shadow-lg">
                    <ArrowRight size={16} />
                  </div>
                  <p className="text-[#1C1917] font-semibold text-sm leading-relaxed">{row.solution}</p>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.3}>
            <p className="mt-8 text-center font-display text-lg text-[#B45309] italic">
              And it starts working on the first morning.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 4: HOW IT WORKS (Tear / Pour / Stir)
      ═══════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-[#FFFBEB] via-[#FEF3C7] to-[#FDFBF7]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { num: "1", title: "Tear", text: "Open one stick pack." },
              { num: "2", title: "Pour", text: "Add to 8–12 oz of any coffee — hot or iced." },
              { num: "3", title: "Stir", text: "Mix for 5 seconds. Dissolves completely." },
            ].map((step, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <div className="text-center p-8 rounded-3xl bg-white border border-stone-100 shadow-warm hover:shadow-warm-lg hover:-translate-y-1 transition-all">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#D97706] to-[#B45309] flex items-center justify-center text-white font-display text-xl font-bold mx-auto mb-5 shadow-lg">
                    {step.num}
                  </div>
                  <h3 className="font-display text-xl font-bold text-[#1C1917] mb-2">{step.title}</h3>
                  <p className="text-[#57534E] text-sm">{step.text}</p>
                </div>
              </FadeUp>
            ))}
          </div>
          <p className="text-center text-sm text-[#78716C] mt-6 italic">
            Works with drip, espresso, cold brew, latte — anything with coffee in it.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 5: THE FOUR CLOCKS (Mechanism Timeline)
      ═══════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-[#FDFBF7]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <FadeUp>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D97706] mb-4">The mechanism</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1C1917] mb-4 leading-tight">
              Four timescales. Running at once.
            </h2>
            <p className="text-[#57534E] leading-relaxed mb-12 max-w-2xl">
              Mushroom coffee asks you to wait two months for anything to happen. We built a formula where fast ingredients carry you while slow ones build underneath.
            </p>
          </FadeUp>

          <div className="relative pl-12 md:pl-16">
            {/* Timeline line */}
            <div className="absolute left-5 md:left-7 top-8 bottom-8 w-0.5 bg-gradient-to-b from-[#FDE68A] via-[#D97706] to-[#92400E]" />

            {[
              { time: "20–45 min", title: "The First Morning", ingredients: "L-Theanine + Citicoline", body: "Alpha waves rise within 40 minutes. Citicoline has acute attentional effects at 1–3 hours. Your existing caffeine works better, not harder. Mushroom coffee cannot make this claim." },
              { time: "~2 weeks", title: "The Afternoon Wall Disappears", ingredients: "Rhodiola", body: "The fastest adaptogen in the stack. Anti-fatigue and cognitive benefits emerge within roughly two weeks — faster than ashwagandha. This carries you through the window where mushroom coffee customers churn." },
              { time: "Weeks 3–8", title: "Sleep Improves. Energy Compounds.", ingredients: "Ashwagandha + Cordyceps + Gut", body: "Ashwagandha works on the upstream cause — sleep. Cordyceps lands at three weeks. The probiotic and prebiotic rebuild the gut environment across this same window." },
              { time: "Month 2+", title: "The Compounding Tail", ingredients: "Lion’s Mane + B Vitamins", body: "Hericenones and erinacines promote nerve growth factor synthesis. Human trials run 12–16 weeks. This is why the 3-month supply exists — and why benefits disappeared when people stopped." },
            ].map((clock, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <div className="relative mb-8 last:mb-0">
                  {/* Marker */}
                  <div className="absolute -left-7 md:-left-9 top-6 w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-[#D97706] to-[#B45309] flex items-center justify-center shadow-lg ring-4 ring-[#FDFBF7]">
                    <span className="text-white font-bold text-xs md:text-sm">{i + 1}</span>
                  </div>
                  {/* Card */}
                  <div className="p-6 md:p-8 rounded-2xl bg-white border border-stone-100 shadow-warm hover:shadow-warm-lg transition-shadow">
                    <span className="inline-block text-xs font-bold text-[#D97706] bg-[#FEF3C7] px-2.5 py-1 rounded-full mb-3">{clock.time}</span>
                    <h3 className="font-display text-xl font-bold text-[#1C1917] mb-1">{clock.title}</h3>
                    <p className="text-xs text-[#B45309] font-semibold uppercase tracking-wide mb-3">{clock.ingredients}</p>
                    <p className="text-[#44403C] leading-relaxed text-sm">{clock.body}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 6: INGREDIENT DEEP-DIVE (Center of Gravity)
      ═══════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-[#FDFBF7]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <FadeUp>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1C1917] mb-3">
              What’s inside — and why it works.
            </h2>
            <p className="text-[#57534E] mb-10 max-w-2xl">
              Every ingredient earns its place. Three doses disclosed. The rest named with their role and mechanism.
            </p>
          </FadeUp>

          <div className="rounded-3xl border border-stone-200 overflow-hidden shadow-warm-lg bg-white">
            {INGREDIENTS.map((ing, i) => (
              <div key={i} className={`border-b border-stone-100 last:border-b-0 ${openIngredient === i ? "bg-gradient-to-br from-[#FFFBEB] to-white" : ""}`}>
                <button
                  onClick={() => setOpenIngredient(openIngredient === i ? null : i)}
                  className="w-full text-left p-5 md:p-6 flex items-center justify-between gap-4 hover:bg-[#FFFBEB]/30 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#B45309] bg-gradient-to-r from-[#FEF3C7] to-[#FDE68A] px-2 py-0.5 rounded-full">{ing.clock}</span>
                    <h3 className="font-display text-lg font-bold text-[#1C1917] mt-2">{ing.name}</h3>
                    <p className="text-sm text-[#78716C]">{ing.dose}</p>
                  </div>
                  <div className="flex items-center gap-4 flex-shrink-0">
                    <div className="text-right hidden sm:block">
                      <span className="font-display text-2xl font-bold text-[#B45309]">{ing.pullStat}</span>
                      <p className="text-[10px] text-[#78716C] max-w-[100px] leading-tight">{ing.pullLabel}</p>
                    </div>
                    <ChevronDown size={20} className={`text-[#A8A29E] transition-transform duration-300 ${openIngredient === i ? "rotate-180 text-[#D97706]" : ""}`} />
                  </div>
                </button>

                {openIngredient === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-5 md:px-6 pb-6"
                  >
                    <div className="pt-2 border-t border-[#FDE68A]/50">
                      <p className="font-display text-base font-bold text-[#1C1917] mt-4 mb-3">{ing.headline}</p>
                      <p className="text-sm text-[#44403C] leading-relaxed mb-4">{ing.mechanism}</p>
                      <p className="text-sm text-[#44403C] leading-relaxed mb-4">{ing.evidence}</p>
                      <p className="text-sm text-[#78716C] italic p-3 rounded-xl bg-white border border-dashed border-stone-200 inline-block">
                        <Clock size={12} className="inline mr-1.5" />
                        <strong>When you’ll notice:</strong> {ing.onset}
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 7: DOSE COMPARISON CHART
      ═══════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-[#1C1917] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D97706]/5 rounded-full blur-3xl" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
          <FadeUp>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-10">
              The dose most brands hope you won’t check.
            </h2>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="rounded-2xl border border-white/10 overflow-hidden">
              <div className="grid grid-cols-4 gap-0 p-4 bg-white/5 text-xs uppercase tracking-wider text-[#A8A29E] font-semibold">
                <span>Ingredient</span>
                <span>Research Used</span>
                <span>Typical Mushroom Coffee</span>
                <span className="text-[#D97706]">BrewNectar</span>
              </div>
              {[
                { name: "Lion’s Mane", research: "3 g/day", category: "~250 mg", brew: "≈5 g equiv." },
                { name: "Citicoline", research: "500 mg/day", category: "0 mg", brew: "500 mg" },
                { name: "L-Theanine", research: "200 mg", category: "0–100 mg", brew: "200 mg" },
                { name: "Rhodiola", research: "200–600 mg", category: "0 mg", brew: "300 mg (10:1)" },
              ].map((row, i) => (
                <div key={i} className="grid grid-cols-4 gap-0 p-4 border-t border-white/5 items-center hover:bg-white/[0.02] transition-colors">
                  <span className="font-semibold text-sm text-stone-200">{row.name}</span>
                  <span className="text-sm text-[#A8A29E]">{row.research}</span>
                  <span className="text-sm text-red-400">{row.category}</span>
                  <span className="text-sm text-[#D97706] font-bold">{row.brew}</span>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 8: THE GUT SECTION
      ═══════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-emerald-50 via-[#ECFDF5] to-[#F0FDF4] relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-emerald-200/20 rounded-full blur-3xl" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
          <FadeUp>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1C1917] mb-4">
              Your gut is a brain input.
            </h2>
            <p className="text-[#44403C] leading-relaxed mb-10 max-w-2xl">
              When the gut microbiome is disrupted, bacterial components activate immune cells and trigger pro-inflammatory cytokines that increase permeability of both the gut barrier and the blood-brain barrier. The gut is a genuine input to how clear your head feels — not a wellness metaphor.
            </p>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="p-8 rounded-3xl bg-white border border-emerald-200/60 shadow-warm-lg mb-6">
              <h3 className="font-display text-xl font-bold text-[#1C1917] mb-4">Most probiotics die in your coffee.</h3>
              <p className="text-[#44403C] leading-relaxed mb-6">
                Bacillus coagulans forms a spore coat that survives what kills conventional probiotics. It’s been tested specifically in brewed coffee and tea — published stability data, not marketing.
              </p>
              <div className="flex items-baseline gap-4 pt-5 border-t border-emerald-100">
                <span className="font-display text-4xl font-bold text-emerald-600">92%</span>
                <span className="text-sm text-[#57534E]">survival through simulated digestion. Adhered to human colonic cells at 5× the rate of L. acidophilus.</span>
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={0.2}>
            <div className="p-8 rounded-3xl bg-white border border-emerald-200/60 shadow-warm">
              <h3 className="font-display text-lg font-bold text-[#1C1917] mb-3">Feed what’s already there.</h3>
              <p className="text-[#44403C] leading-relaxed text-sm">
                2 g of inulin from chicory root — a prebiotic fiber that selectively feeds Bifidobacteria. One adds beneficial bacteria, the other feeds what’s already there. Standard approach, properly paired.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 9: WHY MUSHROOM COFFEE FAILS
      ═══════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-[#FDFBF7]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <FadeUp>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1C1917] mb-3">
              Why mushroom coffee keeps losing customers.
            </h2>
            <p className="text-[#57534E] mb-10 max-w-2xl">
              They’re not bad products. They’re built on a model that doesn’t serve you.
            </p>
          </FadeUp>

          <div className="grid md:grid-cols-2 gap-5">
            {[
              { title: "It tastes like it’s punishing you.", text: "Earthy, bitter, gritty. A daily habit you dislike is a habit you drop. The category’s persistent complaint isn’t a bug — it’s the product." },
              { title: "It costs you caffeine.", text: "~95 mg in drip coffee vs ~35–50 mg in typical mushroom coffee. You feel worse on day one. That’s the opposite of what you paid for." },
              { title: "It’s underdosed.", text: "~250 mg per mushroom against trials that used 3 g/day. You can’t get a research-level result from a fraction of a research dose." },
              { title: "Nothing happens for two months.", text: "Lion’s Mane trials measure at weeks 8, 12, 16. Cordyceps needed three weeks. Even done right, mushrooms alone are a long game — with nothing to carry you through the wait." },
            ].map((item, i) => (
              <FadeUp key={i} delay={i * 0.08}>
                <div className="p-7 rounded-3xl bg-white border border-stone-200 shadow-warm hover:shadow-warm-lg hover:-translate-y-1 transition-all">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A] flex items-center justify-center text-[#B45309] font-display font-bold mb-4">
                    {i + 1}
                  </div>
                  <h3 className="font-display text-lg font-bold text-[#1C1917] mb-2">{item.title}</h3>
                  <p className="text-sm text-[#57534E] leading-relaxed">{item.text}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 10: COMPARISON TABLE
      ═══════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-[#FDFBF7]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <FadeUp>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1C1917] mb-10">
              Why BrewNectar wins.
            </h2>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="rounded-2xl border border-stone-200 overflow-hidden bg-white shadow-warm">
              {/* Header */}
              <div className="grid grid-cols-[1fr_5rem_5rem] md:grid-cols-[1fr_8rem_8rem] p-4 bg-stone-50 border-b border-stone-200">
                <span className="text-xs font-bold uppercase tracking-wider text-[#78716C]">Feature</span>
                <span className="text-xs font-bold uppercase tracking-wider text-[#B45309] text-center">BrewNectar</span>
                <span className="text-xs font-bold uppercase tracking-wider text-[#78716C] text-center">Others</span>
              </div>
              {/* Rows */}
              {COMPARISON_ROWS.map((row, i) => (
                <div key={i} className="grid grid-cols-[1fr_5rem_5rem] md:grid-cols-[1fr_8rem_8rem] p-4 border-b border-stone-100 last:border-b-0 items-center hover:bg-[#FFFBEB]/30 transition-colors">
                  <div>
                    <span className="text-sm text-[#1C1917] font-medium">{row.feature}</span>
                    {row.brewNote && <span className="block text-xs text-[#78716C] mt-0.5">{row.brewNote}</span>}
                  </div>
                  <div className="flex justify-center">
                    <div className="w-7 h-7 rounded-full bg-[#D97706] flex items-center justify-center">
                      <Check size={14} className="text-white" />
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-7 h-7 rounded-full bg-stone-200 flex items-center justify-center">
                      <XIcon size={14} className="text-stone-500" />
                    </div>
                    {row.otherNote && <span className="text-[10px] text-[#A8A29E] mt-1">{row.otherNote}</span>}
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 11: WHY STICK PACKS (Format Argument)
      ═══════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-[#FDFBF7]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <FadeUp>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1C1917] mb-10">
              The dose you paid for. In every single cup.
            </h2>
          </FadeUp>

          <div className="grid md:grid-cols-2 gap-5">
            {[
              { icon: "\u{1F3AF}", title: "Precision dosing", text: "Every stick is identical. No scoop, no guessing, no “heaping teaspoon” variance. Tubs are where underdosing hides." },
              { icon: "\u2615", title: "Doesn’t replace anything", text: "A stick pack occupies no slot at all — it joins whatever’s already there, hot or iced." },
              { icon: "\u{1F30D}", title: "Travel-ready", text: "Fits a pocket, a laptop sleeve, a carry-on. Works with hotel coffee, airport coffee, the office machine." },
              { icon: "\u{1F4E6}", title: "Individually sealed", text: "A tub oxidizes more every time it’s opened. Stick 28 is identical to stick 1." },
              { icon: "\u{1F9CA}", title: "No fridge, no mess", text: "Unlike a syrup or liquid — nothing to spill, nothing to store, nothing to clean." },
            ].map((item, i) => (
              <FadeUp key={i} delay={i * 0.06}>
                <div className="p-7 rounded-3xl bg-white border border-stone-100 shadow-warm hover:shadow-warm-lg hover:-translate-y-0.5 transition-all">
                  <span className="text-2xl mb-3 block">{item.icon}</span>
                  <h3 className="font-display text-lg font-bold text-[#1C1917] mb-2">{item.title}</h3>
                  <p className="text-sm text-[#57534E] leading-relaxed">{item.text}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 12: BIG STATS
      ═══════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-[#1C1917] text-white relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[600px] h-[600px] bg-[#D97706]/5 rounded-full blur-3xl" />
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { number: "14%", label: "ATP markers increase after 6 weeks of citicoline" },
              { number: "≈5g", label: "Lion’s Mane raw equivalent per stick" },
              { number: "92%", label: "Probiotic survival through digestion" },
              { number: "95mg", label: "Caffeine you keep vs ~35–50 mg in mushroom coffee" },
            ].map((stat, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:bg-white/[0.05] transition-colors">
                  <span className="font-display text-3xl md:text-4xl font-bold text-[#D97706] block mb-2">{stat.number}</span>
                  <span className="text-xs text-[#A8A29E] leading-relaxed">{stat.label}</span>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 13: GUARANTEE
      ═══════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-[#FDFBF7]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <FadeUp>
            <div className="p-10 md:p-14 rounded-3xl bg-gradient-to-br from-emerald-600 to-emerald-700 text-white text-center shadow-warm-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
              <div className="relative z-10">
                <ShieldCheck size={48} className="mx-auto mb-6 text-emerald-200" />
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">30-Day Keep-the-Box Guarantee</h2>
                <p className="text-lg text-emerald-100 mb-8 max-w-lg mx-auto">
                  Don’t love it? Keep the box. Full refund within 48 hours. No return shipping, no restocking fees, no questions asked.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {["Keep the Box", "48-Hour Refund", "No Questions", "No Return Shipping"].map((item, i) => (
                    <div key={i} className="p-3 rounded-xl bg-white/10 backdrop-blur-sm text-sm font-medium">{item}</div>
                  ))}
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 14: FAQ
      ═══════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-[#FDFBF7]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <FadeUp>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1C1917] mb-10">
              Frequently Asked Questions
            </h2>
          </FadeUp>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item, i) => (
              <FadeUp key={i} delay={i * 0.03}>
                <div className="rounded-2xl border border-stone-200 bg-white overflow-hidden shadow-warm">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 hover:bg-stone-50 transition-colors"
                  >
                    <span className="font-display font-bold text-[#1C1917]">{item.q}</span>
                    <ChevronDown size={18} className={`text-[#A8A29E] transition-transform duration-300 flex-shrink-0 ${openFaq === i ? "rotate-180 text-[#D97706]" : ""}`} />
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-5">
                      <p className="text-sm text-[#44403C] leading-relaxed border-t border-stone-100 pt-4">{item.a}</p>
                    </div>
                  )}
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 15: FINAL CTA
      ═══════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-[#FFFBEB] to-[#FDFBF7]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <FadeUp>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1C1917] mb-4">
              You didn’t have a coffee problem.
            </h2>
            <p className="text-[#57534E] text-lg mb-8 max-w-lg mx-auto">
              Keep the cup you love. Add what your brain actually needs. Feel it on the first morning.
            </p>
            <button className="px-10 py-4 rounded-full bg-gradient-to-r from-[#B45309] via-[#D97706] to-[#B45309] text-white font-bold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 inline-flex items-center gap-2 group">
              Start My Plan
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="mt-4 text-sm text-[#78716C]">
              30-day keep-the-box guarantee • Free shipping • Cancel anytime
            </p>
          </FadeUp>
        </div>
      </section>

      <Footer />
    </div>
  );
}
