
import ProductsCarousel from "./products/products";
import Hero from "./components/Hero";
import "./style.css";

export default function Home() {
  return (
    <div className="home-root">
      <Hero />
      <ProductsCarousel featuredOnly={true} title="Featured Products" />
    </div>
  );
}
