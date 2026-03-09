export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center p-8 font-sans">

      {/* Navigation Bar (Simple) */}
      <nav className="absolute top-0 w-full p-6 flex justify-between items-center max-w-6xl mx-auto">
        <div className="font-bold text-xl tracking-tighter">Start Lab</div>
        <a
          href="https://app.startlab.cloud/login"
          className="text-sm font-medium text-zinc-300 hover:text-white transition"
        >
          Sign In
        </a>
      </nav>

      {/* Hero Section */}
      <div className="max-w-4xl text-center space-y-8 mt-12">
        <div className="inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900/50 px-3 py-1 text-sm font-medium text-zinc-300 mb-4">
          ✨ The ultimate AI Co-Founder is here.
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
          Validate your startup <br className="hidden md:block" />
          in <span className="text-indigo-500">seconds.</span>
        </h1>

        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          Stop building in a vacuum. Start Lab uses cutting-edge AI to generate synthetic user personas and conduct deep JTBD interviews instantly. Save weeks of research.
        </p>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* HERE IS YOUR BUTTON POINTING TO THE APP! */}
          <a
            href="https://app.startlab.cloud/login"
            className="bg-white text-black font-semibold px-8 py-4 rounded-full hover:bg-zinc-200 transition-colors text-lg w-full sm:w-auto"
          >
            Start Your Free Sprint
          </a>
          <a
            href="#features"
            className="text-zinc-400 hover:text-white font-medium px-8 py-4 transition-colors"
          >
            Learn more ↓
          </a>
        </div>
      </div>

    </div>
  );
}
