"use client";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function ResultPage() {
  const params = useSearchParams();
  const img = params.get("img");
  const blob = params.get("blob");

  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function runAnalysis() {
      setLoading(true);

      try {
        const res = await fetch("/api/free-analysis", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            img: img || blob || null
          }),
        });

        const data = await res.json();
        setAnalysis(data.analysis);
      } catch (e) {
        setAnalysis("Error loading analysis. Try again.");
      }

      setLoading(false);
    }

    runAnalysis();
  }, [img, blob]);

  const finalImg = blob || img;

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center text-white px-6">

      <div className="absolute inset-0 flex items-center justify-center opacity-30 -z-10">
        <div className="w-[900px] h-[900px] rounded-full 
        bg-gradient-to-br from-[#4a7cff33] via-[#8456ff33] to-[#ff45ff22] 
        blur-[160px]" />
      </div>

      <div className="max-w-2xl w-full text-center animate-fade">

        <h1 className="text-5xl font-bold mb-8 drop-shadow-[0_0_20px_rgba(255,255,255,0.35)]">
          Your Aura Reading
        </h1>

        {finalImg && (
          <img
            src={finalImg}
            alt="Your Photo"
            className="w-56 h-56 mx-auto rounded-2xl object-cover 
            shadow-[0_0_25px_rgba(160,200,255,0.4)] mb-10"
          />
        )}

        <div className="backdrop-blur-xl bg-white/5 border border-white/10 
        p-8 rounded-2xl shadow-[0_0_30px_rgba(130,150,255,0.2)] mb-10 text-left">

          <h2 className="text-2xl font-semibold mb-4">Free Aura Summary</h2>

          {loading ? (
            <p className="text-gray-300 animate-pulse">
              Analyzing your energy…
            </p>
          ) : (
            <p className="text-gray-300 whitespace-pre-line leading-relaxed text-lg">
              {analysis}
            </p>
          )}

          <p className="text-gray-400 mt-6 text-sm">
            Unlock deeper 7-parameter attractiveness insights,
            emotional aura reading, opposite-gender perception,
            personal archetype and improvement advice.
          </p>
        </div>

        <button
          onClick={() =>
            window.location.href =
              "/paywall?img=" + encodeURIComponent(finalImg)
          }
          className="btn-premium w-full max-w-xs mx-auto py-4 text-xl 
          font-semibold rounded-2xl transition-all mb-8"
        >
          See Full Analysis
        </button>

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
