"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import type { Product } from "@/types";
import styles from "./products.module.css";

interface ProductsCarouselProps {
  featuredOnly?: boolean;
  title?: string;
  search?: string;
  page?: number;
}

export default function ProductsCarousel({
  featuredOnly = false,
  title = "Featured Products",
  search = "",
  page = 1,
}: ProductsCarouselProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchProducts();
  }, [featuredOnly, search, page]); // Ahora depende de search y page también

  const fetchProducts = async () => {
    setLoading(true);
    try {
      // Construir URL con todos los parámetros
      const params = new URLSearchParams();
      
      if (featuredOnly) {
        params.append("featured", "true");
      }
      
      if (search && search.trim() !== "") {
        params.append("search", search);
      }
      
      if (page) {
        params.append("page", page.toString());
      }
      
      const url = `/api/products${params.toString() ? `?${params.toString()}` : ""}`;
      const response = await fetch(url);
      
      if (!response.ok) throw new Error("Failed to fetch products");
      
      const data = await response.json();
      console.log("Fetched products:", data);
      
      // Asumiendo que tu API devuelve { products: [], pagination: { totalPages } }
      // Si tu API aún devuelve solo el array, usa esto:
      setProducts(Array.isArray(data) ? data : data.products || []);
      
      // Si tu API devuelve pagination info
      if (data.pagination) {
        setTotalPages(data.pagination.totalPages);
      }
      
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return <div className={styles.loadingContainer}>Loading products...</div>;

  if (products.length === 0) {
    return (
      <section className={styles.productsContainer}>
        <div className={styles.productsWrapper}>
          <h2 className={styles.sectionTitle}>
            {search ? `Search Results for "${search}"` : title}
          </h2>
          <p className={styles.noProducts}>
            {search ? "No products found matching your search." : "No products found."}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.productsContainer}>
      <div className={styles.productsWrapper}>
        <h2 className={styles.sectionTitle}>
          {search ? `Search Results for "${search}"` : title}
        </h2>
        <div className={styles.cardsGrid}>
          {products.map((product) => (
            <Link
              href={`/products/${product.id}`}
              key={product.id}
              className={styles.cardLink}
            >
              <div className={styles.card}>
                <div className={styles.imageContainer}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className={styles.productImage}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className={styles.cardContent}>
                  <span className={styles.category}>{product.category}</span>
                  <h3 className={styles.productName}>{product.name}</h3>
                  <p className={styles.artisan}>by {product.artisan}</p>
                  <p className={styles.location}>{product.location}</p>
                  <p className={styles.description}>{product.description}</p>
                  <div className={styles.footer}>
                    <div className={styles.ratingSection}>
                      <span className={styles.rating}>
                        ★ {product.rating.toFixed(1)}
                      </span>
                      <span className={styles.reviews}>
                        ({product.reviews})
                      </span>
                    </div>
                    <span className={styles.price}>
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Paginación - opcional, si quieres mostrarla */}
        {totalPages > 1 && (
          <div className={styles.pagination}>
            <span>Page {page} of {totalPages}</span>
          </div>
        )}
      </div>
    </section>
  );
}