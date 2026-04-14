/*
  BrewNectar Navbar — Warm Light Theme
  Clean white background, warm amber accents, elegant typography
*/
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileOpen(false);
    if (location !== "/") {
      window.location.href = `/#${id}`;
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const navLinks = [
    { label: "Science", id: "clinical-studies" },
    { label: "How It Works", id: "how-it-works" },
    { label: "Reviews", id: "social-proof" },
    { label: "FAQ", id: "faq" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/92 backdrop-blur-md shadow-[0_1px_12px_rgba(180,140,80,0.08)] border-b border-amber-100/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-[72px]">
          {/* Logo */}
          <a
            href="/"
            onClick={(e) => {
              if (location === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="font-display text-xl md:text-2xl font-bold tracking-tight text-[#1C1917] cursor-pointer"
          >
            BrewNectar
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-sm font-medium text-[#57534E] hover:text-[#B45309] transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <Link
              href="/product"
              className="inline-flex items-center px-5 py-2.5 text-sm font-semibold text-white bg-[#1C1917] rounded-full hover:bg-[#292524] transition-all hover:shadow-lg"
            >
              Shop Now
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center"
            aria-label="Toggle menu"
          >
            <div className="space-y-1.5">
              <span className={`block w-6 h-0.5 bg-[#1C1917] transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-6 h-0.5 bg-[#1C1917] transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`block w-6 h-0.5 bg-[#1C1917] transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-amber-100/40 px-4 pb-6 pt-2" style={{ marginTop: 0 }}>
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="block w-full text-left py-3 text-base font-medium text-[#57534E] hover:text-[#B45309] transition-colors border-b border-stone-100 last:border-0"
            >
              {link.label}
            </button>
          ))}
          <Link
            href="/product"
            onClick={() => setMobileOpen(false)}
            className="mt-4 block text-center px-5 py-3 text-sm font-semibold text-white bg-[#1C1917] rounded-full"
          >
            Shop Now
          </Link>
        </div>
      )}
    </nav>
  );
}
