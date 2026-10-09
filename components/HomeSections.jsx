"use client";
import Link from "next/link";
import { useState } from "react";
import ProductArt from "./ProductArt";
import Stars from "./Stars";
import ProductCard from "./ProductCard";
import { FlowerIcon, ArrowUR, ChevronL, ChevronR, PlusIcon } from "./Icons";
import { categories, products, money } from "@/lib/products";

export function Welcome() {
  return (
    <section className="container-x py-16 text-center md:py-20">
      <FlowerIcon className="mx-auto" />
      <h2 className="mt-4 font-serif text-3xl md:text-4xl">Welcome To The World Of Lumera</h2>
      <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-stone-500">
        Step into the world of Lumera, where modern beauty meets thoughtful care. We believe skincare should feel effortless yet deliver meaningful results. That's why every product is carefully formulated with clean, skin-loving ingredients and gentle actives chosen for their performance and safety.
      </p>
    </section>
  );
}

export function Categories() {
  return (
    <section className="container-x grid grid-cols-2 gap-3 lg:grid-cols-4">
      {categories.map((c) => (
        <Link key={c.slug} href="/shop" className="group relative aspect-[3/4] overflow-hidden rounded-md" style={{ background: `linear-gradient(160deg,${c.from},${c.to})` }}>
          <ProductArt shape={c.shape} tint={c.slug === "oil-cleansers" ? "#9a6b3c" : "#f4ece3"} className="absolute inset-x-0 bottom-10 mx-auto h-[70%] transition duration-500 group-hover:scale-105" />
          <span className="absolute left-4 top-4 font-serif text-xl text-white md:text-2xl" style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>{c.name}</span>
          <span className="btn-pill absolute bottom-4 left-4">Shop Now <ArrowUR /></span>
        </Link>
      ))}
    </section>
  );
}

export function Featured() {
  return (
    <section className="container-x py-16 md:py-20">
      <div className="mb-8 flex items-end justify-between">
        <h2 className="font-serif text-2xl md:text-3xl">Featured Products</h2>
        <Link href="/shop" className="inline-flex items-center gap-1 text-xs font-medium">View All Categories <ArrowUR /></Link>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
        {products.slice(0, 5).map((p) => <ProductCard key={p.id} p={p} />)}
      </div>
    </section>
  );
}

