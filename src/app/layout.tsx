import "./globals.css";
import { Tektur } from "next/font/google";

const tektur = Tektur({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${tektur.className} min-h-full flex flex-col antialiased`}>
        {children}
      </body>
    </html>
  );
}