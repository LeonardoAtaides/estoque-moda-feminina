"use client"

import { MainLayout } from "@/components/mainlayout"
import { CardsValues } from "@/components/cardsvalues"
import { CategoriesTable } from "@/components/tablecategories"

function HomeContent() {
  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Dashboard
          </h1>
        </div>

        {/* Stats Cards */}
        <CardsValues />

        {/* Table */}
          <CategoriesTable />
      </div>
    </MainLayout>
  )
}

export default function Page() {
  return <HomeContent />
}