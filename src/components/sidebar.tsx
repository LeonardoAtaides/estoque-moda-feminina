"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Shirt, Menu, X, Package } from "lucide-react"
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
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 flex h-10 w-10 items-center justify-center rounded-md bg-background shadow lg:hidden"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 h-screen w-64 border-r bg-white border-gray-600 transition-transform lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center border-b px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-200">
                <Shirt className="h-5 w-5 text-black" />
              </div>
              <span className="text-lg font-semibold text-black">Stock Fashion</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-gray-200 text-black"
                      : "text-gray-600 hover:bg-gray-100 hover:text-black"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.title}
                </Link>
              )
            })}
          </nav>


        </div>
      </aside>
    </>
  )
}