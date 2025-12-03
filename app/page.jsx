"use client";
import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");

  const handleScan = () => {
    if (!url.trim()) {
      alert("Please paste a link or upload a photo first.");
      return;
    }
    window.location.href = "/loading?img=" + encodeURIComponent(url);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#070b16] via-[#0d1324] to-[#070b16] flex flex-col items-center justify-center px-6">

      {/* SIDE GLOW EFFECTS */}
      <div className="side-glow side-left"></div>
      <div className="side-glow side-right"></div>

      {/* PARTICLES */}
      <div className="particles">
        {Array.from({ length: 25 }).map((_, i) => (
          <span
            key={i}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
            }}
          />
        ))}
      </div>

      {/* BACKGROUND AURA */}
      <div className="absolute inset-0 flex justify-center items-center -z-10">
        <div className="central-aura" />
      </div>

      {/* FLOATING LIGHT */}
      <div className="floating-light -z-10" />

      {/* MAIN CONTENT */}
      <div className="text-center max-w-3xl animate-fade">

        <h1 className="text-7xl font-extrabold tracking-tight drop-shadow-[0_0_35px_rgba(255,255,255,0.3)] mb-6 title-pulse">
          AuraScan <span className="text-[#8ab4ff]">AI</span>
        </h1>

        <p className="text-xl text-gray-300 mb-12">
          The universe leaves a trace on your energy. Reveal it.
        </p>

        {/* INPUT FIELD BLOCK */}
        <div className="input-glass w-full max-w-2xl mx-auto py-6 px-7 rounded-2xl mb-6 space-y-5">

          {/* URL INPUT */}
          <input
            type="text"
            placeholder="Paste your photo link here…"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full bg-transparent outline-none text-white text-lg placeholder-gray-400"
          />

          {/* SMALL LABEL */}
          <p className="text-left text-gray-400 text-sm">
            or upload a photo:
          </p>

          {/* FILE PICKER */}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const localUrl = URL.createObjectURL(file);
                setUrl(localUrl);
              }
            }}
            className="w-full text-white"
          />

          {/* PREVIEW */}
          {url && (
            <div className="flex justify-center">
              <img
                src={url}
                alt="preview"
                className="w-40 h-40 object-cover rounded-xl shadow-[0_0_20px_rgba(120,160,255,0.3)] mt-2"
              />
            </div>
          )}
        </div>

        {/* BUTTON */}
        <button
          onClick={handleScan}
          className="btn-premium w-full max-w-2xl mx-auto py-4 text-xl font-semibold rounded-2xl transition-all"
        >
          Scan Aura
        </button>

        {/* TELEGRAM LINK */}
        <a
          href="https://t.me/EmeraldCabinet"
          target="_blank"
          className="block text-center mt-8 text-lg text-[#7aa7ff] hover:text-[#aaccff] transition-all"
        >
          Join EmeraldCabinet 🔮
        </a>
      </div>
    </div>
  );
}
