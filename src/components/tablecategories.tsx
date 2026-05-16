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

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/categories/stats")
      const json = await res.json()

      setData(json)
      setLoading(false)
    }

    load()
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
    </div>
  )
}