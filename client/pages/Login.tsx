import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMarketplace } from "@/lib/marketplace";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useMarketplace();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return alert("Please enter your name");
    login({ name, email: email || undefined });
    navigate("/profile");
  };

  return (
    <div className="container mx-auto py-16 max-w-md">
      <h1 className="text-3xl font-bold">Student login</h1>
      <p className="text-muted-foreground mt-2">
        Sign in to manage your listings and purchases.
      </p>
      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Full name</label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Priya Rao"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Email (college email recommended)
          </label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@college.edu"
          />
        </div>
        <div className="flex gap-2">
          <Button type="submit">Sign in</Button>
          <Button
            variant="outline"
            onClick={() => {
              setName("");
              setEmail("");
            }}
          >
            Reset
          </Button>
        </div>
      </form>
    </div>
  );
}
