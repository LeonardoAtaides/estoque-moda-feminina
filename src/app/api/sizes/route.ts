import prisma from "@/lib/prisma";

export async function GET() {
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