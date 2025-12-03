"use client";

import { useSearchParams } from "next/navigation";

export default function ResultPage() {
  const params = useSearchParams();
  const img = params.get("img");

  // Бесплатный мини-анализ (hook version)
  const freeVibe = "Your energy feels calm, open and naturally warm.";
  const freeArchetype = "Soft Magnetism";
  const freeImpression = "People see you as approachable and safe.";

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center text-white px-6">

      {/* BACKGROUND AURA */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30 -z-10">
        <div className="w-[900px] h-[900px] rounded-full bg-gradient-to-br from-[#4a7cff33] via-[#8456ff33] to-[#ff45ff22] blur-[140px]" />
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-2xl w-full text-center animate-fade">

        <h1 className="text-5xl font-bold mb-8 drop-shadow-[0_0_20px_rgba(255,255,255,0.35)]">
          Your Aura Reading
        </h1>

        {/* USER PHOTO */}
        {img && (
          <img
            src={img}
            alt="Your Photo"
            className="w-56 h-56 mx-auto rounded-2xl object-cover shadow-[0_0_25px_rgba(160,200,255,0.4)] mb-10"
          />
        )}

        {/* FREE ANALYSIS CARD */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-8 rounded-2xl shadow-[0_0_30px_rgba(130,150,255,0.2)] mb-10 text-left">

          <h2 className="text-2xl font-semibold mb-4">Free Aura Summary</h2>

          <p className="text-gray-300 mb-4">
            <strong>Energy:</strong> {freeVibe}
          </p>

          <p className="text-gray-300 mb-4">
            <strong>Archetype:</strong> {freeArchetype}
          </p>

          <p className="text-gray-300 mb-4">
            <strong>First Impression:</strong> {freeImpression}
          </p>

          <p className="text-gray-400 mt-6">
            Unlock the full 7-parameter attractiveness breakdown, deep emotional aura reading, opposite-gender perception, your personal archetype, and expert improvement advice.
          </p>
        </div>

        {/* PREMIUM BUTTON */}
        <button
          onClick={() =>
            window.location.href = "/paywall?img=" + encodeURIComponent(img)
          }
          className="btn-premium w-full max-w-xs mx-auto py-4 text-xl font-semibold rounded-2xl transition-all mb-8"
        >
          See Full Analysis
        </button>

        {/* BACK BUTTON */}
        <a
          href="/"
          className="block text-center text-gray-400 hover:text-gray-200 transition"
        >
          Back Home
        </a>
      </div>
    </div>
  );
}
