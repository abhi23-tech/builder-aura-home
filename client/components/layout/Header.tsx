import { Link, useLocation, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Plus, User2, Menu, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useMarketplace } from "@/lib/marketplace";

export function Header() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useMarketplace();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setQuery(params.get("q") ?? "");
  }, [location.search]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(location.search);
    if (query) params.set("q", query);
    else params.delete("q");
    navigate(`/listings?${params.toString()}`);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-foreground/70 hover:text-foreground"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <Link
            to="/"
            className="font-extrabold text-xl tracking-tight text-foreground"
          >
            <span className="text-primary">Campus</span>Mart
          </Link>
          <nav className="hidden md:flex items-center gap-6 ml-6 text-sm">
            <Link
              to="/listings"
              className="text-foreground/70 hover:text-foreground"
            >
              Browse
            </Link>
            <Link
              to="/contact"
              className="text-foreground/70 hover:text-foreground"
            >
              Support
            </Link>
          </nav>
        </div>

        <form
          onSubmit={onSubmit}
          className="flex-1 hidden md:flex items-center max-w-2xl"
        >
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search textbooks, electronics, bikes..."
              className="pl-10 h-11 rounded-full border-input/70"
              aria-label="Search"
            />
          </div>
        </form>

        <div className="flex items-center gap-2">
          <Link to="/add-item">
            <Button className="rounded-full" size="sm">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">List item</span>
            </Button>
          </Link>
          <Link
            to="/cart"
            className="inline-flex items-center gap-1 text-foreground/80 hover:text-foreground"
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="hidden sm:inline">Cart</span>
          </Link>
          {user && user.name ? (
            <div className="inline-flex items-center gap-2">
              <Link
                to="/profile"
                className="inline-flex items-center gap-1 text-foreground/80 hover:text-foreground"
              >
                <User2 className="h-5 w-5" />
                <span className="hidden sm:inline">{user.name}</span>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  logout();
                  navigate("/");
                }}
              >
                Logout
              </Button>
            </div>
          ) : (
            <Link to="/login">
              <Button variant="secondary" size="sm">
                Sign in
              </Button>
            </Link>
          )}
        </div>
      </div>
      <div className="md:hidden border-t">
        <form onSubmit={onSubmit} className="container py-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search campus deals"
              className="pl-10 h-10 rounded-full"
              aria-label="Search"
            />
          </div>
        </form>
      </div>
    </header>
  );
}
