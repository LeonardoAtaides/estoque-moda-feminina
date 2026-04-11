"use client"
import { ProductModal } from "./productmodal"
import { useEffect, useState } from "react"

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
  search: string
  category: string
}

export function ProductsTable({ search, category }: Props) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [openMenu, setOpenMenu] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/products")
      const data = await res.json()

      setProducts(data)
      setLoading(false)
    }

    load()
  }, [])

  async function handleDelete(id: string) {
    await fetch("/api/products", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })

    setProducts((prev) => prev.filter((p) => p.id !== id))
  }

  function handleEdit(product: Product) {
  setSelectedProduct(product)
  setModalOpen(true)
}

async function handleSave(form: any, id?: string) {
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
  setProducts(data)
}

  const formatDate = (date: string) =>
    new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(new Date(date))

  if (loading) {
    return (
      <div className="h-40 animate-pulse rounded-lg bg-zinc-900" />
    )
  }

  const filteredProducts = products.filter((p) => {
  const matchesSearch = p.name
    ?.toLowerCase()
    .includes(search.toLowerCase())

  const matchesCategory =
    !category || p.category?.id === category

  return matchesSearch && matchesCategory
})

  return (
    <>
    <div className="rounded-xl border border-zinc-800 bg-zinc-950 ">
      <table className="w-full text-sm text-zinc-200">
        {/* HEADER */}
        <thead className="border-b border-zinc-800 bg-zinc-900/40 text-left text-zinc-400">
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

        {/* BODY */}
        <tbody>
          {filteredProducts.map((product) => (
            <tr
              key={product.id}
              className="border-b border-zinc-800 hover:bg-zinc-900/40 transition"
            >
              {/* NAME */}
              <td className="p-3 font-medium text-white">
                {product.name}
              </td>

              {/* SIZE */}
              <td className="p-3">
                <span className="rounded-md border border-zinc-700 px-2 py-0.5 text-xs text-zinc-300">
                  {product.size?.name ?? "-"}
                </span>
              </td>

              {/* CATEGORY */}
              <td className="p-3 text-zinc-400">
                {product.category?.name ?? "Sem categoria"}
              </td>

              {/* QTD */}
              <td className="p-3 font-semibold text-white">
                {product.quantity}
              </td>

              {/* DESC */}
              <td className="p-3 max-w-[220px] truncate text-zinc-500">
                {product.description || "-"}
              </td>

              {/* STATUS */}
              <td className="p-3">
                {product.isActive ? (
                  <span className="rounded-full bg-emerald-500/20 px-2 py-1 text-xs text-emerald-400">
                    Ativo
                  </span>
                ) : (
                  <span className="rounded-full bg-red-500/20 px-2 py-1 text-xs text-zinc-300">
                    Inativo
                  </span>
                )}
              </td>

              {/* DATE */}
              <td className="p-3 text-zinc-400">
                {formatDate(product.createdAt)}
              </td>

                            {/* DATE */}
              <td className="p-3 text-zinc-400">
                R$ {product.price}
              </td>

              {/* ACTIONS */}
              <td className="p-3 text-right relative">
                <button
                  onClick={() =>
                    setOpenMenu(
                      openMenu === product.id ? null : product.id
                    )
                  }
                  className="rounded-md px-2 py-1 hover:bg-zinc-800"
                >
                  ⋯
                </button>

                {openMenu === product.id && (
                  <div className="absolute right-3 top-10 w-32 rounded-md border border-zinc-800 bg-zinc-900 shadow-lg z-10">
                    <button
                    onClick={() => handleEdit(product)}
                    className="w-full px-3 py-2 text-left text-sm hover:bg-zinc-800">
                      Editar
                    </button>

                    <button
                      onClick={() => handleDelete(product.id)}
                      className="w-full px-3 py-2 text-left text-sm text-red-400 hover:bg-zinc-800"
                    >
                      Excluir
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