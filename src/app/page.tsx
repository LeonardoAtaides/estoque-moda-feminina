"use client";

import { useEffect, useState } from "react";

interface Size {
  id: string;
  name: string;
}

interface Category {
  id: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  description: string | null;
  isActive: boolean;

  categoryId: string | null;
  category?: Category | null;

  sizeId: string | null;
  size?: Size | null;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [sizes, setSizes] = useState<Size[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [sizeId, setSizeId] = useState<string>("");
  const [editId, setEditId] = useState<string | null>(null);

  const [productCount, setProductCount] = useState(0);
  const [productValue, setProductValue] = useState(0);

  // COUNT
  const fetchCount = async () => {
    const res = await fetch("/api/products/count");
    if (!res.ok) return;
    const data = await res.json();
    setProductCount(data.count);
  };

    // VALUE
  const fetchValue = async () => {
    const res = await fetch("/api/products/value");
    if (!res.ok) return;
    const data = await res.json();
    setProductValue(data.totalPriceSum);
  };

  // PRODUCTS
  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    if (!res.ok) return;
    const data = await res.json();
    setProducts(data);
  };

  // SIZES
  const fetchSizes = async () => {
    const res = await fetch("/api/sizes");
    if (!res.ok) return;
    const data = await res.json();
    setSizes(data);
  };

  // CATEGORIES
  const fetchCategories = async () => {
    const res = await fetch("/api/categories");
    if (!res.ok) return;
    const data = await res.json();
    setCategories(data);
  };

  useEffect(() => {
    fetchProducts();
    fetchSizes();
    fetchCategories();
    fetchCount();
    fetchValue();
  }, []);

  // CREATE / UPDATE
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      name,
      price,
      quantity,
      categoryId: categoryId || null,
      description,
      isActive,
      sizeId: sizeId || null,
    };

    const method = editId ? "PUT" : "POST";

    const body = editId
      ? { id: editId, ...payload }
      : payload;

    await fetch("/api/products", {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    setName("");
    setPrice(0);
    setQuantity(0);
    setCategoryId("");
    setDescription("");
    setIsActive(true);
    setSizeId("");
    setEditId(null);

    fetchProducts();
    fetchCount();
    fetchValue();
  };

  // DELETE (mantido simples)
  const handleDelete = async (id: string) => {
    await fetch("/api/products", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    fetchProducts();
    fetchCount();
    fetchValue();
  };

  // EDIT
  const handleEdit = (p: Product) => {
    setEditId(p.id);
    setName(p.name);
    setPrice(p.price);
    setQuantity(p.quantity);
    setCategoryId(p.categoryId || "");
    setDescription(p.description || "");
    setIsActive(p.isActive);
    setSizeId(p.sizeId || "");
  };

  return (
    <div className="p-8 bg-black min-h-screen text-white">

      <h1 className="text-3xl font-bold mb-6 text-center">
        CRUD de Produtos
      </h1>

      {/* COUNT */}
      <div className="max-w-4xl mx-auto mb-6 bg-gray-900 p-6 rounded flex justify-between">
        <div>
          <h2 className="font-bold">Total de Produtos</h2>
          <p className="text-gray-400">Ativos no sistema</p>
        </div>
        <div className="text-3xl text-blue-400 font-bold">
          {productCount}
        </div>
      </div>

      {/* COUNT */}
      <div className="max-w-4xl mx-auto mb-6 bg-gray-900 p-6 rounded flex justify-between">
        <div>
          <h2 className="font-bold">Valor em Produtos</h2>
          <p className="text-gray-400">Ativos no sistema</p>
        </div>
        <div className="text-3xl text-blue-400 font-bold">
          {productValue}
        </div>
      </div>
      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded max-w-2xl mx-auto mb-8 space-y-4"
      >
        <div className="grid md:grid-cols-2 gap-4">

          <input
            className="p-2 rounded text-black"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="p-2 rounded text-black"
            type="number"
            placeholder="Preço"
            value={price}
            onChange={(e) =>
              setPrice(e.target.value === "" ? 0 : parseFloat(e.target.value))
            }
          />

          <input
            className="p-2 rounded text-black"
            type="number"
            placeholder="Quantidade"
            value={quantity}
            onChange={(e) =>
              setQuantity(e.target.value === "" ? 0 : parseInt(e.target.value))
            }
          />

          {/* CATEGORY (AGORA CORRETO) */}
          <select
            className="p-2 rounded text-black"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="">Categoria</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          {/* SIZE */}
          <select
            className="p-2 rounded text-black"
            value={sizeId}
            onChange={(e) => setSizeId(e.target.value)}
          >
            <option value="">Tamanho</option>
            {sizes.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <textarea
          className="p-2 rounded w-full text-black"
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
          />
          Ativo
        </label>

        <button className="bg-blue-600 px-4 py-2 rounded">
          {editId ? "Atualizar" : "Criar"}
        </button>
      </form>

      {/* LISTA */}
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-4">
        {products.map((p) => (
          <div key={p.id} className="bg-gray-800 p-4 rounded">

            <h2 className="text-lg font-bold">{p.name}</h2>

            <p>R$ {p.price.toFixed(2)}</p>
            <p>Qtd: {p.quantity}</p>

            <p>{p.category?.name || "Sem categoria"}</p>
            <p>{p.size?.name || "Sem tamanho"}</p>

            <p>{p.description}</p>
            <p>{p.isActive ? "Ativo" : "Inativo"}</p>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => handleEdit(p)}
                className="bg-yellow-500 px-2 py-1 rounded"
              >
                Editar
              </button>

              <button
                onClick={() => handleDelete(p.id)}
                className="bg-red-600 px-2 py-1 rounded"
              >
                Deletar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}