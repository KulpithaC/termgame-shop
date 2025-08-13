import { useEffect, useState } from "react";
import { apiFetch } from "../lib/api";

type Product = {
  id: number;
  name: string;
  price: string;
  stock: number;
  image_url?: string;
};

export default function Products() {
  const [items, setItems] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiFetch("/products")
      .then(setItems)
      .catch((e) => setError(e.message));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Products</h1>
      {error && <div className="text-red-400">{error}</div>}
      <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
        {items.map((p) => (
          <div key={p.id} className="rounded-lg border p-3 space-y-2">
            {p.image_url && (
              <img
                src={p.image_url}
                alt={p.name}
                className="w-full h-36 object-cover rounded"
              />
            )}
            <div className="font-medium">{p.name}</div>
            <div className="opacity-80">
              ฿{p.price} • stock {p.stock}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
