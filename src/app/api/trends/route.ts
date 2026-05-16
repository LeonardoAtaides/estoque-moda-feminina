import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "https://dummyjson.com/products/category/womens-dresses"
    );

    const data = await response.json();

    const trends = data.products
      .sort((a: any, b: any) => b.rating - a.rating)
      .slice(0, 3);

    return NextResponse.json(trends);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar tendências" },
      { status: 500 }
    );
  }
}