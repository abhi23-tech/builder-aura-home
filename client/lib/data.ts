import type { Product } from "@/components/marketplace/ProductCard";

export const categories = [
  "Textbooks",
  "Electronics",
  "Furniture",
  "Bikes",
  "Dorm Essentials",
  "Clothing",
  "Sports",
];

export const products: Product[] = [
  {
    id: "1",
    title: "Calculus Textbook (Stewart) - 8th Ed.",
    price: 35,
    type: "sell",
    category: "Textbooks",
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop",
    isDeal: true,
    isTrending: true,
  },
  {
    id: "2",
    title: "MacBook Air M1 - 8GB/256GB",
    price: 650,
    type: "sell",
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop",
    isTrending: true,
  },
  {
    id: "3",
    title: "IKEA Study Desk + Chair",
    price: 90,
    type: "sell",
    category: "Furniture",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200&auto=format&fit=crop",
    isDeal: true,
  },
  {
    id: "4",
    title: "Mountain Bike (Medium)",
    price: 25,
    type: "rent",
    category: "Bikes",
    image:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "5",
    title: "Mini Fridge - Excellent Condition",
    price: 60,
    type: "sell",
    category: "Dorm Essentials",
    image:
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "6",
    title: "Hoodie - Campus Store (M)",
    price: 15,
    type: "sell",
    category: "Clothing",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "7",
    title: "Basketball - Like New",
    price: 8,
    type: "sell",
    category: "Sports",
    image:
      "https://images.unsplash.com/photo-1517649763962-0b1c9bfaaea1?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "8",
    title: "Graphing Calculator TI-84 Plus",
    price: 40,
    type: "sell",
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1523246199839-6eec98d75a2a?q=80&w=1200&auto=format&fit=crop",
  },
];
