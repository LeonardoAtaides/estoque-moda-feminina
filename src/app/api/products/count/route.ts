import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const count = await prisma.product.count({
        where: {isActive: true}
    });

    return new Response(JSON.stringify({ count }), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Erro ao contar produtos" }),
      { status: 500 }
    );
  }
}