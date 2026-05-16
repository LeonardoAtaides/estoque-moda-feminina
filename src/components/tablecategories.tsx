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

import {Star} from "lucide-react"

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

export function CategoriesTable() {
  const [data, setData] = useState<CategoryData[]>([])
  const [loading, setLoading] = useState(true)
  const [trends, setTrends] = useState<TrendProduct[]>([])

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

  Promise.all([load(), loadTrends()])
    .finally(() => setLoading(false))

}, [])

  if (loading) {
    return (
      <div className="h-[300px] animate-pulse rounded-lg  bg-[#0f0f12]" />
    )
  }

  return (
    <div className="rounded-lg border border-[#28292b] bg-[#0f0f12] p-4">
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
                  fill={
                    categoryColors[entry.name] ?? "#94a3b8"
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-semibold">
          Tendências do Mercado
        </h2>
        <p className="text-sm text-gray-500">
          Novidades e tendências de moda para o próximo semestre
        </p>
      </div>     

      <div className="grid gap-4 md:grid-cols-3">
        {trends.map((product) => (
          <div
            key={product.id}
            className="rounded-lg border border-[#28292b] bg-[#18181b] p-3"
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="mb-3 h-40 w-full rounded-md object-cover"
            />

            <h3 className="line-clamp-1 font-medium">
              {product.title}
            </h3>

            <p className="mt-1 text-sm text-gray-400">
              {product.category}
            </p>

            <div className="mt-3 flex items-center justify-between">
              <span className="text-sm flex items-center gap-2 text-yellow-400">
                <Star className="inline-block h-4 w-4 fill-current" />
                {product.rating}
              </span>

              <span className="font-semibold text-emerald-400">
                R$ {product.price}
              </span>
            </div>
          </div>
        ))}
      </div>

      
    </div>
  )
}