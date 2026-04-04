import Link from "next/link";

export default function AboutPage() {
  return (
    <section className="min-h-screen bg-zinc-50 dark:bg-black text-[var(--foreground)]">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-900 dark:to-gray-900 py-20">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <h1 className="text-5xl md:text-6xl font-bold font-roboto-slab text-white mb-6">
            About Handcrafted Haven
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            Celebrating the Art of Handmade Craftsmanship from Artisans Around the World
          </p>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold font-roboto-slab mb-6 text-[var(--foreground)]">
                Our Story
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                Handcrafted Haven was born from a simple belief: that handmade items carry stories, soul, and authenticity that mass-produced goods cannot replicate. Founded in 2020, we set out on a mission to connect artisans with customers who truly appreciate the artistry behind every creation.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                We work directly with skilled craftspeople from various cultures around the globe, ensuring fair compensation, ethical practices, and sustainable production. Every product in our collection tells a unique story of dedication, creativity, and tradition.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Our founder&apos;s journey began with a single handwoven scarf purchased from a local artisan in Guatemala. That moment sparked a vision: to build a marketplace where craftsmanship is celebrated and artisans are empowered.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-800 dark:to-gray-700 rounded-lg p-8 min-h-96 flex items-center justify-center">
              <div className="text-center">
                <i className="fas fa-hands text-6xl text-blue-600 dark:text-blue-400 mb-4"></i>
                <p className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
                  Crafted with Care
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision Section */}
      <div className="bg-white dark:bg-gray-900 py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-4xl font-bold font-roboto-slab text-center mb-12 text-[var(--foreground)]">
            Our Mission & Vision
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-blue-50 dark:bg-gray-800 p-8 rounded-lg">
              <div className="flex items-center mb-4">
                <i className="fas fa-bullseye text-blue-600 text-3xl mr-4"></i>
                <h3 className="text-2xl font-bold font-roboto-slab text-[var(--foreground)]">
                  Our Mission
                </h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-lg">
                To bridge the gap between talented artisans and conscious consumers by providing a platform that celebrates handmade excellence, promotes sustainable practices, and ensures fair compensation for craftspeople worldwide.
              </p>
            </div>
            <div className="bg-purple-50 dark:bg-gray-800 p-8 rounded-lg">
              <div className="flex items-center mb-4">
                <i className="fas fa-star text-purple-600 text-3xl mr-4"></i>
                <h3 className="text-2xl font-bold font-roboto-slab text-[var(--foreground)]">
                  Our Vision
                </h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-lg">
                A world where handcrafted goods are treasured, traditional skills are preserved, and every artisan has equal opportunity to share their talent with a global audience. We envision a future where craftsmanship thrives.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values Section */}
      <div className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-4xl font-bold font-roboto-slab text-center mb-12 text-[var(--foreground)]">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 text-center">
              <i className="fas fa-heart text-red-500 text-4xl mb-4"></i>
              <h3 className="text-xl font-bold font-roboto-slab mb-3 text-[var(--foreground)]">
                Authenticity
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                We celebrate genuine handcrafted items and the real stories behind each creation.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 text-center">
              <i className="fas fa-leaf text-green-500 text-4xl mb-4"></i>
              <h3 className="text-xl font-bold font-roboto-slab mb-3 text-[var(--foreground)]">
                Sustainability
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                We prioritize eco-friendly practices and sustainable materials in all our partnerships.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 text-center">
              <i className="fas fa-handshake text-blue-500 text-4xl mb-4"></i>
              <h3 className="text-xl font-bold font-roboto-slab mb-3 text-[var(--foreground)]">
                Fair Trade
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                We ensure artisans receive fair compensation and work under ethical conditions.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 text-center">
              <i className="fas fa-globe text-orange-500 text-4xl mb-4"></i>
              <h3 className="text-xl font-bold font-roboto-slab mb-3 text-[var(--foreground)]">
                Community
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                We build meaningful connections between artisans, customers, and cultures.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-900 dark:to-purple-900 py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-white mb-2">500+</div>
              <p className="text-blue-100 text-lg">Artisans Worldwide</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-white mb-2">50K+</div>
              <p className="text-blue-100 text-lg">Happy Customers</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-white mb-2">2000+</div>
              <p className="text-blue-100 text-lg">Products Available</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-white mb-2">45+</div>
              <p className="text-blue-100 text-lg">Countries Represented</p>
            </div>
          </div>
        </div>
      </div>

      {/* Meet Our Artisans Section */}
      <div className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-4xl font-bold font-roboto-slab text-center mb-12 text-[var(--foreground)]">
            Meet Our Artisans
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden">
              <div className="bg-gradient-to-br from-blue-400 to-blue-600 h-48"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold font-roboto-slab mb-2 text-[var(--foreground)]">
                  Maria Lopez
                </h3>
                <p className="text-blue-600 dark:text-blue-400 font-semibold mb-3">
                  Textile Weaver
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Master weaver from Guatemala with 25 years of experience in traditional textile art.
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  <i className="fas fa-map-marker-alt mr-2"></i>Guatemala
                </p>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden">
              <div className="bg-gradient-to-br from-purple-400 to-purple-600 h-48"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold font-roboto-slab mb-2 text-[var(--foreground)]">
                  John Carter
                </h3>
                <p className="text-purple-600 dark:text-purple-400 font-semibold mb-3">
                  Ceramic Artist
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Expert potter creating stunning handcrafted ceramics for over 15 years.
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  <i className="fas fa-map-marker-alt mr-2"></i>USA
                </p>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden">
              <div className="bg-gradient-to-br from-pink-400 to-pink-600 h-48"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold font-roboto-slab mb-2 text-[var(--foreground)]">
                  Aisha Khan
                </h3>
                <p className="text-pink-600 dark:text-pink-400 font-semibold mb-3">
                  Leather Craftsperson
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Skilled leatherworker from Morocco preserving traditional Moroccan craftsmanship.
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  <i className="fas fa-map-marker-alt mr-2"></i>Morocco
                </p>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden">
              <div className="bg-gradient-to-br from-green-400 to-green-600 h-48"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold font-roboto-slab mb-2 text-[var(--foreground)]">
                  Carlos Mendez
                </h3>
                <p className="text-green-600 dark:text-green-400 font-semibold mb-3">
                  Jewelry Artisan
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Contemporary jewelry designer from Mexico blending tradition with innovation.
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  <i className="fas fa-map-marker-alt mr-2"></i>Mexico
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-white dark:bg-gray-900 py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-4xl font-bold font-roboto-slab text-center mb-12 text-[var(--foreground)]">
            Why Choose Handcrafted Haven
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <i className="fas fa-check-circle text-green-500 text-3xl"></i>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-[var(--foreground)]">
                  Direct Connection with Artisans
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  No middlemen. We work directly with craftspeople, ensuring transparency and fair dealing.
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <i className="fas fa-check-circle text-green-500 text-3xl"></i>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-[var(--foreground)]">
                  Quality Assurance
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Every product is handpicked and inspected to ensure it meets our high standards.
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <i className="fas fa-check-circle text-green-500 text-3xl"></i>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-[var(--foreground)]">
                  Unique Products
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Each item is one-of-a-kind, carrying the personal touch and story of its creator.
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <i className="fas fa-check-circle text-green-500 text-3xl"></i>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-[var(--foreground)]">
                  Environmental Impact
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Sustainable practices mean every purchase supports a healthier planet.
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <i className="fas fa-check-circle text-green-500 text-3xl"></i>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-[var(--foreground)]">
                  Cultural Preservation
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Your purchases help preserve traditional crafts and cultural heritage.
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <i className="fas fa-check-circle text-green-500 text-3xl"></i>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-[var(--foreground)]">
                  Customer Support
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Dedicated support team ready to help with any questions or concerns.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-900 dark:to-purple-900 py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-4xl font-bold font-roboto-slab text-white mb-6">
            Join Our Community
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Discover the stories, support the artisans, and own a piece of handmade excellence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="inline-block bg-white text-blue-600 font-semibold py-3 px-8 rounded-md hover:bg-blue-50 transition-colors"
            >
              Explore Products
            </Link>
            <Link
              href="/contact"
              className="inline-block border-2 border-white text-white font-semibold py-3 px-8 rounded-md hover:bg-white hover:text-blue-600 transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
