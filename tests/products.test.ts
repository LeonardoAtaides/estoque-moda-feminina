import { GET } from "@/app/api/products/route"

describe("GET /api/products", () => {
  it("should return 200", async () => {
    const res = await GET()

    const data = await res.json()

    expect(res.status).toBe(200)
    expect(Array.isArray(data)).toBe(true)
  })
})