'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function LoadingPage() {
  const router = useRouter();
  const params = useSearchParams();
  const img = params.get('img') || '';

  useEffect(() => {
    const timer = setTimeout(() => {
      const encoded = encodeURIComponent(img);
      router.push(`/result?img=${encoded}`);
    }, 1500);
    return () => clearTimeout(timer);
  }, [img, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6">
      <div className="glass gradient-border rounded-3xl px-10 py-12 text-center max-w-xl w-full card-glow">
        <div className="relative mb-6 flex items-center justify-center">
          <div className="absolute h-32 w-32 bg-aurora-300/30 blur-3xl animate-pulseGlow" aria-hidden />
          <div className="relative h-24 w-24 rounded-full border border-white/10 bg-white/5 flex items-center justify-center animate-spinSlow">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-aurora-400 to-aurora-100 animate-pulse" />
          </div>
        </div>
        <h1 className="text-3xl font-bold shimmer-text mb-3">Analyzing your energy…</h1>
        <p className="text-white/70">Groq Vision is decoding your aura colors, emotional resonance, and magnetic pull.</p>
      </div>
    </div>
  );
}
