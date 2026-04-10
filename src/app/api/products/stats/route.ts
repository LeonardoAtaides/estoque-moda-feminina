import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const [activeCount, totalCount, valueResult, quantityResult] =
      await Promise.all([
        prisma.product.count({
          where: { isActive: true },
        }),

        prisma.product.count(),

        prisma.product.aggregate({
          where: { isActive: true },
          _sum: {
            price: true,
          },
        }),

        prisma.product.aggregate({
          where: { isActive: true },
          _sum: {
            quantity: true,
          },
        }),
      ])

    return new Response(
      JSON.stringify({
        activeCount,
        totalCount,
        totalValue: valueResult._sum.price ?? 0,
        totalQuantity: quantityResult._sum.quantity ?? 0,
      }),
      { status: 200 }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Erro ao buscar stats" }),
      { status: 500 }
    )
  }
}