// tests/products.test.ts

import { GET } from "@/app/api/products/route"; // Importe diretamente a função GET

describe("GET /api/products", () => {
  it("should return 200 and an array", async () => {
    // Chama diretamente a função GET
    const res = await GET();

    const data = await res.json();

    // Verifica se o status é 200
    expect(res.status).toBe(200);

    // Verifica se a resposta é um array
    expect(Array.isArray(data)).toBe(true);
  });
});