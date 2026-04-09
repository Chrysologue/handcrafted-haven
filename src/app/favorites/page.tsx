"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useFavorites } from "@/context/FavoritesContext";
import type { Product } from "@/types";
import styles from "./favorites.module.css";

export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useFavorites();
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavoriteProducts();
  }, [favorites]);

  const fetchFavoriteProducts = async () => {
    if (favorites.length === 0) {
      setFavoriteProducts([]);
      setLoading(false);
      return;
    }

    try {
      const promises = favorites.map((id) => fetch(`/api/products/${id}`));
      const responses = await Promise.all(promises);
      const products = await Promise.all(responses.map((r) => r.json()));

      // Validate products to ensure they have required fields
      const validProducts = products.filter((product) => {
        return product && typeof product === "object" && product.id;
      });

      setFavoriteProducts(validProducts);
    } catch (error) {
      console.error("Failed to fetch favorites:", error);
      setFavoriteProducts([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return <div className={styles.loading}>Loading favorites...</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Favorites</h1>

      {favoriteProducts.length === 0 ? (
        <div className={styles.emptyState}>
          <p>You haven't added any favorites yet.</p>
          <Link href="/products" className={styles.shopBtn}>
            Browse Products
          </Link>
        </div>
      ) : (
        <div className={styles.cardsGrid}>
          {favoriteProducts.map((product) => (
            <div key={`favorite-${product.id}`} className={styles.card}>
              <Link
                href={`/products/${product.id}`}
                className={styles.cardLink}
              >
                <div className={styles.imageContainer}>
                  <Image
                    src={product.image}
                    alt={product.name || "Product image"}
                    fill
                    className={styles.productImage}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleFavorite(product.id);
                    }}
                    className={styles.removeFavoriteBtn}
                    aria-label={`Remove ${product.name} from favorites`}
                  >
                    ❌ Remove
                  </button>
                </div>
                <div className={styles.cardContent}>
                  <span className={styles.category}>
                    {product.category || "Uncategorized"}
                  </span>
                  <h3 className={styles.productName}>
                    {product.name || "Unnamed Product"}
                  </h3>
                  <p className={styles.artisan}>
                    by {product.artisan || "Unknown Artisan"}
                  </p>
                  <p className={styles.location}>
                    {product.location || "Location unknown"}
                  </p>
                  <div className={styles.footer}>
                    <div className={styles.ratingSection}>
                      <span className={styles.rating}>
                        ★ {product.rating?.toFixed(1) ?? "N/A"}
                      </span>
                      <span className={styles.reviews}>
                        ({product.reviews ?? 0})
                      </span>
                    </div>
                    <span className={styles.price}>
                      ${product.price?.toFixed(2) ?? "0.00"}
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
