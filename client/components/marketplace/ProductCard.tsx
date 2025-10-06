import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type Product = {
  id: string;
  title: string;
  price: number;
  type: "buy" | "sell" | "rent";
  category: string;
  image: string;
  isDeal?: boolean;
  isTrending?: boolean;
  location?: string;
};

export function ProductCard({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  return (
    <Card className={cn("overflow-hidden group", className)}>
      <Link to={`/product/${product.id}`} className="block">
        <div className="aspect-[4/3] overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <div className="p-3 space-y-2">
          <div className="flex items-center gap-2 text-xs">
            <Badge variant="secondary" className="capitalize">
              {product.type}
            </Badge>
            {product.isDeal && (
              <Badge className="bg-emerald-500 text-white">Top deal</Badge>
            )}
            {product.isTrending && (
              <Badge className="bg-pink-500 text-white">Trending</Badge>
            )}
          </div>
          <h3 className="line-clamp-1 font-medium">{product.title}</h3>
          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold">₹{product.price}</div>
            <div className="text-xs text-muted-foreground">
              {product.category}
            </div>
          </div>
        </div>
      </Link>
    </Card>
  );
}
