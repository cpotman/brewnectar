/*
  BrewNectar Product Page — Grüns-Inspired Layout
  Design: Problem callouts → Benefit visuals → Subscription-heavy pricing → FAQ
  Bright, warm cream aesthetic with amber accents
*/
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Star,
  Brain,
  Zap,
  Sparkles,
  Coffee,
  ShieldCheck,
  Truck,
  RotateCcw,
  Clock,
  Check,
  X as XIcon,
  Minus,
  Plus,
  ChevronDown,
  ArrowRight,
  Timer,
  TrendingUp,
  Shield,
  Leaf,
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

const IMAGES = {
  productClean: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030542116/gR7c7MRQNrXJ4W4LDnTdRi/product-hero-clean-2JryfYKGcicCXzETS5MKKr.webp",
  hero: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030542116/gR7c7MRQNrXJ4W4LDnTdRi/hero-bright-TZynNw86MPFthaxzmzbNEA.webp",
  pour: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030542116/gR7c7MRQNrXJ4W4LDnTdRi/lifestyle-pour-bright-Gx24uHuFzUnhzZ4wLHqXvY.webp",
  stir: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030542116/gR7c7MRQNrXJ4W4LDnTdRi/how-stir-3pNJBKzkQVwxqm57DvYdyL.webp",
  lockIn: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030542116/gR7c7MRQNrXJ4W4LDnTdRi/how-lockin-BGjMpAAVV2Cfd7diTUnZWZ.webp",
  warmGradient: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030542116/gR7c7MRQNrXJ4W4LDnTdRi/warm-gradient-bg-LWJsvAnDJnqPdXt4YEzJjg.webp",
};

type PlanType = "subscribe-1" | "subscribe-2" | "one-time";

