describe("GET /api/trends", () => {
  it("deve retornar 4 produtos", async () => {
    const res = await fetch("http://localhost:3000/api/trends");

    const data = await res.json();

    expect(res.status).toBe(200);
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBe(4);
  });
});