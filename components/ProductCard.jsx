"use client";
import Link from "next/link";
import ProductArt from "./ProductArt";
import Stars from "./Stars";
import { HeartIcon, BagIcon } from "./Icons";
import { useCart } from "./CartContext";
import { money } from "@/lib/products";

export default function ProductCard({ p }) {
  const { add, wish, toggleWish } = useCart();
  const liked = wish.includes(p.id);
  return (
    <div className="group">
      <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-[#f5f5f4]">
        <Link href={`/product/${p.slug}`} className="absolute inset-0 grid place-items-center">
          <ProductArt shape={p.shape} tint={p.tint} className="h-[72%] transition duration-500 group-hover:scale-105" />
        </Link>
        {p.badge && <span className="absolute left-3 top-3 rounded-full bg-ink px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-white">{p.badge}</span>}
        <button onClick={() => toggleWish(p.id)} aria-label="Add to wishlist" className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white/90 opacity-0 transition group-hover:opacity-100 focus:opacity-100">
          <HeartIcon filled={liked} width={16} height={16} className={liked ? "text-red-500" : ""} />
        </button>
        <button onClick={() => add(p.id)} className="absolute inset-x-3 bottom-3 flex translate-y-3 items-center justify-center gap-2 rounded-full bg-white py-2.5 text-xs font-medium opacity-0 shadow transition group-hover:translate-y-0 group-hover:opacity-100 hover:bg-ink hover:text-white focus:translate-y-0 focus:opacity-100">
          <BagIcon width={14} height={14} /> Add to cart
        </button>
      </div>
      <div className="mt-3 space-y-1">
        <Stars value={p.rating} />
        <Link href={`/product/${p.slug}`} className="block text-sm hover:text-clay">{p.name}</Link>
        <p className="text-sm font-semibold">{money(p.price)}</p>
      </div>
    </div>
  );
}
