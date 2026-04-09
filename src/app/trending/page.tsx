"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useFavorites } from "@/context/FavoritesContext";
import type { Product } from "@/types";
import styles from "./trending.module.css";

export default function TrendingPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    fetchTrendingProducts();
  }, []);

  const fetchTrendingProducts = async () => {
    try {
      const response = await fetch("/api/products?trending=true");
      if (!response.ok) throw new Error("Failed to fetch trending products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch trending products:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Loading trending products...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>🔥 Trending Products</h1>
        <p className={styles.subtitle}>
          Discover what's hot and popular right now
        </p>
      </div>

      {products.length === 0 ? (
        <div className={styles.emptyState}>
          <p>No trending products available at the moment.</p>
          <Link href="/products" className={styles.shopBtn}>
            Browse All Products
          </Link>
        </div>
      ) : (
        <div className={styles.cardsGrid}>
          {products.map((product) => (
            <div key={product.id} className={styles.card}>
              <Link
                href={`/products/${product.id}`}
                className={styles.cardLink}
              >
                <div className={styles.imageContainer}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className={styles.productImage}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <span className={styles.trendingBadge}>🔥 Trending</span>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleFavorite(product.id);
                    }}
                    className={styles.favoriteBtn}
                    aria-label={
                      isFavorite(product.id)
                        ? "Remove from favorites"
                        : "Add to favorites"
                    }
                  >
                    {isFavorite(product.id) ? "❤️" : "🤍"}
                  </button>
                </div>
                <div className={styles.cardContent}>
                  <span className={styles.category}>{product.category}</span>
                  <h3 className={styles.productName}>{product.name}</h3>
                  <p className={styles.artisan}>by {product.artisan}</p>
                  <p className={styles.location}>📍 {product.location}</p>
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
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
