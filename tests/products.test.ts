jest.mock("@/lib/prisma", () => ({
  __esModule: true,
  default: {
    product: {
      create: jest.fn(),
    },
  },
}));

import { POST } from "@/app/api/products/route";
import prisma from "@/lib/prisma";

describe("POST /api/products", () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  //  1. Caminho feliz
  it("deve criar um produto com sucesso", async () => {
    (prisma.product.create as jest.Mock).mockResolvedValue({
      id: "1",
      name: "Blusa",
      price: 50,
      quantity: 10,
    });

    const req = new Request("http://localhost", {
      method: "POST",
      body: JSON.stringify({
        name: "Blusa",
        price: 50,
        quantity: 10,
      }),
    });

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(201);
    expect(data.name).toBe("Blusa");
  });

  //  2. Entrada inválida
  it("deve retornar erro se nome estiver vazio", async () => {
    const req = new Request("http://localhost", {
      method: "POST",
      body: JSON.stringify({
        name: "",
        price: 50,
      }),
    });

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.error).toBe("Nome é obrigatório");
  });

  // 3. Caso limite
  it("deve criar produto com quantidade padrão quando não informada", async () => {
    (prisma.product.create as jest.Mock).mockResolvedValue({
      id: "1",
      name: "Blusa",
      price: 50,
      quantity: 0,
    });

    const req = new Request("http://localhost", {
      method: "POST",
      body: JSON.stringify({
        name: "Blusa",
        price: 50,
      }),
    });

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(201);
    expect(data.quantity).toBe(0);
  });

});