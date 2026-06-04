"use client"

import { useEffect, useState } from "react"
import { Plus, FolderUp } from "lucide-react"

import { ProductsTable } from "@/components/productstable"
import { ProductModal } from "@/components/productmodal"
import { ProductsFilters } from "@/components/productfilter"
import { MainLayout } from "@/components/mainlayout"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

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

  type ProductForm = {
  name: string
  price: number
  quantity: number
  description?: string | null
  isActive?: boolean
  sizeId?: string
  categoryId?: string
}

  async function handleSave(data: ProductForm) {
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



function handleExportPDF() {
  const doc = new jsPDF()

  const dataAtual = new Date().toLocaleDateString("pt-BR")

  // Nome do sistema
  doc.setTextColor(0, 0, 0)
  doc.setFontSize(18)
  doc.text("StockFashion", 14, 17)

  // Data de geração
  doc.setFontSize(10)
  doc.setTextColor(120)
  doc.text(`Gerado em: ${dataAtual}`, 14, 23)

  // Subtítulo
  doc.setFontSize(11)
  doc.text("Relatório de Produtos", 14, 29)

  // Linha divisória
  doc.setDrawColor(0, 207, 133)
  doc.line(14, 33, 196, 33)

  autoTable(doc, {
    startY: 39,
    head: [["Nome", "Categoria", "Tamanho", "Preço", "Quantidade", "Status"]],
    headStyles: {
      fillColor: [0, 207, 133],
      textColor: [255, 255, 255],
      fontStyle: "bold",
    },
    body: products.map((product) => [
      product.name,
      product.category?.name || "-",
      product.size?.name || "-",
      `R$ ${product.price.toFixed(2)}`,
      product.quantity,
      product.isActive ? "Ativo" : "Inativo",
    ]),
  })

  doc.save(`produtos-${dataAtual.replace(/\//g, "-")}.pdf`)
}

  return (
    <MainLayout>
      <div className="space-y-6">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-7 ">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Produtos</h1>

          <div className="flex items-center gap-2">
          <button
          onClick={handleExportPDF}
            
            className="flex items-center gap-2 border border-[#00cf85] text-white px-4 py-2 rounded-md hover:opacity-90 transition cursor-pointer"
          >
            <FolderUp className="h-4 w-4" />
            Exportar PDF
          </button>

          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 bg-[#00cf85] text-white px-4 py-2 rounded-md hover:opacity-90 transition cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            Novo Produto
          </button>            
          </div>

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