"use client";
import Link from "next/link";
import { useState } from "react";
import { SearchIcon, UserIcon, HeartIcon, BagIcon, MenuIcon, CloseIcon } from "./Icons";
import { useCart } from "./CartContext";

const nav = [
  { label: "Home", href: "/" },
  { label: "Collection", href: "/shop" },
  { label: "Products", href: "/shop" },
  { label: "Other Pages", href: "/#faq" },
  { label: "Blog", href: "/#insights" },
];

export default function Header() {
  const { count, wish, setOpen } = useCart();
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-white">
      <div className="bg-clay text-[11px] text-white">
        <div className="container-x flex h-8 items-center justify-between">
          <span className="hidden md:inline">Store Locations · +(123) 456 - 7890</span>
          <span className="mx-auto md:mx-0">🔥 Limited time offer! 20% off selected items</span>
          <span className="hidden gap-3 md:flex"><span>Fb</span><span>Ig</span><span>Tg</span><span>Pn</span></span>
        </div>
      </div>
      <div className="border-b border-stone-100">
        <div className="container-x relative flex h-16 items-center justify-between">
          <button className="md:hidden" aria-label="Menu" onClick={() => setMenu(true)}><MenuIcon /></button>
          <nav className="hidden gap-7 text-[13px] md:flex">
            {nav.map((n, i) => (
              <Link key={n.label} href={n.href} className={`hover:text-clay ${i === 0 ? "underline underline-offset-4" : ""}`}>{n.label} {i > 0 && i < 4 ? "⌄" : ""}</Link>
            ))}
          </nav>
          <Link href="/" className="absolute left-1/2 -translate-x-1/2 font-serif text-2xl tracking-[0.18em]">Lumera</Link>
          <div className="flex items-center gap-4">
            <button aria-label="Search" onClick={() => setSearch((s) => !s)}><SearchIcon /></button>
            <button aria-label="Account" className="hidden sm:block"><UserIcon /></button>
            <Link href="/shop" aria-label="Wishlist" className="relative hidden sm:block">
              <HeartIcon />{wish.length > 0 && <Badge n={wish.length} />}
            </Link>
            <button aria-label="Cart" className="relative" onClick={() => setOpen(true)}>
              <BagIcon />{count > 0 && <Badge n={count} />}
            </button>
          </div>
        </div>
        {search && (
          <form action="/shop" className="container-x pb-4">
            <input autoFocus name="q" placeholder="Search products…" className="w-full rounded-full border border-stone-200 px-5 py-2.5 text-sm outline-none focus:border-clay" />
          </form>
        )}
      </div>
      {menu && (
        <div className="fixed inset-0 z-50 bg-white p-6 md:hidden">
          <button onClick={() => setMenu(false)} aria-label="Close"><CloseIcon /></button>
          <nav className="mt-8 flex flex-col gap-5 font-serif text-2xl">
            {nav.map((n) => <Link key={n.label} href={n.href} onClick={() => setMenu(false)}>{n.label}</Link>)}
          </nav>
        </div>
      )}
    </header>
  );
}
const Badge = ({ n }) => <span className="absolute -right-2 -top-2 grid h-4 w-4 place-items-center rounded-full bg-ink text-[9px] text-white">{n}</span>;