export function Essentials() {
  return (
    <section className="bg-sand py-16 md:py-20">
      <div className="container-x grid items-center gap-10 md:grid-cols-2">
        <div>
          <h2 className="font-serif text-3xl">Today's Beauty Essentials</h2>
          <p className="mt-3 max-w-md text-sm text-stone-500">Carefully curated daily must-haves designed to enhance your natural glow with effortless elegance, trusted performance, and a modern approach to skincare.</p>
          <div className="mt-8 grid grid-cols-3 gap-3">
            {products.slice(5, 8).map((p) => (
              <Link key={p.id} href={`/product/${p.slug}`} className="rounded-md bg-white p-3 text-center">
                <ProductArt shape={p.shape} tint={p.tint} className="mx-auto h-28" />
                <p className="mt-2 text-xs">{p.name}</p><p className="text-xs font-semibold">{money(p.price)}</p>
              </Link>
            ))}
          </div>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-gradient-to-br from-[#e86f6f] via-[#f0a08a] to-[#8fb36a]">
          <p className="absolute left-6 top-6 font-serif text-2xl italic text-white">What's Hot In Beauty</p>
          <ProductArt shape="jar" tint="#fbe9dc" className="absolute bottom-0 right-8 h-[80%]" />
        </div>
      </div>
    </section>
  );
}

export function EditBanner() {
  const p = products[2];
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-stone-200 to-stone-100">
      <div className="container-x grid min-h-[340px] items-center gap-4 py-12 md:grid-cols-2">
        <div>
          <span className="text-[11px] uppercase tracking-widest text-stone-500">Lookbook</span>
          <h2 className="mt-2 font-serif text-3xl md:text-4xl">Timeless Beauty Edit<br />Collection</h2>
          <Link href="/shop" className="btn-pill mt-6 bg-white">Shop Now <ArrowUR /></Link>
        </div>
        <div className="relative flex items-end justify-center gap-3">
          <ProductArt shape="pump" tint="#2b2b2b" className="h-64" />
          <ProductArt shape="pump" tint="#6b8a4a" className="h-72" />
          <div className="absolute right-0 top-0 hidden w-32 rounded-md bg-white p-2 text-[11px] shadow-lg sm:block">
            <ProductArt shape={p.shape} tint={p.tint} className="mx-auto h-16" />
            <Stars value={4} size={9} /><p>{p.name}</p><p className="font-semibold">{money(p.price)}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

const reviews = [
  { t: "A Beautiful Upgrade to My Daily Routine", b: "I discovered this collection while searching for something that truly fits my lifestyle, and I couldn't be happier. The textures feel luxurious, the results are visible, and every product blends effortlessly into my routine.", n: "Charlesette R.", f: "From Florida" },
  { t: "My Skin Has Never Felt Better", b: "After three weeks my skin is clearer, softer and so much more even. The serum is now a non-negotiable step every single morning.", n: "Amelia K.", f: "From London" },
  { t: "Gentle, Effective, Gorgeous", b: "Finally a brand that is gentle on sensitive skin but still delivers. The packaging is beautiful and delivery was fast.", n: "Nadia H.", f: "From Dhaka" },
];
export function Testimonials() {
  const [i, setI] = useState(0);
  const r = reviews[i];
  return (
    <section className="container-x border-b py-16 text-center">
      <span className="text-[11px] uppercase tracking-widest text-stone-500">Testimonials</span>
      <h2 className="mt-2 font-serif text-3xl">What Our Customers Say</h2>
      <div className="mx-auto mt-8 flex max-w-3xl items-center gap-4">
        <button onClick={() => setI((i + reviews.length - 1) % reviews.length)} aria-label="Previous"><ChevronL /></button>
        <div className="flex-1">
          <div className="flex justify-center"><Stars value={5} /></div>
          <h3 className="mt-3 text-sm font-semibold">{r.t}</h3>
          <p className="mt-3 text-sm leading-relaxed text-stone-500">“{r.b}”</p>
          <div className="mx-auto mt-5 grid h-10 w-10 place-items-center rounded-full bg-clay text-sm text-white">{r.n[0]}</div>
          <p className="mt-2 text-xs font-semibold">{r.n}</p><p className="text-xs text-stone-500">{r.f}</p>
        </div>
        <button onClick={() => setI((i + 1) % reviews.length)} aria-label="Next"><ChevronR /></button>
      </div>
    </section>
  );
}

const feats = [["Natural Care", "Free from unnecessary additives, focused on purity."], ["100% Organic", "Free from unnecessary additives, focused on purity and performance."], ["Non Chemicals", "Free from harsh chemicals, focusing on gentle and minimal formulas."], ["No Side Effect", "Carefully formulated to be gentle on skin, without unwanted effects."]];
export function Features() {
  return (
    <section className="container-x grid grid-cols-2 gap-8 border-b py-12 text-center md:grid-cols-4">
      {feats.map(([t, d]) => (
        <div key={t}>
          <div className="mx-auto mb-3 grid h-10 w-10 place-items-center rounded-full border text-clay">✿</div>
          <h4 className="text-sm font-semibold">{t}</h4><p className="mt-1 text-xs text-stone-500">{d}</p>
        </div>
      ))}
    </section>
  );
}

const posts = [["Body Clean Basics", "#d9a58a"], ["Skin Care Simple", "#4a3a2e"], ["Glow Essentials", "#c98a72"], ["The Power of Retinol", "#b9a98f"]];
export function Insights() {
  return (
    <section id="insights" className="container-x py-16">
      <h2 className="mb-8 font-serif text-2xl md:text-3xl">Beauty Insights</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {posts.map(([t, c]) => (
          <article key={t}>
            <div className="aspect-[4/3] rounded-md" style={{ background: `linear-gradient(135deg,${c},#f3e6d9)` }} />
            <h3 className="mt-3 text-sm font-semibold">{t}</h3>
            <p className="mt-1 text-xs text-stone-500">Beauty tips for soft, balanced skin at every stage.</p>
          </article>
        ))}
      </div>
    </section>
  );
}

const faqs = [["Are your products suitable for all skin types?", "Yes. Every formula is dermatologist-tested and gentle enough for sensitive skin."], ["How long does it take to see visible results?", "Most customers notice improved texture and glow within 2–4 weeks of consistent use."], ["Are your ingredients clean and cruelty-free?", "Always. We never test on animals and avoid harsh chemicals and unnecessary additives."], ["Can I use these products together?", "Yes, our range is designed to layer seamlessly in a simple routine."]];
export function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="container-x grid gap-10 pb-16 md:grid-cols-2">
      <div className="relative min-h-[300px] overflow-hidden rounded-md bg-gradient-to-br from-[#3a2a22] to-[#1a1210] p-8 text-white">
        <h3 className="font-serif text-2xl">Subscribe Our Newsletter</h3>
        <p className="mt-2 max-w-xs text-sm opacity-80">Get 10% off your first order and be first to know about new launches.</p>
        <form onSubmit={(e) => { e.preventDefault(); e.currentTarget.reset(); alert("Thanks for subscribing!"); }} className="mt-6 flex max-w-sm gap-2">
          <input required type="email" placeholder="Your email" className="min-w-0 flex-1 rounded-full bg-white/10 px-4 py-2.5 text-sm outline-none placeholder:text-white/50" />
          <button className="rounded-full bg-white px-5 text-sm text-ink">Join</button>
        </form>
      </div>
      <div>
        <h2 className="mb-4 font-serif text-2xl md:text-3xl">Frequently Asked Question</h2>
        {faqs.map(([q, a], n) => (
          <div key={q} className="border-b py-4">
            <button onClick={() => setOpen(open === n ? -1 : n)} className="flex w-full items-center justify-between text-left text-sm font-medium">
              {q}<PlusIcon className={`transition ${open === n ? "rotate-45" : ""}`} />
            </button>
            {open === n && <p className="mt-2 text-sm text-stone-500">{a}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
