import "./globals.css";
import { TVHeader } from "@/components/header/TVHeader";
import { TVFocusManager } from "@/components/focus/FocusManager";
import { TVModeProvider } from "@/lib/tv-mode";
import { MiniPlayerProvider } from "@/components/media/MiniPlayer";
import { PlayerProvider } from "@/lib/player/PlayerContext";
import { GlobalMiniPlayer } from "@/components/media/GlobalMiniPlayer";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";

export const metadata = {
  title: "EDUSC TV — Televisão Digital Cultural Latino-Americana",
  description: "Cinema, cultura, documentários, educação e canais ao vivo da América Latina. Curadoria EDUSC.",
  manifest: "/manifest.json",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-[#0a0a0a] text-white antialiased pb-[64px] md:pb-0 selection:bg-[#e50914]/30">
        <TVModeProvider>
          <PlayerProvider>
            <MiniPlayerProvider>
              <TVFocusManager />
              <TVHeader />
              {/* TV 10-foot: aumenta escala quando data-tv=1 */}
              <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 data-[tv=1]:scale-[1.04] data-[tv=1]:origin-top">
                {children}
              </main>
              <Footer />
              <BottomNav />
              <GlobalMiniPlayer />
            </MiniPlayerProvider>
          </PlayerProvider>
        </TVModeProvider>
      </body>
    </html>
  );
}
