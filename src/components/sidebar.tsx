"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  Shirt,
  Package,
  ChevronLeft,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react"
import { useState } from "react"

const navItems = [
  {
    title: "Home",
    href: "/",
    icon: Home,
  },
  {
    title: "Produtos",
    href: "/Product",
    icon: Package,
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={`border-r border-slate-200 dark:border-[#212124] bg-white dark:bg-[#030303] transition-[width] duration-300 ${
        collapsed ? "w-28" : "w-64"
      }`}
    >
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex h-16 items-center justify-between border-b border-slate-200 dark:border-[#212124] px-4">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex h-8 w-8 min-w-[32px] items-center justify-center rounded-lg bg-[#00cf85]">
              <Shirt className="h-5 w-5 text-white" />
            </div>

            {!collapsed && (
              <span className="whitespace-nowrap text-lg font-semibold text-slate-900 dark:text-white">
                StockFashion
              </span>
            )}
          </div>

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="rounded-md p-1 text-slate-400 dark:text-gray-400 transition hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-[#111114] dark:hover:text-white"
          >
            {collapsed ? (
              <PanelLeftOpen className="h-5 w-5" />
            ) : (
              <PanelLeftClose className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Navegação */}
        <nav className="flex-1 space-y-1 p-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
                  collapsed ? "justify-center" : "gap-3"
                } ${
                  isActive
                    ? "bg-emerald-50 text-[#00cf85] dark:bg-[#111114] dark:text-[#00cf85]"
                    : "text-slate-600 hover:bg-slate-100 hover:text-[#00cf85] dark:text-gray-300 dark:hover:bg-[#111114] dark:hover:text-[#00cf85]"
                }`}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />

                {!collapsed && <span>{item.title}</span>}
              </Link>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
