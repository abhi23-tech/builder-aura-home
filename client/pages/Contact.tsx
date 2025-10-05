import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMarketplace } from "@/lib/marketplace";

export default function Contact() {
  const { submitContact } = useMarketplace();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) {
      alert("Please provide your name and message.");
      return;
    }
    submitContact({ name, email, message });
    setName("");
    setEmail("");
    setMessage("");
    alert("Thanks! Your message was sent to support.");
  };

  return (
    <div className="container mx-auto py-16 max-w-2xl">
      <h1 className="text-3xl font-bold">Contact & support</h1>
      <p className="text-muted-foreground mt-2">Get help, report issues, or contact our team.</p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Your name</label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email (optional)</label>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Message</label>
          <textarea className="w-full rounded-md border border-input p-3 min-h-[140px]" value={message} onChange={(e) => setMessage(e.target.value)} />
        </div>
        <div className="flex gap-2">
          <Button type="submit">Send message</Button>
          <Button variant="outline" onClick={() => { setName(""); setEmail(""); setMessage(""); }}>Reset</Button>
        </div>
      </form>
    </div>
  );
}
