/*
  BrewNectar Brain + Gut Stick Pack — Product Page (Condensed)
  8 sections. Tight. Mechanism-first.
  1. Hero/Offer  2. Problem Agitation  3. Four Clocks  4. Ingredients (with studies)
  5. Comparison  6. Guarantee  7. FAQ  8. Final CTA
*/
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Star, Check, X as XIcon, ChevronDown, ArrowRight, Clock, Sparkles,
  Brain, Zap, Shield, Leaf, Coffee, Heart, ShieldCheck, Truck,
  RotateCcw, FlaskConical, ExternalLink, BookOpen,
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
  hero: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030542116/gR7c7MRQNrXJ4W4LDnTdRi/product-hero-clean-2JryfYKGcicCXzETS5MKKr.webp",
  lifestyle: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030542116/gR7c7MRQNrXJ4W4LDnTdRi/lifestyle-pour-bright-Gx24uHuFzUnhzZ4wLHqXvY.webp",
  stir: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030542116/gR7c7MRQNrXJ4W4LDnTdRi/how-stir-3pNJBKzkQVwxqm57DvYdyL.webp",
  lockin: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030542116/gR7c7MRQNrXJ4W4LDnTdRi/how-lockin-BGjMpAAVV2Cfd7diTUnZWZ.webp",
};

