import { useParams } from "react-router-dom";

export default function ProductDetail() {
  const { id } = useParams();
  return (
    <div className="container mx-auto py-16">
      <h1 className="text-3xl font-bold">Product detail</h1>
      <p className="text-muted-foreground mt-2">Item #{id}. This page will include images, description, price, and contact options.</p>
    </div>
  );
}
