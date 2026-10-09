import Link from "next/link";
import { ArrowUR } from "./Icons";
import { bannerSlides as slides, BANNER_INTERVAL as I, BANNER_FADE as F } from "@/lib/banner";

/*
  Pure-CSS banner. No React state, no timers, no remounting -> no jolts.
  One shared timeline of length T = slides * interval. Slide k is fully shown at k*interval;
  its fade-in starts `fade` ms before that, on top of the previous slide (which stays at
  opacity 1 underneath, so there is never a brightness dip). It keeps zooming the whole time
  it is visible and is hidden only once the next slide fully covers it.
*/
const N = slides.length;
const T = N * I;
const ZOOM = 1.2;
const pct = (ms) => ((ms / T) * 100).toFixed(4);
const e = 0.001;

const css = `
@keyframes heroFade {
  0%{opacity:0;z-index:2}
  ${pct(F)}%{opacity:1;z-index:2}
  ${(+pct(F) + e).toFixed(4)}%{opacity:1;z-index:1}
  ${pct(F + I)}%{opacity:1;z-index:1}
  ${(+pct(F + I) + e).toFixed(4)}%{opacity:0;z-index:0}
  100%{opacity:0;z-index:0}
}
@keyframes heroZoomK {
  0%{transform:scale(1)}
  ${pct(F + I)}%{transform:scale(${ZOOM})}
  100%{transform:scale(${ZOOM})}
}
@keyframes heroDot {
  0%{width:2.5rem;opacity:1}
  ${pct(I)}%{width:2.5rem;opacity:1}
  ${(+pct(I) + e).toFixed(4)}%{width:.375rem;opacity:.6}
  100%{width:.375rem;opacity:.6}
}
@keyframes heroText {
  0%{opacity:0;transform:translateY(14px)}
  ${pct(F * 0.5)}%{opacity:0;transform:translateY(14px)}
  ${pct(F * 0.5 + 700)}%{opacity:1;transform:none}
  ${pct(I)}%{opacity:1;transform:none}
  ${pct(I + 500)}%{opacity:0;transform:none}
  100%{opacity:0;transform:none}
}
.hero-text{opacity:0;animation:heroText ${T}ms linear infinite both}
.hero-slide{opacity:0;animation:heroFade ${T}ms linear infinite both;will-change:opacity}
.hero-img{animation:heroZoomK ${T}ms linear infinite both;will-change:transform}
.hero-dot{width:.375rem;opacity:.6;animation:heroDot ${T}ms linear infinite both}
@media (prefers-reduced-motion: reduce){.hero-slide,.hero-img,.hero-dot,.hero-text{animation:none}.hero-slide:first-child,.hero-slide:first-child .hero-text{opacity:1}}
`;

export default function Hero() {
  return (
    <section className="relative h-[420px] overflow-hidden bg-stone-300 md:h-[600px]">
      <style dangerouslySetInnerHTML={{ __html: css }} />
      {slides.map((s, k) => {
        const delay = `${k * I - F}ms`;
        return (
          <div key={k} className="hero-slide absolute inset-0" style={{ animationDelay: delay }}>
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "linear-gradient(110deg,#c98a62,#e1b08c)" }} />
            <div className="hero-img absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${s.image})`, animationDelay: delay }} />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-transparent" />
            <div className="hero-text container-x absolute inset-x-0 bottom-14 text-white md:bottom-20" style={{ animationDelay: delay }}>
              <h1 className="whitespace-pre-line font-serif text-4xl leading-tight drop-shadow md:text-6xl">{s.title}</h1>
              <p className="mt-3 max-w-md text-sm opacity-90">{s.sub}</p>
              <Link href="/shop" className="btn-pill mt-6">Shop Now <ArrowUR /></Link>
            </div>
          </div>
        );
      })}
      <div className="container-x absolute inset-x-0 bottom-6 z-10 flex items-center justify-end gap-2" aria-hidden="true">
        {slides.map((_, k) => (
          <span key={k} className="hero-dot h-1 rounded-full bg-white" style={{ animationDelay: `${k === 0 ? 0 : k * I - T}ms` }} />
        ))}
      </div>
    </section>
  );
}
