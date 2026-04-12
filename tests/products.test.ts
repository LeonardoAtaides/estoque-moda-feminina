
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
});