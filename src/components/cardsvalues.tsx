"use client"

import { useEffect, useState } from "react"
import { Package, DollarSign, ShoppingBag } from "lucide-react"

const Counter = ({ value }: { value: number }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startValue = 0
    let animationFrame: number

    const duration = 2000
    const increment = value / (duration / 16)

    const animate = () => {
      startValue += increment

      if (startValue < value) {
        setCount(Math.floor(startValue))
        animationFrame = requestAnimationFrame(animate)
      } else {
        setCount(value)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  }, [value])

  return <span>{count}</span>
}

const CounterMoney = ({ value }: { value: number }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startValue = 0
    let animationFrame: number

    const duration = 2000
    const increment = value / (duration / 16)

    const animate = () => {
      startValue += increment

      if (startValue < value) {
        setCount(startValue)
        animationFrame = requestAnimationFrame(animate)
      } else {
        setCount(value)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  }, [value])

  return (
    <span>
      {count.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })}
    </span>
  )
}

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

  const cards = [
    {
      title: "Produtos Ativos",
      value: stats.activeCount,
      icon: Package,
      desc: `${stats.totalCount} total`,
      type: "number",
    },
    {
      title: "Valor Total",
      value: stats.totalValue,
      icon: DollarSign,
      desc: "Somente ativos",
      type: "money",
    },
    {
      title: "Itens em Estoque",
      value: stats.totalQuantity,
      icon: ShoppingBag,
      desc: "Quantidade total",
      type: "number",
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
            {card.type === "money" ? (
              <CounterMoney value={card.value} />
            ) : (
              <Counter value={card.value} />
            )}
          </div>

          <p className="mt-1 text-xs text-gray-300">
            {card.desc}
          </p>
        </div>
      ))}
    </div>
  )
}