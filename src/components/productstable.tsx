"use client"

import { useState, useEffect } from "react"
import { ProductModal } from "./productmodal"
import { Pencil, Trash } from "lucide-react"

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
  products: Product[]
  loading: boolean
  search: string
  category: string
  onDelete: (id: string) => void
  onEdit: (product: Product) => void
}

export type ProductForm = {
  name: string
  price: number
  quantity: number
  description: string | null
  isActive: boolean
  sizeId: string
  categoryId: string
}

export function ProductsTable({
  products,
  loading,
  search,
  category,
}: Props) {

  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const [localProducts, setLocalProducts] = useState<Product[]>(products)


  useEffect(() => {
    setLocalProducts(products)
  }, [products])

  function handleEdit(product: Product) {
    setSelectedProduct(product)
    setModalOpen(true)
  }

  async function handleSave(form: ProductForm, id?: string) {
    if (id) {
      await fetch("/api/products", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...form }),
      })
    } else {
      await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
    }


    const res = await fetch("/api/products")
    const data = await res.json()

    setLocalProducts(data)
    setModalOpen(false)
    setSelectedProduct(null)
  }

  async function handleDelete(id: string) {
    await fetch("/api/products", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })

    setLocalProducts((prev) => prev.filter((p) => p.id !== id))
  }

  const filteredProducts = localProducts.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = !category || p.category?.id === category
    return matchesSearch && matchesCategory
  })

  if (loading) {
    return <div className="h-40 animate-pulse rounded-lg bg-slate-100 dark:bg-zinc-900" />
  }

  const formatDate = (date: string) =>
    new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(new Date(date))

  return (
    <>
      <div className="rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden">
        <table className="w-full text-sm text-slate-700 dark:text-zinc-200">

          <thead className="border-b border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/40 text-left text-slate-500 dark:text-zinc-400">
            <tr>
              <th className="p-3">Nome</th>
              <th className="p-3">Tamanho</th>
              <th className="p-3">Categoria</th>
              <th className="p-3">Qtd</th>
              <th className="p-3">Descrição</th>
              <th className="p-3">Status</th>
              <th className="p-3">Criado em</th>
              <th className="p-3">Preço</th>
              <th className="p-3 text-right">Ações</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.map((product) => (
              <tr
                key={product.id}
                className="border-b border-slate-100 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-900/40 transition"
              >
                <td className="p-3 font-medium text-slate-900 dark:text-white">{product.name}</td>

                <td className="p-3">
                  <span className="rounded-md border border-slate-300 dark:border-zinc-700 px-2 py-0.5 text-xs text-slate-600 dark:text-zinc-300">
                    {product.size?.name ?? "-"}
                  </span>
                </td>

                <td className="p-3 text-slate-500 dark:text-zinc-400">
                  {product.category?.name ?? "Sem categoria"}
                </td>

                <td className="p-3 font-semibold text-slate-900 dark:text-white">
                  {product.quantity}
                </td>

                <td className="p-3 max-w-[220px] truncate text-zinc-500">
                  {product.description || "-"}
                </td>

                <td className="p-3">
                  {product.isActive ? (
                    <span className="rounded-full bg-emerald-50 dark:bg-emerald-500/20 px-2 py-1 text-xs text-emerald-700 dark:text-emerald-400">
                      Ativo
                    </span>
                  ) : (
                    <span className="rounded-full bg-red-50 dark:bg-red-500/20 px-2 py-1 text-xs text-red-700 dark:text-zinc-300">
                      Inativo
                    </span>
                  )}
                </td>

                <td className="p-3 text-slate-500 dark:text-zinc-400">
                  {formatDate(product.createdAt)}
                </td>

                <td className="p-3 text-slate-500 dark:text-zinc-400">
                  R$ {product.price}
                </td>

                <td className="p-3 text-right relative">
                  <button
                    onClick={() =>
                      setOpenMenu(openMenu === product.id ? null : product.id)
                    }
                    className="rounded-md px-2 py-1 hover:bg-slate-100 dark:hover:bg-zinc-800"
                  >
                    ⋯
                  </button>

                  {openMenu === product.id && (
                    <div className="absolute right-12 top-[5px] w-24 rounded-md border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-lg z-10 flex justify-between items-center">

                      <button
                        onClick={() => handleEdit(product)}
                        className="w-full px-3 py-2 text-left text-sm hover:bg-slate-100 dark:hover:bg-zinc-800 flex justify-center"
                      >
                        <Pencil className="w-5 w-5"/>
                      </button>

                      <button
                        onClick={() => handleDelete(product.id)}
                        className="w-full px-3 py-2 text-left text-sm text-red-500 dark:text-red-400 hover:bg-slate-100 dark:hover:bg-zinc-800 flex justify-center"
                      >
                        <Trash className="w-5 w-5"/>
                      </button>

                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      <ProductModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        product={selectedProduct}
        onSave={handleSave}
      />
    </>
  )
}
