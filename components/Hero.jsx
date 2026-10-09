"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUR, ChevronL, ChevronR } from "./Icons";
import { bannerSlides as slides, BANNER_INTERVAL, BANNER_FADE } from "@/lib/banner";

const fallback = ["linear-gradient(110deg,#c98a62,#e1b08c)", "linear-gradient(110deg,#b9a06a,#d9c58f)", "linear-gradient(110deg,#a8604a,#d08a70)"];
const total = slides.length;

export default function Hero() {
  // i = visible slide, prev = slide currently fading out,
  // gens[n] = how many times slide n became active (restarts its zoom only when it becomes active again)
  const [st, setSt] = useState({ i: 0, prev: -1, gens: slides.map((_, n) => (n === 0 ? 1 : 0)) });
  const [paused, setPaused] = useState(false);

  const goTo = (fn) =>
    setSt((s) => {
      const n = fn(s.i);
      if (n === s.i) return s;
      return { i: n, prev: s.i, gens: s.gens.map((g, k) => (k === n ? g + 1 : g)) };
    });

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => goTo((x) => (x + 1) % total), BANNER_INTERVAL);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <section className="relative h-[420px] overflow-hidden bg-stone-300 md:h-[600px]" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {slides.map((s, n) => {
        const active = n === st.i;
        const zooming = active || n === st.prev; // outgoing slide stays fully visible and keeps zooming while the new one fades in on top: no dip, no snap-back
        return (
          <div key={n} aria-hidden={!active} className="absolute inset-0" style={{ opacity: zooming ? 1 : 0, transition: active ? `opacity ${BANNER_FADE}ms linear` : "none", background: fallback[n % 3], zIndex: active ? 2 : n === st.prev ? 1 : 0 }}>
            <div
              key={`${n}-${st.gens[n]}`}
              className={`absolute inset-0 bg-cover bg-center will-change-transform ${zooming ? "hero-zoom" : ""}`}
              style={{ backgroundImage: `url(${s.image})`, animationDuration: `${BANNER_INTERVAL + BANNER_FADE}ms` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-transparent" />
            <div className="container-x absolute inset-x-0 bottom-14 text-white md:bottom-20">
              <h1 className="whitespace-pre-line font-serif text-4xl leading-tight drop-shadow md:text-6xl">{s.title}</h1>
              <p className="mt-3 max-w-md text-sm opacity-90">{s.sub}</p>
              <Link href="/shop" className="btn-pill mt-6">Shop Now <ArrowUR /></Link>
            </div>
          </div>
        );
      })}
      <div className="container-x absolute inset-x-0 bottom-6 z-10 flex items-center justify-end gap-3 text-white">
        <button onClick={() => goTo((x) => (x - 1 + total) % total)} aria-label="Previous"><ChevronL /></button>
        {slides.map((_, n) => (
          <button key={n} onClick={() => goTo(() => n)} aria-label={`Slide ${n + 1}`} className={`h-1 rounded-full bg-white transition-all duration-700 ${n === st.i ? "w-10" : "w-1.5 opacity-60"}`} />
        ))}
        <button onClick={() => goTo((x) => (x + 1) % total)} aria-label="Next"><ChevronR /></button>
      </div>
    </section>
  );
}
