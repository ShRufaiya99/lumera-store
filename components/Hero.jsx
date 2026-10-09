"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUR, ChevronL, ChevronR } from "./Icons";
import { bannerSlides as slides, BANNER_INTERVAL, BANNER_FADE } from "@/lib/banner";

const fallback = ["linear-gradient(110deg,#c98a62,#e1b08c)", "linear-gradient(110deg,#b9a06a,#d9c58f)", "linear-gradient(110deg,#a8604a,#d08a70)"];

export default function Hero() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((x) => (x + 1) % slides.length), BANNER_INTERVAL);
    return () => clearInterval(t);
  }, [paused]);
  const go = (d) => setI((x) => (x + d + slides.length) % slides.length);

  return (
    <section className="relative h-[420px] overflow-hidden bg-stone-300 md:h-[600px]" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {slides.map((s, n) => (
        <div key={n} aria-hidden={n !== i} className="absolute inset-0" style={{ opacity: n === i ? 1 : 0, transition: `opacity ${BANNER_FADE}ms ease-in-out`, background: fallback[n % 3] }}>
          {/* Slow zoom (Ken Burns): restarts each time the slide becomes active */}
          <div key={n === i ? "on" : "off"} className={`absolute inset-0 bg-cover bg-center ${n === i ? "hero-zoom" : ""}`} style={{ backgroundImage: `url(${s.image})`, animationDuration: `${BANNER_INTERVAL + BANNER_FADE}ms` }} />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-transparent" />
          <div className="container-x absolute inset-x-0 bottom-14 text-white md:bottom-20">
            <h1 className="whitespace-pre-line font-serif text-4xl leading-tight drop-shadow md:text-6xl">{s.title}</h1>
            <p className="mt-3 max-w-md text-sm opacity-90">{s.sub}</p>
            <Link href="/shop" className="btn-pill mt-6">Shop Now <ArrowUR /></Link>
          </div>
        </div>
      ))}
      <div className="container-x absolute inset-x-0 bottom-6 flex items-center justify-end gap-3 text-white">
        <button onClick={() => go(-1)} aria-label="Previous"><ChevronL /></button>
        {slides.map((_, n) => (
          <button key={n} onClick={() => setI(n)} aria-label={`Slide ${n + 1}`} className={`h-1 rounded-full bg-white transition-all duration-700 ${n === i ? "w-10" : "w-1.5 opacity-60"}`} />
        ))}
        <button onClick={() => go(1)} aria-label="Next"><ChevronR /></button>
      </div>
    </section>
  );
}
