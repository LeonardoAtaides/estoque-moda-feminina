import prisma from "@/lib/prisma";

// GET
export async function GET() {
  const products = await prisma.product.findMany({
    include: { size: true, category: true },
    orderBy: { createdAt: "desc" },
  });

  return new Response(JSON.stringify(products), { status: 200 });
}

// POST
export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.name || body.name.trim() === "") {
      return new Response(JSON.stringify({ error: "Nome é obrigatório" }), { status: 400 });
    }

    if (!body.price || body.price <= 0) {
      return new Response(JSON.stringify({ error: "Preço deve ser maior que 0" }), { status: 400 });
    }

    const product = await prisma.product.create({
      data: {
        name: body.name,
        price: body.price,
        quantity: body.quantity ?? 0,
        categoryId: body.categoryId,
        description: body.description,
        isActive: body.isActive ?? true,
        sizeId: body.sizeId,
      },
    });

    return new Response(JSON.stringify(product), { status: 201 });

  } catch (error) {
    return new Response(JSON.stringify({ error: "Erro ao criar produto" }), { status: 500 });
  }
}

// PUT
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, ...data } = body;

    if (!id) {
      return new Response(JSON.stringify({ error: "ID é obrigatório" }), { status: 400 });
    }

    if (data.price !== undefined && data.price <= 0) {
      return new Response(JSON.stringify({ error: "Preço deve ser maior que 0" }), { status: 400 });
    }

    const product = await prisma.product.update({
      where: { id },
      data: {
        name: data.name,
        price: data.price,
        quantity: data.quantity,
        categoryId: data.categoryId,
        description: data.description,
        isActive: data.isActive ?? true,
        sizeId: data.sizeId,
      },
    });

    return new Response(JSON.stringify(product), { status: 200 });

  } catch (error) {
    return new Response(JSON.stringify({ error: "Erro ao atualizar produto" }), { status: 500 });
  }
}

// DELETE
export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return new Response(JSON.stringify({ error: "ID é obrigatório" }), { status: 400 });
    }

    await prisma.product.delete({ where: { id } });

    return new Response(JSON.stringify({ message: "Produto deletado" }), { status: 200 });

  } catch (error) {
    return new Response(JSON.stringify({ error: "Erro ao deletar produto" }), { status: 500 });
  }
}