export default function Product() {
  const [selectedPlan, setSelectedPlan] = useState<PlanType>("subscribe-1");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showSticky, setShowSticky] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const images = [IMAGES.productClean, IMAGES.hero, IMAGES.pour, IMAGES.stir];

  const plans = {
    "subscribe-1": {
      label: "1 Bottle",
      subtitle: "Delivered every 4 weeks",
      price: 34,
      originalPrice: 40,
      perDay: "1.13",
      discount: "15% OFF",
      perks: [
        { text: "Fast & FREE Shipping", positive: true },
        { text: "Cancel anytime", positive: true },
        { text: "Priority access to new flavors", positive: true },
      ],
      isSubscription: true,
      popular: true,
    },
    "subscribe-2": {
      label: "2 Bottles",
      subtitle: "Delivered every 4 weeks",
      price: 60,
      originalPrice: 80,
      perDay: "1.00",
      discount: "25% OFF",
      perks: [
        { text: "Fast & FREE Shipping", positive: true },
        { text: "Cancel anytime", positive: true },
        { text: "Best value — share with a partner", positive: true },
      ],
      isSubscription: true,
      popular: false,
    },
    "one-time": {
      label: "1 Bottle",
      subtitle: "One-time delivery",
      price: 40,
      originalPrice: 40,
      perDay: "1.33",
      discount: "",
      perks: [
        { text: "No free shipping", positive: false },
        { text: "No discount applied", positive: false },
        { text: "2nd order at full price", positive: false },
      ],
      isSubscription: false,
      popular: false,
    },
  };

  const currentPlan = plans[selectedPlan];
  const totalPrice = currentPlan.price * quantity;

  useEffect(() => {
    const handleScroll = () => setShowSticky(window.scrollY > 800);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAddToCart = () => {
    toast.success("Added to cart!", {
      description: `${currentPlan.label} (${currentPlan.isSubscription ? "Subscription" : "One-time"}) × ${quantity}`,
    });
  };

  const productFaqs = [
    { q: "How many servings per bottle?", a: "Each bottle contains 30 servings — one tablespoon per day for a full month of cognitive support." },
    { q: "What does it taste like?", a: "Smooth vanilla bean with a hint of caramel sweetness. Zero sugar, zero artificial flavors. Pairs perfectly with any coffee — hot, iced, or cold brew." },
    { q: "Can I cancel my subscription?", a: "Absolutely. Cancel anytime with one click from your account dashboard. No contracts, no fees, no hassle. You can also pause or skip deliveries." },
    { q: "How should I store it?", a: "Store in a cool, dry place. Refrigerate after opening for best freshness. Good for 60 days after opening." },
    { q: "Is it safe to take daily?", a: "Yes. All ingredients are GRAS-certified and backed by clinical research. BrewNectar is manufactured in a GMP-certified facility in the USA." },
    { q: "When will I feel the effects?", a: "Most people notice improved focus within 20-30 minutes of their first cup. Cumulative benefits like better recall and reduced brain fog typically appear after 2-3 weeks of daily use." },
    { q: "Does it contain caffeine?", a: "No. BrewNectar is caffeine-free — it's designed to enhance the coffee you already drink, not add more stimulants." },
  ];

  const comparisonFeatures = [
    { feature: "Calm, Sustained Focus", bn: true, rc: false, ss: false, cn: true },
    { feature: "Zero Sugar", bn: true, rc: true, ss: false, cn: true },
    { feature: "No Afternoon Crash", bn: true, rc: false, ss: false, cn: true },
    { feature: "Tastes Delicious", bn: true, rc: true, ss: true, cn: false },
    { feature: "Stacks with Your Coffee", bn: true, rc: false, ss: true, cn: false },
    { feature: "No Pills Required", bn: true, rc: true, ss: true, cn: false },
    { feature: "Supports Neurogenesis", bn: true, rc: false, ss: false, cn: true },
    { feature: "Daily Ritual Friendly", bn: true, rc: true, ss: false, cn: false },
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <Navbar />

      {/* Ticker spacer */}
      <div className="h-8 bg-[#1C1917]" />
      <style>{`nav.fixed { top: 32px !important; }`}</style>

      {/* ═══════════ HERO: PROBLEM + PRODUCT ═══════════ */}
      <section className="pt-28 md:pt-32 pb-16 md:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={IMAGES.warmGradient} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#FDFBF7]/50 to-[#FDFBF7]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Rating bar */}
          <FadeUp>
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <div className="flex -space-x-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-[#D97706] text-[#D97706]" />
                ))}
              </div>
              <span className="text-sm text-[#57534E]">
                <strong className="text-[#1C1917]">4.9</strong> stars from <strong className="text-[#1C1917]">2,400+</strong> reviews
              </span>
              <span className="text-[#D4D0CA]">|</span>
              <span className="text-sm text-[#57534E]">
                <strong className="text-[#1C1917]">12,000+</strong> members
              </span>
            </div>
          </FadeUp>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left: Problem + CTA */}
            <div>
              <FadeUp delay={0.05}>
                <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight text-[#1C1917] mb-4">
                  Your coffee has a focus problem.{" "}
                  <span className="text-gradient-warm">BrewNectar fixes it.</span>
                </h1>
              </FadeUp>

              <FadeUp delay={0.1}>
                <p className="text-lg text-[#57534E] leading-relaxed mb-8 max-w-lg">
                  Nootropic coffee syrup with Lion's Mane, Cognizin, and L-Theanine. One tablespoon turns your morning cup into a cognitive upgrade.
                </p>
              </FadeUp>

              {/* Problem stats — Grüns-inspired */}
              <FadeUp delay={0.15}>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-white rounded-2xl border border-stone-100 p-5">
                    <p className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#1C1917] mb-1">73%</p>
                    <p className="text-sm text-[#78716C] leading-snug">of adults report daily brain fog that impacts their productivity at work.</p>
                  </div>
                  <div className="bg-white rounded-2xl border border-stone-100 p-5">
                    <p className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#1C1917] mb-1">85%</p>
                    <p className="text-sm text-[#78716C] leading-snug">of coffee drinkers experience an afternoon crash that kills deep work.</p>
                  </div>
                </div>
              </FadeUp>

              <FadeUp delay={0.2}>
                <a
                  href="#offers"
                  className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white bg-[#1C1917] rounded-full hover:bg-[#292524] transition-all hover:shadow-lg"
                >
                  Save 25% + Free Shipping
                  <ArrowRight size={18} />
                </a>
                <div className="flex items-center gap-2 mt-3">
                  <Check size={14} className="text-emerald-600" />
                  <span className="text-xs text-[#78716C]">30-Day Money-Back Guarantee</span>
                </div>
              </FadeUp>
            </div>

            {/* Right: Product image */}
            <FadeUp delay={0.1} className="relative">
              <div className="relative rounded-2xl overflow-hidden aspect-square bg-stone-50">
                <img
                  src={images[selectedImage]}
                  alt="BrewNectar product"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-2 mt-3">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`rounded-xl overflow-hidden aspect-square border-2 transition-all ${
                      selectedImage === i
                        ? "border-[#B45309] ring-2 ring-amber-200"
                        : "border-stone-200 hover:border-stone-300"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
                  </button>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ═══════════ TRANSFORM YOUR FOCUS — Benefit Visuals Around Product ═══════════ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#D97706] mb-3 text-center">Transform Your Focus</p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-center text-[#1C1917] mb-3">
              One Syrup. Four Superpowers.
            </h2>
            <p className="text-center text-[#78716C] text-lg mb-14 max-w-2xl mx-auto">
              Over 175+ peer-reviewed studies support the ingredients in BrewNectar.
            </p>
          </FadeUp>

          {/* Product in center with benefits around it */}
          <div className="relative">
            {/* Desktop: product centered with benefits on sides */}
            <div className="hidden lg:grid lg:grid-cols-3 gap-8 items-center">
              {/* Left benefits */}
              <div className="space-y-10">
                <FadeUp delay={0.1}>
                  <div className="text-right">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 mb-3 ml-auto">
                      <Brain size={22} className="text-[#B45309]" />
                    </div>
                    <h3 className="font-display font-bold text-lg text-[#1C1917] mb-1">Cognitive Clarity</h3>
                    <p className="text-sm text-[#78716C] leading-relaxed">
                      Lion's Mane promotes nerve growth factor (NGF) production, supporting neurogenesis and sharper thinking.
                    </p>
                  </div>
                </FadeUp>
                <FadeUp delay={0.2}>
                  <div className="text-right">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 mb-3 ml-auto">
                      <Zap size={22} className="text-emerald-600" />
                    </div>
                    <h3 className="font-display font-bold text-lg text-[#1C1917] mb-1">Clean Energy</h3>
                    <p className="text-sm text-[#78716C] leading-relaxed">
                      Cognizin (Citicoline) fuels brain cells directly, enhancing mental energy without jitters or crash.
                    </p>
                  </div>
                </FadeUp>
              </div>

              {/* Center product image */}
              <FadeUp delay={0.15}>
                <div className="flex justify-center">
                  <img
                    src={IMAGES.productClean}
                    alt="BrewNectar bottle"
                    className="w-72 h-72 object-contain drop-shadow-xl"
                  />
                </div>
              </FadeUp>

              {/* Right benefits */}
              <div className="space-y-10">
                <FadeUp delay={0.1}>
                  <div>
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 mb-3">
                      <Sparkles size={22} className="text-sky-600" />
                    </div>
                    <h3 className="font-display font-bold text-lg text-[#1C1917] mb-1">Calm Focus</h3>
                    <p className="text-sm text-[#78716C] leading-relaxed">
                      L-Theanine promotes alpha brain waves — the same state achieved during meditation. Focus without anxiety.
                    </p>
                  </div>
                </FadeUp>
                <FadeUp delay={0.2}>
                  <div>
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-rose-50 border border-rose-100 mb-3">
                      <TrendingUp size={22} className="text-rose-500" />
                    </div>
                    <h3 className="font-display font-bold text-lg text-[#1C1917] mb-1">Sustained Performance</h3>
                    <p className="text-sm text-[#78716C] leading-relaxed">
                      B-Vitamins support cellular energy metabolism, keeping your brain fueled throughout the entire workday.
                    </p>
                  </div>
                </FadeUp>
              </div>
            </div>

            {/* Mobile: stacked layout */}
            <div className="lg:hidden">
              <FadeUp>
                <div className="flex justify-center mb-10">
                  <img
                    src={IMAGES.productClean}
                    alt="BrewNectar bottle"
                    className="w-48 h-48 object-contain drop-shadow-xl"
                  />
                </div>
              </FadeUp>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Brain, color: "bg-amber-50 border-amber-100 text-[#B45309]", title: "Cognitive Clarity", desc: "Lion's Mane supports neurogenesis and sharper thinking." },
                  { icon: Zap, color: "bg-emerald-50 border-emerald-100 text-emerald-600", title: "Clean Energy", desc: "Cognizin fuels brain cells without jitters or crash." },
                  { icon: Sparkles, color: "bg-sky-50 border-sky-100 text-sky-600", title: "Calm Focus", desc: "L-Theanine promotes alpha brain waves for focus." },
                  { icon: TrendingUp, color: "bg-rose-50 border-rose-100 text-rose-500", title: "Sustained Performance", desc: "B-Vitamins keep your brain fueled all day." },
                ].map((b, i) => (
                  <FadeUp key={b.title} delay={i * 0.08}>
                    <div className="bg-white rounded-2xl border border-stone-100 p-4 text-center h-full">
                      <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl border ${b.color} mb-2`}>
                        <b.icon size={18} />
                      </div>
                      <h3 className="font-display font-bold text-sm text-[#1C1917] mb-1">{b.title}</h3>
                      <p className="text-xs text-[#78716C] leading-relaxed">{b.desc}</p>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ TASTE CALLOUTS ═══════════ */}
      <section className="py-14 md:py-20 bg-[#FDFBF7]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-center text-[#1C1917] mb-10">
              What It Tastes Like
            </h2>
          </FadeUp>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { emoji: "🍦", label: "Vanilla Bean", desc: "Rich, natural vanilla" },
              { emoji: "🍯", label: "Hint of Caramel", desc: "Subtle warm sweetness" },
              { emoji: "☕", label: "Coffee-Forward", desc: "Enhances, never masks" },
              { emoji: "🌿", label: "Clean Finish", desc: "Zero sugar, zero aftertaste" },
            ].map((taste, i) => (
              <FadeUp key={taste.label} delay={i * 0.08}>
                <div className="bg-white rounded-2xl border border-stone-100 p-5 md:p-6 text-center hover:shadow-warm hover:border-amber-100 transition-all duration-300">
                  <span className="text-3xl md:text-4xl block mb-3">{taste.emoji}</span>
                  <h3 className="font-display font-bold text-sm md:text-base text-[#1C1917] mb-1">{taste.label}</h3>
                  <p className="text-xs text-[#78716C]">{taste.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>

          {/* Packed With */}
          <FadeUp delay={0.2}>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {["Lion's Mane", "Cognizin\u00AE", "L-Theanine", "B-Complex", "Vanilla Extract", "Zero Sugar"].map((item) => (
                <span
                  key={item}
                  className="px-4 py-2 rounded-full bg-white border border-stone-100 text-sm text-[#57534E] font-medium"
                >
                  {item}
                </span>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══════════ COMPARISON CHART ═══════════ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#D97706] mb-3 text-center">Us vs. Them</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-[#1C1917] mb-12">
              Not All Upgrades Are Equal.
            </h2>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="overflow-x-auto -mx-4 px-4">
              <table className="w-full text-xs sm:text-sm min-w-[420px]">
                <thead>
                  <tr className="border-b-2 border-stone-200">
                    <th className="text-left py-3 md:py-4 pr-3 md:pr-4 font-display font-semibold text-[#78716C] w-[35%]">Feature</th>
                    <th className="py-4 px-2 font-display font-bold text-[#1C1917] bg-amber-50/50 rounded-t-xl w-[20%]">
                      <div className="flex flex-col items-center">
                        <span className="text-xs text-[#D97706] font-semibold mb-0.5">BEST</span>
                        BrewNectar
                      </div>
                    </th>
                    <th className="py-4 px-2 font-display font-semibold text-[#A8A29E] w-[15%]">Regular Coffee</th>
                    <th className="py-4 px-2 font-display font-semibold text-[#A8A29E] w-[15%] hidden sm:table-cell">Sugary Syrups</th>
                    <th className="py-4 px-2 font-display font-semibold text-[#A8A29E] w-[15%] hidden sm:table-cell">Capsule Nootropics</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((row) => (
                    <tr key={row.feature} className="border-b border-stone-100">
                      <td className="py-3.5 pr-4 font-medium text-[#44403C]">{row.feature}</td>
                      <td className="py-3.5 px-2 text-center bg-amber-50/20">
                        {row.bn ? <Check size={18} className="mx-auto text-emerald-600" /> : <XIcon size={16} className="mx-auto text-stone-300" />}
                      </td>
                      <td className="py-3.5 px-2 text-center">
                        {row.rc ? <Check size={18} className="mx-auto text-emerald-600" /> : <XIcon size={16} className="mx-auto text-stone-300" />}
                      </td>
                      <td className="py-3.5 px-2 text-center hidden sm:table-cell">
                        {row.ss ? <Check size={18} className="mx-auto text-emerald-600" /> : <XIcon size={16} className="mx-auto text-stone-300" />}
                      </td>
                      <td className="py-3.5 px-2 text-center hidden sm:table-cell">
                        {row.cn ? <Check size={18} className="mx-auto text-emerald-600" /> : <XIcon size={16} className="mx-auto text-stone-300" />}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══════════ SUBSCRIPTION OFFERS — Grüns-Inspired ═══════════ */}
      <section id="offers" className="py-16 md:py-24 bg-[#FDFBF7]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#D97706] mb-3 text-center">Choose Your Plan</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-[#1C1917] mb-3">
              Subscribe & Save
            </h2>
            <p className="text-center text-[#78716C] text-lg mb-10 max-w-xl mx-auto">
              Join 12,000+ high performers who made BrewNectar part of their daily ritual.
            </p>
          </FadeUp>

          {/* Plan options */}
          <div className="space-y-4 mb-8">
            {(["subscribe-2", "subscribe-1", "one-time"] as PlanType[]).map((planKey) => {
              const plan = plans[planKey];
              const isSelected = selectedPlan === planKey;
              return (
                <FadeUp key={planKey} delay={planKey === "subscribe-2" ? 0 : planKey === "subscribe-1" ? 0.05 : 0.1}>
                  <button
                    onClick={() => setSelectedPlan(planKey)}
                    className={`w-full text-left rounded-2xl border-2 p-5 md:p-6 transition-all duration-200 relative ${
                      isSelected
                        ? "border-[#B45309] bg-white shadow-warm"
                        : "border-stone-200 bg-white hover:border-stone-300"
                    }`}
                  >
                    {/* Popular badge */}
                    {plan.popular && (
                      <span className="absolute -top-3 left-6 px-3 py-1 bg-[#B45309] text-white text-xs font-bold rounded-full uppercase tracking-wide">
                        Most Popular
                      </span>
                    )}
                    {planKey === "subscribe-2" && (
                      <span className="absolute -top-3 left-6 px-3 py-1 bg-emerald-600 text-white text-xs font-bold rounded-full uppercase tracking-wide">
                        Best Value
                      </span>
                    )}

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      {/* Left: radio + plan info */}
                      <div className="flex items-start gap-4">
                        {/* Radio circle */}
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          isSelected ? "border-[#B45309]" : "border-stone-300"
                        }`}>
                          {isSelected && <div className="w-3 h-3 rounded-full bg-[#B45309]" />}
                        </div>

                        <div>
                          <div className="flex items-center gap-3 flex-wrap">
                            <h3 className="font-display font-bold text-lg text-[#1C1917]">{plan.label}</h3>
                            {plan.discount && (
                              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">
                                {plan.discount}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-[#78716C] mt-0.5">{plan.subtitle}</p>

                          {/* Perks */}
                          <div className="mt-3 space-y-1.5">
                            {plan.perks.map((perk) => (
                              <div key={perk.text} className="flex items-center gap-2">
                                {perk.positive ? (
                                  <Check size={14} className="text-emerald-600 flex-shrink-0" />
                                ) : (
                                  <XIcon size={14} className="text-stone-400 flex-shrink-0" />
                                )}
                                <span className={`text-sm ${perk.positive ? "text-[#44403C]" : "text-[#A8A29E]"}`}>
                                  {perk.text}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Right: pricing */}
                      <div className="text-right flex-shrink-0 sm:min-w-[140px] pl-10 sm:pl-0">
                        <div className="flex items-baseline gap-2 justify-end">
                          <span className="font-display text-3xl font-bold text-[#1C1917]">${plan.price}</span>
                          {plan.isSubscription && (
                            <span className="text-sm text-[#A8A29E] line-through">${plan.originalPrice}</span>
                          )}
                        </div>
                        <p className="text-sm text-[#78716C]">{plan.isSubscription ? "/mo" : ""}</p>
                        <p className="text-xs font-semibold text-[#B45309] mt-1">${plan.perDay}/day</p>
                      </div>
                    </div>
                  </button>
                </FadeUp>
              );
            })}
          </div>

          {/* Quantity */}
          <FadeUp delay={0.15}>
            <div className="flex items-center justify-between bg-white rounded-2xl border border-stone-200 p-5 mb-6">
              <span className="font-display font-semibold text-[#1C1917]">Quantity</span>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-xl border border-stone-200 flex items-center justify-center text-[#78716C] hover:bg-stone-50 transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="font-display font-bold text-[#1C1917] text-lg w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-xl border border-stone-200 flex items-center justify-center text-[#78716C] hover:bg-stone-50 transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          </FadeUp>

          {/* CTA */}
          <FadeUp delay={0.2}>
            <button
              onClick={handleAddToCart}
              className="w-full py-4 rounded-full bg-[#1C1917] font-display font-bold text-lg text-white hover:bg-[#292524] hover:shadow-lg transition-all mb-3"
            >
              {currentPlan.isSubscription ? `Start Subscription — $${totalPrice}/mo` : `Buy Now — $${totalPrice}`}
            </button>
            <div className="flex items-center justify-center gap-2 mb-3">
              <Check size={14} className="text-emerald-600" />
              <span className="text-xs text-[#78716C]">Limited Time Discount Auto-Applied</span>
            </div>
          </FadeUp>

          {/* Trust badges */}
          <FadeUp delay={0.25}>
            <div className="grid grid-cols-3 gap-4 mt-6">
              {[
                { icon: <ShieldCheck size={20} />, label: "30-Day Guarantee" },
                { icon: <Truck size={20} />, label: "Free Shipping" },
                { icon: <RotateCcw size={20} />, label: "Cancel Anytime" },
              ].map((badge) => (
                <div key={badge.label} className="flex flex-col items-center gap-2 text-center">
                  <div className="text-[#B45309]">{badge.icon}</div>
                  <span className="text-[#78716C] text-xs font-medium">{badge.label}</span>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══════════ FAQ ═══════════ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-[#1C1917] mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-center text-[#78716C] text-lg mb-10">
              Everything you need to know about BrewNectar.
            </p>
          </FadeUp>

          <div className="space-y-0">
            {productFaqs.map((faq, i) => (
              <FadeUp key={i} delay={i * 0.05}>
                <div className="border-b border-stone-200">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between py-5 text-left group"
                  >
                    <span className="font-display font-semibold text-[#1C1917] text-base pr-4 group-hover:text-[#B45309] transition-colors">
                      {faq.q}
                    </span>
                    <div className={`w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center flex-shrink-0 transition-all ${
                      openFaq === i ? "bg-[#1C1917] border-[#1C1917] rotate-180" : "group-hover:border-stone-300"
                    }`}>
                      <ChevronDown size={16} className={openFaq === i ? "text-white" : "text-[#78716C]"} />
                    </div>
                  </button>
                  <AnimatePresence initial={false}>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-5 text-[#78716C] leading-relaxed text-sm pr-12">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ FINAL CTA ═══════════ */}
      <section className="py-16 md:py-20 bg-[#FDFBF7]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeUp>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1C1917] mb-4">
              Ready to Upgrade Your Coffee?
            </h2>
            <p className="text-[#78716C] text-lg mb-8 max-w-lg mx-auto">
              Join 12,000+ high performers. Risk-free with our 30-day money-back guarantee.
            </p>
            <a
              href="#offers"
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white bg-[#1C1917] rounded-full hover:bg-[#292524] transition-all hover:shadow-lg"
            >
              Start Your Subscription
              <ArrowRight size={18} />
            </a>
          </FadeUp>
        </div>
      </section>

      {/* Spacer for sticky bar */}
      <div className="h-20" />

      {/* Sticky Add to Cart */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-stone-200 py-3 px-4 transition-transform duration-500 ${
          showSticky ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-baseline gap-2">
              <p className="font-display font-bold text-[#1C1917] text-lg">${totalPrice}{currentPlan.isSubscription ? "/mo" : ""}</p>
              {currentPlan.isSubscription && currentPlan.originalPrice > currentPlan.price && (
                <span className="text-sm text-[#A8A29E] line-through">${currentPlan.originalPrice * quantity}</span>
              )}
            </div>
            <p className="text-[#78716C] text-xs truncate">
              {currentPlan.isSubscription ? "Subscription" : "One-time"} · {currentPlan.label} × {quantity}
            </p>
          </div>
          <button
            onClick={handleAddToCart}
            className="px-6 sm:px-8 py-3 rounded-full bg-[#1C1917] font-display font-bold text-sm text-white hover:bg-[#292524] hover:shadow-lg transition-all flex-shrink-0"
          >
            {currentPlan.isSubscription ? "Subscribe Now" : "Buy Now"}
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
