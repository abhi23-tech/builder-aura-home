import { useMarketplace } from "@/lib/marketplace";
import { Button } from "@/components/ui/button";

export default function Cart() {
  const { cart, removeFromCart, checkout } = useMarketplace();

  const total = cart.reduce((s, it) => s + it.price, 0);

  const onCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }
    const tx = checkout();
    alert(`Purchase complete — ₹${tx.total}`);
  };

  return (
    <div className="container mx-auto py-16">
      <h1 className="text-3xl font-bold">Your cart</h1>
      <p className="text-muted-foreground mt-2">
        Review items and proceed to checkout.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2 space-y-4">
          {cart.length === 0 ? (
            <div className="text-muted-foreground">No items in cart.</div>
          ) : (
            cart.map((it) => (
              <div
                key={it.id}
                className="flex items-center gap-4 border rounded p-3"
              >
                <img
                  src={it.image}
                  alt={it.title}
                  className="h-20 w-28 object-cover rounded"
                />
                <div className="flex-1">
                  <div className="font-medium">{it.title}</div>
                  <div className="text-muted-foreground">
                    ₹{it.price} • {it.category}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="font-semibold">${it.price}</div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeFromCart(it.id)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        <aside className="rounded border p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">Subtotal</div>
            <div className="font-semibold">₹{total}</div>
          </div>
          <div className="mt-4">
            <Button className="w-full" onClick={onCheckout}>
              Checkout
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
}
