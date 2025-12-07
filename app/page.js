'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

function ParticleField() {
  const particles = useMemo(() =>
    Array.from({ length: 60 }).map((_, idx) => ({
      id: idx,
      top: Math.random() * 100,
      left: Math.random() * 100,
      delay: Math.random() * 6,
      scale: 0.5 + Math.random() * 1.2,
    })), []);

  return (
    <div className="particles">
      {particles.map((p) => (
        <span
          key={p.id}
          style={{
            top: `${p.top}%`,
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            transform: `scale(${p.scale})`,
          }}
        />
      ))}
    </div>
  );
}

export default function HomePage() {
  const router = useRouter();
  const [urlInput, setUrlInput] = useState('');
  const [preview, setPreview] = useState('');
  const [error, setError] = useState('');

  const handleFile = async (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result?.toString() || '');
      setError('');
    };
    reader.readAsDataURL(file);
  };

  const onScan = () => {
    const chosen = preview || urlInput.trim();
    if (!chosen) {
      setError('Please upload a photo or paste an image URL.');
      return;
    }
    const img = encodeURIComponent(chosen);
    router.push(`/loading?img=${img}`);
  };

  useEffect(() => {
    if (urlInput) setError('');
  }, [urlInput]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-10">
      <ParticleField />
      <div className="w-full max-w-5xl">
        <header className="flex items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-aurora-400 to-aurora-200 flex items-center justify-center text-slate-950 font-black text-xl shadow-lg shadow-aurora-400/40">AS</div>
            <div>
              <p className="text-2xl font-bold tracking-tight">AuraScan AI</p>
              <p className="text-sm text-white/60">Groq-powered aura & energy decoding</p>
            </div>
          </div>
          <div className="text-xs uppercase tracking-[0.2em] text-white/50">App Router • Next.js 14</div>
        </header>

        <div className="glass gradient-border rounded-3xl p-8 md:p-10 card-glow">
          <div className="flex flex-col gap-8 md:flex-row">
            <div className="md:w-1/2 space-y-6">
              <p className="text-sm font-semibold text-aurora-100/80">Scan your aura</p>
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight shimmer-text">Upload or paste a link to unveil your energy signature</h1>
              <p className="text-base text-white/70 leading-relaxed">AuraScan AI uses Groq vision to read emotional tone, magnetic energy, and subtle cues from your photo. Get a free snapshot instantly, then unlock a deep spiritual profile.</p>
              <div className="space-y-3">
                <label className="block text-sm text-white/70">Paste image URL</label>
                <input
                  type="url"
                  placeholder="https://images.example.com/your-photo.jpg"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  className="input-field"
                />
              </div>
              <div className="space-y-3">
                <label className="block text-sm text-white/70">Upload photo</label>
                <label className="flex items-center justify-between w-full cursor-pointer rounded-xl border border-dashed border-white/20 bg-white/5 px-4 py-3 text-sm text-white/80 transition hover:border-aurora-200/50 hover:bg-white/10">
                  <span>Drop a portrait or click to browse</span>
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFile(e.target.files?.[0])} />
                  <span className="px-3 py-1 rounded-lg bg-aurora-400/20 text-aurora-100 text-xs">Choose</span>
                </label>
              </div>
              {error && <div className="text-sm text-rose-300">{error}</div>}
              <button onClick={onScan} className="button-primary w-fit mt-2">Scan Aura</button>
              <div className="flex items-center gap-3 text-xs text-white/60 pt-3">
                <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" /> Live Groq vision • Free tier included
              </div>
            </div>

            <div className="md:w-1/2">
              <div className="relative h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-aurora-400/20 via-transparent to-aurora-300/10 blur-3xl" aria-hidden />
                <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 min-h-[340px] flex items-center justify-center shadow-2xl">
                  {preview || urlInput ? (
                    <img
                      src={preview || urlInput}
                      alt="Selected preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center px-8">
                      <p className="text-xl font-semibold">Your aura canvas awaits</p>
                      <p className="text-sm text-white/60 mt-2">Upload a selfie or paste a link to generate a glowing preview.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
