import "./globals.css";
import { Tektur } from "next/font/google";
import { ThemeToggle } from "../components/ThemeToggle";

const tektur = Tektur({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const themeScript = `
  (function() {
    try {
      var saved = localStorage.getItem('stockfashion-theme');
      var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      var isDark = saved === 'dark' || (saved === null && prefersDark);
      if (isDark) {
        document.documentElement.classList.add('dark');
      }
    } catch (e) {}
  })();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${tektur.className} min-h-full flex flex-col antialiased`}>
        <div className="fixed top-4 right-4 z-50">
          <ThemeToggle />
        </div>
        {children}
      </body>
    </html>
  );
}
