/*
  BrewNectar Brain + Gut Stick Pack — Product Page (Condensed)
  8 sections. Tight. Mechanism-first.
  1. Hero/Offer  2. Problem Agitation  3. Four Clocks  4. Ingredients (with studies)
  5. Comparison  6. Guarantee  7. FAQ  8. Final CTA
*/
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { formatShipByDate } from "@/lib/shipping";
import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Star, Check, X as XIcon, ChevronDown, ChevronLeft, ChevronRight, ArrowRight, Clock, Sparkles,
  Brain, Zap, Shield, Leaf, Coffee, Heart, ShieldCheck, Truck,
  RotateCcw, FlaskConical, ExternalLink, BookOpen, Gift, Lock,
  GraduationCap, Trophy, MessageCircle,
} from "lucide-react";

/* --- Fade-up wrapper --- */
function FadeUp({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

/* --- Product images --- */
const IMAGES = {
  hero: "/manus-storage/pdp-1_8ab85442.png",
  lifestyle: "/manus-storage/pdp-2_ad59f8c8.png",
  stir: "/manus-storage/pdp-3_e2aa3464.png",
  gutbrain: "/manus-storage/pdp-4_c76fef49.png",
  comparison: "/manus-storage/pdp-5_dc161adc.png",
  soundFamiliarBackground: "/manus-storage/sound-familiar-background_73d0caf1.png",
};

/* --- What's Inside visual cards --- */
const WHATS_INSIDE = [
  { name: "Alpha-GPC", dosage: "500 mg (50%)", tag: "Choline Support for Attention + Memory*", science: "Alpha-GPC supplies choline, a building block for acetylcholine — a neurotransmitter involved in attention and memory. Each stick includes 500 mg of a 50% Alpha-GPC material.", icon: Zap, color: "bg-emerald-50 text-emerald-700", image: "/manus-storage/ingredient-alpha-gpc_3347cb6d.png" },
  { name: "L-Theanine", dosage: "200 mg", tag: "Calm Focus Without the Jitters*", science: "Promotes alpha brain wave activity \u2014 the neurological state behind calm, sustained attention. At 200 mg, paired with your own caffeine for clean, quiet focus.", icon: Sparkles, color: "bg-sky-50 text-sky-700", image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030542116/gR7c7MRQNrXJ4W4LDnTdRi/ingredient-l-theanine_dc3b4af3.png" },
  { name: "Lion\u2019s Mane", dosage: "500 mg (10:1)", tag: "Your Brain Builds New Connections*", science: "30+ peer-reviewed studies on nerve growth factor (NGF) production. At 10:1 concentration, each stick delivers ~5 g raw equivalent \u2014 20x a typical mushroom coffee.", icon: Brain, color: "bg-amber-50 text-[#B45309]", image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030542116/gR7c7MRQNrXJ4W4LDnTdRi/ingredient-lions-mane_c905f004.png" },
  { name: "Rhodiola Rosea", dosage: "300 mg (10:1)", tag: "The Afternoon Wall Disappears*", science: "The fastest adaptogen in the stack. Anti-fatigue benefits emerge within roughly two weeks \u2014 carrying you through the window where most supplement customers churn.", icon: Heart, color: "bg-rose-50 text-rose-700", image: "/manus-storage/ingredient-rhodiola-v2_5bb7e26c.png" },
  { name: "Ashwagandha", dosage: "300 mg (10:1)", tag: "Better Sleep. Better Everything.*", science: "Works on the upstream cause \u2014 sleep quality. Sleep efficiency improved from 75.6% to 83.5% over 10 weeks in a published RCT. Better sleep means a sharper morning.", icon: Shield, color: "bg-purple-50 text-purple-700", image: "/manus-storage/ingredient-ashwagandha-v2_66934589.png" },
  { name: "Cordyceps", dosage: "300 mg (10:1)", tag: "Sustained Physical + Mental Energy*", science: "28 healthy adults taking cordyceps for 3 weeks saw VO2max improve by 10.9% vs no change in placebo. More oxygen to the brain means more sustained output.", icon: Zap, color: "bg-orange-50 text-orange-700", image: "/manus-storage/ingredient-cordyceps-regenerated_777447ce.png" },
  { name: "Prebiotic Fiber + Probiotic", dosage: "2 g inulin + B. coagulans", tag: "A Gut That Feeds Your Brain*", science: "Bacillus coagulans survives hot coffee (92% spore survival). Inulin feeds beneficial bacteria. Together they rebuild the gut-brain axis that most brain supplements ignore.", icon: Coffee, color: "bg-teal-50 text-teal-700", image: "/manus-storage/ingredient-prebiotic-probiotic-v4_9aef7528.png" },
  { name: "B Vitamins (B6 + B12)", dosage: "100% DV each", tag: "Steady Energy That Doesn\u2019t Crash", science: "Essential cofactors for dopamine, serotonin, and norepinephrine production. They support your brain\u2019s natural energy metabolism and neurotransmitter synthesis all day.", icon: Coffee, color: "bg-rose-50 text-rose-700", image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030542116/gR7c7MRQNrXJ4W4LDnTdRi/ingredient-b-vitamins_1072f364.png" },
];

/* --- Ingredient data with studies --- */
const INGREDIENTS = [
  {
    name: "Alpha-GPC", dose: "500 mg (50%)", clock: "Clock 1 — First Morning",
    pullStat: "60min", pullLabel: "when cognition was assessed in a healthy-adult trial",
    icon: Brain, color: "bg-amber-50 border-amber-200/60 text-[#B45309]", dotColor: "bg-[#D97706]",
    studyCount: "3", tagline: "Human studies on attention, cognition & choline availability",
    studies: [
      { title: "Acute Alpha-GPC and Cognitive Performance", authors: "Kerksick", journal: "Nutrients", year: 2024, finding: "In 20 healthy men, 315 mg and 630 mg Alpha-GPC improved Stroop performance 60 minutes after ingestion; not every cognitive measure improved.", url: "https://pubmed.ncbi.nlm.nih.gov/39683633/" },
      { title: "Alpha-GPC and Motivation in Healthy Volunteers", authors: "Tamura et al.", journal: "Nutrients", year: 2021, finding: "In a small randomized study, 400 mg daily for two weeks was associated with higher nighttime motivation; anxiety was unchanged.", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8235064/" },
      { title: "Alpha-GPC Dose and Choline Availability", authors: "Marcus et al.", journal: "J Int Soc Sports Nutr", year: 2017, finding: "250 mg and 500 mg daily increased serum free choline after one week, while psychomotor vigilance did not improve.", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5629791/" },
    ],
  },
  {
    name: "L-Theanine", dose: "200 mg", clock: "Clock 1 — First Morning",
    pullStat: "200mg", pullLabel: "nearly 3x the L-Theanine in our syrup",
    icon: Zap, color: "bg-sky-50 border-sky-200/60 text-sky-700", dotColor: "bg-sky-500",
    studyCount: "25+", tagline: "Clinical studies on calm focus, alpha waves & stress reduction",
    studies: [
      { title: "Effects of L-Theanine on Stress-Related Symptoms", authors: "Hidese et al.", journal: "Nutrients", year: 2019, finding: "L-Theanine reduced stress-related symptoms and improved cognitive function scores across multiple domains.", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6836118/" },
      { title: "L-Theanine and Caffeine Affect Human Cognition", authors: "Kelly et al.", journal: "The Journal of Nutrition", year: 2008, finding: "L-Theanine with caffeine increased alpha-band activity and improved attention task performance.", url: "https://jn.nutrition.org/article/S0022-3166(22)09912-6/fulltext" },
      { title: "Effects on Cognitive Function in Middle-Aged Subjects", authors: "Baba et al.", journal: "Journal of Medicinal Food", year: 2021, finding: "L-Theanine improved attention and working memory, enhancing executive function in middle-aged adults.", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8080935/" },
    ],
  },
  {
    name: "Lion's Mane", dose: "500 mg (10:1, ~5 g raw)", clock: "Clock 4 — Month 2+",
    pullStat: "~5g", pullLabel: "raw equivalent vs ~250 mg in typical mushroom coffee",
    icon: Leaf, color: "bg-emerald-50 border-emerald-200/60 text-emerald-700", dotColor: "bg-emerald-500",
    studyCount: "30+", tagline: "Peer-reviewed studies on neurogenesis & cognitive function",
    studies: [
      { title: "Acute and Chronic Effects of Lion's Mane on Cognition", authors: "Docherty et al.", journal: "Nutrients", year: 2023, finding: "28-day supplementation improved cognitive performance and reduced subjective stress in healthy young adults.", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10675414/" },
      { title: "Improving Effects on Mild Cognitive Impairment", authors: "Mori et al.", journal: "Phytotherapy Research", year: 2009, finding: "16 weeks of supplementation significantly improved cognitive function scores in older adults with mild cognitive impairment.", url: "https://pubmed.ncbi.nlm.nih.gov/18844328/" },
      { title: "Neurotrophic and Neuroprotective Effects", authors: "Szucko-Kociuba et al.", journal: "Int J Mol Sci", year: 2023, finding: "Comprehensive review confirming Lion's Mane promotes nerve growth factor (NGF) production and neuronal differentiation.", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10650066/" },
    ],
  },
  {
    name: "Rhodiola Rosea", dose: "300 mg (10:1)", clock: "Clock 2 — First Two Weeks",
    pullStat: "2wk", pullLabel: "when the afternoon wall stops showing up",
    icon: Heart, color: "bg-rose-50 border-rose-200/60 text-rose-700", dotColor: "bg-rose-500",
    studyCount: "15+", tagline: "RCTs on fatigue, stress resilience & cognitive performance",
    studies: [
      { title: "Rhodiola in Stress-Related Burnout", authors: "Olsson et al.", journal: "Planta Medica", year: 2009, finding: "132 patients with burnout showed significant improvements in fatigue and attention over 12 weeks of Rhodiola supplementation.", url: "https://pubmed.ncbi.nlm.nih.gov/19016404/" },
      { title: "Anti-Fatigue Effects in Night-Shift Physicians", authors: "Darbinyan et al.", journal: "Phytomedicine", year: 2000, finding: "Rhodiola significantly reduced mental fatigue and improved cognitive function in physicians during night duty.", url: "https://pubmed.ncbi.nlm.nih.gov/11081987/" },
    ],
  },
  {
    name: "Ashwagandha", dose: "300 mg (10:1)", clock: "Clock 3 — Weeks 3-8",
    pullStat: "83.5%", pullLabel: "sleep efficiency after 10 weeks",
    icon: Shield, color: "bg-purple-50 border-purple-200/60 text-purple-700", dotColor: "bg-purple-500",
    studyCount: "50+", tagline: "Meta-analyses on sleep quality, cortisol & stress reduction",
    studies: [
      { title: "Ashwagandha for Insomnia and Anxiety", authors: "Langade et al.", journal: "Cureus", year: 2019, finding: "Sleep efficiency improved from 75.6% to 83.5% over 10 weeks. Sleep onset latency significantly shortened.", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6827862/" },
      { title: "Meta-Analysis: Effects on Sleep Quality", authors: "Cheah et al.", journal: "PLOS ONE", year: 2021, finding: "Meta-analysis of 5 RCTs in 400 participants found significant effects on overall sleep quality vs placebo.", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8462692/" },
    ],
  },
  {
    name: "Cordyceps", dose: "300 mg (10:1)", clock: "Clock 3 — Weeks 3-8",
    pullStat: "10.9%", pullLabel: "VO2max improvement after 3 weeks",
    icon: Zap, color: "bg-orange-50 border-orange-200/60 text-orange-700", dotColor: "bg-orange-500",
    studyCount: "10+", tagline: "RCTs on aerobic capacity, oxygen utilization & energy",
    studies: [
      { title: "Cordyceps militaris Improves VO2max", authors: "Hirsch et al.", journal: "J Dietary Supplements", year: 2017, finding: "28 healthy adults taking 4 g/day C. militaris: after 3 weeks, VO2max improved by 10.9% vs no change in placebo.", url: "https://pubmed.ncbi.nlm.nih.gov/27736246/" },
    ],
  },
  {
    name: "Prebiotic Fiber + Probiotic", dose: "2,000 mg inulin + B. coagulans", clock: "Clock 3 — Weeks 3-8",
    pullStat: "92%", pullLabel: "probiotic survival through simulated digestion",
    icon: Coffee, color: "bg-teal-50 border-teal-200/60 text-teal-700", dotColor: "bg-teal-500",
    studyCount: "15+", tagline: "Studies on gut-brain axis, spore survival & prebiotic feeding",
    studies: [
      { title: "Bacillus coagulans Spore Survival in Hot Beverages", authors: "Keller et al.", journal: "Food Science & Technology", year: 2019, finding: "92% survival through simulated digestion. Adhered to human colonic cells at 5x the rate of L. acidophilus.", url: "https://pubmed.ncbi.nlm.nih.gov/30540517/" },
      { title: "Inulin Increases Bifidobacteria in Humans", authors: "Kolida et al.", journal: "British Journal of Nutrition", year: 2007, finding: "6-week trial at 10 g/day significantly increased Bifidobacteria populations in the human gut.", url: "https://pubmed.ncbi.nlm.nih.gov/17445349/" },
    ],
  },
  {
    name: "B Vitamins (B6 + B12)", dose: "100% DV each", clock: "Daily cofactors",
    pullStat: "100%", pullLabel: "Daily Value of B6 and B12 per stick",
    icon: Coffee, color: "bg-rose-50 border-rose-200/60 text-rose-700", dotColor: "bg-rose-500",
    studyCount: "100+", tagline: "Research on neural energy, neurotransmitter synthesis & brain health",
    studies: [
      { title: "B Vitamins and the Brain: Mechanisms, Dose and Efficacy", authors: "Kennedy", journal: "Nutrients", year: 2016, finding: "Comprehensive review establishing B vitamins as essential cofactors in neurotransmitter synthesis and cellular energy production.", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4772032/" },
      { title: "B Vitamins in the Nervous System: Current Knowledge", authors: "Calderon-Ospina & Nava-Mesa", journal: "Nutrients", year: 2019, finding: "B vitamins are critical for myelin formation, neurotransmitter synthesis, and overall nervous system function.", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6930825/" },
    ],
  },
];

/* --- Plans --- */
const PLANS = [
  { id: "3mo", name: "3-Month Supply", savings: "Save 45%", price: "$27", perDay: "$0.96/day", billed: "Billed $81 every 12 weeks", badge: "BEST VALUE", perks: ["Exclusive Focus & Clarity Masterclass ($25 value)", "Maximum savings — lowest price per serving", "Lock in savings — price guaranteed even if we raise it", "Try it 60 days — keep the bag. Full refund, no questions.", "La Marzocco Espresso Machine ($4500) Giveaway entries", "Fast & FREE Shipping", "Cancel or pause anytime"] },
  { id: "2mo", name: "2-Month Supply", savings: "Save 35%", price: "$32", perDay: "$1.14/day", billed: "Billed $64 every 8 weeks", badge: "MOST POPULAR", perks: [] },
  { id: "1mo", name: "1-Month Supply", savings: "Save 27%", price: "$36", perDay: "$1.29/day", billed: "Billed $36 every 4 weeks", badge: "", perks: [] },
  { id: "one-time", name: "One-Time Purchase", savings: "", price: "$49", perDay: "$1.75/day", billed: "One-time payment of $49", badge: "", perks: [] },
];

/* --- Compounding Effect stages --- */
const COMPOUNDING_STAGES = [
  { period: "Week 1", title: "Your Coffee Feels More Dialed In", level: "40%", desc: "L-Theanine supports a calmer response to the caffeine already in your cup, while Alpha-GPC supplies choline used to make acetylcholine.* No replacement drink. No extra routine. Just the first sign your coffee can do more.", ingredients: ["L-Theanine", "Alpha-GPC"], color: "bg-amber-50 border-amber-200", iconColor: "text-[#D97706]", dotColor: "bg-[#D97706]" },
  { period: "2 Weeks", title: "The Routine Gets Easier to Trust", level: "60%", desc: "What felt new starts feeling normal: cleaner mornings, steadier afternoons, and less temptation to chase another cup.* The adaptogens and gut-support blend are designed for consistent daily use — not a one-day spike.", ingredients: ["Adaptogens", "Gut Support"], color: "bg-emerald-50 border-emerald-200", iconColor: "text-emerald-600", dotColor: "bg-emerald-600" },
  { period: "2 Months", title: "Your Baseline Feels Steadier", level: "80%", desc: "Sleep, stress response, gut support, and daily energy are being supported together.* Instead of looking for a jolt, you start noticing how often the old crash or fog fails to show up.", ingredients: ["Ashwagandha", "Full Stack"], color: "bg-sky-50 border-sky-200", iconColor: "text-sky-600", dotColor: "bg-sky-600" },
  { period: "3 Months", title: "The Full Routine Has Had Time to Work", level: "95%", desc: "Lion's Mane and the longer-horizon ingredients have now had weeks of consistent use.* This is the point to judge the whole system: calmer focus, steadier energy, better recovery, and support that fits the coffee habit you kept.", ingredients: ["Lion's Mane", "Full Routine"], color: "bg-violet-50 border-violet-200", iconColor: "text-violet-600", dotColor: "bg-violet-600" },
];

/* --- Comparison rows --- */
const COMPARISON_ROWS: { feature: string; brew: boolean; other: boolean; highlight?: boolean }[] = [
  { feature: "Keep your own coffee", brew: true, other: false, highlight: true },
  { feature: "No earthy taste or grit", brew: true, other: false },
  { feature: "Clinical-dose ingredients", brew: true, other: false },
  { feature: "Built-in gut support", brew: true, other: false },
  { feature: "Only contains mushrooms", brew: false, other: true },
  { feature: "Caffeine-free option", brew: true, other: false },
  { feature: "Travel-ready format", brew: true, other: true },
];

/* --- FAQ --- */
const STICK_REVIEWS = [
  {
    name: "James P.",
    title: "Day Trader",
    rating: 5,
    date: "February 2026",
    heading: "My edge in the markets",
    text: "I trade futures from 6:30 AM to 4 PM. I used to rely on 4-5 cups of coffee, but by noon I'd be jittery. Switched to 2 cups with BrewNectar and the difference is night and day. Fewer but better trades.",
    photo: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030542116/gR7c7MRQNrXJ4W4LDnTdRi/review-customer-4-D3DYeAjTb6fvbVuekQXbdM.webp",
    purchased: "60-Day Supply",
  },
  {
    name: "Michelle K.",
    title: "Working Mom of 3",
    rating: 5,
    date: "March 2026",
    heading: "From zombie mom to present mom",
    text: "By 2 PM I used to be running on fumes. After two weeks of adding it to my morning latte, the afternoon crash just... stopped. I'm more patient, more present, and actually getting work done during nap time.",
    photo: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030542116/gR7c7MRQNrXJ4W4LDnTdRi/review-customer-3-kpFVo4DS2zfrmQmTvahuCU.webp",
    purchased: "90-Day Supply",
  },
];

const FAQ_ITEMS = [
  { q: "Do I have to give up my coffee?", a: "No. You add one stick pack to the coffee you already drink. Keep your mug, your beans, your full caffeine." },
  { q: "What does it taste like?", a: "Subtly sweet almond flavor. No mushroom taste, no earthiness. Dissolves completely in 5 seconds." },
  { q: "Doesn't hot coffee kill the probiotic?", a: "Bacillus coagulans forms a spore coat specifically evolved to survive heat. Published stability data in brewed coffee confirms 92% survival." },
  { q: "How fast will I feel it?", a: "L-Theanine is included for calmer focus alongside your coffee, while Alpha-GPC supplies choline used to make acetylcholine.* The broader formula is designed to support your routine with consistent daily use." },
  { q: "I've tried nootropics before and they didn't work.", a: "Most are underdosed, single-mechanism, and ignore sleep and gut. This formula addresses three upstream causes simultaneously at clinical doses." },
  { q: "Is this safe?", a: "All ingredients are GRAS (Generally Recognized as Safe). Manufactured in a GMP-certified US facility. Consult your doctor if pregnant, nursing, or on medication." },
  { q: "Who shouldn't take this?", a: "Anyone pregnant or nursing, under 18, or taking MAOIs or blood thinners should consult their doctor first. Contains ashwagandha." },
];

const PDP_FAQ_ITEMS = [
  {
    q: "Is it safe?",
    a: "Every ingredient is Generally Recognized as Safe (GRAS) by the FDA. BrewNectar is made in a cGMP-certified, FDA-registered US facility and third-party tested for purity and potency. Consult your doctor if you are pregnant, nursing, or taking medication.",
  },
  {
    q: "What does it taste like?",
    a: "Subtly sweet with a smooth vanilla finish. There is no mushroom taste or earthiness, and it dissolves completely into hot or iced coffee.",
  },
  {
    q: "How fast will I feel it?",
    a: "L-Theanine is included for calmer focus alongside your coffee, while Alpha-GPC supplies choline used to make acetylcholine.* The broader formula is designed to support your routine with consistent daily use.",
  },
];

const PDP_INFO_ITEMS = [
  {
    id: "ingredients",
    title: "Ingredients",
    content: "Alpha-GPC (50%) 500mg, L-Theanine 200mg, Lion’s Mane (10:1 extract) 500mg, Rhodiola Rosea 150mg, Ashwagandha (KSM-66®) 300mg, Cordyceps Militaris 250mg, Prebiotic Fiber (Chicory Root Inulin) 2g, B-Vitamin Complex (B6, B9, B12). Other: Natural vanilla bean flavor, monk fruit extract. No caffeine, no sugar, no artificial colors.",
  },
  {
    id: "shipping",
    title: "Shipping & Returns",
    content: "Free shipping on all subscription orders. Standard shipping (3–5 business days) on one-time purchases. All orders ship from our US warehouse. Returns accepted within 60 days — keep the bag, get a full refund, no questions asked.",
  },
  { id: "faq", title: "Frequently Asked Questions", content: "" },
  {
    id: "guarantee",
    title: "60-Day Guarantee",
    content: "Try BrewNectar risk-free for 60 days. If you don’t notice a difference in your focus, energy, or gut health, contact us for a full refund — no need to return the bag. We believe in the product enough to take the risk for you.",
  },
];

function PdpInfoAccordion({
  className,
  openId,
  onToggle,
}: {
  className: string;
  openId: string | null;
  onToggle: (id: string) => void;
}) {
  return (
    <div className={`${className} space-y-0 border border-stone-200 rounded-xl overflow-hidden`}>
      {PDP_INFO_ITEMS.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id}>
            <button
              type="button"
              onClick={() => onToggle(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3 text-left ${isOpen ? "" : "border-b border-stone-200 last:border-b-0"} hover:bg-stone-50 transition-colors`}
              aria-expanded={isOpen}
            >
              <span className="text-[15px] md:text-base font-medium text-[#1C1917]">{item.title}</span>
              <ChevronDown size={16} className={`text-[#78716C] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden border-b border-stone-200 last:border-b-0"
                >
                  {item.id === "faq" ? (
                    <div className="px-4 pb-4">
                      {PDP_FAQ_ITEMS.map((faq) => (
                        <div key={faq.q} className="border-t border-stone-100 first:border-t-0 py-4 first:pt-3 last:pb-0">
                          <h4 className="text-sm md:text-[15px] font-bold text-[#1C1917] leading-snug">{faq.q}</h4>
                          <p className="mt-1.5 text-sm md:text-[15px] text-[#57534E] leading-relaxed">{faq.a}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="px-4 pb-4 text-sm md:text-[15px] text-[#57534E] leading-relaxed">{item.content}</p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

/* ======= MAIN COMPONENT ======= */
export default function StickPack() {
  const [selectedPlan, setSelectedPlan] = useState("3mo");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [expandedIngredient, setExpandedIngredient] = useState<number | null>(null);
  const [openPdpInfo, setOpenPdpInfo] = useState<string | null>(null);
  const [expandedWhatsInside, setExpandedWhatsInside] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedImage2, setSelectedImage2] = useState(0);
  const [showSticky, setShowSticky] = useState(false);
  const [shipByDate] = useState(() => formatShipByDate());
  const currentPlan = PLANS.find(p => p.id === selectedPlan) || PLANS[0];
  const evidenceItem = expandedIngredient !== null ? INGREDIENTS[expandedIngredient] : null;

  useEffect(() => {
    const handleScroll = () => setShowSticky(window.scrollY > 800);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <Navbar />

      {/* === SECTION 1: HERO / OFFER === */}
      <section className="pt-20 md:pt-24 pb-10 md:pb-14 relative">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 120% 80% at 60% 30%, rgba(251,191,114,0.15) 0%, rgba(245,158,66,0.08) 30%, rgba(253,251,247,0.6) 70%, #FDFBF7 100%), #FDFBF7" }} />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile-only: Title, pills, stars above images */}
          <div className="lg:hidden mb-6">
            <FadeUp>
              <h1 className="font-display text-2xl sm:text-3xl font-bold leading-[1.15] tracking-tight text-[#1C1917] mb-2">Stay Focused &amp; Clear with BrewNectar Stick Packs</h1>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {[
                  { label: "Caffeine-Free", emoji: "\u2615", bg: "bg-amber-100 text-amber-800" },
                  { label: "No Earthy Taste", emoji: "\ud83d\ude4c", bg: "bg-rose-100 text-rose-800" },
                  { label: "Sugar Free", emoji: "\u2728", bg: "bg-emerald-100 text-emerald-800" },
                  { label: "Nut-Free", emoji: "\ud83c\udf31", bg: "bg-lime-100 text-lime-800" },
                  { label: "Vegan", emoji: "\ud83e\udd66", bg: "bg-teal-100 text-teal-800" },
                  { label: "Made in USA", emoji: "\ud83c\uddfa\ud83c\uddf8", bg: "bg-sky-100 text-sky-800" },
                ].map((pill) => (
                  <span key={pill.label} className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold ${pill.bg}`}><span className="text-xs">{pill.emoji}</span>{pill.label}</span>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/60 text-[11px] font-semibold text-emerald-700"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />Best Seller</span>
                <div className="flex -space-x-0.5">{[...Array(5)].map((_, i) => <Star key={i} size={16} className="fill-[#D97706] text-[#D97706]" />)}</div>
                <span className="text-sm text-[#57534E]"><strong className="text-[#1C1917]">4.9</strong> from <strong className="text-[#1C1917]">2,400+</strong> reviews</span>
              </div>
            </FadeUp>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left: Product Images */}
            <FadeUp delay={0.05} className="lg:sticky lg:top-20 lg:self-start lg:-mt-6">
              <div className="relative rounded-2xl overflow-hidden aspect-square bg-stone-50 touch-pan-y"
                onTouchStart={(e) => { const t = e.touches[0]; (e.currentTarget as any)._sx = t.clientX; (e.currentTarget as any)._sy = t.clientY; }}
                onTouchEnd={(e) => {
                  const sx = (e.currentTarget as any)._sx, sy = (e.currentTarget as any)._sy;
                  if (sx == null) return;
                  const t = e.changedTouches[0], dx = t.clientX - sx, dy = t.clientY - sy;
                  const imgs = [IMAGES.hero, IMAGES.lifestyle, IMAGES.stir, IMAGES.gutbrain, IMAGES.comparison];
                  if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.5) {
                    if (dx < 0 && selectedImage < imgs.length - 1) setSelectedImage(selectedImage + 1);
                    else if (dx > 0 && selectedImage > 0) setSelectedImage(selectedImage - 1);
                  }
                }}
              >
                <motion.img key={selectedImage} src={[IMAGES.hero, IMAGES.lifestyle, IMAGES.stir, IMAGES.gutbrain, IMAGES.comparison][selectedImage]} alt="BrewNectar Stick Pack" className="w-full h-full object-cover" initial={{ opacity: 0.6, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25, ease: "easeOut" }} />
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 lg:hidden">
                  {[IMAGES.hero, IMAGES.lifestyle, IMAGES.stir, IMAGES.gutbrain, IMAGES.comparison].map((_, i) => (
                    <button key={i} onClick={() => setSelectedImage(i)} className={`rounded-full transition-all ${selectedImage === i ? "w-5 h-2 bg-[#B45309]" : "w-2 h-2 bg-white/70 hover:bg-white"}`} />
                  ))}
                </div>
                {/* Desktop-only arrows */}
                <button onClick={() => setSelectedImage((selectedImage - 1 + 5) % 5)} className="hidden lg:flex absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-md items-center justify-center hover:bg-white hover:scale-105 transition-all">
                  <ChevronLeft size={20} className="text-[#1C1917]" />
                </button>
                <button onClick={() => setSelectedImage((selectedImage + 1) % 5)} className="hidden lg:flex absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-md items-center justify-center hover:bg-white hover:scale-105 transition-all">
                  <ChevronRight size={20} className="text-[#1C1917]" />
                </button>
              </div>
              <div className="grid grid-cols-5 gap-2 mt-3">
                {[IMAGES.hero, IMAGES.lifestyle, IMAGES.stir, IMAGES.gutbrain, IMAGES.comparison].map((img, i) => (
                  <button key={i} onClick={() => setSelectedImage(i)} className={`rounded-xl overflow-hidden aspect-square border-2 transition-all ${selectedImage === i ? "border-[#B45309] ring-2 ring-amber-200" : "border-stone-200 hover:border-stone-300"}`}>
                    <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
                  </button>
                ))}
              </div>
              <div className="hidden lg:flex items-center justify-center gap-6 mt-4">
                {[{ icon: ShieldCheck, label: "60-Day Guarantee" }, { icon: Truck, label: "Free Shipping" }, { icon: RotateCcw, label: "Cancel Anytime" }].map((badge) => (
                  <div key={badge.label} className="flex items-center gap-1.5 text-[#78716C]"><badge.icon size={14} className="text-[#D97706]" /><span className="text-xs">{badge.label}</span></div>
                ))}
              </div>
              {/* PDP Info Dropdowns */}
              <PdpInfoAccordion
                className="hidden lg:block mt-4"
                openId={openPdpInfo}
                onToggle={(id) => setOpenPdpInfo(openPdpInfo === id ? null : id)}
              />
            </FadeUp>

            {/* Right: Plan Selector */}
            <FadeUp delay={0.1}>
              <div>
                <h1 className="hidden lg:block font-display text-2xl sm:text-3xl lg:text-4xl font-bold leading-[1.15] tracking-tight text-[#1C1917] mb-2">Stay Focused &amp; Clear with BrewNectar Stick Packs</h1>
                <div className="hidden lg:flex flex-wrap items-center gap-3 mb-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/60 text-[11px] font-semibold text-emerald-700"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />Best Seller</span>
                  <div className="flex -space-x-0.5">{[...Array(5)].map((_, i) => <Star key={i} size={16} className="fill-[#D97706] text-[#D97706]" />)}</div>
                  <span className="text-sm text-[#57534E]"><strong className="text-[#1C1917]">4.9</strong> from <strong className="text-[#1C1917]">2,400+</strong> reviews</span>
                </div>
                <p className="text-[#57534E] text-base mb-5 leading-relaxed hidden lg:block">Eight research-backed ingredients + prebiotics in one caffeine-free stick pack. Add it to the coffee you already drink. <strong className="text-[#1C1917]">Brain + gut support that compounds over time.</strong></p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {[
                    { label: "Caffeine-Free", emoji: "\u2615", bg: "bg-amber-100 text-amber-800" },
                    { label: "No Earthy Taste", emoji: "\ud83d\ude4c", bg: "bg-rose-100 text-rose-800" },
                    { label: "Sugar Free", emoji: "\u2728", bg: "bg-emerald-100 text-emerald-800" },
                    { label: "Nut-Free", emoji: "\ud83c\udf31", bg: "bg-lime-100 text-lime-800" },
                    { label: "Vegan", emoji: "\ud83e\udd66", bg: "bg-teal-100 text-teal-800" },
                    { label: "Made in USA", emoji: "\ud83c\uddfa\ud83c\uddf8", bg: "bg-sky-100 text-sky-800" },
                  ].map((pill) => (
                    <span key={pill.label} className={`hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${pill.bg}`}><span className="text-sm">{pill.emoji}</span>{pill.label}</span>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-5 p-3 rounded-xl bg-emerald-50/80 border border-emerald-200/60">
                  <div className="flex items-center gap-2"><span className="relative flex h-2.5 w-2.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" /><span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" /></span><span className="text-sm font-semibold text-emerald-800">In Stock</span></div>
                  <span className="hidden sm:inline text-emerald-600">|</span>
                  <span className="w-full sm:w-auto border-t border-emerald-200/70 pt-2 sm:border-t-0 sm:pt-0 text-sm text-emerald-700">Order now and ships by: <strong className="whitespace-nowrap text-emerald-900">{shipByDate}</strong></span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-bold text-lg text-[#1C1917]">Select Your Plan:</h3>
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60">Subscribe & Save up to 45%</span>
                </div>

                <div className="space-y-3 mb-4" id="offers">
                  {PLANS.filter(p => p.id !== "one-time").map((plan) => {
                    const isSelected = selectedPlan === plan.id;
                    return (
                      <button key={plan.id} onClick={() => setSelectedPlan(plan.id)} className={`w-full text-left rounded-2xl border-2 transition-all duration-200 relative overflow-hidden ${isSelected ? "border-[#B45309] bg-white shadow-warm" : "border-stone-200 bg-white hover:border-stone-300"}`}>
                        {plan.badge && <span className={`absolute -top-0 right-0 px-3 py-1 ${plan.badge === "BEST VALUE" ? "bg-[#B45309]" : "bg-emerald-600"} text-white text-[10px] font-bold rounded-bl-xl uppercase tracking-wide`}>{plan.badge}</span>}
                        <div className={`flex items-center justify-between gap-3 p-4 md:p-5 ${plan.badge ? "pt-7 md:pt-5" : ""}`}>
                          <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${isSelected ? "border-[#B45309]" : "border-stone-300"}`}>{isSelected && <div className="w-2.5 h-2.5 rounded-full bg-[#B45309]" />}</div>
                            <div>
                              <div className="flex items-center gap-2 flex-wrap"><h3 className="font-display font-bold text-base text-[#1C1917]">{plan.name}</h3><span className="text-sm font-semibold text-emerald-600">({plan.savings})</span></div>
                              <p className="text-xs text-[#78716C] mt-0.5">{plan.billed}</p>
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <div className="flex items-baseline gap-1 justify-end"><span className="font-display text-xl sm:text-2xl font-bold text-[#1C1917]">{plan.price}</span><span className="text-sm text-[#57534E] font-medium">/mo</span></div>
                            <p className="text-[11px] text-[#78716C]">{plan.perDay}</p>
                          </div>
                        </div>
                        <AnimatePresence initial={false}>
                          {isSelected && plan.perks.length > 0 && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                              <div className="px-4 md:px-5 pb-4 md:pb-5 pt-0 border-t border-stone-100"><div className="pt-3 space-y-1.5">{plan.perks.map((perk) => (<div key={perk} className="flex items-center gap-2"><Check size={16} strokeWidth={3} className="text-emerald-600 flex-shrink-0" /><span className="text-xs text-[#44403C]">{perk}</span></div>))}</div></div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </button>
                    );
                  })}
                </div>

                <div className="mb-5">
                  <div className="flex items-center gap-2 mb-3"><Gift size={16} className="text-[#B45309]" /><span className="text-sm font-bold text-[#1C1917]">Free gifts with your order</span></div>
                  <div className="flex gap-3">
                    <div className={`flex-1 relative rounded-xl border-2 p-3 text-left ${selectedPlan !== "one-time" ? "border-[#B45309]/30 bg-amber-50/60" : "border-stone-200 bg-stone-50 opacity-60"}`}>
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${selectedPlan !== "one-time" ? "bg-[#B45309]/10" : "bg-stone-200"}`}><GraduationCap size={16} className={selectedPlan !== "one-time" ? "text-[#B45309]" : "text-stone-400"} /></div>
                      <p className="text-xs font-bold text-[#1C1917] leading-tight">Focus & Clarity Masterclass</p>
                      <div className="flex items-center gap-1 mt-1"><span className="text-[10px] text-stone-400 line-through">$25</span><span className={`text-[10px] font-bold ${selectedPlan !== "one-time" ? "text-emerald-600" : "text-stone-400"}`}>FREE</span></div>
                      {selectedPlan !== "one-time" && <div className="absolute -top-1.5 -left-1.5"><div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center"><Check size={10} strokeWidth={3} className="text-white" /></div></div>}
                    </div>
                    <div onClick={() => { if (selectedPlan !== "3mo" && selectedPlan !== "2mo") setSelectedPlan("2mo"); }} className={`flex-1 relative rounded-xl border-2 p-3 text-left cursor-pointer ${selectedPlan === "3mo" || selectedPlan === "2mo" ? "border-[#B45309]/30 bg-amber-50/60" : "border-stone-200 bg-stone-50 opacity-60 hover:opacity-80 hover:border-stone-300"}`}>
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${selectedPlan === "3mo" || selectedPlan === "2mo" ? "bg-[#B45309]/10" : "bg-stone-200"}`}><Trophy size={16} className={selectedPlan === "3mo" || selectedPlan === "2mo" ? "text-[#B45309]" : "text-stone-400"} /></div>
                      <p className="text-xs font-bold text-[#1C1917] leading-tight">La Marzocco Espresso Machine ($4500) Giveaway</p>
                      <div className="flex items-center gap-1 mt-1"><span className="text-[10px] text-stone-400">2+ supplies</span><span className={`text-[10px] font-bold ${selectedPlan === "3mo" || selectedPlan === "2mo" ? "text-emerald-600" : "text-stone-400"}`}>{selectedPlan === "3mo" || selectedPlan === "2mo" ? "ENTERED" : "LOCKED"}</span></div>
                      {(selectedPlan === "3mo" || selectedPlan === "2mo") && <div className="absolute -top-1.5 -left-1.5"><div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center"><Check size={10} strokeWidth={3} className="text-white" /></div></div>}
                    </div>
                  </div>
                </div>

                <div className="text-center mb-5"><button onClick={() => setSelectedPlan("one-time")} className={`text-sm font-medium underline decoration-dotted underline-offset-4 transition-colors ${selectedPlan === "one-time" ? "text-[#B45309] font-semibold" : "text-[#78716C] hover:text-[#B45309]"}`}>One Time Purchase $49</button></div>

                <button className="group relative w-full py-4 rounded-full text-base font-bold text-white overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgba(180,83,9,0.4)] hover:scale-[1.02] active:scale-[0.98] bg-gradient-to-r from-[#B45309] via-[#D97706] to-[#B45309] bg-[length:200%_100%] animate-shimmer">
                  <span className="relative z-10 flex items-center justify-center gap-2 uppercase tracking-wide">{selectedPlan === "one-time" ? "BUY NOW" : "START NOW"} {"\u2022"} {currentPlan.price}{selectedPlan !== "one-time" && "/MO"}<ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></span>
                </button>

                <div className="mt-4 space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-stone-50 border border-stone-200"><ShieldCheck size={20} className="text-emerald-600 flex-shrink-0" /><div><p className="text-xs font-bold text-[#1C1917]">60-Day Keep-the-Bag Guarantee</p><p className="text-[11px] text-[#78716C]">Don't love it? Keep the bag. Full refund, no questions.</p></div></div>
                  <div className="flex items-center justify-between px-1"><div className="flex items-center gap-2"><Truck size={14} className="text-[#78716C]" /><span className="text-xs text-[#57534E]">Free shipping</span></div><div className="flex items-center gap-2"><RotateCcw size={14} className="text-[#78716C]" /><span className="text-xs text-[#57534E]">Cancel anytime</span></div></div>
                  {/* PDP Info Dropdowns - mobile only */}
                  <PdpInfoAccordion
                    className="lg:hidden mt-2"
                    openId={openPdpInfo}
                    onToggle={(id) => setOpenPdpInfo(openPdpInfo === id ? null : id)}
                  />
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
      {/* === SECTION 2: PROBLEM AGITATION (condensed) === */}
      <section className="py-14 md:py-20 relative overflow-hidden" style={{ backgroundColor: "#FDF3E7" }}>
        <div className="absolute inset-0 pointer-events-none"><img src={IMAGES.soundFamiliarBackground} alt="" className="w-full h-full object-cover opacity-80" /></div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
          <FadeUp>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#D97706] mb-3 text-center">Sound familiar?</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-[#1C1917] mb-8">You're not losing your edge.<br />Your brain is running on empty.</h2>
          </FadeUp>
          <div className="space-y-4 mb-8">
            {[
              { emoji: "\ud83d\udcda", text: "Reading the same paragraph three times and still not knowing what it said." },
              { emoji: "\u23f0", text: "The 2 PM wall, where the work is still there and you aren't." },
              { emoji: "\u2615", text: "The third coffee that does nothing except make you anxious." },
            ].map((item, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#FDFBF7] border border-stone-100">
                  <span className="text-2xl">{item.emoji}</span>
                  <p className="text-[#44403C] leading-relaxed">{item.text}</p>
                </div>
              </FadeUp>
            ))}
          </div>
          <FadeUp delay={0.3}>
            <div className="p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/80 shadow-warm">
              <h3 className="font-display font-bold text-xl text-[#1C1917] mb-3">It isn't discipline.</h3>
              <p className="text-[#44403C] leading-relaxed mb-4">A brain running on broken sleep, an inflamed gut, and no raw material for its own neurotransmitters is doing exactly what it should. You can't willpower your way out of a supply problem.</p>
              <div className="space-y-2 text-sm text-[#57534E]">
                <p><strong className="text-[#1C1917]">More coffee</strong> only blocks the signal that you're tired. It never addressed why.</p>
                <p><strong className="text-[#1C1917]">Mushroom coffee</strong> asked you to give up a drink you liked and deliver nothing for eight weeks.</p>
                <p><strong className="text-[#1C1917]">Most brain supplements</strong> are underdosed and ignore sleep and gut entirely.</p>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* === SECTION 3: WHAT'S INSIDE (visual ingredient cards) === */}
      <section className="py-8 md:py-10 lg:py-12 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <FadeUp>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#D97706] mb-2 text-center">What's Inside</p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-center text-[#1C1917] mb-3">Every Ingredient Carefully Chosen.</h2>
            <p className="text-center text-[#78716C] text-sm md:text-base max-w-2xl mx-auto">Sharper focus.* Calmer energy.* Long-term brain support.* A healthier gut-brain connection.* Each ingredient targets a specific mechanism.</p>
          </FadeUp>
        </div>
        {/* Row 1 — auto-scrolls left, infinite loop */}
        <div className="overflow-hidden pb-2 pointer-events-none select-none">
          <div className="flex gap-4 animate-marquee-left w-max">
            {[...WHATS_INSIDE.slice(0, 4), ...WHATS_INSIDE.slice(0, 4), ...WHATS_INSIDE.slice(0, 4)].map((item, i) => (
              <div key={`r1-${i}`} className="w-[260px] md:w-[360px] lg:w-[420px] flex-shrink-0">
                <div className="rounded-xl overflow-hidden border border-stone-100 bg-white shadow-warm h-full">
                  <div className="relative h-28 md:h-32 lg:h-36 overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" draggable={false} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-3 flex items-center gap-2">
                      <div className={`w-7 h-7 rounded-lg ${item.color} flex items-center justify-center`}><item.icon size={14} /></div>
                      <h3 className="font-display font-bold text-sm text-white">{item.name}</h3>
                    </div>
                  </div>
                  <div className="px-3 py-2">
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-[#D97706] mb-0.5 leading-tight">{item.tag}</p>
                    <span className="inline-block px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">{item.dosage}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Row 2 — auto-scrolls right, infinite loop */}
        <div className="overflow-hidden pt-2 pointer-events-none select-none">
          <div className="flex gap-4 animate-marquee-right w-max">
            {[...WHATS_INSIDE.slice(4), ...WHATS_INSIDE.slice(4), ...WHATS_INSIDE.slice(4)].map((item, i) => (
              <div key={`r2-${i}`} className="w-[260px] md:w-[360px] lg:w-[420px] flex-shrink-0">
                <div className="rounded-xl overflow-hidden border border-stone-100 bg-white shadow-warm h-full">
                  <div className="relative h-28 md:h-32 lg:h-36 overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" draggable={false} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-3 flex items-center gap-2">
                      <div className={`w-7 h-7 rounded-lg ${item.color} flex items-center justify-center`}><item.icon size={14} /></div>
                      <h3 className="font-display font-bold text-sm text-white">{item.name}</h3>
                    </div>
                  </div>
                  <div className="px-3 py-2">
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-[#D97706] mb-0.5 leading-tight">{item.tag}</p>
                    <span className="inline-block px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">{item.dosage}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === SECTION 4: THE COMPOUNDING EFFECT === */}
      <section className="py-14 md:py-20 bg-[#FDFBF7]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#D97706] mb-3 text-center">The Compounding Effect</p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-center text-[#1C1917] mb-3">Day 1 Feels Good. Month 3 Changes Everything.</h2>
            <p className="text-center text-[#78716C] text-lg mb-10 max-w-2xl mx-auto">Most supplements give you a spike and a crash. BrewNectar compounds. Each week builds on the last.</p>
          </FadeUp>
          <div className="relative mb-4">
            <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-0.5 border-t-2 border-dashed border-[#D97706]/30" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4">
              {COMPOUNDING_STAGES.map((milestone, i) => (
                <FadeUp key={milestone.period} delay={i * 0.1}>
                  <div className="flex flex-col items-center text-center">
                    <div className={`relative z-10 w-16 h-16 rounded-full ${milestone.color} border-2 flex items-center justify-center mb-4`}>
                      <span className={`font-display font-bold text-sm ${milestone.iconColor}`}>{milestone.level}</span>
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-[#D97706] mb-2">{milestone.period}</span>
                    <div className={`${milestone.color} border rounded-2xl p-5 w-full`}>
                      <h3 className="font-display font-bold text-base text-[#1C1917] mb-2">{milestone.title}</h3>
                      <p className="text-xs text-[#57534E] leading-relaxed mb-3">{milestone.desc}</p>
                      <div className="flex flex-wrap justify-center gap-1.5">
                        {milestone.ingredients.map((ing) => (
                          <span key={ing} className="px-2.5 py-1 rounded-full bg-white/80 text-[10px] font-semibold text-[#44403C] border border-stone-100">{ing}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* === SECTION 5: COMPARISON TABLE === */}
      {/* === USER-REPORTED OUTCOMES — Red/orange gradient background with clean box === */}
      <section className="py-12 md:py-16 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #7C2D12 0%, #9A3412 25%, #C2410C 50%, #D97706 80%, #F59E0B 100%)" }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.15) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(0,0,0,0.2) 0%, transparent 40%)" }} />
        <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="border border-white/20 rounded-lg p-6 md:p-8 bg-white">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex -space-x-0.5">{[...Array(5)].map((_, i) => <Star key={i} size={16} className="fill-[#D97706] text-[#D97706]" />)}</div>
                <span className="text-sm text-[#57534E]"><strong className="text-[#1C1917]">4.9</strong> from <strong className="text-[#1C1917]">2,400+</strong> reviews</span>
              </div>
              <h3 className="font-display font-bold text-base md:text-lg text-[#1C1917] mb-5">User-Reported Outcomes</h3>
              <div className="grid grid-cols-3 gap-4 md:gap-6">
                <div>
                  <p className="font-display text-3xl md:text-4xl font-bold text-[#1C1917]">87%<span className="text-base align-super text-[#A8A29E]">*</span></p>
                  <p className="text-xs md:text-sm text-[#57534E] mt-1 leading-snug">reported improved focus within the first week</p>
                </div>
                <div>
                  <p className="font-display text-3xl md:text-4xl font-bold text-[#1C1917]">92%<span className="text-base align-super text-[#A8A29E]">*</span></p>
                  <p className="text-xs md:text-sm text-[#57534E] mt-1 leading-snug">noticed reduced afternoon fatigue by week 2</p>
                </div>
                <div>
                  <p className="font-display text-3xl md:text-4xl font-bold text-[#1C1917]">94%<span className="text-base align-super text-[#A8A29E]">*</span></p>
                  <p className="text-xs md:text-sm text-[#57534E] mt-1 leading-snug">said it dissolved completely without changing their coffee's taste</p>
                </div>
              </div>
              <p className="text-[10px] text-[#A8A29E] mt-5">*Based on internal customer surveys, individual results may vary.</p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* === SECTION 5: COMPARISON TABLE === */}
      <section className="py-14 md:py-20 bg-[#FDFBF7]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-[#1C1917] mb-2 text-center">
              BrewNectar vs. Mushroom Coffee
            </h2>
            <p className="text-sm md:text-base text-[#57534E] mb-7 text-center">
              See how a research-backed stick pack compares to typical mushroom coffee.
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="rounded-2xl border border-stone-200 bg-white overflow-hidden shadow-sm relative">
              {/* Orange column background — continuous, no gaps */}
              <div className="absolute top-0 bottom-0 right-[80px] md:right-[100px] w-[80px] md:w-[100px] bg-[#D97706]/10" />

              {/* Header */}
              <div className="relative grid grid-cols-[1fr_80px_80px] md:grid-cols-[1fr_100px_100px]">
                <div className="px-5 py-4" />
                <div className="flex items-center justify-center py-3.5 px-1 bg-gradient-to-b from-amber-500 to-[#D97706] rounded-t-2xl text-center">
                  <span className="text-[11px] md:text-xs font-bold text-white tracking-wide leading-tight">BrewNectar</span>
                </div>
                <div className="flex items-center justify-center py-3.5 px-1 text-center">
                  <span className="text-[11px] md:text-xs font-medium text-stone-400 leading-tight">Mushroom<br/>Coffee</span>
                </div>
              </div>

              {/* Rows */}
              {COMPARISON_ROWS.map((row, i, arr) => (
                <div key={row.feature} className={`relative grid grid-cols-[1fr_80px_80px] md:grid-cols-[1fr_100px_100px] items-center ${i < arr.length - 1 ? "border-b border-stone-100" : ""}`}>
                  <span className={`text-[13px] md:text-sm px-5 py-3.5 ${row.highlight ? "font-bold text-gradient-warm" : "font-medium text-[#1C1917]"}`}>{row.feature}</span>
                  <div className="flex justify-center py-3.5">
                    {row.brew ? (
                      <div className="w-7 h-7 rounded-full bg-[#D97706] flex items-center justify-center shadow-sm">
                        <Check size={14} strokeWidth={3} className="text-white" />
                      </div>
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-stone-100 flex items-center justify-center">
                        <XIcon size={12} strokeWidth={2.5} className="text-stone-400" />
                      </div>
                    )}
                  </div>
                  <div className="flex justify-center py-3.5">
                    {row.other ? (
                      <div className="w-7 h-7 rounded-full bg-[#D97706] flex items-center justify-center shadow-sm">
                        <Check size={14} strokeWidth={3} className="text-white" />
                      </div>
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-stone-100 flex items-center justify-center">
                        <XIcon size={12} strokeWidth={2.5} className="text-stone-400" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>

        </div>
      </section>



      {/* === SECTION 7: GUARANTEE === */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="relative rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800" />
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.3) 0%, transparent 50%)" }} />
              <div className="relative p-8 md:p-12 text-center">
                <div className="w-20 h-20 rounded-full bg-white/15 border-2 border-white/30 flex items-center justify-center mx-auto mb-6">
                  <ShieldCheck size={40} className="text-white" />
                </div>
                <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3">60-Day Keep-the-Bag Guarantee</h2>
                <p className="text-emerald-100 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-8">Don't love it? <strong className="text-white">Keep the bag. Full refund within 48 hours.</strong> No restocking fees, no questions asked. We believe in BrewNectar so much, we'll take all the risk.</p>
                <div className="grid grid-cols-3 gap-3 md:gap-10 max-w-xl mx-auto">
                  {[
                    { icon: Heart, label: "Keep the Bag" },
                    { icon: Clock, label: "48-Hour Refund" },
                    { icon: MessageCircle, label: "No Questions Asked" },
                  ].map((item) => (
                    <div key={item.label} className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center"><item.icon size={22} className="text-white" /></div>
                      <span className="text-xs font-semibold text-emerald-100">{item.label}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <a href="#offers" className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-bold text-emerald-800 rounded-full bg-white hover:bg-emerald-50 transition-colors" onClick={(e) => { e.preventDefault(); document.getElementById('offers')?.scrollIntoView({ behavior: 'smooth' }); }}>Try It Risk-Free<ArrowRight size={16} /></a>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
      {/* === DUPLICATE OFFER BLOCK (full PDP copy above FAQ) === */}
      <section className="pt-10 md:pt-14 pb-8 md:pb-10 bg-[#FDFBF7]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="text-center mb-8">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-[#1C1917] mb-2">Ready to Upgrade Your Coffee?</h2>
              <p className="text-[#57534E] text-sm md:text-base">Choose your plan and start your smarter morning.</p>
            </div>
          </FadeUp>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left: Product Images (sticky on desktop) */}
            <FadeUp delay={0.05} className="lg:sticky lg:top-20 lg:self-start lg:-mt-6">
              <div className="relative rounded-2xl overflow-hidden aspect-square bg-stone-50 touch-pan-y"
                onTouchStart={(e) => { const t = e.touches[0]; (e.currentTarget as any)._sx = t.clientX; (e.currentTarget as any)._sy = t.clientY; }}
                onTouchEnd={(e) => {
                  const sx = (e.currentTarget as any)._sx, sy = (e.currentTarget as any)._sy;
                  if (sx == null) return;
                  const t = e.changedTouches[0], dx = t.clientX - sx, dy = t.clientY - sy;
                  const imgs = [IMAGES.hero, IMAGES.lifestyle, IMAGES.stir, IMAGES.gutbrain, IMAGES.comparison];
                  if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.5) {
                    if (dx < 0 && selectedImage2 < imgs.length - 1) setSelectedImage2(selectedImage2 + 1);
                    else if (dx > 0 && selectedImage2 > 0) setSelectedImage2(selectedImage2 - 1);
                  }
                }}
              >
                <motion.img key={`dup-${selectedImage2}`} src={[IMAGES.hero, IMAGES.lifestyle, IMAGES.stir, IMAGES.gutbrain, IMAGES.comparison][selectedImage2]} alt="BrewNectar Stick Pack" className="w-full h-full object-cover" initial={{ opacity: 0.6, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25, ease: "easeOut" }} />
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 lg:hidden">
                  {[IMAGES.hero, IMAGES.lifestyle, IMAGES.stir, IMAGES.gutbrain, IMAGES.comparison].map((_, i) => (
                    <button key={i} onClick={() => setSelectedImage2(i)} className={`rounded-full transition-all ${selectedImage2 === i ? "w-5 h-2 bg-[#B45309]" : "w-2 h-2 bg-white/70 hover:bg-white"}`} />
                  ))}
                </div>
                {/* Desktop-only arrows */}
                <button onClick={() => setSelectedImage2((selectedImage2 - 1 + 5) % 5)} className="hidden lg:flex absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-md items-center justify-center hover:bg-white hover:scale-105 transition-all">
                  <ChevronLeft size={20} className="text-[#1C1917]" />
                </button>
                <button onClick={() => setSelectedImage2((selectedImage2 + 1) % 5)} className="hidden lg:flex absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-md items-center justify-center hover:bg-white hover:scale-105 transition-all">
                  <ChevronRight size={20} className="text-[#1C1917]" />
                </button>
              </div>
              <div className="grid grid-cols-5 gap-2 mt-3">
                {[IMAGES.hero, IMAGES.lifestyle, IMAGES.stir, IMAGES.gutbrain, IMAGES.comparison].map((img, i) => (
                  <button key={i} onClick={() => setSelectedImage2(i)} className={`rounded-xl overflow-hidden aspect-square border-2 transition-all ${selectedImage2 === i ? "border-[#B45309] ring-2 ring-amber-200" : "border-stone-200 hover:border-stone-300"}`}>
                    <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
                  </button>
                ))}
              </div>
              {/* PDP Info Dropdowns */}
              <PdpInfoAccordion
                className="hidden lg:block mt-4"
                openId={openPdpInfo}
                onToggle={(id) => setOpenPdpInfo(openPdpInfo === id ? null : id)}
              />
            </FadeUp>

            {/* Right: Plan Selector */}
            <FadeUp delay={0.1}>
              <div>
                <h3 className="font-display text-xl md:text-2xl font-bold text-[#1C1917] mb-2">Stay Focused &amp; Clear with BrewNectar Stick Packs</h3>
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <div className="flex -space-x-0.5">{[...Array(5)].map((_, i) => <Star key={i} size={16} className="fill-[#D97706] text-[#D97706]" />)}</div>
                  <span className="text-sm text-[#57534E]"><strong className="text-[#1C1917]">4.9</strong> from <strong className="text-[#1C1917]">2,400+</strong> reviews</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-5 p-3 rounded-xl bg-emerald-50/80 border border-emerald-200/60">
                  <div className="flex items-center gap-2"><span className="relative flex h-2.5 w-2.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" /><span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" /></span><span className="text-sm font-semibold text-emerald-800">In Stock</span></div>
                  <span className="hidden sm:inline text-emerald-600">|</span>
                  <span className="w-full sm:w-auto border-t border-emerald-200/70 pt-2 sm:border-t-0 sm:pt-0 text-sm text-emerald-700">Order now and ships by: <strong className="whitespace-nowrap text-emerald-900">{shipByDate}</strong></span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-display font-bold text-lg text-[#1C1917]">Select Your Plan:</h4>
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60">Subscribe & Save up to 45%</span>
                </div>

                <div className="space-y-3 mb-4">
                  {PLANS.filter(p => p.id !== "one-time").map((plan) => {
                    const isSelected = selectedPlan === plan.id;
                    return (
                      <button key={plan.id} onClick={() => setSelectedPlan(plan.id)} className={`w-full text-left rounded-2xl border-2 transition-all duration-200 relative overflow-hidden ${isSelected ? "border-[#B45309] bg-white shadow-warm" : "border-stone-200 bg-white hover:border-stone-300"}`}>
                        {plan.badge && <span className={`absolute -top-0 right-0 px-3 py-1 ${plan.badge === "BEST VALUE" ? "bg-[#B45309]" : "bg-emerald-600"} text-white text-[10px] font-bold rounded-bl-xl uppercase tracking-wide`}>{plan.badge}</span>}
                        <div className={`flex items-center justify-between gap-3 p-4 md:p-5 ${plan.badge ? "pt-7 md:pt-5" : ""}`}>
                          <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${isSelected ? "border-[#B45309]" : "border-stone-300"}`}>{isSelected && <div className="w-2.5 h-2.5 rounded-full bg-[#B45309]" />}</div>
                            <div>
                              <div className="flex items-center gap-2 flex-wrap"><span className="font-display font-bold text-base text-[#1C1917]">{plan.name}</span><span className="text-sm font-semibold text-emerald-600">({plan.savings})</span></div>
                              <p className="text-xs text-[#78716C] mt-0.5">{plan.billed}</p>
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <div className="flex items-baseline gap-1 justify-end"><span className="font-display text-xl sm:text-2xl font-bold text-[#1C1917]">{plan.price}</span><span className="text-sm text-[#57534E] font-medium">/mo</span></div>
                            <p className="text-[11px] text-[#78716C]">{plan.perDay}</p>
                          </div>
                        </div>
                        <AnimatePresence initial={false}>
                          {isSelected && plan.perks.length > 0 && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                              <div className="px-4 md:px-5 pb-4 md:pb-5 pt-0 border-t border-stone-100"><div className="pt-3 space-y-1.5">{plan.perks.map((perk) => (<div key={perk} className="flex items-center gap-2"><Check size={16} strokeWidth={3} className="text-emerald-600 flex-shrink-0" /><span className="text-xs text-[#44403C]">{perk}</span></div>))}</div></div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </button>
                    );
                  })}
                </div>

                <div className="mb-5">
                  <div className="flex items-center gap-2 mb-3"><Gift size={16} className="text-[#B45309]" /><span className="text-sm font-bold text-[#1C1917]">Free gifts with your order</span></div>
                  <div className="flex gap-3">
                    <div className={`flex-1 relative rounded-xl border-2 p-3 text-left ${selectedPlan !== "one-time" ? "border-[#B45309]/30 bg-amber-50/60" : "border-stone-200 bg-stone-50 opacity-60"}`}>
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${selectedPlan !== "one-time" ? "bg-[#B45309]/10" : "bg-stone-200"}`}><GraduationCap size={16} className={selectedPlan !== "one-time" ? "text-[#B45309]" : "text-stone-400"} /></div>
                      <p className="text-xs font-bold text-[#1C1917] leading-tight">Focus & Clarity Masterclass</p>
                      <div className="flex items-center gap-1 mt-1"><span className="text-[10px] text-stone-400 line-through">$25</span><span className={`text-[10px] font-bold ${selectedPlan !== "one-time" ? "text-emerald-600" : "text-stone-400"}`}>FREE</span></div>
                      {selectedPlan !== "one-time" && <div className="absolute -top-1.5 -left-1.5"><div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center"><Check size={10} strokeWidth={3} className="text-white" /></div></div>}
                    </div>
                    <div onClick={() => { if (selectedPlan !== "3mo" && selectedPlan !== "2mo") setSelectedPlan("2mo"); }} className={`flex-1 relative rounded-xl border-2 p-3 text-left cursor-pointer ${selectedPlan === "3mo" || selectedPlan === "2mo" ? "border-[#B45309]/30 bg-amber-50/60" : "border-stone-200 bg-stone-50 opacity-60 hover:opacity-80 hover:border-stone-300"}`}>
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${selectedPlan === "3mo" || selectedPlan === "2mo" ? "bg-[#B45309]/10" : "bg-stone-200"}`}><Trophy size={16} className={selectedPlan === "3mo" || selectedPlan === "2mo" ? "text-[#B45309]" : "text-stone-400"} /></div>
                      <p className="text-xs font-bold text-[#1C1917] leading-tight">La Marzocco Espresso Machine ($4500) Giveaway</p>
                      <div className="flex items-center gap-1 mt-1"><span className="text-[10px] text-stone-400">2+ supplies</span><span className={`text-[10px] font-bold ${selectedPlan === "3mo" || selectedPlan === "2mo" ? "text-emerald-600" : "text-stone-400"}`}>{selectedPlan === "3mo" || selectedPlan === "2mo" ? "ENTERED" : "LOCKED"}</span></div>
                      {(selectedPlan === "3mo" || selectedPlan === "2mo") && <div className="absolute -top-1.5 -left-1.5"><div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center"><Check size={10} strokeWidth={3} className="text-white" /></div></div>}
                    </div>
                  </div>
                </div>

                <div className="text-center mb-5"><button onClick={() => setSelectedPlan("one-time")} className={`text-sm font-medium underline decoration-dotted underline-offset-4 transition-colors ${selectedPlan === "one-time" ? "text-[#B45309] font-semibold" : "text-[#78716C] hover:text-[#B45309]"}`}>One Time Purchase $49</button></div>

                <button className="group relative w-full py-4 rounded-full text-base font-bold text-white overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgba(180,83,9,0.4)] hover:scale-[1.02] active:scale-[0.98] bg-gradient-to-r from-[#B45309] via-[#D97706] to-[#B45309] bg-[length:200%_100%] animate-shimmer">
                  <span className="relative z-10 flex items-center justify-center gap-2 uppercase tracking-wide">{selectedPlan === "one-time" ? "BUY NOW" : "START NOW"} {"•"} {currentPlan.price}{selectedPlan !== "one-time" && "/MO"}<ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></span>
                </button>

                <div className="mt-4 space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-stone-50 border border-stone-200"><ShieldCheck size={20} className="text-emerald-600 flex-shrink-0" /><div><p className="text-xs font-bold text-[#1C1917]">60-Day Keep-the-Bag Guarantee</p><p className="text-[11px] text-[#78716C]">Don't love it? Keep the bag. Full refund, no questions.</p></div></div>
                  <div className="flex items-center justify-between px-1"><div className="flex items-center gap-2"><Truck size={14} className="text-[#78716C]" /><span className="text-xs text-[#57534E]">Free shipping</span></div><div className="flex items-center gap-2"><RotateCcw size={14} className="text-[#78716C]" /><span className="text-xs text-[#57534E]">Cancel anytime</span></div></div>
                  {/* PDP Info Dropdowns - mobile only */}
                  <PdpInfoAccordion
                    className="lg:hidden mt-2"
                    openId={openPdpInfo}
                    onToggle={(id) => setOpenPdpInfo(openPdpInfo === id ? null : id)}
                  />
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>


      {/* === REVIEWS SECTION === */}
      <section className="py-12 md:py-16 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #7C2D12 0%, #9A3412 25%, #C2410C 50%, #D97706 80%, #F59E0B 100%)" }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.15) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(0,0,0,0.2) 0%, transparent 40%)" }} />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="flex -space-x-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className="fill-yellow-300 text-yellow-300" />
                ))}
              </div>
              <span className="text-sm font-semibold text-white">4.9/5 from 2,400+ reviews</span>
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-center text-white mb-3">Real Stories From Real Customers</h2>
            <p className="text-center text-white/70 text-base mb-8 max-w-xl mx-auto">Here’s what people are saying after making BrewNectar part of their daily ritual.</p>
          </FadeUp>
          {/* Scrolling review cards */}
          <div className="relative">
            <button onClick={() => { const el = document.getElementById("stick-reviews"); el?.scrollBy({ left: -360, behavior: "smooth" }); }} className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 items-center justify-center text-white hover:bg-white/30 transition-colors" aria-label="Scroll left">
              <ChevronLeft size={20} />
            </button>
            <button onClick={() => { const el = document.getElementById("stick-reviews"); el?.scrollBy({ left: 360, behavior: "smooth" }); }} className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 items-center justify-center text-white hover:bg-white/30 transition-colors" aria-label="Scroll right">
              <ChevronRight size={20} />
            </button>
            <div id="stick-reviews" className="flex gap-5 overflow-x-auto pb-4 pt-14 snap-x snap-mandatory scrollbar-hide" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
              {STICK_REVIEWS.map((review, i) => (
                <FadeUp key={review.name} delay={i * 0.08}>
                  <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl min-w-[300px] md:min-w-[340px] snap-start flex-shrink-0 pt-16 pb-5 px-6 flex flex-col">
                    <div className="absolute -top-10 left-6">
                      <img src={review.photo} alt={review.name} className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg" />
                    </div>
                    <div className="flex gap-0.5 mb-3">
                      {[...Array(review.rating)].map((_, j) => (
                        <Star key={j} size={20} className="fill-yellow-300 text-yellow-300" />
                      ))}
                    </div>
                    <h3 className="font-display font-bold text-xl text-white mb-3 leading-tight">{review.heading}</h3>
                    <p className="text-white/80 leading-relaxed text-[15px] mb-5 flex-1 italic">{review.text}</p>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-5 h-5 rounded-full bg-emerald-400 flex items-center justify-center"><Check size={12} className="text-white" /></div>
                      <span className="font-semibold text-sm text-white">{review.name}</span>
                      <span className="text-sm text-emerald-300 font-medium">• Verified Customer</span>
                    </div>
                    <div className="bg-white/10 rounded-xl px-4 py-3 flex items-center gap-3 border border-white/15">
                      <img src={IMAGES.hero} alt="BrewNectar Stick Pack" className="w-10 h-10 rounded-lg object-cover" />
                      <div>
                        <p className="text-xs text-white/60">Purchased</p>
                        <p className="text-sm font-bold text-white/90">{review.purchased}</p>
                      </div>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* === SECTION 7: FAQ === */}
      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <FadeUp>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-[#1C1917] mb-8">Frequently Asked Questions</h2>
          </FadeUp>
          <div className="space-y-3">
            {FAQ_ITEMS.map((item, i) => (
              <FadeUp key={i} delay={i * 0.05}>
                <div className="rounded-2xl border border-stone-100 overflow-hidden bg-[#FDFBF7]">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left">
                    <span className="font-semibold text-[#1C1917] pr-4">{item.q}</span>
                    <ChevronDown size={18} className={`text-[#A8A29E] transition-transform duration-300 flex-shrink-0 ${openFaq === i ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
                        <div className="px-5 pb-5 text-sm text-[#57534E] leading-relaxed">{item.a}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* === SECTION 6: THE EVIDENCE (studies, moved below comparison) === */}
      <section className="py-14 md:py-20 bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="flex items-center justify-center gap-2 mb-3">
              <FlaskConical size={16} className="text-[#D97706]" />
              <p className="text-sm font-semibold uppercase tracking-widest text-[#D97706]">The Evidence</p>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-[#1C1917] mb-3">We Show You the Papers.</h2>
            <p className="text-center text-[#78716C] text-lg mb-10 max-w-2xl mx-auto">Every ingredient earns its place. Tap any to read the research yourself.</p>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {INGREDIENTS.map((item, i) => {
              const isExpanded = expandedIngredient === i;
              return (
                <motion.div key={item.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }}>
                  <button onClick={() => setExpandedIngredient(isExpanded ? null : i)} className={`w-full text-left p-4 md:p-5 rounded-2xl border transition-all duration-300 ${isExpanded ? `${item.color} shadow-warm ring-1 ring-current/10` : "bg-white border-stone-100 hover:border-stone-200 hover:shadow-warm"}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${isExpanded ? "bg-white/60" : item.color.split(" ")[0] + " " + item.color.split(" ").slice(-1)[0]}`}>
                        <item.icon size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className={`font-display font-bold text-sm md:text-base truncate ${isExpanded ? "" : "text-[#1C1917]"}`}>{item.name}</h3>
                      </div>
                    </div>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className={`font-display text-2xl md:text-3xl font-bold ${isExpanded ? "" : "text-[#1C1917]"}`}>{item.studyCount}</span>
                      <span className={`text-xs font-semibold uppercase tracking-wider ${isExpanded ? "opacity-70" : "text-[#A8A29E]"}`}>Studies</span>
                    </div>
                    <p className={`text-xs leading-relaxed ${isExpanded ? "opacity-80" : "text-[#78716C]"}`}>{item.tagline}</p>
                    <div className="flex items-center gap-1.5 mt-3">
                      <BookOpen size={13} className={isExpanded ? "opacity-70" : "text-[#A8A29E]"} />
                      <span className={`text-xs font-medium ${isExpanded ? "opacity-70" : "text-[#A8A29E]"}`}>{isExpanded ? "Tap to close" : "View studies"}</span>
                      <ChevronDown size={13} className={`transition-transform duration-300 ${isExpanded ? "rotate-180 opacity-70" : "text-[#A8A29E]"}`} />
                    </div>
                  </button>
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden mt-3 lg:hidden">
                        <div className="bg-white rounded-2xl border border-stone-100 shadow-warm p-4 md:p-5">
                          <div className="flex items-center gap-2 mb-2">
                            <div className={`w-2 h-2 rounded-full ${item.dotColor}`} />
                            <h4 className="font-display font-bold text-sm text-[#1C1917]">Key Studies — {item.name}</h4>
                          </div>
                          <p className="text-xs text-[#78716C] mb-4">{item.clock} &bull; <strong className="text-[#1C1917]">{item.pullStat}</strong> {item.pullLabel}</p>
                          <div className="space-y-3">
                            {item.studies.map((study, j) => (
                              <a key={j} href={study.url} target="_blank" rel="noopener noreferrer" className="group block p-4 rounded-xl border border-stone-100 hover:border-amber-200 hover:bg-amber-50/30 transition-all duration-300">
                                <div className="flex items-start justify-between gap-2 mb-2">
                                  <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#A8A29E]">
                                    <span className={`w-1.5 h-1.5 rounded-full ${item.dotColor}`} />
                                    {study.journal} &middot; {study.year}
                                  </span>
                                  <ExternalLink size={14} className="text-[#A8A29E] group-hover:text-[#D97706] transition-colors flex-shrink-0" />
                                </div>
                                <h5 className="font-display font-semibold text-xs text-[#1C1917] mb-1 leading-snug group-hover:text-[#B45309] transition-colors">{study.title}</h5>
                                <p className="text-[11px] text-[#A8A29E] mb-2">{study.authors}</p>
                                <p className="text-[11px] text-[#78716C] leading-relaxed"><span className="font-semibold text-[#44403C]">Finding:</span> {study.finding}</p>
                              </a>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
          <AnimatePresence mode="wait">
            {evidenceItem && (
              <motion.div
                key={evidenceItem.name}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="hidden lg:block mt-6"
              >
                <div className="relative overflow-hidden bg-white rounded-[28px] border border-stone-100 shadow-warm p-7 xl:p-8">
                  <div className={`absolute inset-x-0 top-0 h-1 ${evidenceItem.dotColor}`} />
                  <div className="flex items-start justify-between gap-8 mb-6">
                    <div className="flex items-start gap-4 min-w-0">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${evidenceItem.color}`}>
                        <evidenceItem.icon size={22} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#A8A29E] mb-1">Key Studies</p>
                        <h4 className="font-display text-2xl font-bold text-[#1C1917] mb-1">{evidenceItem.name}</h4>
                        <p className="text-sm text-[#78716C]">{evidenceItem.tagline}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <div className="rounded-2xl bg-stone-50 border border-stone-100 px-4 py-3 text-right">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#A8A29E] mb-0.5">Time Horizon</p>
                        <p className="text-sm font-semibold text-[#44403C]">{evidenceItem.clock}</p>
                      </div>
                      <div className={`rounded-2xl border px-4 py-3 ${evidenceItem.color}`}>
                        <p className="font-display text-xl font-bold leading-none mb-1">{evidenceItem.pullStat}</p>
                        <p className="text-[11px] leading-snug max-w-[180px] opacity-80">{evidenceItem.pullLabel}</p>
                      </div>
                    </div>
                  </div>
                  <div className={`grid gap-4 ${evidenceItem.studies.length === 1 ? "grid-cols-1 max-w-2xl mx-auto" : evidenceItem.studies.length === 2 ? "grid-cols-2 max-w-5xl mx-auto" : "grid-cols-3"}`}>
                    {evidenceItem.studies.map((study, j) => (
                      <a key={j} href={study.url} target="_blank" rel="noopener noreferrer" className="group flex h-full flex-col p-5 rounded-2xl border border-stone-100 bg-[#FDFBF7]/60 hover:border-amber-200 hover:bg-amber-50/40 hover:-translate-y-0.5 transition-all duration-300">
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#A8A29E]">
                            <span className={`w-1.5 h-1.5 rounded-full ${evidenceItem.dotColor}`} />
                            {study.journal} &middot; {study.year}
                          </span>
                          <ExternalLink size={14} className="text-[#A8A29E] group-hover:text-[#D97706] transition-colors flex-shrink-0" />
                        </div>
                        <h5 className="font-display font-semibold text-base text-[#1C1917] mb-1.5 leading-snug group-hover:text-[#B45309] transition-colors">{study.title}</h5>
                        <p className="text-xs text-[#A8A29E] mb-3">{study.authors}</p>
                        <p className="text-xs text-[#78716C] leading-relaxed mt-auto"><span className="font-semibold text-[#44403C]">Finding:</span> {study.finding}</p>
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* === SECTION 8: FINAL CTA === */}
      <section className="py-14 md:py-20 bg-gradient-to-br from-[#1C1917] to-[#292524]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <FadeUp>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">Keep your coffee. Lose the fog.</h2>
            <p className="text-stone-400 mb-8">One stick pack. Seven ingredients. Works on the first morning.</p>
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#B45309] via-[#D97706] to-[#B45309] bg-[length:200%_100%] text-white font-bold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
              Start Now <ArrowRight size={18} />
            </button>
            <p className="text-xs text-stone-500 mt-4">60-day keep-the-bag guarantee &bull; Free shipping &bull; Cancel anytime</p>
          </FadeUp>
        </div>
      </section>


      {/* Sticky mobile CTA bar */}
      <div className="h-20 lg:hidden" />
      <div
        className={`sticky-bottom-bar z-50 bg-white/95 backdrop-blur-md border-t border-stone-200 pt-3 px-4 transition-transform duration-500 lg:hidden ${
          showSticky ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-baseline gap-2">
              <p className="font-display font-bold text-[#1C1917] text-lg">{currentPlan.price}{selectedPlan !== "one-time" && "/mo"}</p>
              {selectedPlan !== "one-time" && currentPlan.savings && (
                <span className="text-xs font-bold text-emerald-600">{currentPlan.savings}</span>
              )}
            </div>
            <p className="text-[#78716C] text-xs truncate">
              {selectedPlan === "one-time" ? "One-time purchase" : `Subscribe · ${currentPlan.name}`}
            </p>
          </div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="px-6 sm:px-8 py-3 rounded-full font-display font-bold text-sm text-white hover:shadow-[0_8px_30px_rgba(180,83,9,0.4)] transition-all flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #B45309 0%, #D97706 50%, #B45309 100%)" }}
          >
            {selectedPlan === "one-time" ? "Buy Now" : "Start Now"}
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
