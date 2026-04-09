import ProductsPage from "./products/products";
import Hero from "./components/Hero";
import Header from "./navBar/navbar";
import ProductsCarousel from "./products/products";

export default async function Page(props: {
  searchParams?: Promise<{
    search?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const search = searchParams?.search || '';
  const currentPage = Number(searchParams?.page) || 1;
  
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Hero />
      <ProductsCarousel 
        search={search} 
        page={currentPage} 
        featuredOnly={true} 
        title="Featured Products" 
      />
    </div>
  );
}
