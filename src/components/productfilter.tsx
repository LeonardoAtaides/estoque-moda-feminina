"use client"

import { useEffect, useState } from "react"
import { Search, X } from "lucide-react"

interface Category {
  id: string
  name: string
}

interface ProductsFiltersProps {
  search: string
  onSearchChange: (value: string) => void
  category: string
  onCategoryChange: (value: string) => void
}

export function ProductsFilters({
  search,
  onSearchChange,
  category,
  onCategoryChange,
}: ProductsFiltersProps) {
  const [categories, setCategories] = useState<Category[]>([])

  // 🔥 buscar categorias do backend
  useEffect(() => {
    async function loadCategories() {
      const res = await fetch("/api/categories")
      const data = await res.json()
      setCategories(data)
    }

    loadCategories()
  }, [])

  const hasFilters = search || category

  const clearFilters = () => {
    onSearchChange("")
    onCategoryChange("")
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">

      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar produto..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-9 pr-3 py-2 rounded-md border border-slate-200 dark:border-[#28292b] bg-white dark:bg-[#0f0f12] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00cf85]"
        />
      </div>

  <div className="flex gap-2">
        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-[180px] px-3 py-2 rounded-md border border-slate-200 dark:border-[#28292b] bg-white dark:bg-[#0f0f12] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00cf85]"
        >
          <option value="">Todas</option>

          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        {hasFilters && (
          <button
            onClick={clearFilters}
            className="px-3 py-2 rounded-md border border-slate-200 dark:border-white/10 text-slate-500 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-white/10 transition"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  )
}
