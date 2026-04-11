"use client"

import { useEffect, useState } from "react"

interface Size {
  id: string
  name: string
}

interface Category {
  id: string
  name: string
}

type Product = {
  id: string
  name: string
  price: number
  quantity: number
  description: string | null
  isActive: boolean
  createdAt: string
  size?: { id: string; name: string } | null
  category?: { id: string; name: string } | null
}

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  product?: Product | null
  onSave: (data: any, id?: string) => Promise<void>
}

export function ProductModal({ open, onOpenChange, product, onSave }: Props) {
  const isEditing = !!product

  const [sizes, setSizes] = useState<Size[]>([])
  const [categories, setCategories] = useState<Category[]>([])

  const [form, setForm] = useState({
    name: "",
    price: 0,
    quantity: 0,
    description: "",
    isActive: true,
    sizeId: "",
    categoryId: "",
  })

  // 🔥 CARREGA SIZES E CATEGORIES DA API
  useEffect(() => {
    async function load() {
      const [sizesRes, categoriesRes] = await Promise.all([
        fetch("/api/sizes"),
        fetch("/api/categories"),
      ])

      setSizes(await sizesRes.json())
      setCategories(await categoriesRes.json())
    }

    load()
  }, [])

  
  // 🔥 PREENCHE NO EDIT
  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        description: product.description || "",
        isActive: product.isActive,
        sizeId: product.size?.id || "",
        categoryId: product.category?.id || "",
      })
    } else {
      setForm({
        name: "",
        price: 0,
        quantity: 0,
        description: "",
        isActive: true,
        sizeId: "",
        categoryId: "",
      })
    }
  }, [product, open])

async function handleSubmit(e: React.FormEvent) {
  e.preventDefault()

  await onSave(form, product?.id)

  onOpenChange(false)
}

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-zinc-950 border border-zinc-800 w-full max-w-lg rounded-lg p-6 text-zinc-100">

        {/* HEADER */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold">
            {isEditing ? "Editar Produto" : "Novo Produto"}
          </h2>
          <p className="text-sm text-zinc-400">
            {isEditing
              ? "Atualize os dados do produto"
              : "Preencha os dados do produto"}
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-3">

          <input
            className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded"
            placeholder="Nome"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            type="number"
            className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded"
            placeholder="Preço"
            value={form.price}
            onChange={(e) =>
              setForm({ ...form, price: Number(e.target.value) })
            }
          />

          <input
            type="number"
            className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded"
            placeholder="Quantidade"
            value={form.quantity}
            onChange={(e) =>
              setForm({ ...form, quantity: Number(e.target.value) })
            }
          />

          {/* SIZE */}
          <select
            className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded"
            value={form.sizeId}
            onChange={(e) =>
              setForm({ ...form, sizeId: e.target.value })
            }
          >
            <option value="">Selecione tamanho</option>
            {sizes.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>

          {/* CATEGORY */}
          <select
            className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded"
            value={form.categoryId}
            onChange={(e) =>
              setForm({ ...form, categoryId: e.target.value })
            }
          >
            <option value="">Selecione categoria</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <textarea
            className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded"
            placeholder="Descrição"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          {/* ACTIVE */}
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(e) =>
                setForm({ ...form, isActive: e.target.checked })
              }
            />
            Produto ativo
          </label>

          {/* FOOTER */}
          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="px-3 py-2 rounded border border-zinc-800"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="px-3 py-2 rounded bg-white text-black"
            >
              {isEditing ? "Salvar" : "Criar"}
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}