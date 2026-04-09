"use client";

import { useSearchParams } from "next/navigation";
import ProductsCarousel from "./products";

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const search = searchParams.get('search') || '';

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5f9e9] to-white">
      <ProductsCarousel featuredOnly={false} title="All Products" search={search} />
    </div>
  );
}
