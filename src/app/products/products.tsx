'use client';

import Image from 'next/image';
import productsData from './data.json';
import styles from './products.module.css';

export default function ProductsCarousel() {
  const products = productsData.highlights;

  return (
    <section className={styles.productsContainer}>
      <div className={styles.productsWrapper}>
        <h2 className={styles.sectionTitle}>Featured Products</h2>
        <div className={styles.cardsGrid}>
          {products.map((product) => (
            <div key={product.id} className={styles.card}>
              <div className={styles.imageContainer}>
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className={styles.productImage}
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
                    <span className={styles.rating}>★ {product.rating}</span>
                    <span className={styles.reviews}>({product.reviews})</span>
                  </div>
                  <span className={styles.price}>
                    ${product.price.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
