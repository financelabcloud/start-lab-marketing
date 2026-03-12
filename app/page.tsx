"use client";

import { useState } from "react";
import { Beaker, Users, FileText, ArrowRight, CheckCircle2 } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

// --- FIX 1: Initialize Supabase ---
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  // --- FIX 2: Define isLoading state ---
  const [isLoading, setIsLoading] = useState(false);

  const handleWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);

    try {
      // 1. Save permanently to Supabase
      const { error } = await supabase
        .from('waitlist')
        .insert([{ email: email }]);

      // Ignore if they are already on the list (duplicate email)
      if (error && error.code !== '23505') throw error;

      // 2. Trigger the Resend API (Sends email + adds to Contacts)
      await fetch('/api/welcome', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email }),
      });

      // 3. Show Success UI
      setSubmitted(true);
      setEmail("");
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-indigo-500/30">

      {/* Navigation Bar */}
      <nav className="w-full p-6 flex justify-between items-center max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <Beaker className="w-6 h-6 text-indigo-500" />
          <div className="font-bold text-xl tracking-tighter">Start Lab</div>
        </div>
        <a
          href="https://app.startlab.cloud/login"
          className="text-sm font-medium text-zinc-300 hover:text-white transition"
        >
          Sign In
        </a>
      </nav>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto text-center px-6 pt-20 pb-32">
        <div className="inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900/50 px-4 py-1.5 text-sm font-medium text-zinc-300 mb-8">
          <span className="flex h-2 w-2 rounded-full bg-indigo-500 mr-2 animate-pulse"></span>
          The ultimate AI Co-Founder is here.
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight mb-6">
          Validate your startup <br className="hidden md:block" />
          in <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">seconds.</span>
        </h1>

        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-10">
          Stop building in a vacuum. Start Lab uses cutting-edge AI to generate synthetic user personas and conduct deep JTBD interviews instantly. Save weeks of research.
        </p>

        <a
          href="https://app.startlab.cloud/login"
          className="inline-flex items-center justify-center bg-white text-black font-semibold px-8 py-4 rounded-full hover:bg-zinc-200 transition-colors text-lg shadow-[0_0_40px_-10px_rgba(99,102,241,0.5)] hover:shadow-[0_0_60px_-15px_rgba(99,102,241,0.7)]"
        >
          Start Your Free Sprint <ArrowRight className="ml-2 w-5 h-5" />
        </a>
      </section>

      {/* How It Works Section (The 3 Cards) */}
      <section className="bg-zinc-900/30 border-y border-zinc-800 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">How the Lab Works</h2>
            <p className="text-zinc-400">From raw idea to hard data in three steps.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-2xl hover:border-zinc-700 transition-colors">
              <div className="w-12 h-12 bg-indigo-500/10 text-indigo-400 rounded-xl flex items-center justify-center mb-6">
                <Beaker className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">1. The Idea Roast</h3>
              <p className="text-zinc-400 leading-relaxed">
                Input your raw problem and solution. Our AI Product Manager will brutally roast your concept to find the true Job-To-Be-Done.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-2xl hover:border-zinc-700 transition-colors">
              <div className="w-12 h-12 bg-cyan-500/10 text-cyan-400 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">2. Synthetic Personas</h3>
              <p className="text-zinc-400 leading-relaxed">
                We instantly generate 5 distinct, highly-realistic AI personas from your target demographic, complete with budgets and biases.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-2xl hover:border-zinc-700 transition-colors">
              <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center mb-6">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">3. Instant Interviews</h3>
              <p className="text-zinc-400 leading-relaxed">
                Watch the platform interview your synthetic users concurrently to discover exact objections and output a beautiful PDF report.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Waitlist / Footer Section */}
      <section className="py-24 px-6 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold tracking-tight mb-4">Not ready to validate today?</h2>
        <p className="text-zinc-400 mb-8">
          Join the waitlist. We will email you when we release new AI Co-Founder features and advanced incubator tools. No spam, ever.
        </p>

        {submitted ? (
          <div className="flex items-center justify-center gap-2 text-emerald-400 bg-emerald-400/10 py-4 px-6 rounded-full border border-emerald-400/20 w-fit mx-auto">
            <CheckCircle2 className="w-5 h-5" />
            {/* --- FIX 3: Escaped Apostrophe --- */}
            <span className="font-medium">You&apos;re on the list! Keep building.</span>
          </div>
        ) : (
          <form onSubmit={handleWaitlist} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              placeholder="founder@startup.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors whitespace-nowrap disabled:opacity-50"
            >
              {isLoading ? "Joining..." : "Get Updates"}
            </button>
          </form>
        )}
      </section>

      {/* Very Simple Footer */}
      <footer className="border-t border-zinc-900 py-8 text-center text-zinc-600 text-sm">
        <p>© {new Date().getFullYear()} Start Lab. Built for founders.</p>
      </footer>

    </div>
  );
}
