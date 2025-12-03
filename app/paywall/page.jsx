"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function PaywallPage() {
  const router = useRouter();
  const params = useSearchParams();
  const img = params.get("img"); // фото пользователя

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-[#090d17] via-[#0f1630] to-[#090d17] text-white flex flex-col items-center justify-center px-6">

      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 flex items-center justify-center opacity-40 blur-3xl -z-10">
        <div className="w-[900px] h-[900px] rounded-full bg-gradient-to-br from-[#4a7cff44] via-[#b774ff33] to-[#ff45ff22] animate-pulse" />
      </div>

      {/* CARD */}
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-10 rounded-3xl shadow-[0_0_40px_rgba(150,120,255,0.2)] max-w-xl text-center animate-fade">

        <h1 className="text-4xl font-extrabold mb-4 tracking-tight">
          Your Premium Report Is Ready
        </h1>

        <p className="text-gray-300 mb-8 text-lg">
          Unlock your complete attractiveness analysis, crafted by AI.
        </p>

        {/* PREVIEW OF PHOTO */}
        {img && (
          <img
            src={img}
            alt="Your Photo"
            className="w-48 h-48 mx-auto mb-8 rounded-2xl shadow-[0_0_25px_rgba(140,180,255,0.4)] object-cover"
          />
        )}

        {/* FEATURES LIST */}
        <ul className="text-left text-gray-200 space-y-3 mb-10 text-lg">
          <li>✔ Full 100-point attractiveness breakdown</li>
          <li>✔ How others feel your presence</li>
          <li>✔ Your emotional & personal “vibe” signature</li>
          <li>✔ Opposite-gender perception</li>
          <li>✔ Social charisma & uniqueness</li>
          <li>✔ Your personal archetype</li>
          <li>✔ Professional improvement advice</li>
        </ul>

        {/* PRICE */}
        <p className="text-2xl font-semibold text-[#8ab4ff] mb-4">
          1.5 TON
        </p>

        {/* REAL TON PAYMENT BUTTON */}
        <button
          onClick={async () => {
            try {
              const tonConnectUI = new window.TonConnectUI.TonConnectUI({
                manifestUrl: "/tonconnect-manifest.json"
              });

              // 1 — Подключение кошелька
              await tonConnectUI.connectWallet();

              // 2 — Формируем транзакцию
              const tx = {
                validUntil: Math.floor(Date.now() / 1000) + 300, // 5 минут
                messages: [
                  {
                    address: "UQCttA8O2Y79CbYHhiy3r4UyYtB2K_Z4VTjRwzY9V1n-a83M",
                    amount: (1.5 * 1e9).toString() // 1.5 TON в нанотонах
                  }
                ]
              };

              // 3 — Отправляем транзакцию
              await tonConnectUI.sendTransaction(tx);

              // 4 — Переход на премиум-результат
              window.location.href =
                "/premium-result?img=" + encodeURIComponent(img);

            } catch (err) {
              console.error("Payment failed:", err);
              alert("Payment canceled or failed.");
            }
          }}
          className="btn-premium w-full py-4 text-xl rounded-2xl font-semibold transition-all"
        >
          Pay 1.5 TON & Unlock Full Report
        </button>

        {/* BACK LINK */}
        <button
          onClick={() => router.back()}
          className="mt-6 text-gray-400 hover:text-gray-200 transition"
        >
          Go back
        </button>

      </div>
    </div>
  );
}
