"use client"

import { useEffect, useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
} from "recharts"

import { Star } from "lucide-react"
import Image from "next/image"

interface TrendProduct {
  id: number
  title: string
  price: number
  rating: number
  thumbnail: string
  category: string
}

interface CategoryData {
  name: string
  quantidade: number
  produtos: number
}

const categoryColors: Record<string, string> = {
  Vestido: "#34d399",
  Blusa: "#60a5fa",
  Calça: "#fbbf24",
  Saia: "#f472b6",
  Shorts: "#a3e635",
  "Peça Íntima": "#38bdf8",
}

const ITEMS_PER_PAGE = 2
const INTERVAL_TIME = 20000

export function CategoriesTable() {
  const [data, setData] = useState<CategoryData[]>([])
  const [loading, setLoading] = useState(true)
  const [trends, setTrends] = useState<TrendProduct[]>([])
  const [page, setPage] = useState(0)


  const [fade, setFade] = useState(true)

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/categories/stats")
      const json = await res.json()
      setData(json)
    }

    async function loadTrends() {
      const res = await fetch("/api/trends")
      const json = await res.json()
      setTrends(json)
    }

    Promise.all([load(), loadTrends()]).finally(() =>
      setLoading(false)
    )
  }, [])

  const totalPages = Math.ceil(trends.length / ITEMS_PER_PAGE)

  const visibleTrends = trends.slice(
    page * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  )


  useEffect(() => {
    if (!trends.length) return

    const interval = setInterval(() => {
      setFade(false)

      setTimeout(() => {
        setPage((p) => (p === totalPages - 1 ? 0 : p + 1))
        setFade(true)
      }, 400)
    }, INTERVAL_TIME)

    return () => clearInterval(interval)
  }, [trends, totalPages])

  if (loading) {
    return (
      <div className="h-[300px] animate-pulse rounded-lg bg-slate-100 dark:bg-[#0f0f12]" />
    )
  }

  return (
    <div className="rounded-lg border border-slate-200 dark:border-[#28292b] bg-white dark:bg-[#0f0f12] p-4">
      {/* CHART */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold">
          Produtos por Categoria
        </h2>
        <p className="text-sm text-gray-500">
          Quantidade de itens em estoque por categoria
        </p>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical">
            <XAxis type="number" />
            <YAxis type="category" dataKey="name" width={100} />

            <Bar dataKey="quantidade" radius={[0, 6, 6, 0]}>
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={categoryColors[entry.name] ?? "#94a3b8"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* TÍTULO */}
      <div className="mt-6 mb-4">
        <h2 className="text-lg font-semibold">
          Tendências do Mercado
        </h2>
        <p className="text-sm text-gray-500">
          Novidades e tendências de moda para o próximo semestre
        </p>
      </div>

      {/* GRID COM FADE */}
      <div
        className={`
          grid grid-cols-1 gap-4 md:grid-cols-2
          transition-all duration-500
          ${fade ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
        `}
      >
        {visibleTrends.map((product) => (
          <div
            key={product.id}
            className="rounded-lg border border-slate-200 dark:border-[#28292b] bg-slate-50 dark:bg-[#18181b] p-3"
          >
            <Image
              width={400}
              height={400}
              src={product.thumbnail}
              alt={product.title}
              className="mb-3 h-48 w-full rounded-md object-contain"
            />

            <h3 className="line-clamp-1 font-medium">
              {product.title}
            </h3>

            <p className="mt-1 text-sm text-slate-500 dark:text-gray-400">
              {product.category}
            </p>

            <div className="mt-3 flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm text-yellow-500 dark:text-yellow-400">
                <Star className="h-4 w-4 fill-current" />
                {product.rating}
              </span>

              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                R$ {product.price}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
