/*
  BrewNectar Contact Page — Warm Light Theme
  Simple contact form + hours, brand-aligned
*/
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { Clock } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const submitMutation = trpc.contact.submit.useMutation({
    onSuccess: () => {
      setSending(false);
      setName("");
      setEmail("");
      setMessage("");
      toast.success("Message sent!", { description: "We'll get back to you within 24 hours." });
    },
    onError: () => {
      setSending(false);
      toast.error("Failed to send", { description: "Please try again later." });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    submitMutation.mutate({ name, email, message });
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#D97706] mb-4">Get in Touch</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-[#1C1917] mb-4 leading-tight">
            Send Us a Message.
          </h1>
          <p className="text-lg text-[#57534E] max-w-xl mx-auto">
            Have a question about your order, ingredients, or subscription? We'll get back to you quickly.
          </p>
        </div>
      </section>

      {/* Form + Hours */}
      <section className="pb-20 md:pb-28">
        <div className="max-w-lg mx-auto px-4 sm:px-6">
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-stone-100 p-6 md:p-8 shadow-warm">
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

            {/* Hours */}
            <div className="mt-6 pt-5 border-t border-stone-100 flex items-center gap-3">
              <Clock size={16} className="text-[#D97706] flex-shrink-0" />
              <p className="text-sm text-[#78716C]">
                <span className="font-medium text-[#57534E]">Hours:</span> Mon–Fri, 9am–5pm EST (excluding US holidays)
              </p>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
