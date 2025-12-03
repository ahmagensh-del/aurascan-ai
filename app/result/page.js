export const dynamic = "force-dynamic";
"use client";

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
            img: img || blob || null,
          }),
        });

        const data = await res.json();
        setAnalysis(data.analysis);
      } catch {
        setAnalysis("Error loading analysis.");
      }

      setLoading(false);
    }

    runAnalysis();
  }, [img, blob]);
