"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useFavorites } from "@/context/FavoritesContext";
import type { Product } from "@/types";
import styles from "./products.module.css";

interface ProductsPageProps {
  featuredOnly?: boolean;
  title?: string;
  search?: string;
  page?: number;
}

export default function ProductsCarousel({
  featuredOnly = false,
  title = "All Products",
  search,
  page,
}: ProductsPageProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const { isFavorite, toggleFavorite } = useFavorites();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [minRating, setMinRating] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    fetchProducts();
  }, [featuredOnly]);

  useEffect(() => {
    if (!featuredOnly) {
      applyFilters();
    }
  }, [
    products,
    selectedCategory,
    priceRange,
    minRating,
    searchTerm,
    sortBy,
    featuredOnly,
  ]);

  const fetchProducts = async () => {
    try {
      const url = featuredOnly
        ? "/api/products?featured=true"
        : "/api/products";
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.status}`);
      }

      const data = await response.json();

      const productsArray = Array.isArray(data) ? data : [];

      const mappedProducts: Product[] = productsArray.map((item: any) => ({
        id: item.id,
        name: item.name || "",
        artisan: item.artisan || "",
        category: item.category || "",
        price:
          typeof item.price === "string"
            ? parseFloat(item.price)
            : item.price || 0,
        currency: item.currency || "USD",
        rating:
          typeof item.rating === "string"
            ? parseFloat(item.rating)
            : item.rating || 0,
        reviews:
          typeof item.reviews === "string"
            ? parseInt(item.reviews)
            : item.reviews || 0,
        image: item.image || "",
        isFeatured: item.isFeatured ?? item.is_featured ?? false,
        isTrending: item.isTrending ?? item.is_trending ?? false,
        description: item.description || "",
        location: item.location || "",
        createdAt: item.createdAt || item.created_at,
        updatedAt: item.updatedAt || item.updated_at,
      }));

      setProducts(mappedProducts);

      if (!featuredOnly) {
        const uniqueCategories = [
          ...new Set(mappedProducts.map((p: Product) => p.category)),
        ];
        setCategories(uniqueCategories);
        setFilteredProducts(mappedProducts);
      } else {
        setFilteredProducts(mappedProducts);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    if (!Array.isArray(products)) {
      setFilteredProducts([]);
      return;
    }

    let filtered = [...products];

    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    if (priceRange.min) {
      filtered = filtered.filter((p) => p.price >= parseFloat(priceRange.min));
    }
    if (priceRange.max) {
      filtered = filtered.filter((p) => p.price <= parseFloat(priceRange.max));
    }

    if (minRating > 0) {
      filtered = filtered.filter((p) => p.rating >= minRating);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name?.toLowerCase().includes(term) ||
          p.artisan?.toLowerCase().includes(term) ||
          p.description?.toLowerCase().includes(term),
      );
    }

    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        filtered.sort((a, b) => {
          const dateA = (a as any).createdAt || (a as any).dateAdded || 0;
          const dateB = (b as any).createdAt || (b as any).dateAdded || 0;
          return dateB - dateA;
        });
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  };

  const clearFilters = () => {
    setSelectedCategory("");
    setPriceRange({ min: "", max: "" });
    setMinRating(0);
    setSearchTerm("");
    setSortBy("newest");
  };

  if (loading) {
    return <div className={styles.loadingContainer}>Loading products...</div>;
  }

  if (filteredProducts.length === 0 && !loading) {
    return (
      <div className={styles.noResultsContainer}>
        <p>No products found.</p>
        {!featuredOnly && (
          <button onClick={clearFilters} className={styles.clearBtn}>
            Clear Filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div
      className={featuredOnly ? styles.featuredContainer : styles.productsPage}
    >
      {/* Only show filters sidebar when NOT in featuredOnly mode */}
      {!featuredOnly && (
        <aside className={styles.filtersSidebar}>
          <h3 className={styles.filtersTitle}>Filters</h3>

          <button onClick={clearFilters} className={styles.clearFiltersBtn}>
            Clear All Filters
          </button>

          {/* Search */}
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Search</label>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.filterInput}
            />
          </div>

          {/* Category Filter */}
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Price Range</label>
            <div className={styles.priceRange}>
              <input
                type="number"
                placeholder="Min"
                value={priceRange.min}
                onChange={(e) =>
                  setPriceRange({ ...priceRange, min: e.target.value })
                }
                className={styles.priceInput}
              />
              <span className={styles.priceSeparator}>-</span>
              <input
                type="number"
                placeholder="Max"
                value={priceRange.max}
                onChange={(e) =>
                  setPriceRange({ ...priceRange, max: e.target.value })
                }
                className={styles.priceInput}
              />
            </div>
          </div>

          {/* Rating Filter */}
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Minimum Rating</label>
            <div className={styles.ratingFilter}>
              {[5, 4, 3, 2, 1].map((rating) => (
                <button
                  key={rating}
                  onClick={() =>
                    setMinRating(rating === minRating ? 0 : rating)
                  }
                  className={`${styles.ratingBtn} ${minRating === rating ? styles.activeRating : ""}`}
                >
                  {rating}★ & up
                </button>
              ))}
            </div>
          </div>

          {/* Sort By */}
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="newest">Newest First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </aside>
      )}

      {/* Products Grid */}
      <div
        className={
          featuredOnly ? styles.featuredContent : styles.productsContent
        }
      >
        {!featuredOnly && (
          <div className={styles.resultsHeader}>
            <h2 className={styles.resultsTitle}>{title}</h2>
            <p className={styles.resultsCount}>
              {filteredProducts.length} products found
            </p>
          </div>
        )}

        {featuredOnly && title && (
          <div className={styles.featuredHeader}>
            <h2 className={styles.featuredTitle}>{title}</h2>
          </div>
        )}

        <div className={featuredOnly ? styles.featuredGrid : styles.cardsGrid}>
          {filteredProducts.map((product) => (
            <div key={product.id} className={styles.productCard}>
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
                  {featuredOnly && product.isFeatured && (
                    <span className={styles.featuredBadge}>Featured</span>
                  )}
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

        {filteredProducts.length === 0 && !featuredOnly && (
          <div className={styles.noResults}>
            <p>No products found matching your criteria.</p>
            <button onClick={clearFilters} className={styles.clearBtn}>
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
