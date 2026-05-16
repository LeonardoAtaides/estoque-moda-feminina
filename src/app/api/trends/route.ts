import { NextResponse } from "next/server"

export async function GET() {
  try {
    const response = await fetch(
      "https://dummyjson.com/products/category/womens-dresses"
    )

    const data = await response.json()


    const shuffled = data.products.sort(() => Math.random() - 0.5)

    const trends = shuffled
      .sort((a: any, b: any) => b.rating - a.rating)
      .slice(0, 4)

    return NextResponse.json(trends)
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar tendências" },
      { status: 500 }
    )
  }
}