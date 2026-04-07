

import Image from "next/image";
import Link from "next/link";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <p className="hero-badge">
            artisan-first marketplace
          </p>
          <h1 className="hero-title">
            Discover unique handcrafted treasures
          </h1>
          <p className="hero-desc">
            Support local craftspeople, shop ethically, and find one-of-a-kind pieces.
            A friendly community where makers and conscious buyers connect.
          </p>

          <div className="hero-actions">
            <Link href="#" className="hero-btn-primary">
              Explore creations
            </Link>
            <Link href="#" className="hero-btn-secondary">
              Start selling
            </Link>
          </div>
        </div>

        <figure className="hero-figure">
          <Image
            src="/hero-artisan.webp"
            alt="Artisan crafting home decor item"
            width={800}
            height={600}
            className="hero-image"
            priority
          />
          <figcaption className="hero-caption">
            Every piece tells a story of craftsmanship and community
          </figcaption>
        </figure>
      </div>
    </section>
  );
}