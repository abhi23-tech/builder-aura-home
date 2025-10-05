import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMarketplace } from "@/lib/marketplace";
import { categories } from "@/lib/data";
import { useNavigate } from "react-router-dom";

export default function AddItem() {
  const { addItem } = useMarketplace();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [type, setType] = useState<string>("sell");
  const [category, setCategory] = useState<string>(categories[0] || "Other");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price) {
      alert("Please provide at least a title and price.");
      return;
    }
    setSaving(true);
    const item = addItem({ title, price: Number(price), type: type as any, category, image: image || "https://via.placeholder.com/800x600?text=Item", isDeal: false, isTrending: false });
    setSaving(false);
    navigate(`/product/${item.id}`);
  };

  return (
    <div className="container mx-auto py-16 max-w-3xl">
      <h1 className="text-3xl font-bold">List a new item</h1>
      <p className="text-muted-foreground mt-2">Fill out the form to post your item on the campus marketplace.</p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Calculus Textbook - Stewart" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Price (USD)</label>
            <Input value={price} onChange={(e) => setPrice(e.target.value ? Number(e.target.value) : "")} placeholder="0" type="number" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Type</label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sell">Sell</SelectItem>
                <SelectItem value="rent">Rent</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Image URL</label>
          <Input value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://..." />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea className="w-full rounded-md border border-input p-3 min-h-[120px]" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>

        <div className="flex items-center gap-3">
          <Button type="submit" disabled={saving}>{saving ? "Saving..." : "Create listing"}</Button>
          <Button variant="outline" onClick={() => navigate(-1)}>Cancel</Button>
        </div>
      </form>
    </div>
  );
}
