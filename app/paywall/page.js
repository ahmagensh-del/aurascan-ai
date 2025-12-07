'use client';

import { useRouter, useSearchParams } from 'next/navigation';

const TON_LINK = 'ton://transfer/UQCttA8O2Y79CbYHhiy3r4UyYtB2K_Z4VTjRwzY9V1n-a83M?amount=1500000000&text=AuraScan%20Premium';

export default function PaywallPage() {
  const router = useRouter();
  const params = useSearchParams();
  const img = params.get('img') ? decodeURIComponent(params.get('img')) : '';

  const handlePay = () => {
    if (typeof window !== 'undefined') {
      window.open(TON_LINK, '_blank');
    }
    router.push(`/full?img=${encodeURIComponent(img)}`);
  };

  return (
    <div className="min-h-screen px-6 py-10">
      <div className="max-w-4xl mx-auto glass gradient-border rounded-3xl p-8 md:p-10 card-glow">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => router.back()} className="text-white/60 hover:text-white text-sm">← Go back</button>
          <p className="text-white/60 text-sm">Premium deep dive</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <p className="text-sm text-aurora-100/80">Your image</p>
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 min-h-[300px] flex items-center justify-center">
              {img ? (
                <img src={img} alt="Selected" className="w-full h-full object-cover" />
              ) : (
                <div className="text-white/60">Missing image</div>
              )}
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-aurora-400 to-aurora-100 flex items-center justify-center text-slate-950 font-extrabold">⚡</div>
              <div>
                <h1 className="text-3xl font-bold">AuraScan Premium</h1>
                <p className="text-white/70">Deep energetic archetype reading powered by Groq</p>
              </div>
            </div>
            <ul className="space-y-2 text-white/80 text-sm">
              <li>• 1,000+ token Groq LLM channeling</li>
              <li>• Attraction & charisma scoring</li>
              <li>• Chakra + vibe signature mapping</li>
              <li>• Personalized rituals & social advice</li>
            </ul>
            <div className="rounded-2xl border border-aurora-200/40 bg-aurora-200/10 p-4 flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm">Price</p>
                <p className="text-3xl font-bold">1.5 TON</p>
              </div>
              <div className="text-aurora-100 text-sm">Tonkeeper compatible</div>
            </div>
            <button onClick={handlePay} className="button-primary w-full text-center">Pay 1.5 TON</button>
          </div>
        </div>
      </div>
    </div>
  );
}
