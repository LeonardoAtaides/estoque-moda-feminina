import prisma from "@/lib/prisma";

// GET /api/sizes
export async function GET(req: Request) {
  try {
    const sizes = await prisma.size.findMany({
      orderBy: { name: "asc" }, 
    });
    return new Response(JSON.stringify(sizes), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Erro ao buscar tamanhos" }), { status: 500 });
  }
}