/* --- What's Inside visual cards --- */
const WHATS_INSIDE = [
  { name: "Citicoline", dosage: "500 mg", tag: "Retrieve Names, Numbers, and Ideas On Demand*", science: "The only patented form of citicoline with 20+ clinical trials on focus and working memory. Brain ATP increased by 14% after just 6 weeks at this exact dose.", icon: Zap, color: "bg-emerald-50 text-emerald-700", image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030542116/gR7c7MRQNrXJ4W4LDnTdRi/ingredient-cognizin_3fb446ba.png" },
  { name: "L-Theanine", dosage: "200 mg", tag: "Calm Focus Without the Jitters*", science: "Promotes alpha brain wave activity \u2014 the neurological state behind calm, sustained attention. At 200 mg, paired with your own caffeine for clean, quiet focus.", icon: Sparkles, color: "bg-sky-50 text-sky-700", image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030542116/gR7c7MRQNrXJ4W4LDnTdRi/ingredient-l-theanine_dc3b4af3.png" },
  { name: "Lion\u2019s Mane", dosage: "500 mg (10:1)", tag: "Your Brain Builds New Connections*", science: "30+ peer-reviewed studies on nerve growth factor (NGF) production. At 10:1 concentration, each stick delivers ~5 g raw equivalent \u2014 20x a typical mushroom coffee.", icon: Brain, color: "bg-amber-50 text-[#B45309]", image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030542116/gR7c7MRQNrXJ4W4LDnTdRi/ingredient-lions-mane_c905f004.png" },
  { name: "Rhodiola Rosea", dosage: "300 mg (10:1)", tag: "The Afternoon Wall Disappears*", science: "The fastest adaptogen in the stack. Anti-fatigue benefits emerge within roughly two weeks \u2014 carrying you through the window where most nootropic customers churn.", icon: Heart, color: "bg-rose-50 text-rose-700", image: "/manus-storage/ingredient-rhodiola_4516c912.jpg" },
  { name: "Ashwagandha", dosage: "300 mg (10:1)", tag: "Better Sleep. Better Everything.*", science: "Works on the upstream cause \u2014 sleep quality. Sleep efficiency improved from 75.6% to 83.5% over 10 weeks in a published RCT. Better sleep means a sharper morning.", icon: Shield, color: "bg-purple-50 text-purple-700", image: "/manus-storage/ingredient-ashwagandha_1f7c66c5.jpg" },
  { name: "Cordyceps", dosage: "300 mg (10:1)", tag: "Sustained Physical + Mental Energy*", science: "28 healthy adults taking cordyceps for 3 weeks saw VO2max improve by 10.9% vs no change in placebo. More oxygen to the brain means more sustained output.", icon: Zap, color: "bg-orange-50 text-orange-700", image: "/manus-storage/ingredient-cordyceps_ed67f1f5.jpg" },
  { name: "Prebiotic Fiber + Probiotic", dosage: "2 g inulin + B. coagulans", tag: "A Gut That Feeds Your Brain*", science: "Bacillus coagulans survives hot coffee (92% spore survival). Inulin feeds beneficial bacteria. Together they rebuild the gut-brain axis that most nootropics ignore.", icon: Coffee, color: "bg-teal-50 text-teal-700", image: "/manus-storage/ingredient-prebiotic_a58bccad.jpg" },
  { name: "B Vitamins (B6 + B12)", dosage: "100% DV each", tag: "Steady Energy That Doesn\u2019t Crash", science: "Essential cofactors for dopamine, serotonin, and norepinephrine production. They support your brain\u2019s natural energy metabolism and neurotransmitter synthesis all day.", icon: Coffee, color: "bg-rose-50 text-rose-700", image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030542116/gR7c7MRQNrXJ4W4LDnTdRi/ingredient-b-vitamins_1072f364.png" },
];

/* --- Ingredient data with studies --- */
const INGREDIENTS = [
  {
    name: "Citicoline", dose: "500 mg", clock: "Clock 1 — First Morning",
    pullStat: "14%", pullLabel: "brain ATP increase after 6 weeks",
    icon: Brain, color: "bg-amber-50 border-amber-200/60 text-[#B45309]", dotColor: "bg-[#D97706]",
    studyCount: "20+", tagline: "Clinical trials on memory, focus & attentional performance",
    studies: [
      { title: "Citicoline Increases Brain ATP by 14%", authors: "Silveri et al.", journal: "NMR in Biomedicine", year: 2008, finding: "6 weeks of 500 mg/day citicoline increased phosphocreatine by 7% and ATP markers by 14% in the frontal lobes of healthy adults.", url: "https://pubmed.ncbi.nlm.nih.gov/18991199/" },
      { title: "Citicoline and Memory Function in Healthy Older Adults", authors: "Nakazaki et al.", journal: "The Journal of Nutrition", year: 2021, finding: "12 weeks of Cognizin supplementation improved overall memory performance, especially episodic memory.", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8349115/" },
      { title: "Improved Attentional Performance Following Citicoline", authors: "McGlade et al.", journal: "Food and Nutrition Sciences", year: 2012, finding: "Citicoline supplementation was associated with improved attentional focus and reduced errors of commission.", url: "https://www.scirp.org/journal/paperinformation?paperid=19921" },
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
  { id: "3mo", name: "3-Month Supply", savings: "Save 45%", price: "$27", perDay: "$0.96/day", billed: "Billed $81 every 12 weeks", badge: "BEST VALUE", perks: ["Exclusive Focus & Clarity Masterclass ($25 value)", "Maximum savings — lowest price per serving", "Lock in savings — price guaranteed even if we raise it", "Try it 30 days — keep the box. Full refund, no questions.", "La Marzocco Espresso Machine ($4500) Giveaway entries", "Fast & FREE Shipping", "Cancel or pause anytime"] },
  { id: "2mo", name: "2-Month Supply", savings: "Save 35%", price: "$32", perDay: "$1.14/day", billed: "Billed $64 every 8 weeks", badge: "MOST POPULAR", perks: [] },
  { id: "1mo", name: "1-Month Supply", savings: "Save 27%", price: "$36", perDay: "$1.29/day", billed: "Billed $36 every 4 weeks", badge: "", perks: [] },
];

/* --- Compounding Effect stages --- */
const COMPOUNDING_STAGES = [
  { period: "Week 1", title: "The Quiet Settles In", level: "40%", desc: "L-Theanine smooths out caffeine's rough edges within 20 minutes.* Citicoline sharpens working memory.* Your first cup feels different. Calmer. Clearer. No jitters.", ingredients: ["L-Theanine", "Citicoline"], color: "bg-amber-50 border-amber-200", iconColor: "text-[#D97706]", dotColor: "bg-[#D97706]" },
  { period: "2 Weeks", title: "The Afternoon Wall Disappears", level: "60%", desc: "Rhodiola is the fastest adaptogen in the stack. Anti-fatigue benefits emerge within roughly two weeks. This is the window where mushroom coffee customers churn \u2014 you won't.", ingredients: ["Rhodiola", "Cordyceps"], color: "bg-emerald-50 border-emerald-200", iconColor: "text-emerald-600", dotColor: "bg-emerald-600" },
  { period: "2 Months", title: "Sleep Improves. Energy Compounds.", level: "80%", desc: "Ashwagandha works on the upstream cause \u2014 sleep quality. Cordyceps lands at three weeks. The probiotic and prebiotic rebuild the gut environment that feeds your brain.", ingredients: ["Ashwagandha", "Gut Stack"], color: "bg-sky-50 border-sky-200", iconColor: "text-sky-600", dotColor: "bg-sky-600" },
  { period: "3 Months", title: "Your Brain Feels Different", level: "95%", desc: "Lion's Mane hericenones promote nerve growth factor synthesis. Human trials run 12-16 weeks. This is when the full stack is compounding \u2014 and why the 3-month supply exists.", ingredients: ["Lion's Mane", "Full Stack"], color: "bg-violet-50 border-violet-200", iconColor: "text-violet-600", dotColor: "bg-violet-600" },
];

/* --- Comparison rows --- */
const COMPARISON_ROWS: { feature: string; brew: boolean; other: boolean; brewNote?: string; otherNote?: string }[] = [
  { feature: "Keep your own coffee", brew: true, other: false, brewNote: "Add to any cup", otherNote: "Replaces it" },
  { feature: "Your full caffeine", brew: true, other: false, brewNote: "~95 mg, your cup", otherNote: "~35-50 mg" },
  { feature: "Works on day one", brew: true, other: false },
  { feature: "Lion's Mane at research dose", brew: true, other: false, brewNote: "~5 g equiv.", otherNote: "~250 mg" },
  { feature: "Clinical-dose citicoline", brew: true, other: false, brewNote: "500 mg", otherNote: "None" },
  { feature: "Supports sleep quality", brew: true, other: false },
  { feature: "Probiotic that survives hot coffee", brew: true, other: false },
  { feature: "Contains adaptogens", brew: true, other: true },
  { feature: "Research-backed nootropics", brew: true, other: true },
  { feature: "Tastes good in your cup", brew: true, other: false, brewNote: "Subtly sweet", otherNote: "Earthy, bitter" },
  { feature: "Travel-ready", brew: true, other: true },
];

/* --- FAQ --- */
const FAQ_ITEMS = [
  { q: "Do I have to give up my coffee?", a: "No. You add one stick pack to the coffee you already drink. Keep your mug, your beans, your full caffeine." },
  { q: "What does it taste like?", a: "Subtly sweet almond flavor. No mushroom taste, no earthiness. Dissolves completely in 5 seconds." },
  { q: "Doesn't hot coffee kill the probiotic?", a: "Bacillus coagulans forms a spore coat specifically evolved to survive heat. Published stability data in brewed coffee confirms 92% survival." },
  { q: "How fast will I feel it?", a: "L-Theanine and citicoline have acute effects within 40 minutes to 3 hours. Rhodiola lands at ~2 weeks. Full stack benefits compound over 8-12 weeks." },
  { q: "I've tried nootropics before and they didn't work.", a: "Most are underdosed, single-mechanism, and ignore sleep and gut. This formula addresses three upstream causes simultaneously at clinical doses." },
  { q: "Why sticks instead of the syrup?", a: "Travel-ready, precision-dosed, caffeine-free, and includes gut support (probiotic + prebiotic) that the syrup doesn't. Different formula, same philosophy." },
  { q: "Can I cancel my subscription?", a: "Yes. Cancel or pause anytime from your account dashboard. No contracts, no fees, no questions." },
  { q: "Is this safe?", a: "All ingredients are GRAS (Generally Recognized as Safe). Manufactured in a GMP-certified US facility. Consult your doctor if pregnant, nursing, or on medication." },
  { q: "Who shouldn't take this?", a: "Anyone pregnant or nursing, under 18, or taking MAOIs or blood thinners should consult their doctor first. Contains ashwagandha." },
];

/* ======= MAIN COMPONENT ======= */
export default function StickPack() {
  const [selectedPlan, setSelectedPlan] = useState("3mo");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [expandedIngredient, setExpandedIngredient] = useState<number | null>(null);
  const [expandedWhatsInside, setExpandedWhatsInside] = useState<number | null>(null);
  const currentPlan = PLANS.find(p => p.id === selectedPlan) || PLANS[0];

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <Navbar />

      {/* === SECTION 1: HERO / OFFER === */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left: Product Image */}
            <div className="lg:sticky lg:top-36">
              <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-[#FEF3C7] to-[#FDFBF7] shadow-warm-lg">
                <img src={IMAGES.hero} alt="BrewNectar Brain + Gut Stick Packs" className="w-full h-full object-cover" />
              </div>
              <div className="flex gap-3 mt-4">
                {[IMAGES.hero, IMAGES.lifestyle, IMAGES.stir, IMAGES.lockin].map((img, i) => (
                  <div key={i} className="w-20 h-20 rounded-xl overflow-hidden border-2 border-transparent hover:border-[#D97706] transition-colors cursor-pointer shadow-warm">
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center gap-6 mt-6 text-sm text-[#78716C]">
                <span className="flex items-center gap-1.5"><ShieldCheck size={16} className="text-[#D97706]" /> 30-Day Guarantee</span>
                <span className="flex items-center gap-1.5"><Truck size={16} className="text-[#D97706]" /> Free Shipping</span>
                <span className="flex items-center gap-1.5"><RotateCcw size={16} className="text-[#D97706]" /> Cancel Anytime</span>
              </div>
            </div>
            {/* Right: Offer */}
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-[#1C1917] leading-tight mb-3">BrewNectar Brain + Gut<br />Nootropic Stick Packs</h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} size={16} className={i < 4 ? "fill-[#D97706] text-[#D97706]" : "fill-[#D97706]/40 text-[#D97706]/40"} />)}</div>
                <span className="text-sm text-[#57534E]"><strong>4.3</strong> from <strong>500+</strong> reviews</span>
              </div>
              <div className="space-y-2 mb-6 p-4 rounded-2xl bg-[#FFFBEB] border border-[#FDE68A]/50">
                {["Works in the coffee you already drink", "Feel it on your first morning — not in two months", "500 mg citicoline + 200 mg L-Theanine", "Lion's Mane at ~5 g raw equivalent", "A probiotic that survives hot coffee", "Subtly sweet almond flavor — no nuts, no mushroom taste"].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5"><Check size={16} className="text-[#059669] mt-0.5 flex-shrink-0" /><span className="text-sm text-[#1C1917] leading-relaxed">{item}</span></div>
                ))}
              </div>
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
                    <button key={plan.id} onClick={() => setSelectedPlan(plan.id)} className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 ${selectedPlan === plan.id ? "border-[#D97706] bg-[#FFFBEB] shadow-warm" : "border-stone-200 hover:border-stone-300 bg-white"}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedPlan === plan.id ? "border-[#D97706]" : "border-stone-300"}`}>
                            {selectedPlan === plan.id && <div className="w-2.5 h-2.5 rounded-full bg-[#D97706]" />}
                          </div>
                          <div>
                            <span className="font-bold text-[#1C1917]">{plan.name}</span>
                            <span className="text-[#059669] font-semibold text-sm ml-2">({plan.savings})</span>
                            <p className="text-xs text-[#78716C] mt-0.5">{plan.billed}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          {plan.badge && <span className="text-[10px] font-bold uppercase bg-[#D97706] text-white px-2 py-0.5 rounded-full">{plan.badge}</span>}
                          <p className="font-display text-2xl font-bold text-[#1C1917]">{plan.price}<span className="text-sm font-normal text-[#78716C]">/mo</span></p>
                          <p className="text-xs text-[#A8A29E]">{plan.perDay}</p>
                        </div>
                      </div>
                      {selectedPlan === plan.id && plan.perks.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-amber-200/50 space-y-1.5">
                          {plan.perks.map((perk, i) => <div key={i} className="flex items-start gap-2 text-sm text-[#44403C]"><Check size={14} className="text-[#059669] mt-0.5 flex-shrink-0" />{perk}</div>)}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
              <button className="w-full text-center text-sm text-[#D97706] underline underline-offset-4 mb-4 hover:text-[#B45309]">One Time Purchase $49</button>
              <button className="w-full py-4 rounded-full bg-gradient-to-r from-[#B45309] via-[#D97706] to-[#B45309] bg-[length:200%_100%] text-white font-bold text-lg tracking-wide shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 animate-shimmer">
                START MY PLAN &bull; {currentPlan.price}/MO <ArrowRight size={18} className="inline ml-2" />
              </button>
              <div className="mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200/50 flex items-center gap-3">
                <ShieldCheck size={20} className="text-emerald-600 flex-shrink-0" />
                <div><p className="text-sm font-bold text-[#1C1917]">30-Day Keep-the-Box Guarantee</p><p className="text-xs text-[#78716C]">Don't love it? Keep the box. Full refund, no questions.</p></div>
              </div>
              <div className="flex items-center justify-between mt-4 text-xs text-[#A8A29E]">
                <span className="flex items-center gap-1"><Truck size={12} /> Free shipping</span>
                <span>&bull;</span><span>Ships within 24 hours</span><span>&bull;</span>
                <span className="flex items-center gap-1"><RotateCcw size={12} /> Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === SECTION 2: PROBLEM AGITATION (condensed) === */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <FadeUp>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#D97706] mb-3 text-center">Sound familiar?</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-[#1C1917] mb-12">You're not losing your edge.<br />Your brain is running on empty.</h2>
          </FadeUp>
          <div className="space-y-4 mb-12">
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
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#FFFBEB] to-[#FEF3C7] border border-amber-200/50">
              <h3 className="font-display font-bold text-xl text-[#1C1917] mb-3">It isn't discipline.</h3>
              <p className="text-[#44403C] leading-relaxed mb-4">A brain running on broken sleep, an inflamed gut, and no raw material for its own neurotransmitters is doing exactly what it should. You can't willpower your way out of a supply problem.</p>
              <div className="space-y-2 text-sm text-[#57534E]">
                <p><strong className="text-[#1C1917]">More coffee</strong> only blocks the signal that you're tired. It never addressed why.</p>
                <p><strong className="text-[#1C1917]">Mushroom coffee</strong> asked you to give up a drink you liked and deliver nothing for eight weeks.</p>
                <p><strong className="text-[#1C1917]">Most nootropics</strong> are underdosed and ignore sleep and gut entirely.</p>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* === SECTION 3: WHAT'S INSIDE (visual ingredient cards) === */}
      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#D97706] mb-3 text-center">What's Inside</p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-center text-[#1C1917] mb-3">Eight Ingredients. One Purpose.</h2>
            <p className="text-center text-[#78716C] text-lg mb-10 max-w-2xl mx-auto">Every ingredient is research-backed, precisely dosed, and chosen because it does something your coffee can't. Tap any to learn more.</p>
          </FadeUp>
          <div className="grid md:grid-cols-2 gap-4">
            {WHATS_INSIDE.map((item, i) => {
              const isOpen = expandedWhatsInside === i;
              return (
              <FadeUp key={item.name} delay={i * 0.05}>
                <button onClick={() => setExpandedWhatsInside(isOpen ? null : i)} className="w-full text-left rounded-xl overflow-hidden border border-stone-100 bg-white shadow-warm hover:shadow-warm-lg transition-all duration-300">
                  <div className="relative h-28 md:h-32 overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-3 flex items-center gap-2">
                      <div className={`w-7 h-7 rounded-lg ${item.color} flex items-center justify-center`}><item.icon size={14} /></div>
                      <h3 className="font-display font-bold text-base text-white">{item.name}</h3>
                    </div>
                  </div>
                  <div className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-semibold uppercase tracking-widest text-[#D97706] flex-1">{item.tag}</p>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200 whitespace-nowrap">{item.dosage}</span>
                      <ChevronDown size={14} className={`text-[#A8A29E] transition-transform duration-200 flex-shrink-0 ${isOpen ? "rotate-180" : ""}`} />
                    </div>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
                          <p className="text-xs text-[#57534E] leading-relaxed mt-2 pt-2 border-t border-stone-100">{item.science}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </button>
              </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* === SECTION 4: THE COMPOUNDING EFFECT === */}
      <section className="py-20 md:py-28 bg-[#FDFBF7]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#D97706] mb-3 text-center">The Compounding Effect</p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-center text-[#1C1917] mb-3">Day 1 Feels Good. Month 3 Changes Everything.</h2>
            <p className="text-center text-[#78716C] text-lg mb-14 max-w-2xl mx-auto">Most nootropics give you a spike and a crash. BrewNectar compounds. Each week builds on the last.</p>
          </FadeUp>
          <div className="relative mb-16">
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
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <FadeUp>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-[#1C1917] mb-12">Why BrewNectar wins.</h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="rounded-2xl border border-stone-200 overflow-hidden bg-white shadow-warm">
              <div className="grid grid-cols-[1fr_80px_80px] md:grid-cols-[1fr_120px_120px] text-center">
                <div className="p-4 text-left font-bold text-sm text-[#78716C]">Feature</div>
                <div className="p-4 font-bold text-sm text-[#B45309] bg-amber-50">BrewNectar</div>
                <div className="p-4 font-bold text-sm text-[#78716C]">Others</div>
              </div>
              {COMPARISON_ROWS.map((row, i) => (
                <div key={i} className={`grid grid-cols-[1fr_80px_80px] md:grid-cols-[1fr_120px_120px] text-center border-t border-stone-100 ${i % 2 === 0 ? "" : "bg-stone-50/50"}`}>
                  <div className="p-3 md:p-4 text-left text-sm text-[#44403C]">{row.feature}</div>
                  <div className="p-3 md:p-4 flex items-center justify-center bg-amber-50/50"><Check size={18} className="text-[#059669]" /></div>
                  <div className="p-3 md:p-4 flex items-center justify-center">{row.other ? <Check size={18} className="text-[#059669]" /> : <XIcon size={18} className="text-red-400" />}</div>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* === SECTION 6: THE EVIDENCE (studies, moved below comparison) === */}
      <section className="py-20 md:py-28 bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="flex items-center justify-center gap-2 mb-3">
              <FlaskConical size={16} className="text-[#D97706]" />
              <p className="text-sm font-semibold uppercase tracking-widest text-[#D97706]">The Evidence</p>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-[#1C1917] mb-3">We Show You the Papers.</h2>
            <p className="text-center text-[#78716C] text-lg mb-14 max-w-2xl mx-auto">Every ingredient earns its place. Tap any to read the research yourself.</p>
          </FadeUp>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
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
                        <p className="text-xs text-[#A8A29E] font-semibold">{item.dose}</p>
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
                </motion.div>
              );
            })}
          </div>
          <AnimatePresence mode="wait">
            {expandedIngredient !== null && (
              <motion.div key={expandedIngredient} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
                <div className="bg-white rounded-2xl border border-stone-100 shadow-warm p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-2 h-2 rounded-full ${INGREDIENTS[expandedIngredient].dotColor}`} />
                    <h3 className="font-display font-bold text-lg text-[#1C1917]">Key Studies — {INGREDIENTS[expandedIngredient].name}</h3>
                  </div>
                  <p className="text-sm text-[#78716C] mb-6">{INGREDIENTS[expandedIngredient].clock} &bull; Pull-stat: <strong className="text-[#1C1917]">{INGREDIENTS[expandedIngredient].pullStat}</strong> {INGREDIENTS[expandedIngredient].pullLabel}</p>
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                    {INGREDIENTS[expandedIngredient].studies.map((study, j) => (
                      <a key={j} href={study.url} target="_blank" rel="noopener noreferrer" className="group block p-5 rounded-xl border border-stone-100 hover:border-amber-200 hover:bg-amber-50/30 transition-all duration-300">
                        <div className="flex items-start justify-between gap-2 mb-3">
                          <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#A8A29E]">
                            <span className={`w-1.5 h-1.5 rounded-full ${INGREDIENTS[expandedIngredient].dotColor}`} />
                            {study.journal} &middot; {study.year}
                          </span>
                          <ExternalLink size={14} className="text-[#A8A29E] group-hover:text-[#D97706] transition-colors flex-shrink-0" />
                        </div>
                        <h4 className="font-display font-semibold text-sm text-[#1C1917] mb-1.5 leading-snug group-hover:text-[#B45309] transition-colors">{study.title}</h4>
                        <p className="text-xs text-[#A8A29E] mb-3">{study.authors}</p>
                        <p className="text-xs text-[#78716C] leading-relaxed"><span className="font-semibold text-[#44403C]">Finding:</span> {study.finding}</p>
                      </a>
                    ))}
                  </div>
                  <div className="mt-5 pt-4 border-t border-stone-100 flex items-center gap-2">
                    <FlaskConical size={13} className="text-[#A8A29E]" />
                    <p className="text-xs text-[#A8A29E]">All studies are published in peer-reviewed journals. Click any study to read the full paper.</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* === SECTION 7: GUARANTEE === */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <FadeUp>
            <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-emerald-50 to-emerald-100/50 border border-emerald-200/50 text-center">
              <ShieldCheck size={48} className="text-emerald-600 mx-auto mb-4" />
              <h2 className="font-display text-2xl md:text-3xl font-bold text-[#1C1917] mb-3">30-Day Keep-the-Box Guarantee</h2>
              <p className="text-[#44403C] max-w-lg mx-auto">Try it for a full month. If you don't feel sharper, keep the box. We'll refund every penny. No return shipping, no hoops.</p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* === SECTION 7: FAQ === */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <FadeUp>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-[#1C1917] mb-12">Frequently Asked Questions</h2>
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

      {/* === SECTION 8: FINAL CTA === */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-[#1C1917] to-[#292524]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <FadeUp>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">Keep your coffee. Lose the fog.</h2>
            <p className="text-stone-400 mb-8">One stick pack. Seven ingredients. Works on the first morning.</p>
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#B45309] via-[#D97706] to-[#B45309] bg-[length:200%_100%] text-white font-bold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
              Start My Plan <ArrowRight size={18} />
            </button>
            <p className="text-xs text-stone-500 mt-4">30-day keep-the-box guarantee &bull; Free shipping &bull; Cancel anytime</p>
          </FadeUp>
        </div>
      </section>

      <Footer />
    </div>
  );
}
