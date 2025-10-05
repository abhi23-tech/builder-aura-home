import { useMarketplace } from "@/lib/marketplace";
import { Link } from "react-router-dom";

export default function Profile() {
  const { user } = useMarketplace();

  return (
    <div className="container mx-auto py-16">
      <h1 className="text-3xl font-bold">{user.name}</h1>
      <p className="text-muted-foreground mt-2">Manage your listings and view past transactions.</p>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold">Your listings</h2>
        {user.listings.length === 0 ? (
          <div className="mt-4 text-muted-foreground">You have no listings yet. <Link to="/add-item" className="text-primary underline">Create one</Link></div>
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {user.listings.map((l) => (
              <div key={l.id} className="rounded-lg border p-3">
                <img src={l.image} alt={l.title} className="h-40 w-full object-cover rounded" />
                <div className="mt-2 font-medium">{l.title}</div>
                <div className="text-muted-foreground">${l.price} • {l.category}</div>
                <Link to={`/product/${l.id}`} className="text-primary underline mt-2 inline-block">View</Link>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold">Transaction history</h2>
        {user.transactions.length === 0 ? (
          <div className="mt-4 text-muted-foreground">No transactions yet.</div>
        ) : (
          <div className="mt-4 space-y-4">
            {user.transactions.map((t) => (
              <div key={t.id} className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div className="font-medium">Transaction • {new Date(t.date).toLocaleString()}</div>
                  <div className="font-semibold">${t.total}</div>
                </div>
                <div className="mt-2 text-sm text-muted-foreground">{t.items.length} items</div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
