import prisma from "@/lib/prisma";

// GET /api/categories
export async function GET(req: Request) {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" }, // ordena alfabeticamente
    });

    return new Response(JSON.stringify(categories), {
      status: 200,
    });
  } catch (error) {
    console.error(error);

    return new Response(
      JSON.stringify({ error: "Erro ao buscar categorias" }),
      { status: 500 }
    );
  }
}