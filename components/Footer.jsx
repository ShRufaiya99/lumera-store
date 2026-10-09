import Link from "next/link";
const cols = [
  { t: "Categories", l: ["Body Care", "Serum", "Oil Cleansers", "Facial Cream"] },
  { t: "Quick Links", l: ["Shop all", "Best sellers", "New arrivals", "Gift cards"] },
  { t: "Help", l: ["Shipping", "Returns", "FAQs", "Contact"] },
  { t: "Contact Info", l: ["hello@lumera.store", "+(123) 456 - 7890", "12 Rose Street, Dhaka"] },
];
export default function Footer() {
  return (
    <footer className="bg-stone-100 pt-16">
      <div className="container-x grid gap-10 pb-12 sm:grid-cols-2 lg:grid-cols-4">
        {cols.map((c) => (
          <div key={c.t}>
            <h4 className="mb-4 text-sm font-semibold">{c.t}</h4>
            <ul className="space-y-2 text-sm text-stone-600">{c.l.map((x) => <li key={x}><Link href="/shop" className="hover:text-ink">{x}</Link></li>)}</ul>
          </div>
        ))}
      </div>
      <div className="container-x flex flex-col items-center justify-between gap-4 border-t border-stone-200 py-6 text-xs text-stone-500 md:flex-row">
        <span>© 2026 Lumera. All rights reserved.</span>
        <span className="font-serif text-xl tracking-[0.18em] text-ink">Lumera</span>
        <span>Visa · Mastercard · PayPal · Apple Pay</span>
      </div>
    </footer>
  );
}
