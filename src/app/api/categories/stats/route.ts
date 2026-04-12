import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      where: {
        isActive: true,
        categoryId: {
          not: null,
        },
      },
      select: {
        quantity: true,
        category: {
          select: {
            name: true,
          },
        },
      },
    })


  type CategoryStats = {
    name: string
    quantidade: number
    produtos: number
  }
    const grouped = products.reduce<Record<string, CategoryStats>>(
  (acc, product) => {
      const name = product.category?.name ?? "Sem categoria"

      if (!acc[name]) {
        acc[name] = {
          name,
          quantidade: 0,
          produtos: 0,
        }
      }

      acc[name].quantidade += product.quantity
      acc[name].produtos += 1

      return acc
    }, {})

    const result = Object.values(grouped)

    return Response.json(result)
  } catch (error) {
    console.error("Erro stats categories:", error)

    return Response.json(
      { error: "Erro ao buscar estatísticas de categorias" },
      { status: 500 }
    )
  }
}