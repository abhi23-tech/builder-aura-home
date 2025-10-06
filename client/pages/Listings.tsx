import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/marketplace/ProductCard";
import { categories } from "@/lib/data";
import { useMarketplace } from "@/lib/marketplace";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export default function Listings() {
  const query = useQuery();
  const navigate = useNavigate();

  const [type, setType] = useState<string>(query.get("type") ?? "all");
  const [category, setCategory] = useState<string>(
    query.get("category") ?? "all",
  );
  const [price, setPrice] = useState<number[]>([
    Number(query.get("min")) || 0,
    Number(query.get("max")) || 100000,
  ]);
  const [localSearch, setLocalSearch] = useState<string>(query.get("q") ?? "");

  const { products } = useMarketplace();

  const filtered = products.filter((p) => {
    const matchesType = type === "all" || p.type === type;
    const matchesCategory = category === "all" || p.category === category;
    const matchesPrice = p.price >= price[0] && p.price <= price[1];
    const q = (query.get("q") ?? "").toLowerCase();
    const matchesSearch =
      !q || [p.title, p.category].join(" ").toLowerCase().includes(q);
    return matchesType && matchesCategory && matchesPrice && matchesSearch;
  });

  const applyFilters = () => {
    const params = new URLSearchParams();
    if (type !== "all") params.set("type", type);
    if (category !== "all") params.set("category", category);
    if (price[0] !== 0) params.set("min", String(price[0]));
    if (price[1] !== 1000) params.set("max", String(price[1]));
    if (localSearch) params.set("q", localSearch);
    navigate(`/listings?${params.toString()}`);
  };

  return (
    <div className="container mx-auto py-8 md:py-10 grid gap-8 md:grid-cols-[260px_1fr]">
      {/* Filters */}
      <aside className="space-y-6">
        <div>
          <div className="text-sm font-semibold mb-2">Search</div>
          <div className="flex gap-2">
            <Input
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder="Search items"
            />
            <Button onClick={applyFilters}>Go</Button>
          </div>
        </div>
        <div>
          <div className="text-sm font-semibold mb-2">Type</div>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger>
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="sell">Buy now</SelectItem>
              <SelectItem value="rent">Rent</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <div className="text-sm font-semibold mb-2">Category</div>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {categories.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <div className="text-sm font-semibold mb-2">
            Price range (₹{price[0]} - ₹{price[1]})
          </div>
          <Slider
            value={price}
            onValueChange={setPrice}
            min={0}
            max={100000}
            step={50}
            className="mt-4"
          />
        </div>
        <Button className="w-full" onClick={applyFilters}>
          Apply filters
        </Button>
      </aside>

      {/* Results */}
      <section>
        <div className="flex items-baseline justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Browse items</h1>
            <p className="text-muted-foreground">
              Find the best deals from students
            </p>
          </div>
          <div className="text-sm text-muted-foreground">
            {filtered.length} results
          </div>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
