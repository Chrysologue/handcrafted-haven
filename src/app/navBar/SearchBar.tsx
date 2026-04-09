'use client';
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function SearchBar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    if(term){
      params.set("search", term);
    }else{
      params.delete("search");
    }
    replace(`${pathname}?${params.toString()}`);
  }

    return (
        <div className="hidden md:block py-4 border-t border-gray-200 dark:border-gray-800">
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search products..."
              onChange={(e) => {
                handleSearch(e.target.value);
              }}
              defaultValue={searchParams.get('search')?.toString()}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:focus:border-blue-400 dark:focus:ring-blue-400"
              aria-label="Search products"
            />
          </div>
        </div>
    );
}