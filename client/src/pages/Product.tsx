/*
  BrewNectar Product Page — High-Converting Closer
  Design: End-of-funnel page that closes the sale
  Ported from homepage: trust strip, orange ATC, IP shipping, comparison chart, reviews
  New: guarantee deep-dive, "What Happens" timeline, objection handler
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
  Clock,
  MessageCircle,
  ThumbsUp,
  Calendar,
  Award,
  Heart,
  AlertCircle,
} from "lucide-react";
import { useUserState } from "@/hooks/useUserState";
import { useVisualViewport } from "@/hooks/useVisualViewport";

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

/* ─── Extended reviews (ported from homepage) ─── */
const EXTENDED_REVIEWS = [
  {
    name: "Dr. Rachel W.",
    title: "Neurologist",
    rating: 5,
    date: "March 2026",
    heading: "Finally, a nootropic I can recommend to patients",
    text: "As a neurologist, I’m extremely cautious about supplements. Most nootropic products use proprietary blends with undisclosed dosages. BrewNectar is different — every ingredient is clinically dosed and transparently labeled. The Cognizin® (citicoline) at the dosage they use has solid evidence for memory and attention. I’ve been using it myself for 3 months and recommending it to patients who want cognitive support alongside their existing coffee habit.",
  },
  {
    name: "James P.",
    title: "Day Trader",
    rating: 5,
    date: "February 2026",
    heading: "My edge in the markets",
    text: "I trade futures from 6:30 AM to 4 PM. That’s nearly 10 hours of intense decision-making where a single lapse in focus can cost thousands. I used to rely on 4-5 cups of coffee, but by noon I’d be jittery and making impulsive trades. Switched to 2 cups of coffee with BrewNectar and the difference is night and day. My screen time analytics show I’m making fewer but better trades.",
  },
  {
    name: "Michelle K.",
    title: "Working Mom of 3",
    rating: 5,
    date: "March 2026",
    heading: "From zombie mom to present mom",
    text: "I have a 2-year-old, a 5-year-old, and a 7-year-old. By 2 PM I used to be running on fumes — snapping at the kids, forgetting school pickups, staring at my laptop unable to form a sentence. After two weeks of adding it to my morning latte, the afternoon crash just... stopped. I’m more patient, more present, and I’m actually getting work done during nap time instead of doom-scrolling.",
  },
  {
    name: "David S.",
    title: "PhD Candidate, Neuroscience",
    rating: 5,
    date: "January 2026",
    heading: "The science checks out — and so does the experience",
    text: "I study neuroplasticity for a living, so I know exactly what Lion’s Mane and citicoline do at the cellular level. Most supplement companies underdose these ingredients or use inferior forms. BrewNectar uses Cognizin® (the patented citicoline) and specifies the beta-glucan content of their Lion’s Mane — that’s how you know it’s the real deal. My writing sessions went from fragmented 30-minute bursts to solid 2-3 hour deep work blocks.",
  },
];

