"use client"

import { useEffect, useState } from "react"
import { Plus } from "lucide-react"

import { ProductsTable } from "@/components/productstable"
import { ProductModal } from "@/components/productmodal"
import { ProductsFilters } from "@/components/productfilter"
import { MainLayout } from "@/components/mainlayout"

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

export default function ProductsPage() {
  const [modalOpen, setModalOpen] = useState(false)

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("")

  async function fetchProducts() {
    setLoading(true)

    const res = await fetch("/api/products")
    const data = await res.json()

    setProducts(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  // 🔥 CREATE
  async function handleSave(data: any) {
    await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    await fetchProducts() 
    setModalOpen(false)
  }

 
  async function handleDelete(id: string) {
    await fetch("/api/products", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })

    await fetchProducts()
  }

  return (
    <MainLayout>
      <div className="space-y-6">

        {/* HEADER */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Produtos</h1>

          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 bg-[#00cf85] text-white px-4 py-2 rounded-md hover:opacity-90 transition"
          >
            <Plus className="h-4 w-4" />
            Novo Produto
          </button>
        </div>

        {/* FILTROS */}
        <ProductsFilters
          search={search}
          onSearchChange={setSearch}
          category={category}
          onCategoryChange={setCategory}
        />

        {/* TABELA */}
        <ProductsTable
          products={products}
          loading={loading}
          search={search}
          category={category}
          onDelete={handleDelete}
          onEdit={() => {}}
        />

        {/* MODAL */}
        <ProductModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          product={null}
          onSave={handleSave}
        />
      </div>
    </MainLayout>
  )
}