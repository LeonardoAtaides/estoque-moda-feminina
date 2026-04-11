"use client"

import { useEffect, useState } from "react"
import { Package, DollarSign, ShoppingBag, TrendingUp } from "lucide-react"

interface Stats {
  activeCount: number
  totalCount: number
  totalValue: number
  totalQuantity: number
}

export function CardsValues() {
  const [stats, setStats] = useState<Stats>({
    activeCount: 0,
    totalCount: 0,
    totalValue: 0,
    totalQuantity: 0,
  })

  useEffect(() => {
    async function loadStats() {
      const res = await fetch("/api/products/stats")
      const data = await res.json()
      setStats(data)
    }

    loadStats()
  }, [])

  const formatBRL = (value: number) =>
    value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })

  const cards = [
    {
      title: "Produtos Ativos",
      value: stats.activeCount,
      icon: Package,
      desc: `${stats.totalCount} total`,
    },
    {
      title: "Valor Total",
      value: formatBRL(stats.totalValue),
      icon: DollarSign,
      desc: "Somente ativos",
    },
    {
      title: "Itens em Estoque",
      value: stats.totalQuantity,
      icon: ShoppingBag,
      desc: "Quantidade total",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-3">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-lg border border-[#28292b] bg-[#0f0f12] p-4 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-300">{card.title}</span>
            <card.icon className="h-4 w-4 text-[#00cf85]" />
          </div>

          <div className="mt-3 text-2xl font-bold text-white">
            {card.value}
          </div>

          <p className="mt-1 text-xs text-gray-300">
            {card.desc}
          </p>
        </div>
      ))}
    </div>
  )
}