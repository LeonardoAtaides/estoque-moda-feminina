"use client"

import { Sidebar } from "@/components/sidebar"

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />

      <main className="flex flex-col flex-1">

        <div className="flex-1 p-4 pt-16 lg:p-8 lg:pt-8">
          {children}
        </div>

        <footer className="flex justify-center items-center py-2 border-t border-white/10 text-sm text-[#00cf85]">
          <p>StockFashionv 2.0.1 — by <a href="https://www.ataidesdev.com.br" className="font-bold upper text-white" target="_blank">
            Ataídes</a>
          </p>
        </footer>
      </main>
    </div>
  )
}