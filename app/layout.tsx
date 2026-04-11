import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import Header from "@/app/Components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AIGuidebook - Din Guide til Ansvarlig AI",
  description: "Lær hvordan du bruker AI verktøy på en ansvarlig og etisk måte. Retningslinjer, tips, og resurser for studenter, lærere og institusjoner.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="no" className="">
      <head>
        <title>AIGuidebook - Din Guide til Ansvarlig AI</title>
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50`}>
        <Header />
        <main className="flex-1 w-full">{children}</main>
        
        {/* Footer */}
        <footer className="bg-white/50 glass border-t border-gray-200/50 mt-20">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 py-12">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="font-bold text-gray-900 mb-4">AIGuidebook</h3>
                <p className="text-gray-600 text-sm font-light">Din kilde for ansvarlig AI-bruk i akademia.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-4 text-sm">Ressurser</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li><a href="/guidelines" className="hover:text-blue-600 transition">Retningslinjer</a></li>
                  <li><a href="/quiz" className="hover:text-blue-600 transition">Quiz</a></li>
                  <li><a href="/faq" className="hover:text-blue-600 transition">Spørsmål & Svar</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-4 text-sm">For alle</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li><a href="/about/student" className="hover:text-blue-600 transition">Studenter</a></li>
                  <li><a href="/about/teacher" className="hover:text-blue-600 transition">Lærere</a></li>
                  <li><a href="/about/university" className="hover:text-blue-600 transition">Institusjoner</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-4 text-sm">Anbefalte verktøy</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li><a href="https://openai.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition">ChatGPT</a></li>
                  <li><a href="https://copilot.microsoft.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition">Microsoft Copilot</a></li>
                  <li><a href="https://sikt.no" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition">Sikt.no</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-200/50 pt-8 text-center text-sm text-gray-600 font-light">
              <p>© 2024 AIGuidebook. Gjort for ansvarlig og etisk AI-bruk i utdanning.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
