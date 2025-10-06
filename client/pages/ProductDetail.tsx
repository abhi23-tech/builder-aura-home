import { useParams } from "react-router-dom";
import { useMarketplace } from "@/lib/marketplace";
import { Button } from "@/components/ui/button";

export default function ProductDetail() {
  const { id } = useParams();
  const { getProduct, addToCart } = useMarketplace();
  const product = id ? getProduct(id) : undefined;

  if (!product) {
    return (
      <div className="container mx-auto py-16">
        <h1 className="text-3xl font-bold">Product not found</h1>
        <p className="text-muted-foreground mt-2">
          We couldn't find that item.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 grid gap-8 md:grid-cols-2">
      <div>
        <div className="rounded-lg overflow-hidden shadow">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-[480px] object-cover"
          />
        </div>
      </div>
      <div>
        <h1 className="text-2xl font-bold">{product.title}</h1>
        <div className="mt-2 text-muted-foreground">
          {product.category} • {product.type}
        </div>
        <div className="mt-4 text-3xl font-extrabold">₹{product.price}</div>
        <p className="mt-4 text-muted-foreground">
          {product?.title} — detailed description will go here.
        </p>

        <div className="mt-6 flex items-center gap-3">
          <Button
            onClick={() => {
              addToCart(product.id);
              alert("Added to cart");
            }}
          >
            Add to cart
          </Button>
          <a
            className="text-primary underline"
            href={`mailto:student@campus.example?subject=Interest in ${encodeURIComponent(product.title)}&body=Hi, I'm interested in your item.`}
          >
            Contact seller
          </a>
        </div>
      </div>
    </div>
  );
}
