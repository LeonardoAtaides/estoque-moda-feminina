"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { ProductsTable } from "@/components/productstable"
import { ProductModal } from "@/components/productmodal"
import { ProductsFilters } from "@/components/productfilter"
import { MainLayout } from "@/components/mainlayout"

export default function ProductsPage() {
  const [modalOpen, setModalOpen] = useState(false)

  // filtros
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("")

  async function handleSave(data: any) {
    await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
  }

  return (
    <MainLayout>
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Produtos</h1>

        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 bg-[#00cf85] text-white px-4 py-2 rounded-md hover:opacity-90 transition"
        >
          <Plus className="h-4 w-4 " />
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
        search={search}
        category={category}
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