import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-white text-gray-900">
      {/* Hero */}
      <section className="relative">
        <div className="max-w-6xl mx-auto px-4 py-16 sm:py-20">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                Find your next favorite gear.
              </h1>
              <p className="mt-4 text-gray-600 max-w-xl">
                Clean, fast, and simple shopping experience. Curated products
                with fair prices.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/products"
                  className="px-5 py-2.5 rounded-md bg-gray-900 text-white hover:opacity-90"
                >
                  Shop now
                </Link>
                <a
                  href="#highlights"
                  className="px-5 py-2.5 rounded-md border border-gray-300 hover:bg-gray-50 text-gray-800"
                >
                  Highlights
                </a>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden border border-gray-200">
              {/* Placeholder ภาพ hero ของสินค้า */}
              <div className="aspect-[16/10] w-full bg-gray-100 grid place-items-center">
                <span className="text-gray-400">Hero Image</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights / Categories */}
      <section id="highlights" className="border-t border-gray-200 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-12 sm:py-16">
          <h2 className="text-2xl font-semibold mb-6">Highlights</h2>
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { t: "New Arrivals", d: "Fresh picks updated weekly." },
              { t: "Best Sellers", d: "Most-loved by our customers." },
              { t: "Budget Friendly", d: "Great value under your budget." },
              { t: "Premium Picks", d: "Top-tier products and brands." },
              { t: "Accessories", d: "Complete your setup." },
              { t: "Gift Ideas", d: "Perfect picks for any occasion." },
            ].map((f) => (
              <div
                key={f.t}
                className="rounded-xl border border-gray-200 bg-white p-5 hover:shadow-sm transition"
              >
                <div className="text-base font-semibold">{f.t}</div>
                <div className="mt-1 text-sm text-gray-600">{f.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-12 sm:py-16 text-center">
          <h3 className="text-xl font-semibold">Ready to explore?</h3>
          <p className="text-gray-600 mt-2">
            Browse products and find your match.
          </p>
          <Link
            to="/products"
            className="inline-block mt-5 px-5 py-2.5 rounded-md bg-gray-900 text-white hover:opacity-90"
          >
            View products
          </Link>
        </div>
      </section>
    </div>
  );
}
