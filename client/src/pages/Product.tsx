/*
  BrewNectar Product Page — Liquid Intelligence Design
  ─────────────────────────────────────────────────────
  Features: Sticky add-to-cart, subscription toggle, bundle options,
  urgency triggers, ingredient details, reviews summary
*/
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  Star,
  Brain,
  Zap,
  Droplets,
  ShieldCheck,
  Truck,
  RotateCcw,
  Clock,
  Check,
  Minus,
  Plus,
  ChevronDown,
} from "lucide-react";

const IMAGES = {
  hero: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030542116/gR7c7MRQNrXJ4W4LDnTdRi/hero-product-fTBMe6K7Tpmr7YK6streUJ.webp",
  desk: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030542116/gR7c7MRQNrXJ4W4LDnTdRi/lifestyle-desk-P3cQoDsRb6Wnv5xUDSxXs3.webp",
  study: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030542116/gR7c7MRQNrXJ4W4LDnTdRi/lifestyle-study-4piPsQnS6QtqZwzTtSEC6f.webp",
  gym: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030542116/gR7c7MRQNrXJ4W4LDnTdRi/lifestyle-gym-dqoMaovNTiRCtBVpgRbtfx.webp",
};

function FadeUp({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <div ref={ref} className={`fade-up ${isVisible ? "visible" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

type BundleOption = "1-pack" | "2-pack" | "3-pack";

export default function Product() {
  const [isSubscription, setIsSubscription] = useState(true);
  const [bundle, setBundle] = useState<BundleOption>("1-pack");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showSticky, setShowSticky] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const images = [IMAGES.hero, IMAGES.desk, IMAGES.study, IMAGES.gym];

  const pricing: Record<BundleOption, { one: number; sub: number; label: string; savings: string }> = {
    "1-pack": { one: 40, sub: 34, label: "1 Bottle", savings: "" },
    "2-pack": { one: 76, sub: 64, label: "2 Bottles", savings: "Save $4" },
    "3-pack": { one: 108, sub: 90, label: "3 Bottles", savings: "Save $12" },
  };

  const currentPrice = isSubscription ? pricing[bundle].sub : pricing[bundle].one;

  // Sticky cart visibility
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
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Main Product Section */}
      <section className="pt-28 pb-16">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left: Image Gallery */}
            <div>
              <div className="relative rounded-2xl overflow-hidden aspect-square mb-4 bg-indigo-deep/30">
                <div className="absolute inset-0 blur-[60px] bg-gradient-to-br from-violet/20 to-rose-neon/10" />
                <img
                  src={images[selectedImage]}
                  alt="BrewNectar product"
                  className="relative z-10 w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-3">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`rounded-xl overflow-hidden aspect-square border-2 transition-all ${
                      selectedImage === i
                        ? "border-violet ring-2 ring-violet/30"
                        : "border-white/10 hover:border-white/20"
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
              <p className="text-white/30 text-sm mb-4">
                <a href="/" className="hover:text-white/50 transition-colors">Home</a>
                <span className="mx-2">/</span>
                <span className="text-white/50">BrewNectar</span>
              </p>

              {/* Title */}
              <h1 className="font-display font-900 text-4xl sm:text-5xl text-white mb-2">
                BrewNectar
              </h1>
              <p className="text-violet-soft font-display font-semibold text-lg mb-4">
                Nootropic Coffee Syrup — Vanilla Bean
              </p>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <span className="text-white/50 text-sm">4.9 (2,400+ reviews)</span>
              </div>

              {/* Low stock urgency */}
              <div className="flex items-center gap-2 mb-6 px-4 py-2.5 rounded-lg bg-rose-neon/10 border border-rose-neon/20 w-fit">
                <Clock size={16} className="text-rose-neon" />
                <span className="text-rose-neon text-sm font-semibold">Only 47 left in stock — order soon</span>
              </div>

              {/* Purchase Type Toggle */}
              <div className="mb-6">
                <p className="text-white/50 text-sm font-medium mb-3">Purchase type</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setIsSubscription(true)}
                    className={`flex-1 p-4 rounded-xl border-2 transition-all text-left ${
                      isSubscription
                        ? "border-violet bg-violet/10"
                        : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-display font-bold text-white text-sm">Subscribe & Save</span>
                      <span className="text-xs font-semibold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">-15%</span>
                    </div>
                    <p className="text-white/40 text-xs">Free shipping. Cancel anytime.</p>
                  </button>
                  <button
                    onClick={() => setIsSubscription(false)}
                    className={`flex-1 p-4 rounded-xl border-2 transition-all text-left ${
                      !isSubscription
                        ? "border-violet bg-violet/10"
                        : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    <span className="font-display font-bold text-white text-sm">One-time Purchase</span>
                    <p className="text-white/40 text-xs mt-1">Standard shipping.</p>
                  </button>
                </div>
              </div>

              {/* Bundle Options */}
              <div className="mb-6">
                <p className="text-white/50 text-sm font-medium mb-3">Bundle & save more</p>
                <div className="grid grid-cols-3 gap-3">
                  {(["1-pack", "2-pack", "3-pack"] as BundleOption[]).map((b) => (
                    <button
                      key={b}
                      onClick={() => setBundle(b)}
                      className={`p-3 rounded-xl border-2 transition-all text-center ${
                        bundle === b
                          ? "border-violet bg-violet/10"
                          : "border-white/10 hover:border-white/20"
                      }`}
                    >
                      <span className="font-display font-bold text-white text-sm block">{pricing[b].label}</span>
                      {pricing[b].savings && (
                        <span className="text-emerald-400 text-xs font-medium">{pricing[b].savings}</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <p className="text-white/50 text-sm font-medium mb-3">Quantity</p>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center text-white/60 hover:bg-white/5 transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="font-display font-bold text-white text-lg w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center text-white/60 hover:bg-white/5 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="font-display font-900 text-4xl text-white">${currentPrice * quantity}</span>
                {isSubscription && (
                  <span className="text-white/30 line-through text-lg">${pricing[bundle].one * quantity}</span>
                )}
                {isSubscription && (
                  <span className="text-sm text-white/40">/ {bundle === "1-pack" ? "month" : "delivery"}</span>
                )}
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                className="w-full py-4 rounded-full bg-gradient-to-r from-rose-neon to-violet font-display font-bold text-lg text-white btn-glow hover:scale-[1.02] transition-transform mb-3"
              >
                {isSubscription ? "Start Subscription" : "Add to Cart"}
              </button>
              <p className="text-white/30 text-xs text-center mb-8">
                Zero sugar. 30 servings. Ships in 24 hours.
              </p>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { icon: <Truck size={20} />, label: "Free Shipping" },
                  { icon: <ShieldCheck size={20} />, label: "30-Day Guarantee" },
                  { icon: <RotateCcw size={20} />, label: "Cancel Anytime" },
                ].map((badge) => (
                  <div key={badge.label} className="flex flex-col items-center gap-2 text-center">
                    <div className="text-violet-soft">{badge.icon}</div>
                    <span className="text-white/50 text-xs">{badge.label}</span>
                  </div>
                ))}
              </div>

              {/* Ingredient highlights */}
              <div className="glass-card p-6">
                <h3 className="font-display font-bold text-white mb-4">What's Inside</h3>
                <div className="space-y-3">
                  {[
                    { icon: <Brain size={16} />, name: "Lion's Mane", benefit: "Supports neurogenesis" },
                    { icon: <Zap size={16} />, name: "Cognizin® (Citicoline)", benefit: "Faster recall" },
                    { icon: <Droplets size={16} />, name: "L-Theanine", benefit: "Calm focus" },
                    { icon: <ShieldCheck size={16} />, name: "B Vitamins", benefit: "Clean energy" },
                  ].map((ing) => (
                    <div key={ing.name} className="flex items-center gap-3">
                      <div className="text-violet-soft">{ing.icon}</div>
                      <span className="text-white text-sm font-medium">{ing.name}</span>
                      <span className="text-white/40 text-sm ml-auto">{ing.benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product FAQ */}
      <section className="py-16">
        <div className="container max-w-2xl">
          <FadeUp>
            <h2 className="font-display font-800 text-3xl text-white text-center mb-10">Product Questions</h2>
          </FadeUp>
          <div className="space-y-3">
            {productFaqs.map((faq, i) => (
              <FadeUp key={i} delay={i * 80}>
                <div className="glass-card overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <span className="font-display font-semibold text-white text-sm pr-4">{faq.q}</span>
                    <ChevronDown
                      size={18}
                      className={`text-white/40 shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`}
                    />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? "max-h-40 pb-5" : "max-h-0"}`}>
                    <p className="px-5 text-white/50 leading-relaxed text-sm">{faq.a}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Sticky Add to Cart (mobile) */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 glass-card-strong border-t border-white/10 p-4 transition-transform duration-500 ${
          showSticky ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="container flex items-center justify-between gap-4">
          <div>
            <p className="font-display font-bold text-white text-lg">${currentPrice * quantity}</p>
            <p className="text-white/40 text-xs">
              {isSubscription ? "Subscription" : "One-time"} · {pricing[bundle].label}
            </p>
          </div>
          <button
            onClick={handleAddToCart}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-rose-neon to-violet font-display font-bold text-sm text-white btn-glow hover:scale-105 transition-transform"
          >
            {isSubscription ? "Subscribe Now" : "Add to Cart"}
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
