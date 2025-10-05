import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CategoryPill } from "@/components/marketplace/CategoryPill";
import { ProductCard } from "@/components/marketplace/ProductCard";
import { categories, products } from "@/lib/data";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function Index() {
  const [homeQuery, setHomeQuery] = useState("");
  const navigate = useNavigate();

  const featured = products.slice(0, 6);
  const topDeals = products.filter((p) => p.isDeal).slice(0, 4);
  const trending = products.filter((p) => p.isTrending).slice(0, 8);

  const submitHomeSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (homeQuery) params.set("q", homeQuery);
    navigate(`/listings?${params.toString()}`);
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-emerald-100/60 to-blue-100" />
        <div className="container mx-auto py-16 md:py-24 grid gap-10 md:grid-cols-2 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              Your campus marketplace for buy, sell, and rent
            </h1>
            <p className="mt-4 text-muted-foreground max-w-xl">
              Discover great deals from students near you. Find textbooks, electronics, furniture, and more.
            </p>
            <form onSubmit={submitHomeSearch} className="mt-6">
              <div className="flex gap-2">
                <Input
                  value={homeQuery}
                  onChange={(e) => setHomeQuery(e.target.value)}
                  placeholder="Search textbooks, bikes, electronics..."
                  className="h-12 rounded-full"
                />
                <Button className="rounded-full h-12 px-6">Search</Button>
              </div>
            </form>
            <div className="mt-6 flex flex-wrap gap-2">
              {categories.slice(0, 6).map((c) => (
                <CategoryPill key={c} name={c} to={`/listings?category=${encodeURIComponent(c)}`} />
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl shadow-lg overflow-hidden ring-1 ring-border/60">
              <img
                src="https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1400&auto=format&fit=crop"
                alt="Students trading items on campus"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="container mx-auto py-12 md:py-16">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Featured items</h2>
            <p className="text-muted-foreground">Hand-picked deals from students</p>
          </div>
          <Link to="/listings" className="text-primary inline-flex items-center gap-1">Browse all <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Top deals */}
      <section className="bg-gradient-to-b from-white to-muted/40">
        <div className="container mx-auto py-12 md:py-16">
          <h2 className="text-2xl md:text-3xl font-bold">Top deals</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {topDeals.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Trending */}
      <section className="container mx-auto py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-bold">Trending now</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {trending.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
