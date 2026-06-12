/*
  BrewNectar Contact Page — Warm Light Theme
  Simple contact form + info, brand-aligned
*/
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { Mail, Clock, MessageCircle } from "lucide-react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setName("");
      setEmail("");
      setMessage("");
      toast.success("Message sent!", { description: "We'll get back to you within 24 hours." });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#D97706] mb-4">Get in Touch</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-[#1C1917] mb-4 leading-tight">
            We're Here to Help.
          </h1>
          <p className="text-lg text-[#57534E] max-w-xl mx-auto">
            Have a question about your order, ingredients, or subscription? Reach out and we'll get back to you quickly.
          </p>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="pb-20 md:pb-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-5 gap-8 md:gap-12">
            {/* Info Cards */}
            <div className="md:col-span-2 space-y-5">
              {[
                {
                  icon: Mail,
                  title: "Email Us",
                  desc: "support@brewnectar.com",
                  sub: "We respond within 24 hours",
                },
                {
                  icon: Clock,
                  title: "Hours",
                  desc: "Mon–Fri, 9am–5pm EST",
                  sub: "Excluding US holidays",
                },
                {
                  icon: MessageCircle,
                  title: "Live Chat",
                  desc: "Available on our site",
                  sub: "Mon–Fri during business hours",
                },
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-2xl border border-stone-100 p-5 shadow-warm">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center flex-shrink-0">
                      <item.icon size={18} className="text-[#D97706]" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-sm text-[#1C1917]">{item.title}</h3>
                      <p className="text-sm text-[#57534E] mt-0.5">{item.desc}</p>
                      <p className="text-xs text-[#A8A29E] mt-1">{item.sub}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            <div className="md:col-span-3">
              <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-stone-100 p-6 md:p-8 shadow-warm">
                <h2 className="font-display font-bold text-xl text-[#1C1917] mb-6">Send Us a Message</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#57534E] mb-1.5">Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full px-4 py-3 text-sm bg-[#FDFBF7] border border-stone-200 rounded-xl focus:outline-none focus:border-amber-300 focus:ring-2 focus:ring-amber-100 text-[#1C1917] placeholder:text-[#A8A29E]"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#57534E] mb-1.5">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 text-sm bg-[#FDFBF7] border border-stone-200 rounded-xl focus:outline-none focus:border-amber-300 focus:ring-2 focus:ring-amber-100 text-[#1C1917] placeholder:text-[#A8A29E]"
                      placeholder="you@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#57534E] mb-1.5">Message</label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      rows={5}
                      className="w-full px-4 py-3 text-sm bg-[#FDFBF7] border border-stone-200 rounded-xl focus:outline-none focus:border-amber-300 focus:ring-2 focus:ring-amber-100 text-[#1C1917] placeholder:text-[#A8A29E] resize-none"
                      placeholder="How can we help?"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full py-3.5 bg-[#1C1917] text-white font-semibold rounded-xl hover:bg-[#292524] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {sending ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
