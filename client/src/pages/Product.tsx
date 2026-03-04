/*
  BrewNectar Product Page — Warm Light Theme
  Features: Sticky add-to-cart, subscription toggle, bundle options,
  urgency triggers, ingredient details, reviews summary
*/
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { motion, useInView } from "framer-motion";
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
  Minus,
  Plus,
  ChevronDown,
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
  hero: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030542116/gR7c7MRQNrXJ4W4LDnTdRi/hero-bright-TZynNw86MPFthaxzmzbNEA.webp",
  pour: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030542116/gR7c7MRQNrXJ4W4LDnTdRi/lifestyle-pour-bright-Gx24uHuFzUnhzZ4wLHqXvY.webp",
  desk: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030542116/gR7c7MRQNrXJ4W4LDnTdRi/lifestyle-desk-a3PoRPuCPqDsqnXXGkxfTf.webp",
  study: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030542116/gR7c7MRQNrXJ4W4LDnTdRi/lifestyle-study-VCPJqRSFsqtPLCpCfwFqJi.webp",
};

type BundleOption = "1-pack" | "2-pack" | "3-pack";

export default function Product() {
  const [isSubscription, setIsSubscription] = useState(true);
  const [bundle, setBundle] = useState<BundleOption>("1-pack");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showSticky, setShowSticky] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const images = [IMAGES.hero, IMAGES.pour, IMAGES.desk, IMAGES.study];

  const pricing: Record<BundleOption, { one: number; sub: number; label: string; savings: string }> = {
    "1-pack": { one: 40, sub: 34, label: "1 Bottle", savings: "" },
    "2-pack": { one: 76, sub: 64, label: "2 Bottles", savings: "Save $4" },
    "3-pack": { one: 108, sub: 90, label: "3 Bottles", savings: "Save $12" },
  };

  const currentPrice = isSubscription ? pricing[bundle].sub : pricing[bundle].one;

  useEffect(() => {
    const handleScroll = () => setShowSticky(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAddToCart = () => {
    toast.success("Added to cart!", {
      description: `${pricing[bundle].label} (${isSubscription ? "Subscription" : "One-time"}) × ${quantity}`,
    });
  };

  const productFaqs = [
    { q: "How many servings per bottle?", a: "Each bottle contains 30 servings — one tablespoon per day for a full month of cognitive support." },
    { q: "What does it taste like?", a: "Smooth vanilla bean with a hint of caramel sweetness. Zero sugar. Pairs perfectly with any coffee — hot, iced, or cold brew." },
    { q: "Can I cancel my subscription?", a: "Absolutely. Cancel anytime with one click. No contracts, no fees, no hassle." },
    { q: "How should I store it?", a: "Store in a cool, dry place. Refrigerate after opening for best freshness. Good for 60 days after opening." },
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <Navbar />

      {/* Ticker spacer */}
      <div className="h-8 bg-[#1C1917]" />
      <style>{`nav.fixed { top: 32px !important; }`}</style>

      {/* Main Product Section */}
      <section className="pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left: Image Gallery */}
            <div>
              <div className="relative rounded-2xl overflow-hidden aspect-square mb-4 bg-stone-50">
                <img
                  src={images[selectedImage]}
                  alt="BrewNectar product"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-3">
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
            </div>

            {/* Right: Product Info & Purchase */}
            <div className="lg:pt-4">
              {/* Breadcrumb */}
              <p className="text-[#A8A29E] text-sm mb-4">
                <a href="/" className="hover:text-[#78716C] transition-colors">Home</a>
                <span className="mx-2">/</span>
                <span className="text-[#78716C]">BrewNectar</span>
              </p>

              {/* Title */}
              <h1 className="font-display font-bold text-4xl sm:text-5xl text-[#1C1917] mb-2">
                BrewNectar
              </h1>
              <p className="font-display font-semibold text-lg text-[#B45309] mb-4">
                Nootropic Coffee Syrup — Vanilla Bean
              </p>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="text-[#D97706] fill-[#D97706]" />
                  ))}
                </div>
                <span className="text-[#78716C] text-sm">4.9 (2,400+ reviews)</span>
              </div>

              {/* Low stock urgency */}
              <div className="flex items-center gap-2 mb-6 px-4 py-2.5 rounded-lg bg-rose-50 border border-rose-200 w-fit">
                <Clock size={16} className="text-rose-600" />
                <span className="text-rose-700 text-sm font-semibold">Only 47 left in stock — order soon</span>
              </div>

              {/* Purchase Type Toggle */}
              <div className="mb-6">
                <p className="text-[#78716C] text-sm font-medium mb-3">Purchase type</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setIsSubscription(true)}
                    className={`flex-1 p-4 rounded-xl border-2 transition-all text-left ${
                      isSubscription
                        ? "border-[#B45309] bg-amber-50"
                        : "border-stone-200 hover:border-stone-300"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-display font-bold text-[#1C1917] text-sm">Subscribe & Save</span>
                      <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">-15%</span>
                    </div>
                    <p className="text-[#A8A29E] text-xs">Free shipping. Cancel anytime.</p>
                  </button>
                  <button
                    onClick={() => setIsSubscription(false)}
                    className={`flex-1 p-4 rounded-xl border-2 transition-all text-left ${
                      !isSubscription
                        ? "border-[#B45309] bg-amber-50"
                        : "border-stone-200 hover:border-stone-300"
                    }`}
                  >
                    <span className="font-display font-bold text-[#1C1917] text-sm">One-time Purchase</span>
                    <p className="text-[#A8A29E] text-xs mt-1">Standard shipping.</p>
                  </button>
                </div>
              </div>

              {/* Bundle Options */}
              <div className="mb-6">
                <p className="text-[#78716C] text-sm font-medium mb-3">Bundle & save more</p>
                <div className="grid grid-cols-3 gap-3">
                  {(["1-pack", "2-pack", "3-pack"] as BundleOption[]).map((b) => (
                    <button
                      key={b}
                      onClick={() => setBundle(b)}
                      className={`p-3 rounded-xl border-2 transition-all text-center ${
                        bundle === b
                          ? "border-[#B45309] bg-amber-50"
                          : "border-stone-200 hover:border-stone-300"
                      }`}
                    >
                      <span className="font-display font-bold text-[#1C1917] text-sm block">{pricing[b].label}</span>
                      {pricing[b].savings && (
                        <span className="text-emerald-700 text-xs font-medium">{pricing[b].savings}</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <p className="text-[#78716C] text-sm font-medium mb-3">Quantity</p>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg border border-stone-200 flex items-center justify-center text-[#78716C] hover:bg-stone-50 transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="font-display font-bold text-[#1C1917] text-lg w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-lg border border-stone-200 flex items-center justify-center text-[#78716C] hover:bg-stone-50 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="font-display font-bold text-4xl text-[#1C1917]">${currentPrice * quantity}</span>
                {isSubscription && (
                  <span className="text-[#A8A29E] line-through text-lg">${pricing[bundle].one * quantity}</span>
                )}
                {isSubscription && (
                  <span className="text-sm text-[#78716C]">/ {bundle === "1-pack" ? "month" : "delivery"}</span>
                )}
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                className="w-full py-4 rounded-full bg-[#1C1917] font-display font-bold text-lg text-white hover:bg-[#292524] hover:shadow-lg transition-all mb-3"
              >
                {isSubscription ? "Start Subscription" : "Add to Cart"}
              </button>
              <p className="text-[#A8A29E] text-xs text-center mb-8">
                Zero sugar. 30 servings. Ships in 24 hours.
              </p>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { icon: <Truck size={20} />, label: "Free Shipping" },
                  { icon: <ShieldCheck size={20} />, label: "30-Day Guarantee" },
                  { icon: <RotateCcw size={20} />, label: "Easy Returns" },
                ].map((badge) => (
                  <div key={badge.label} className="flex flex-col items-center gap-2 text-center">
                    <div className="text-[#B45309]">{badge.icon}</div>
                    <span className="text-[#78716C] text-xs">{badge.label}</span>
                  </div>
                ))}
              </div>

              {/* Ingredient highlights */}
              <div className="bg-stone-50 border border-stone-100 rounded-2xl p-6">
                <h3 className="font-display font-bold text-[#1C1917] mb-4">What's Inside</h3>
                <div className="space-y-3">
                  {[
                    { icon: <Brain size={16} />, name: "Lion's Mane", benefit: "Supports neurogenesis", color: "text-[#B45309]" },
                    { icon: <Zap size={16} />, name: "Cognizin\u00AE (Citicoline)", benefit: "Faster recall", color: "text-emerald-600" },
                    { icon: <Sparkles size={16} />, name: "L-Theanine", benefit: "Calm focus", color: "text-sky-600" },
                    { icon: <Coffee size={16} />, name: "B Vitamins", benefit: "Clean energy", color: "text-rose-600" },
                  ].map((ing) => (
                    <div key={ing.name} className="flex items-center gap-3">
                      <div className={ing.color}>{ing.icon}</div>
                      <span className="text-[#1C1917] text-sm font-medium">{ing.name}</span>
                      <span className="text-[#A8A29E] text-sm ml-auto">{ing.benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <h2 className="font-display font-bold text-3xl text-[#1C1917] text-center mb-10">Product Questions</h2>
          </FadeUp>
          <div className="space-y-0">
            {productFaqs.map((faq, i) => (
              <FadeUp key={i} delay={i * 0.08}>
                <div className="border-b border-stone-200">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between py-5 text-left group"
                  >
                    <span className="font-display font-semibold text-[#1C1917] text-base pr-4 group-hover:text-[#B45309] transition-colors">{faq.q}</span>
                    <div className={`w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center flex-shrink-0 transition-all ${openFaq === i ? "bg-[#1C1917] border-[#1C1917] rotate-180" : "group-hover:border-stone-300"}`}>
                      <ChevronDown size={16} className={openFaq === i ? "text-white" : "text-[#78716C]"} />
                    </div>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{ height: openFaq === i ? "auto" : 0, opacity: openFaq === i ? 1 : 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 text-[#78716C] leading-relaxed text-sm pr-12">{faq.a}</p>
                  </motion.div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Sticky Add to Cart */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-stone-200 p-4 transition-transform duration-500 ${
          showSticky ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-4">
          <div>
            <p className="font-display font-bold text-[#1C1917] text-lg">${currentPrice * quantity}</p>
            <p className="text-[#A8A29E] text-xs">
              {isSubscription ? "Subscription" : "One-time"} · {pricing[bundle].label}
            </p>
          </div>
          <button
            onClick={handleAddToCart}
            className="px-8 py-3 rounded-full bg-[#1C1917] font-display font-bold text-sm text-white hover:bg-[#292524] hover:shadow-lg transition-all"
          >
            {isSubscription ? "Subscribe Now" : "Add to Cart"}
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
