"use client"

import { useEffect, useState } from "react"
import { ProductsTable } from "./productstable"

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
  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="w-full max-w-lg">
      <div className=" border-[#28292b] bg-[#0f0f12] border  rounded-2xl p-6 shadow-2xl">

        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-xl font-semibold text-white">
              {isEditing ? "Editar Produto" : "Novo Produto"}
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              {isEditing
                ? "Atualize as informações do produto abaixo."
                : "Preencha os dados do produto."}
            </p>
          </div>

          <button
            onClick={() => onOpenChange(false)}
            className="text-gray-400 hover:text-white transition"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="text-sm text-gray-300 mb-1 block">
              Nome do Produto
            </label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-[#121214] border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00cf85]"
              placeholder="Vestido Floral Verão"
            />
          </div>

          <div>
            <label className="text-sm text-gray-300 mb-1 block">
              Preço (R$)
            </label>
            <input
              type="number"
              step="0.01"
              min="0.01"
              value={form.price || ""}
              onChange={(e) =>
                
                setForm({ ...form, price: Number(e.target.value) })
              }
              className="w-full bg-[#121214] border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00cf85]"
              placeholder="0,00"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-300 mb-1 block">
                Tamanho
              </label>
              <select
                value={form.sizeId}
                onChange={(e) =>
                  setForm({ ...form, sizeId: e.target.value })
                }
                className="w-full bg-[#121214] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-[#00cf85]"
              >
                <option value="">Selecione</option>
                {sizes.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-300 mb-1 block">
                Categoria
              </label>
              <select
                value={form.categoryId}
                onChange={(e) =>
                  setForm({ ...form, categoryId: e.target.value })
                }
                className="w-full bg-[#121214] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-[#00cf85]"
              >
                <option value="">Selecione</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div>
            <label className="text-sm text-gray-300 mb-1 block">
              Quantidade
            </label>
            <input
              type="number"
               min="0"
              value={form.quantity || ""}
              onChange={(e) =>
                setForm({ ...form, quantity: Number(e.target.value) })
              }
              className="w-full bg-[#121214] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-[#00cf85]"
            />
          </div>

          <div>
            <label className="text-sm text-gray-300 mb-1 block">
              Descrição
            </label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="w-full bg-[#121214] border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00cf85]"
            />
          </div>

          <div className="flex items-center justify-between bg-[#121214] border border-white/10 rounded-xl px-4 py-3">
            <div>
              <p className="text-sm text-white">Produto Ativo</p>
            </div>

            <button
              type="button"
              onClick={() =>
                setForm({ ...form, isActive: !form.isActive })
              }
              className={`w-11 h-6 flex items-center rounded-full p-1 transition ${
                form.isActive ? "bg-[#00cf85]" : "bg-gray-600"
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
                  form.isActive ? "translate-x-5" : ""
                }`}
              />
            </button>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-400 transition"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-green-500 text-white font-medium hover:bg-green-400 transition"
            >
              {isEditing ? "Salvar Alterações" : "Criar Produto"}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
);
}