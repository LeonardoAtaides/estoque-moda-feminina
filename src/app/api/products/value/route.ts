import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const result = await prisma.product.aggregate({
      where: { isActive: true },
      _sum: {
        price: true,
      },
    });

    return new Response(
      JSON.stringify({ totalPriceSum: result._sum.price }),
      { status: 200 }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Erro ao calcular soma" }),
      { status: 500 }
    );
  }
}