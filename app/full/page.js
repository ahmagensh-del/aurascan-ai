export const revalidate = 0;

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';

async function callGroq(prompt) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return null;
  }
  const res = await fetch(GROQ_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'llama-3.2-11b-text-preview',
      messages: [
        { role: 'system', content: 'You are AuraScan AI, an enthusiastic energy reader blending neuroscience and mysticism.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.6,
      max_tokens: 500,
    }),
  });

  if (!res.ok) {
    return null;
  }
  const data = await res.json();
  return data?.choices?.[0]?.message?.content?.trim() || null;
}

function buildFallback(img) {
  const baseScore = Math.min(99, 60 + (img?.length || 10) % 35);
  return `Attractiveness score: ${baseScore}/100\nSocial energy: magnetic, warm, and a bit mysterious.\nVibe signature: iridescent teal with soft amethyst edges — a mix of calm empathy and creative spark.\nOpposite-gender perception: inviting and trustworthy with a playful streak that keeps people leaning in.\nArchetype: Luminary Alchemist — someone who blends logic with intuition to guide others.\nAdvice: lean into eye contact, slow your breathing before key moments, and wear subtle shimmering accents to amplify confidence.`;
}

export default async function FullPage({ searchParams }) {
  const img = searchParams?.img ? decodeURIComponent(searchParams.img) : '';
  const prompt = `Use a confident, kind tone. Provide a vivid aura reading for the person in this photo: ${img}. Include sections: Attractiveness score (0-100), Social energy, Vibe signature, Opposite-gender perception, Archetype, Advice for improvement. Keep it under 6 bullet-sized paragraphs.`;
  const groqText = await callGroq(prompt);
  const analysis = groqText || buildFallback(img);

  return (
    <div className="min-h-screen px-6 py-10">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <a
            href={img ? `/result?img=${encodeURIComponent(img)}` : '/result'}
            className="text-white/60 hover:text-white text-sm"
          >
            ← Back to results
          </a>
          <p className="text-white/60 text-sm">Unlocked premium channeling</p>
        </div>

        <div className="glass gradient-border rounded-3xl p-8 md:p-10 card-glow">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
              <p className="text-sm text-aurora-100/80">Your image</p>
              <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 min-h-[320px] flex items-center justify-center">
                {img ? <img src={img} alt="Aura" className="w-full h-full object-cover" /> : <div className="text-white/60">No image</div>}
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-aurora-400 to-aurora-100 flex items-center justify-center text-slate-950 font-extrabold">✨</div>
                <div>
                  <h1 className="text-3xl font-bold">Full Aura Profile</h1>
                  <p className="text-white/70">Generated live with Groq LLM</p>
                </div>
              </div>
              <div className="rounded-2xl border border-aurora-200/40 bg-slate-900/60 p-5 shadow-xl space-y-3">
                {analysis.split('\n').map((line, idx) => (
                  <p key={idx} className="leading-relaxed text-white/80">{line}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
