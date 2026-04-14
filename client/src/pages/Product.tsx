/*
  BrewNectar Product Page — Grüns-Inspired Layout
  Design: Hero with images + plan selector → Benefits → Taste → Comparison → FAQ
  Bright, warm cream aesthetic with amber accents
  Plan perks collapse/expand on selection (FAQ-style)
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
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  X as XIcon,
  ChevronDown,
  ArrowRight,
  TrendingUp,
  Gift,
  Lock,
  GraduationCap,
  Trophy,
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

type PlanType = "subscribe-3" | "subscribe-2" | "subscribe-1" | "one-time";

export default function Product() {
  const [selectedPlan, setSelectedPlan] = useState<PlanType>("subscribe-3");
  const [selectedImage, setSelectedImage] = useState(0);
  const [showSticky, setShowSticky] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const images = [IMAGES.productClean, IMAGES.hero, IMAGES.pour, IMAGES.stir];

  const plans: Record<PlanType, {
    label: string;
    subtitle: string;
    price: number;
    originalPrice: number;
    perMonth: string;
    perDay: string;
    discount: string;
    badge: string;
    badgeColor: string;
    perks: { text: string; positive: boolean }[];
    isSubscription: boolean;
  }> = {
    "subscribe-3": {
      label: "90-Day Supply",
      subtitle: "Billed $81 every 12 weeks",
      price: 81,
      originalPrice: 147,
      perMonth: "27",
      perDay: "0.96",
      discount: "45% OFF",
      badge: "Best Value",
      badgeColor: "bg-emerald-600",
      perks: [
        { text: "🎓 Exclusive Focus & Clarity Masterclass ($25 value)", positive: true },
        { text: "💰 Maximum savings — lowest price per serving", positive: true },
        { text: "🔒 Lock in savings — price guaranteed even if we raise it", positive: true },
        { text: "🛡️ Try it 30 days — if you don't feel sharper, keep the bottle. We'll refund every penny.", positive: true },
        { text: "🏆 La Marzocco Espresso Machine ($4500) Giveaway entries", positive: true },
        { text: "👨‍👩‍👧 Share with family and friends", positive: true },
        { text: "🚚 Fast & FREE Shipping", positive: true },
        { text: "🔄 Cancel or pause anytime", positive: true },
        { text: "✨ Priority access to new flavors", positive: true },
      ],
      isSubscription: true,
    },
    "subscribe-2": {
      label: "60-Day Supply",
      subtitle: "Billed $64 every 8 weeks",
      price: 64,
      originalPrice: 98,
      perMonth: "32",
      perDay: "1.14",
      discount: "35% OFF",
      badge: "Most Popular",
      badgeColor: "bg-[#B45309]",
      perks: [
        { text: "🎓 Exclusive Focus & Clarity Masterclass ($25 value)", positive: true },
        { text: "💰 Great value — $32/mo, share with a partner", positive: true },
        { text: "🔒 Lock in savings — price guaranteed even if we raise it", positive: true },
        { text: "🛡️ Try it 30 days — keep the bottle if you're not sharper. Full refund.", positive: true },
        { text: "🏆 La Marzocco Espresso Machine ($4500) Giveaway entries", positive: true },
        { text: "🚚 Fast & FREE Shipping", positive: true },
        { text: "🔄 Cancel or pause anytime", positive: true },
      ],
      isSubscription: true,
    },
    "subscribe-1": {
      label: "30-Day Supply",
      subtitle: "Billed $36 every 4 weeks",
      price: 36,
      originalPrice: 49,
      perMonth: "36",
      perDay: "1.29",
      discount: "27% OFF",
      badge: "",
      badgeColor: "",
      perks: [
        { text: "Free Shipping", positive: true },
        { text: "Cancel anytime", positive: true },
        { text: "Lock in subscriber pricing", positive: true },
        { text: "No giveaway entries", positive: false },
      ],
      isSubscription: true,
    },
    "one-time": {
      label: "30-Day Supply",
      subtitle: "One-time purchase",
      price: 49,
      originalPrice: 49,
      perMonth: "49",
      perDay: "1.75",
      discount: "",
      badge: "",
      badgeColor: "",
      perks: [
        { text: "No free shipping ($5.99 flat rate)", positive: false },
        { text: "No discount applied", positive: false },
        { text: "2nd order at full price", positive: false },
      ],
      isSubscription: false,
    },
  };

  const currentPlan = plans[selectedPlan];

  useEffect(() => {
    const handleScroll = () => setShowSticky(window.scrollY > 800);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAddToCart = () => {
    toast.success("Added to cart!", {
      description: `${currentPlan.label} (${currentPlan.isSubscription ? "Subscription" : "One-time"})`,
    });
  };

  const productFaqs = [
    { q: "How many servings per bottle?", a: "Each bottle contains 28 servings — one tablespoon per day for 4 weeks of cognitive support." },
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

  const planOrder: PlanType[] = ["subscribe-3", "subscribe-2", "subscribe-1"];

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <Navbar />

      {/* Ticker spacer */}
      <div className="h-8 bg-[#1C1917]" />
      <style>{`nav.fixed { top: 32px !important; }`}</style>

      {/* ═══════════ PROBLEM STATS (above product) ═══════════ */}
      <section className="pt-24 md:pt-28 pb-10 md:pb-14 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#D97706] mb-3 text-center">The Problem</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-[#1C1917] mb-3">
              Your Coffee Has a Focus Problem.
            </h2>
            <p className="text-center text-[#78716C] text-lg mb-10 max-w-2xl mx-auto">
              Caffeine alone is a blunt instrument. Here's what it actually does to your day.
            </p>
          </FadeUp>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { stat: "73%", desc: "of adults report daily brain fog at work" },
              { stat: "85%", desc: "experience an afternoon crash that kills deep work" },
              { stat: "4.2", desc: "cups of coffee consumed daily by the average American" },
              { stat: "62%", desc: "say caffeine gives them jitters or anxiety" },
            ].map((item, i) => (
              <FadeUp key={item.stat} delay={i * 0.08}>
                <div className="bg-[#FDFBF7] rounded-2xl border border-stone-100 p-5 text-center">
                  <p className="font-display text-3xl md:text-4xl font-bold text-[#1C1917] mb-2">{item.stat}</p>
                  <p className="text-xs text-[#78716C] leading-snug">{item.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ HERO: PRODUCT IMAGES + PLAN SELECTOR ═══════════ */}
      <section className="pt-10 md:pt-14 pb-10 md:pb-14 relative">
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 120% 80% at 60% 30%, rgba(251,191,114,0.15) 0%, rgba(245,158,66,0.08) 30%, rgba(253,251,247,0.6) 70%, #FDFBF7 100%), #FDFBF7"
        }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Mobile-only: Title, stars, description above images */}
          <div className="lg:hidden mb-6">
            <FadeUp>
              <h1 className="font-display text-2xl sm:text-3xl font-bold leading-[1.15] tracking-tight text-[#1C1917] mb-2">
                BrewNectar Nootropic Coffee Syrup
              </h1>
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/60 text-[11px] font-semibold text-emerald-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Back in Stock
                </span>
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
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left: Product Images — sticky on desktop, swipeable on mobile */}
            <FadeUp delay={0.05} className="lg:sticky lg:top-24 lg:self-start">
              {/* Swipeable gallery on mobile */}
              <div
                className="relative rounded-2xl overflow-hidden aspect-square bg-stone-50 touch-pan-y"
                onTouchStart={(e) => {
                  const touch = e.touches[0];
                  (e.currentTarget as any)._touchStartX = touch.clientX;
                  (e.currentTarget as any)._touchStartY = touch.clientY;
                }}
                onTouchEnd={(e) => {
                  const startX = (e.currentTarget as any)._touchStartX;
                  const startY = (e.currentTarget as any)._touchStartY;
                  if (startX == null || startY == null) return;
                  const touch = e.changedTouches[0];
                  const diffX = touch.clientX - startX;
                  const diffY = touch.clientY - startY;
                  // Only trigger if horizontal swipe is dominant and significant
                  if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY) * 1.5) {
                    if (diffX < 0 && selectedImage < images.length - 1) {
                      setSelectedImage(selectedImage + 1);
                    } else if (diffX > 0 && selectedImage > 0) {
                      setSelectedImage(selectedImage - 1);
                    }
                  }
                }}
              >
                <motion.img
                  key={selectedImage}
                  src={images[selectedImage]}
                  alt="BrewNectar product"
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0.6, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                />
                {/* Dot indicators on mobile */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 lg:hidden">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`rounded-full transition-all ${
                        selectedImage === i
                          ? "w-5 h-2 bg-[#B45309]"
                          : "w-2 h-2 bg-white/70 hover:bg-white"
                      }`}
                    />
                  ))}
                </div>
              </div>
              {/* Thumbnail buttons — always available */}
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

            {/* Right: Plan Selector (directly beside images) */}
            <FadeUp delay={0.1}>
              <div>
                {/* Desktop-only: Title, stars, description */}
                <h1 className="hidden lg:block font-display text-2xl sm:text-3xl lg:text-4xl font-bold leading-[1.15] tracking-tight text-[#1C1917] mb-2">
                  BrewNectar Nootropic Coffee Syrup
                </h1>
                <div className="hidden lg:flex flex-wrap items-center gap-3 mb-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/60 text-[11px] font-semibold text-emerald-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Back in Stock
                  </span>
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
                <p className="text-[#57534E] text-base mb-6 leading-relaxed hidden lg:block">
                  Vanilla bean nootropic syrup with Lion's Mane, Cognizin, and L-Theanine. One tablespoon a day for calm focus, faster recall, and deep work.
                </p>

                {/* Subscribe & Save header */}
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="font-display font-bold text-lg text-[#1C1917]">Subscribe & Save:</h3>
                </div>

                {/* Subscription plan options — collapsible perks */}
                <div className="space-y-3 mb-4" id="offers">
                  {planOrder.map((planKey) => {
                    const plan = plans[planKey];
                    const isSelected = selectedPlan === planKey && selectedPlan !== "one-time";
                    return (
                      <button
                        key={planKey}
                        onClick={() => setSelectedPlan(planKey)}
                        className={`w-full text-left rounded-2xl border-2 transition-all duration-200 relative overflow-hidden ${
                          isSelected
                            ? "border-[#B45309] bg-white shadow-warm"
                            : "border-stone-200 bg-white hover:border-stone-300"
                        }`}
                      >
                        {/* Badge */}
                        {plan.badge && (
                          <span className={`absolute -top-0 right-0 px-3 py-1 ${plan.badgeColor} text-white text-[10px] font-bold rounded-bl-xl uppercase tracking-wide`}>
                            {plan.badge}
                          </span>
                        )}

                        {/* Main row: always visible */}
                        <div className={`flex items-center justify-between gap-3 p-4 md:p-5 ${plan.badge ? "pt-7 md:pt-5" : ""}`}>
                          <div className="flex items-center gap-3">
                            {/* Radio circle */}
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                              isSelected ? "border-[#B45309]" : "border-stone-300"
                            }`}>
                              {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-[#B45309]" />}
                            </div>

                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="font-display font-bold text-base text-[#1C1917]">{plan.label}</h3>
                                {plan.discount && (
                                  <span className="text-sm font-semibold text-emerald-600">
                                    (Save {plan.discount.replace(' OFF', '')})
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-[#78716C] mt-0.5">{plan.subtitle}</p>
                            </div>
                          </div>

                          {/* Pricing */}
                          <div className="text-right flex-shrink-0">
                            <div className="flex items-baseline gap-1 justify-end">
                              <span className="font-display text-xl sm:text-2xl font-bold text-[#1C1917]">${plan.perMonth}</span>
                              <span className="text-sm text-[#57534E] font-medium">/mo</span>
                            </div>
                            <p className="text-[11px] text-[#78716C]">${plan.perDay} USD / DAY</p>
                          </div>
                        </div>

                        {/* Collapsible perks — only show when selected */}
                        <AnimatePresence initial={false}>
                          {isSelected && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                              className="overflow-hidden"
                            >
                              <div className="px-4 md:px-5 pb-4 md:pb-5 pt-0 border-t border-stone-100 mt-0">
                                <div className="pt-3 space-y-1.5">
                                  {plan.perks.map((perk) => (
                                    <div key={perk.text} className="flex items-center gap-2">
                                      {perk.positive ? (
                                        <Check size={16} strokeWidth={3} className="text-emerald-600 flex-shrink-0" />
                                      ) : (
                                        <XIcon size={16} strokeWidth={3} className="text-red-500 flex-shrink-0" />
                                      )}
                                      <span className={`text-sm ${perk.positive ? "text-[#44403C]" : "text-red-500 font-semibold"}`}>
                                        {perk.text}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </button>
                    );
                  })}
                </div>

                {/* Free Gifts with your order */}
                <div className="mb-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Gift size={16} className="text-[#B45309]" />
                    <span className="text-sm font-bold text-[#1C1917]">Free gifts with your order</span>
                  </div>
                  <div className="flex gap-3">
                    {/* Gift 1: Focus & Clarity Masterclass — unlocked with any subscription */}
                    <button
                      onClick={() => {
                        if (selectedPlan === "one-time") setSelectedPlan("subscribe-1");
                      }}
                      className={`flex-1 relative rounded-xl border-2 p-3 transition-all duration-200 text-left ${
                        selectedPlan !== "one-time"
                          ? "border-[#B45309]/30 bg-amber-50/60"
                          : "border-stone-200 bg-stone-50 opacity-60 cursor-pointer hover:border-stone-300"
                      }`}
                    >
                      {selectedPlan === "one-time" && (
                        <div className="absolute top-2 right-2">
                          <Lock size={12} className="text-stone-400" />
                        </div>
                      )}
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${
                        selectedPlan !== "one-time" ? "bg-[#B45309]/10" : "bg-stone-200"
                      }`}>
                        <GraduationCap size={16} className={selectedPlan !== "one-time" ? "text-[#B45309]" : "text-stone-400"} />
                      </div>
                      <p className="text-xs font-bold text-[#1C1917] leading-tight">Focus & Clarity Masterclass</p>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-[10px] text-stone-400 line-through">$25</span>
                        <span className={`text-[10px] font-bold ${
                          selectedPlan !== "one-time" ? "text-emerald-600" : "text-stone-400"
                        }`}>FREE</span>
                      </div>
                      {selectedPlan !== "one-time" && (
                        <div className="absolute -top-1.5 -left-1.5">
                          <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center">
                            <Check size={10} strokeWidth={3} className="text-white" />
                          </div>
                        </div>
                      )}
                    </button>

                    {/* Gift 2: La Marzocco Giveaway — unlocked with 2+ supplies */}
                    <button
                      onClick={() => {
                        if (selectedPlan !== "subscribe-3" && selectedPlan !== "subscribe-2") {
                          setSelectedPlan("subscribe-2");
                        }
                      }}
                      className={`flex-1 relative rounded-xl border-2 p-3 transition-all duration-200 text-left ${
                        selectedPlan === "subscribe-3" || selectedPlan === "subscribe-2"
                          ? "border-[#B45309]/30 bg-amber-50/60"
                          : "border-stone-200 bg-stone-50 opacity-60 cursor-pointer hover:border-stone-300"
                      }`}
                    >
                      {selectedPlan !== "subscribe-3" && selectedPlan !== "subscribe-2" && (
                        <div className="absolute top-2 right-2">
                          <Lock size={12} className="text-stone-400" />
                        </div>
                      )}
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${
                        selectedPlan === "subscribe-3" || selectedPlan === "subscribe-2" ? "bg-[#B45309]/10" : "bg-stone-200"
                      }`}>
                        <Trophy size={16} className={selectedPlan === "subscribe-3" || selectedPlan === "subscribe-2" ? "text-[#B45309]" : "text-stone-400"} />
                      </div>
                      <p className="text-xs font-bold text-[#1C1917] leading-tight">La Marzocco Espresso Machine ($4500) Giveaway</p>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-[10px] text-stone-400">2+ supplies</span>
                        <span className={`text-[10px] font-bold ${
                          selectedPlan === "subscribe-3" || selectedPlan === "subscribe-2" ? "text-emerald-600" : "text-stone-400"
                        }`}>{selectedPlan === "subscribe-3" || selectedPlan === "subscribe-2" ? "ENTERED" : "LOCKED"}</span>
                      </div>
                      {(selectedPlan === "subscribe-3" || selectedPlan === "subscribe-2") && (
                        <div className="absolute -top-1.5 -left-1.5">
                          <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center">
                            <Check size={10} strokeWidth={3} className="text-white" />
                          </div>
                        </div>
                      )}
                    </button>
                  </div>
                </div>

                {/* One Time Purchase link */}
                <div className="text-center mb-5">
                  <button
                    onClick={() => setSelectedPlan("one-time")}
                    className={`text-sm font-medium transition-colors ${
                      selectedPlan === "one-time"
                        ? "text-[#B45309] underline decoration-2 underline-offset-4"
                        : "text-[#78716C] underline decoration-dotted underline-offset-4 hover:text-[#B45309]"
                    }`}
                  >
                    One Time Purchase ${plans["one-time"].price}
                  </button>
                </div>

                {/* CTA */}
                <button
                  onClick={handleAddToCart}
                  className="w-full py-4 rounded-full bg-[#1C1917] font-display font-bold text-base text-white hover:bg-[#292524] hover:shadow-lg transition-all uppercase tracking-wide mb-3"
                >
                  {selectedPlan === "one-time"
                    ? `Buy Now — $${plans["one-time"].price}`
                    : `Start My ${currentPlan.label} — $${currentPlan.perMonth}/mo`}
                </button>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Check size={14} className="text-emerald-600" />
                  <span className="text-xs text-[#78716C]">Limited Time Discount Auto-Applied</span>
                </div>

                {/* Trust badges */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { icon: <ShieldCheck size={18} />, label: "30-Day Keep-the-Bottle Guarantee" },
                    { icon: <Truck size={18} />, label: "Free Shipping" },
                    { icon: <RotateCcw size={18} />, label: "Cancel Anytime" },
                  ].map((badge) => (
                    <div key={badge.label} className="flex flex-col items-center gap-1.5 text-center">
                      <div className="text-[#B45309]">{badge.icon}</div>
                      <span className="text-[#78716C] text-[11px] font-medium">{badge.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>



      {/* ═══════════ TRANSFORM YOUR FOCUS — Benefit Visuals ═══════════ */}
      <section className="py-16 md:py-24 bg-[#FDFBF7]">
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

          {/* Desktop: product centered with benefits on sides */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-8 items-center">
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

            <FadeUp delay={0.15}>
              <div className="flex justify-center">
                <img src={IMAGES.productClean} alt="BrewNectar bottle" className="w-72 h-72 object-contain drop-shadow-xl" />
              </div>
            </FadeUp>

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
                <img src={IMAGES.productClean} alt="BrewNectar bottle" className="w-48 h-48 object-contain drop-shadow-xl" />
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
      </section>

      {/* ═══════════ TASTE CALLOUTS ═══════════ */}
      <section className="py-14 md:py-20 bg-white">
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
                <div className="bg-[#FDFBF7] rounded-2xl border border-stone-100 p-5 md:p-6 text-center hover:shadow-warm hover:border-amber-100 transition-all duration-300">
                  <span className="text-3xl md:text-4xl block mb-3">{taste.emoji}</span>
                  <h3 className="font-display font-bold text-sm md:text-base text-[#1C1917] mb-1">{taste.label}</h3>
                  <p className="text-xs text-[#78716C]">{taste.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.2}>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {["Lion's Mane", "Cognizin\u00AE", "L-Theanine", "B-Complex", "Vanilla Extract", "Zero Sugar"].map((item) => (
                <span key={item} className="px-4 py-2 rounded-full bg-white border border-stone-100 text-sm text-[#57534E] font-medium">
                  {item}
                </span>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══════════ COMPARISON CHART ═══════════ */}
      <section className="py-16 md:py-24 bg-[#FDFBF7]">
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
              Join 12,000+ high performers. Try it for 30 days — if you don't feel sharper, keep the bottle and we'll refund every penny.
            </p>
            <a
              href="#offers"
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white bg-[#1C1917] rounded-full hover:bg-[#292524] transition-all hover:shadow-lg"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
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
              <p className="font-display font-bold text-[#1C1917] text-lg">${currentPlan.perMonth}/mo</p>
              {currentPlan.originalPrice > currentPlan.price && (
                <span className="text-sm text-[#A8A29E] line-through">${currentPlan.originalPrice}</span>
              )}
              {currentPlan.discount && (
                <span className="text-xs font-bold text-emerald-600">{currentPlan.discount}</span>
              )}
            </div>
            <p className="text-[#78716C] text-xs truncate">
              {selectedPlan === "one-time" ? "One-time purchase" : `Subscribe · ${currentPlan.label}`}
            </p>
          </div>
          <button
            onClick={handleAddToCart}
            className="px-6 sm:px-8 py-3 rounded-full bg-[#1C1917] font-display font-bold text-sm text-white hover:bg-[#292524] hover:shadow-lg transition-all flex-shrink-0"
          >
            {selectedPlan === "one-time" ? "Buy Now" : "Subscribe Now"}
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
