"use client";
import { useState } from "react";
import Link from "next/link";
import ProductArt from "./ProductArt";
import Stars from "./Stars";
import { HeartIcon } from "./Icons";
import { useCart } from "./CartContext";
import { money } from "@/lib/products";

export default function ProductDetail({ p }) {
  const { add, wish, toggleWish } = useCart();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("50 ml");
  return (
    <div className="grid gap-10 md:grid-cols-2">
      <div className="grid aspect-square place-items-center rounded-md bg-[#f5f5f4]">
        <ProductArt shape={p.shape} tint={p.tint} className="h-[75%]" />
      </div>
      <div>
        <Link href="/shop" className="text-xs text-stone-500 hover:text-ink">← Back to shop</Link>
        <h1 className="mt-3 font-serif text-4xl">{p.name}</h1>
        <div className="mt-3 flex items-center gap-2"><Stars value={p.rating} size={14} /><span className="text-xs text-stone-500">(24 reviews)</span></div>
        <p className="mt-4 text-2xl font-semibold">{money(p.price)}</p>
        <p className="mt-4 text-sm leading-relaxed text-stone-600">{p.desc}</p>
        <div className="mt-6">
          <p className="mb-2 text-xs font-medium">Size</p>
          <div className="flex gap-2">{["30 ml", "50 ml", "100 ml"].map((s) => (
            <button key={s} onClick={() => setSize(s)} className={`rounded-full border px-4 py-1.5 text-xs ${size === s ? "border-ink bg-ink text-white" : ""}`}>{s}</button>
          ))}</div>
        </div>
        <div className="mt-8 flex items-center gap-3">
          <div className="inline-flex items-center rounded-full border">
            <button className="px-4 py-3" onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
            <span className="w-8 text-center text-sm">{qty}</span>
            <button className="px-4 py-3" onClick={() => setQty(qty + 1)}>+</button>
          </div>
          <button onClick={() => add(p.id, qty)} className="btn-dark flex-1">Add to cart</button>
          <button onClick={() => toggleWish(p.id)} aria-label="Wishlist" className="grid h-12 w-12 place-items-center rounded-full border"><HeartIcon filled={wish.includes(p.id)} className={wish.includes(p.id) ? "text-red-500" : ""} /></button>
        </div>
        <ul className="mt-8 space-y-2 border-t pt-6 text-sm text-stone-600">
          <li>✓ Free shipping over $50</li><li>✓ Cruelty-free & vegan</li><li>✓ 30-day easy returns</li>
        </ul>
      </div>
    </div>
  );
}
