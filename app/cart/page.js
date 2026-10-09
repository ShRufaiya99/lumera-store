"use client";
import Link from "next/link";
import { useState } from "react";
import ProductArt from "@/components/ProductArt";
import { useCart } from "@/components/CartContext";
import { products, money } from "@/lib/products";

export default function CartPage() {
  const { items, setQty, remove, clear } = useCart();
  const [done, setDone] = useState(false);
  const lines = items.map((i) => ({ ...i, p: products.find((p) => p.id === i.id) })).filter((l) => l.p);
  const subtotal = lines.reduce((s, l) => s + l.p.price * l.qty, 0);
  const shipping = subtotal > 50 || subtotal === 0 ? 0 : 5;

  if (done) return (
    <div className="container-x py-24 text-center">
      <h1 className="font-serif text-4xl">Thank you for your order 🎉</h1>
      <p className="mt-3 text-stone-500">A confirmation has been sent to your email.</p>
      <Link href="/shop" className="btn-dark mt-8">Continue shopping</Link>
    </div>
  );
  return (
    <div className="container-x py-12">
      <h1 className="font-serif text-4xl">Your Bag</h1>
      {lines.length === 0 ? (
        <div className="py-20 text-center"><p className="text-stone-500">Your bag is empty.</p><Link href="/shop" className="btn-dark mt-6">Start shopping</Link></div>
      ) : (
        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_380px]">
          <div className="divide-y">
            {lines.map(({ p, qty }) => (
              <div key={p.id} className="flex items-center gap-5 py-5">
                <div className="grid h-28 w-24 shrink-0 place-items-center rounded bg-[#f5f5f4]"><ProductArt shape={p.shape} tint={p.tint} className="h-24" /></div>
                <div className="flex-1"><Link href={`/product/${p.slug}`} className="font-medium">{p.name}</Link><p className="text-sm text-stone-500">{money(p.price)}</p>
                  <button onClick={() => remove(p.id)} className="mt-2 text-xs text-stone-400 hover:text-ink">Remove</button></div>
                <div className="inline-flex items-center rounded-full border text-sm">
                  <button className="px-3 py-1.5" onClick={() => setQty(p.id, qty - 1)}>−</button><span className="w-6 text-center">{qty}</span><button className="px-3 py-1.5" onClick={() => setQty(p.id, qty + 1)}>+</button>
                </div>
                <p className="w-20 text-right font-semibold">{money(p.price * qty)}</p>
              </div>
            ))}
          </div>
          <form onSubmit={(e) => { e.preventDefault(); clear(); setDone(true); }} className="h-fit space-y-3 rounded-md bg-sand p-6">
            <h2 className="font-serif text-xl">Checkout</h2>
            <input required placeholder="Full name" className="w-full rounded-full border bg-white px-4 py-2.5 text-sm" />
            <input required type="email" placeholder="Email" className="w-full rounded-full border bg-white px-4 py-2.5 text-sm" />
            <input required placeholder="Shipping address" className="w-full rounded-full border bg-white px-4 py-2.5 text-sm" />
            <div className="space-y-1 border-t pt-3 text-sm">
              <div className="flex justify-between"><span>Subtotal</span><span>{money(subtotal)}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>{shipping ? money(shipping) : "Free"}</span></div>
              <div className="flex justify-between text-base font-semibold"><span>Total</span><span>{money(subtotal + shipping)}</span></div>
            </div>
            <button className="btn-dark w-full">Place order</button>
          </form>
        </div>
      )}
    </div>
  );
}
