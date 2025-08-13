import { useState } from "react";
import { apiFetch } from "../lib/api";

export default function AdminDashboard() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("0");
  const [file, setFile] = useState<File | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  async function onCreate(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    if (!file) return setMsg("Please select an image");

    // 1) upload image → get URL
    const fd = new FormData();
    fd.append("image", file);
    const uploadRes = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/upload/product-image`,
      {
        method: "POST",
        headers: {
          /* Authorization ใส่ใน api.ts normally, แต่ form-data เราเรียกตรงจึงแนบเอง */
          Authorization: `Bearer ${
            (
              await (await import("../lib/supabase")).supabase.auth.getSession()
            ).data.session?.access_token ?? ""
          }`,
        },
        body: fd,
      }
    );
    if (!uploadRes.ok) return setMsg("Upload failed");
    const { image_url } = await uploadRes.json();

    // 2) create product with URL
    await apiFetch("/products/with-url", {
      method: "POST",
      body: JSON.stringify({ name, price, stock: Number(stock), image_url }),
    });

    setMsg("Created!");
    setName("");
    setPrice("");
    setStock("0");
    setFile(null);
  }

  return (
    <div className="p-6 max-w-lg">
      <h1 className="text-xl font-bold mb-4">Admin Dashboard</h1>
      <form className="space-y-3" onSubmit={onCreate}>
        <input
          className="px-3 py-2 rounded bg-white/10 w-full"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="px-3 py-2 rounded bg-white/10 w-full"
          placeholder="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          className="px-3 py-2 rounded bg-white/10 w-full"
          placeholder="stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />
        <button className="px-3 py-2 rounded bg-white/20">
          Create product
        </button>
      </form>
      {msg && <div className="mt-3">{msg}</div>}
    </div>
  );
}
