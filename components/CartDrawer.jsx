"use client";
import Link from "next/link";
import ProductArt from "./ProductArt";
import { CloseIcon } from "./Icons";
import { useCart } from "./CartContext";
import { products, money } from "@/lib/products";

export default function CartDrawer() {
  const { open, setOpen, items, setQty, remove } = useCart();
  const lines = items.map((i) => ({ ...i, p: products.find((p) => p.id === i.id) })).filter((l) => l.p);
  const subtotal = lines.reduce((s, l) => s + l.p.price * l.qty, 0);
  return (
    <>
      <div onClick={() => setOpen(false)} className={`fixed inset-0 z-50 bg-black/40 transition ${open ? "opacity-100" : "pointer-events-none opacity-0"}`} />
      <aside className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between border-b px-6 py-5">
          <h2 className="font-serif text-xl">Your Bag ({lines.length})</h2>
          <button onClick={() => setOpen(false)} aria-label="Close"><CloseIcon /></button>
        </div>
        <div className="flex-1 space-y-5 overflow-y-auto px-6 py-5">
          {lines.length === 0 && <p className="pt-10 text-center text-sm text-stone-500">Your bag is empty.</p>}
          {lines.map(({ p, qty }) => (
            <div key={p.id} className="flex gap-4">
              <div className="grid h-24 w-20 shrink-0 place-items-center rounded bg-[#f5f5f4]"><ProductArt shape={p.shape} tint={p.tint} className="h-20" /></div>
              <div className="flex-1 text-sm">
                <p className="font-medium">{p.name}</p>
                <p className="text-stone-500">{money(p.price)}</p>
                <div className="mt-2 inline-flex items-center rounded-full border">
                  <button className="px-3 py-1" onClick={() => setQty(p.id, qty - 1)}>−</button>
                  <span className="w-6 text-center">{qty}</span>
                  <button className="px-3 py-1" onClick={() => setQty(p.id, qty + 1)}>+</button>
                </div>
              </div>
              <button onClick={() => remove(p.id)} className="self-start text-xs text-stone-400 hover:text-ink">Remove</button>
            </div>
          ))}
        </div>
        <div className="space-y-3 border-t px-6 py-5">
          <div className="flex justify-between text-sm"><span>Subtotal</span><span className="font-semibold">{money(subtotal)}</span></div>
          <Link href="/cart" onClick={() => setOpen(false)} className="btn-dark w-full">View bag & checkout</Link>
        </div>
      </aside>
    </>
  );
}
