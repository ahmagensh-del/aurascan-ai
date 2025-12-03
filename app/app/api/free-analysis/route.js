export async function POST(req) {
  try {
    const body = await req.json();
    const image = body.image || null;

    const freeAnalysis = {
      vibe: "Your energy feels calm, open and naturally warm.",
      archetype: "Soft Magnetism",
      impression: "People see you as approachable and safe.",
      compatibility: "People tend to feel emotionally comfortable with you.",
      confidence: "Your presence feels peaceful yet subtly magnetic.",
    };

    return new Response(JSON.stringify(freeAnalysis), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Server error", details: error.message }),
      { status: 500 }
    );
  }
}