export default function Product() {
  const [selectedPlan, setSelectedPlan] = useState<PlanType>("subscribe-3");
  const [selectedImage, setSelectedImage] = useState(0);
  const [showSticky, setShowSticky] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const userRegion = useUserState();
  const stickyBottomOffset = useVisualViewport();

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
        { text: "\ud83c\udf93 Exclusive Focus & Clarity Masterclass ($25 value)", positive: true },
        { text: "\ud83d\udcb0 Maximum savings — lowest price per serving", positive: true },
        { text: "\ud83d\udd12 Lock in savings — price guaranteed even if we raise it", positive: true },
        { text: "\ud83d\udee1\ufe0f Try it 30 days — if you don't feel sharper, keep the bottle. We'll refund every penny.", positive: true },
        { text: "\ud83c\udfc6 La Marzocco Espresso Machine ($4500) Giveaway entries", positive: true },
        { text: "\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67 Share with family and friends", positive: true },
        { text: "\ud83d\ude9a Fast & FREE Shipping", positive: true },
        { text: "\ud83d\udd04 Cancel or pause anytime", positive: true },
        { text: "\u2728 Priority access to new flavors", positive: true },
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
        { text: "\ud83c\udf93 Exclusive Focus & Clarity Masterclass ($25 value)", positive: true },
        { text: "\ud83d\udcb0 Great value — $32/mo, share with a partner", positive: true },
        { text: "\ud83d\udd12 Lock in savings — price guaranteed even if we raise it", positive: true },
        { text: "\ud83d\udee1\ufe0f Try it 30 days — keep the bottle if you're not sharper. Full refund.", positive: true },
        { text: "\ud83c\udfc6 La Marzocco Espresso Machine ($4500) Giveaway entries", positive: true },
        { text: "\ud83d\ude9a Fast & FREE Shipping", positive: true },
        { text: "\ud83d\udd04 Cancel or pause anytime", positive: true },
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
    { q: "What if it doesn't work for me?", a: "We have a 30-day keep-the-bottle guarantee. If you don't feel sharper, more focused, and more mentally clear after 30 days, keep the bottle and we'll refund every penny. No questions asked." },
  ];

  const planOrder: PlanType[] = ["subscribe-3", "subscribe-2", "subscribe-1"];

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <Navbar />

      {/* Ticker spacer */}
      <div className="h-8 bg-[#1C1917]" />
      <style>{`nav.fixed { top: 32px !important; }`}</style>

      {/* ═══════════ HERO: PRODUCT IMAGES + PLAN SELECTOR ═══════════ */}
      <section className="pt-24 md:pt-28 pb-10 md:pb-14 relative">
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
                  <strong className="text-[#1C1917]">4.9</strong> from <strong className="text-[#1C1917]">2,400+</strong> reviews
                </span>
              </div>
            </FadeUp>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left: Product Images — sticky on desktop, swipeable on mobile */}
            <FadeUp delay={0.05} className="lg:sticky lg:top-36 lg:self-start">
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
              {/* Thumbnail buttons */}
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

              {/* Trust badges below images (desktop only) */}
              <div className="hidden lg:flex items-center justify-center gap-6 mt-4">
                {[
                  { icon: ShieldCheck, label: "30-Day Guarantee" },
                  { icon: Truck, label: "Free Shipping" },
                  { icon: RotateCcw, label: "Cancel Anytime" },
                ].map((badge) => (
                  <div key={badge.label} className="flex items-center gap-1.5 text-[#78716C]">
                    <badge.icon size={14} />
                    <span className="text-xs font-medium">{badge.label}</span>
                  </div>
                ))}
              </div>
            </FadeUp>

            {/* Right: Plan Selector */}
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
                    <strong className="text-[#1C1917]">4.9</strong> from <strong className="text-[#1C1917]">2,400+</strong> reviews
                  </span>
                  <span className="text-[#D4D0CA]">|</span>
                  <span className="text-sm text-[#57534E]">
                    <strong className="text-[#1C1917]">12,000+</strong> members
                  </span>
                </div>
                <p className="text-[#57534E] text-base mb-5 leading-relaxed hidden lg:block">
                  Formulated with research-backed <span className="font-bold text-gradient-warm">Lion's Mane</span>, patented <span className="font-bold text-gradient-warm">Cognizin®</span>, and <span className="font-bold text-gradient-warm">L-Theanine</span>. One tablespoon transforms any coffee into a precision nootropic stack.
                </p>

                {/* Trust strip — 2 rows (ported from homepage, Back in Stock already shown above) */}
                <div className="flex flex-col gap-2.5 mb-5">
                  <div className="flex items-center gap-2 text-sm text-[#44403C]">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 text-[#78716C]">
                      <rect x="1" y="3" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
                      <path d="M1 7h14" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M5 1v4M11 1v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    <span>Built for real results in <strong className="text-[#1C1917]">3 months</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-amber-400 text-amber-400" />)}
                    </div>
                    <span className="text-sm font-bold text-[#1C1917]">4.9</span>
                    <span className="text-sm text-[#78716C]">from</span>
                    <span className="text-sm font-bold text-[#1C1917]">2,400+</span>
                    <span className="text-sm text-[#78716C]">reviews</span>
                  </div>
                </div>

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
                        {plan.badge && (
                          <span className={`absolute -top-0 right-0 px-3 py-1 ${plan.badgeColor} text-white text-[10px] font-bold rounded-bl-xl uppercase tracking-wide`}>
                            {plan.badge}
                          </span>
                        )}

                        <div className={`flex items-center justify-between gap-3 p-4 md:p-5 ${plan.badge ? "pt-7 md:pt-5" : ""}`}>
                          <div className="flex items-center gap-3">
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
                          <div className="text-right flex-shrink-0">
                            <div className="flex items-baseline gap-1 justify-end">
                              <span className="font-display text-xl sm:text-2xl font-bold text-[#1C1917]">${plan.perMonth}</span>
                              <span className="text-sm text-[#57534E] font-medium">/mo</span>
                            </div>
                            <p className="text-[11px] text-[#78716C]">${plan.perDay} USD / DAY</p>
                          </div>
                        </div>

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
                                      <span className={`text-xs ${perk.positive ? "text-[#44403C]" : "text-[#A8A29E]"}`}>
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

                {/* Free Gifts */}
                <div className="mb-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Gift size={16} className="text-[#B45309]" />
                    <span className="text-sm font-bold text-[#1C1917]">Free gifts with your order</span>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => { if (selectedPlan === "one-time") setSelectedPlan("subscribe-1"); }}
                      className={`flex-1 relative rounded-xl border-2 p-3 transition-all duration-200 text-left ${
                        selectedPlan !== "one-time"
                          ? "border-[#B45309]/30 bg-amber-50/60"
                          : "border-stone-200 bg-stone-50 opacity-60 cursor-pointer hover:border-stone-300"
                      }`}
                    >
                      {selectedPlan === "one-time" && (
                        <div className="absolute top-2 right-2"><Lock size={12} className="text-stone-400" /></div>
                      )}
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${
                        selectedPlan !== "one-time" ? "bg-[#B45309]/10" : "bg-stone-200"
                      }`}>
                        <GraduationCap size={16} className={selectedPlan !== "one-time" ? "text-[#B45309]" : "text-stone-400"} />
                      </div>
                      <p className="text-xs font-bold text-[#1C1917] leading-tight">Focus & Clarity Masterclass</p>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-[10px] text-stone-400 line-through">$25</span>
                        <span className={`text-[10px] font-bold ${selectedPlan !== "one-time" ? "text-emerald-600" : "text-stone-400"}`}>FREE</span>
                      </div>
                      {selectedPlan !== "one-time" && (
                        <div className="absolute -top-1.5 -left-1.5">
                          <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center">
                            <Check size={10} strokeWidth={3} className="text-white" />
                          </div>
                        </div>
                      )}
                    </button>

                    <button
                      onClick={() => {
                        if (selectedPlan !== "subscribe-3" && selectedPlan !== "subscribe-2") setSelectedPlan("subscribe-2");
                      }}
                      className={`flex-1 relative rounded-xl border-2 p-3 transition-all duration-200 text-left ${
                        selectedPlan === "subscribe-3" || selectedPlan === "subscribe-2"
                          ? "border-[#B45309]/30 bg-amber-50/60"
                          : "border-stone-200 bg-stone-50 opacity-60 cursor-pointer hover:border-stone-300"
                      }`}
                    >
                      {selectedPlan !== "subscribe-3" && selectedPlan !== "subscribe-2" && (
                        <div className="absolute top-2 right-2"><Lock size={12} className="text-stone-400" /></div>
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

                {/* Orange Gradient CTA Button (ported from homepage) */}
                <button
                  onClick={handleAddToCart}
                  className="group relative w-full py-4 rounded-full text-base font-bold text-white overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgba(180,83,9,0.4)] hover:scale-[1.02] active:scale-[0.98]"
                  style={{ background: "linear-gradient(135deg, #B45309 0%, #D97706 50%, #B45309 100%)", backgroundSize: "200% 200%" }}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                  <span className="relative z-10 flex items-center justify-center gap-2 uppercase tracking-wide">
                    {selectedPlan === "one-time"
                      ? `BUY NOW — $${plans["one-time"].price}`
                      : `START MY ${currentPlan.label.toUpperCase()} — $${currentPlan.perMonth}/MO`}
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>

                {/* Discount + Trust badges + Shipping (ported from homepage) */}
                <div className="flex items-center justify-center gap-2 mt-3 mb-3">
                  <Check size={14} className="text-emerald-600" />
                  <span className="text-xs text-[#78716C]">Limited Time Discount Auto-Applied</span>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[
                    { icon: ShieldCheck, label: "30-Day Keep-the-Bottle Guarantee" },
                    { icon: Truck, label: "Free Shipping" },
                    { icon: RotateCcw, label: "Cancel Anytime" },
                  ].map((badge) => (
                    <div key={badge.label} className="flex flex-col items-center gap-1.5 text-center">
                      <badge.icon size={18} className="text-[#B45309]" />
                      <span className="text-[#78716C] text-[11px] font-medium">{badge.label}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center gap-2 text-sm text-[#57534E]">
                    <Truck size={14} className="text-[#78716C]" />
                    <span>Ships to {userRegion} in 4–5 days</span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/60 text-xs font-semibold text-[#92400E]">
                    <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" /><span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" /></span>
                    Faster Shipping due to high demand
                  </span>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ═══════════ WHAT HAPPENS WHEN YOU START — Timeline ═══════════ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#D97706] mb-3 text-center">Your Journey</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-[#1C1917] mb-3">
              What Happens When You Start.
            </h2>
            <p className="text-center text-[#78716C] text-lg mb-14 max-w-2xl mx-auto">
              BrewNectar works immediately and compounds over time. Here's what to expect.
            </p>
          </FadeUp>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                icon: Clock,
                time: "Day 1",
                title: "Immediate Clarity",
                desc: "L-Theanine kicks in within 20 minutes. You'll feel calmer, more present, and focused without the jittery edge of plain coffee.",
                color: "bg-sky-50 border-sky-200/60 text-sky-700",
                iconColor: "text-sky-600",
              },
              {
                icon: Zap,
                time: "Week 1",
                title: "Sharper Focus",
                desc: "Cognizin® begins fueling brain cell membranes. Expect longer focus sessions, fewer distractions, and smoother energy throughout the day.",
                color: "bg-emerald-50 border-emerald-200/60 text-emerald-700",
                iconColor: "text-emerald-600",
              },
              {
                icon: Brain,
                time: "Month 1",
                title: "Better Recall",
                desc: "Lion's Mane promotes nerve growth factor (NGF) production. You'll notice improved memory, faster word retrieval, and reduced brain fog.",
                color: "bg-amber-50 border-amber-200/60 text-amber-700",
                iconColor: "text-[#B45309]",
              },
              {
                icon: TrendingUp,
                time: "Month 3",
                title: "Full Potential",
                desc: "All four ingredients compound. Neurogenesis, sustained energy, calm focus, and cognitive resilience become your new baseline.",
                color: "bg-rose-50 border-rose-200/60 text-rose-700",
                iconColor: "text-rose-600",
              },
            ].map((step, i) => (
              <FadeUp key={step.time} delay={i * 0.1}>
                <div className={`rounded-2xl border p-6 h-full ${step.color}`}>
                  <div className="flex items-center gap-2 mb-3">
                    <step.icon size={20} className={step.iconColor} />
                    <span className="text-xs font-bold uppercase tracking-wider">{step.time}</span>
                  </div>
                  <h3 className="font-display font-bold text-lg text-[#1C1917] mb-2">{step.title}</h3>
                  <p className="text-sm text-[#57534E] leading-relaxed">{step.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.3}>
            <p className="text-center text-sm text-[#A8A29E] mt-8">
              This is why we recommend the 90-Day Supply — to experience the full compounding benefits.
            </p>
          </FadeUp>
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

      {/* ═══════════ COMPARISON CHART (Redesigned — ported from homepage) ═══════════ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#D97706] mb-3 text-center">Why BrewNectar Wins</p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-center text-[#1C1917] mb-3">
              Stop Settling. Start Upgrading.
            </h2>
            <p className="text-center text-[#78716C] text-lg mb-14 max-w-2xl mx-auto">
              Other options force you to compromise — bad taste, new coffee, hidden blends, or sugar crashes. BrewNectar is the only upgrade with zero trade-offs.
            </p>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              <div className="relative rounded-2xl border-2 border-[#B45309] bg-white p-6 md:p-8 shadow-warm">
                <div className="absolute -top-3.5 left-6 px-4 py-1 bg-[#B45309] text-white text-xs font-bold rounded-full uppercase tracking-wide">The Upgrade</div>
                <h3 className="font-display text-2xl font-bold text-[#1C1917] mt-2 mb-1">BrewNectar</h3>
                <p className="text-sm text-[#78716C] mb-5">Add to your existing coffee. Done.</p>
                <div className="space-y-3">
                  {[
                    { text: "Research-backed nootropics (Lion's Mane 1.2g, Cognizin® 250mg)", bold: true },
                    { text: "Works with ANY coffee you already love" },
                    { text: "Zero sugar, zero calories" },
                    { text: "Calm focus without jitters or crash" },
                    { text: "100% transparent label — every mg disclosed" },
                    { text: "Supports neurogenesis & long-term brain health" },
                    { text: "Vanilla bean flavor that actually tastes good" },
                    { text: "From $0.90/day (less than your coffee)" },
                  ].map((item) => (
                    <div key={item.text} className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check size={12} strokeWidth={3} className="text-emerald-600" />
                      </div>
                      <span className={`text-sm ${item.bold ? "font-semibold text-[#1C1917]" : "text-[#44403C]"}`}>{item.text}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t border-stone-100">
                  <div className="flex items-center gap-2">
                    <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} size={12} className="fill-amber-400 text-amber-400" />)}</div>
                    <span className="text-xs font-semibold text-[#1C1917]">4.9/5</span>
                    <span className="text-xs text-[#78716C]">from 2,400+ reviews</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  {
                    name: "Mushroom Coffees",
                    subtitle: "Ryze, Everyday Dose, Four Sigmatic",
                    cons: ["Forces you to switch your coffee", "Earthy taste most people dislike", "Proprietary blends hide real dosages", "48 BBB complaints (Ryze alone)"],
                  },
                  {
                    name: "Sugary Coffee Syrups",
                    subtitle: "Torani, Monin, Starbucks",
                    cons: ["10-15g sugar per pump", "Zero cognitive benefits", "Blood sugar spike → crash", "Empty calories, no function"],
                  },
                  {
                    name: "Nootropic Pills",
                    subtitle: "Alpha Brain, Thesis, etc.",
                    cons: ["Another pill to remember", "Doesn't integrate into your routine", "Often underdosed ingredients", "No ritual, no enjoyment"],
                  },
                ].map((alt) => (
                  <div key={alt.name} className="rounded-xl border border-stone-200 bg-white/60 p-5">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-display font-bold text-[#1C1917] text-sm">{alt.name}</h4>
                        <p className="text-xs text-[#A8A29E]">{alt.subtitle}</p>
                      </div>
                      <span className="text-xs font-semibold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">Trade-offs</span>
                    </div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                      {alt.cons.map((con) => (
                        <div key={con} className="flex items-start gap-1.5">
                          <XIcon size={12} strokeWidth={3} className="text-red-400 flex-shrink-0 mt-0.5" />
                          <span className="text-xs text-[#78716C]">{con}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={0.2}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 p-5 rounded-2xl bg-[#1C1917] text-white">
              <div className="text-center">
                <p className="text-2xl font-display font-bold">4 Clinically-Dosed</p>
                <p className="text-xs text-stone-400">nootropic ingredients</p>
              </div>
              <div className="hidden sm:block w-px h-10 bg-stone-700" />
              <div className="text-center">
                <p className="text-2xl font-display font-bold">$0.90</p>
                <p className="text-xs text-stone-400">per day (90-day plan)</p>
              </div>
              <div className="hidden sm:block w-px h-10 bg-stone-700" />
              <div className="text-center">
                <p className="text-2xl font-display font-bold">30-Day</p>
                <p className="text-xs text-stone-400">keep-the-bottle guarantee</p>
              </div>
              <div className="hidden sm:block w-px h-10 bg-stone-700" />
              <a
                href="#offers"
                onClick={(e) => { e.preventDefault(); document.getElementById('offers')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="px-6 py-2.5 rounded-full bg-[#B45309] hover:bg-[#92400E] text-sm font-bold transition-colors cursor-pointer"
              >
                Try BrewNectar →
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══════════ 30-DAY GUARANTEE DEEP DIVE ═══════════ */}
      <section className="py-16 md:py-24 bg-[#FDFBF7]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="bg-white rounded-3xl border-2 border-emerald-200/60 p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-50 rounded-full -translate-y-1/2 translate-x-1/2 opacity-60" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200/60 flex items-center justify-center">
                    <ShieldCheck size={28} className="text-emerald-600" />
                  </div>
                  <div>
                    <h2 className="font-display text-2xl md:text-3xl font-bold text-[#1C1917]">30-Day Keep-the-Bottle Guarantee</h2>
                    <p className="text-sm text-[#78716C]">Zero risk. We mean it.</p>
                  </div>
                </div>

                <p className="text-[#57534E] text-base leading-relaxed mb-6">
                  Try BrewNectar for a full 30 days. If you don't feel sharper, more focused, and more mentally clear — <strong className="text-[#1C1917]">keep the bottle and we'll refund every penny</strong>. No return shipping. No restocking fees. No awkward phone calls. Just email us and we'll process your refund within 48 hours.
                </p>

                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    { icon: Heart, title: "Keep the Bottle", desc: "Don't even ship it back. It's yours." },
                    { icon: Clock, title: "48-Hour Refunds", desc: "Email us, get your money back in 2 days." },
                    { icon: MessageCircle, title: "No Questions Asked", desc: "We won't grill you. Just a simple email." },
                  ].map((item) => (
                    <div key={item.title} className="bg-emerald-50/50 rounded-xl p-4 border border-emerald-100/60">
                      <item.icon size={20} className="text-emerald-600 mb-2" />
                      <h4 className="font-display font-bold text-sm text-[#1C1917] mb-1">{item.title}</h4>
                      <p className="text-xs text-[#78716C] leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══════════ EXTENDED REVIEWS (ported from homepage) ═══════════ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#D97706] mb-3 text-center">In Their Words</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-[#1C1917] mb-3">
              Real Stories From Real Customers
            </h2>
            <p className="text-center text-[#78716C] text-lg mb-14 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what people are saying after making BrewNectar part of their daily ritual.
            </p>
          </FadeUp>

          <div className="space-y-6">
            {EXTENDED_REVIEWS.map((review, i) => (
              <FadeUp key={review.name} delay={i * 0.08}>
                <div className="bg-[#FDFBF7] border border-stone-100 rounded-2xl p-6 md:p-8 hover:shadow-warm hover:border-amber-100 transition-all duration-300">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex gap-0.5 mb-2">
                        {[...Array(review.rating)].map((_, j) => (
                          <Star key={j} size={14} className="fill-[#D97706] text-[#D97706]" />
                        ))}
                      </div>
                      <h3 className="font-display font-bold text-lg text-[#1C1917]">{review.heading}</h3>
                    </div>
                    <span className="text-xs text-[#A8A29E] whitespace-nowrap mt-1">{review.date}</span>
                  </div>
                  <p className="text-[#57534E] leading-relaxed mb-4 text-sm md:text-base">
                    "{review.text}"
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-stone-100">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
                      <span className="font-display font-bold text-sm text-[#B45309]">{review.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#1C1917]">{review.name}</p>
                      <p className="text-xs text-[#A8A29E]">{review.title} · Verified Buyer</p>
                    </div>
                    <div className="ml-auto">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-[10px] font-semibold text-emerald-700">
                        <Check size={10} /> Verified
                      </span>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ STILL ON THE FENCE? — Objection Handler ═══════════ */}
      <section className="py-16 md:py-24 bg-[#FDFBF7]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#D97706] mb-3 text-center">Still Deciding?</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-[#1C1917] mb-3">
              We Get It. Here's What Others Asked.
            </h2>
            <p className="text-center text-[#78716C] text-lg mb-14 max-w-2xl mx-auto">
              These are the most common hesitations — and why 12,000+ people decided to try it anyway.
            </p>
          </FadeUp>

          <div className="grid sm:grid-cols-2 gap-5">
            {[
              {
                objection: "\"I've tried nootropics before and they didn't work.\"",
                answer: "Most nootropics underdose ingredients or use proprietary blends. BrewNectar uses research-backed doses of patented ingredients (Cognizin®, not generic citicoline) with transparent labeling. Plus, it integrates into your existing coffee — no new habit required.",
                icon: AlertCircle,
              },
              {
                objection: "\"$27/month seems expensive for a syrup.\"",
                answer: "That's $0.90/day — less than a single Starbucks pump. You're getting 4 clinically-dosed nootropics, a free masterclass, and giveaway entries. Compare that to $60-80/month for pills that don't even taste good.",
                icon: ThumbsUp,
              },
              {
                objection: "\"What if I don't like the taste?\"",
                answer: "Smooth vanilla bean with a hint of caramel — zero sugar, zero aftertaste. It enhances your coffee, never masks it. And if you don't love it, keep the bottle and get a full refund.",
                icon: Award,
              },
              {
                objection: "\"I don't want another subscription I'll forget about.\"",
                answer: "Cancel or pause with one click — no phone calls, no fees, no guilt trips. Most members stay because they feel the difference, not because they forgot to cancel.",
                icon: Calendar,
              },
            ].map((item, i) => (
              <FadeUp key={i} delay={i * 0.08}>
                <div className="bg-white rounded-2xl border border-stone-100 p-6 hover:shadow-warm hover:border-amber-100 transition-all duration-300 h-full">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center flex-shrink-0">
                      <item.icon size={18} className="text-[#B45309]" />
                    </div>
                    <p className="font-display font-bold text-sm text-[#1C1917] italic leading-snug">{item.objection}</p>
                  </div>
                  <p className="text-sm text-[#57534E] leading-relaxed pl-12">{item.answer}</p>
                </div>
              </FadeUp>
            ))}
          </div>
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
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white rounded-full transition-all hover:shadow-[0_8px_30px_rgba(180,83,9,0.4)] hover:scale-[1.02]"
              style={{ background: "linear-gradient(135deg, #B45309 0%, #D97706 50%, #B45309 100%)" }}
              onClick={(e) => { e.preventDefault(); document.getElementById('offers')?.scrollIntoView({ behavior: 'smooth' }); }}
            >
              Start Your Subscription
              <ArrowRight size={18} />
            </a>
            <p className="text-xs text-[#A8A29E] mt-3">30-day keep-the-bottle guarantee · Free shipping on subscriptions</p>
          </FadeUp>
        </div>
      </section>

      {/* Spacer for sticky bar */}
      <div className="h-20" />

      {/* Sticky Add to Cart */}
      <div
        className={`sticky-bottom-bar z-50 bg-white/95 backdrop-blur-md border-t border-stone-200 pt-3 px-4 transition-transform duration-500 ${
          showSticky ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ bottom: stickyBottomOffset > 0 ? `${stickyBottomOffset}px` : undefined }}
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
            className="px-6 sm:px-8 py-3 rounded-full font-display font-bold text-sm text-white hover:shadow-[0_8px_30px_rgba(180,83,9,0.4)] transition-all flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #B45309 0%, #D97706 50%, #B45309 100%)" }}
          >
            {selectedPlan === "one-time" ? "Buy Now" : "Subscribe Now"}
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
