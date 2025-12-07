import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'AuraScan AI',
  description: 'AI-powered aura and energy analysis powered by Groq Vision.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-slate-950 text-white min-h-screen relative overflow-hidden`}>
        <div className="fixed inset-0 pointer-events-none" aria-hidden>
          <div className="absolute -left-1/4 top-[-10%] h-[40rem] w-[40rem] bg-gradient-to-br from-aurora-300/30 via-aurora-100/20 to-transparent blur-3xl animate-spinSlow" />
          <div className="absolute right-[-20%] bottom-[-10%] h-[35rem] w-[35rem] bg-gradient-to-tr from-aurora-400/25 via-aurora-200/20 to-transparent blur-3xl animate-spinSlow" />
        </div>
        <main className="relative z-10 min-h-screen">{children}</main>
      </body>
    </html>
  );
}
