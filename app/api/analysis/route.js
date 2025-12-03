import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { imageUrl } = await req.json();

    if (!imageUrl) {
      return NextResponse.json(
        { error: "No image URL provided" },
        { status: 400 }
      );
    }

    // === CALL GROQ VISION MODEL ===
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.2-11b-vision-preview", 
        messages: [
          {
            role: "system",
            content:
              "You are AURASCAN AI. You analyze a person's attractiveness, vibe, aura, charisma, emotional impact, and how others perceive them. Be detailed, deep, and psychologically accurate.",
          },
          {
            role: "user",
            content: [
              {
                type: "input_text",
                text: "Analyze this person's attractiveness, vibe, presence, aura, and how they are perceived by others.",
              },
              {
                type: "input_image",
                image_url: imageUrl,
              },
            ],
          },
        ],
        temperature: 0.9,
      }),
    });

    const data = await response.json();

    if (!data.choices || !data.choices[0]?.message?.content) {
      console.error("Groq API error:", data);
      return NextResponse.json(
        { error: "AI response error", details: data },
        { status: 500 }
      );
    }

    return NextResponse.json({
      result: data.choices[0].message.content,
    });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
