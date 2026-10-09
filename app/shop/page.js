"use client";
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";

const cats = ["all", "body-care", "serum", "oil-cleansers", "facial-cream", "makeup"];

function Shop() {
  const q = (useSearchParams().get("q") || "").toLowerCase();
  const [cat, setCat] = useState("all");
  const [sort, setSort] = useState("featured");
  let list = products.filter((p) => (cat === "all" || p.category === cat) && p.name.toLowerCase().includes(q));
  if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
  if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
  return (
    <div className="container-x py-12">
      <h1 className="font-serif text-4xl">Shop All</h1>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {cats.map((c) => (
            <button key={c} onClick={() => setCat(c)} className={`rounded-full border px-4 py-1.5 text-xs capitalize ${cat === c ? "border-ink bg-ink text-white" : "hover:border-ink"}`}>{c.replace("-", " ")}</button>
          ))}
        </div>
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-full border px-4 py-1.5 text-xs">
          <option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option>
        </select>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {list.map((p) => <ProductCard key={p.id} p={p} />)}
      </div>
      {list.length === 0 && <p className="py-20 text-center text-stone-500">No products found.</p>}
    </div>
  );
}
export default function Page() { return <Suspense><Shop /></Suspense>; }
