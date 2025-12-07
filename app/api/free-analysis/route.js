import { NextResponse } from 'next/server';

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';

function normalizeImage(img) {
  if (!img) return null;
  if (img.startsWith('data:')) {
    return { type: 'base64', value: img };
  }
  return { type: 'url', value: img };
}

async function callGroqVision(img) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return null;
  const payload = {
    model: 'llama-3.2-11b-vision-preview',
    messages: [
      {
        role: 'user',
        content: [
          { type: 'text', text: 'Read the person\'s aura colors, emotional tone, and vibe in 3-6 sentences.' },
          { type: 'image_url', image_url: { url: img } },
        ],
      },
    ],
    max_tokens: 200,
    temperature: 0.6,
  };

  const res = await fetch(GROQ_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) return null;
  const data = await res.json();
  return data?.choices?.[0]?.message?.content?.[0]?.text || data?.choices?.[0]?.message?.content || null;
}

export async function POST(req) {
  try {
    const body = await req.json();
    const imgRaw = body?.img;
    const normalized = normalizeImage(imgRaw);
    if (!normalized) {
      return NextResponse.json({ error: 'Image is required.' }, { status: 400 });
    }

    let imageForGroq = normalized.value;
    const groqResult = await callGroqVision(imageForGroq);

    const fallback = 'Soft lavender hues swirl around you, suggesting a calm, empathetic nature with creative undercurrents. There is a gentle but confident warmth in your gaze that makes people feel safe. Subtle gold sparks hint at ambition beginning to glow brighter.';

    return NextResponse.json({ analysis: groqResult || fallback });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to analyze image.' }, { status: 500 });
  }
}
