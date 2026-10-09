import { notFound } from "next/navigation";
import { products, getProduct } from "@/lib/products";
import ProductDetail from "@/components/ProductDetail";
import ProductCard from "@/components/ProductCard";

export function generateStaticParams() { return products.map((p) => ({ slug: p.slug })); }

export default function Page({ params }) {
  const p = getProduct(params.slug);
  if (!p) notFound();
  const related = products.filter((x) => x.id !== p.id).slice(0, 4);
  return (
    <div className="container-x py-12">
      <ProductDetail p={p} />
      <h2 className="mb-6 mt-20 font-serif text-2xl">You may also like</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">{related.map((r) => <ProductCard key={r.id} p={r} />)}</div>
    </div>
  );
}
