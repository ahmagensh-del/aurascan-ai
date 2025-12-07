'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

async function fetchAnalysis(img) {
  const res = await fetch('/api/free-analysis', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ img }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || 'Unable to generate analysis');
  }
  const data = await res.json();
  return data.analysis;
}

export default function ResultPage() {
  const params = useSearchParams();
  const router = useRouter();
  const img = params.get('img') ? decodeURIComponent(params.get('img')) : '';
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!img) {
      setLoading(false);
      return;
    }
    setLoading(true);
    fetchAnalysis(img)
      .then((text) => {
        setAnalysis(text);
        setError('');
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [img]);

  return (
    <div className="min-h-screen px-6 py-10">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <button onClick={() => router.push('/')} className="text-white/60 hover:text-white text-sm">← Back</button>
          <p className="text-sm text-white/60">Free vision snapshot</p>
        </div>

        <div className="glass gradient-border rounded-3xl p-8 md:p-10 card-glow">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <p className="text-sm text-aurora-100/80">Preview</p>
              <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 min-h-[320px] flex items-center justify-center">
                {img ? (
                  <img src={img} alt="Aura target" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-white/60">No image provided</div>
                )}
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-sm text-aurora-100/80">Groq Vision says</p>
              <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-5 min-h-[320px] flex flex-col">
                {loading ? (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="animate-spin h-10 w-10 rounded-full border-2 border-aurora-200 border-t-transparent" />
                  </div>
                ) : error ? (
                  <div className="text-rose-300">{error}</div>
                ) : (
                  <p className="text-lg leading-relaxed text-white/80 whitespace-pre-line">{analysis}</p>
                )}
              </div>
              <button
                onClick={() => router.push(`/paywall?img=${encodeURIComponent(img)}`)}
                className="button-primary w-full text-center"
              >
                Unlock Full Analysis →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
