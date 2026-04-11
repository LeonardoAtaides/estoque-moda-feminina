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
      
      {/* 🔍 INPUT DE BUSCA */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar produto..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-9 pr-3 py-2 rounded-md border-[#28292b] bg-[#0f0f12] border text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* 📂 SELECT */}
      <div className="flex gap-2">
        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-[180px] px-3 py-2 rounded-md borderborder-[#28292b] bg-[#0f0f12] text-white focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">Todas</option>

          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* ❌ LIMPAR */}
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="px-3 py-2 rounded-md border border-white/10 text-gray-300 hover:bg-white/10 transition"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  )
}