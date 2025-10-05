import { Link } from "react-router-dom";

export function CategoryPill({ name, icon, to }: { name: string; icon?: React.ReactNode; to: string }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-2 rounded-full border bg-white px-4 py-2 text-sm text-foreground/80 hover:text-foreground hover:shadow-sm"
    >
      {icon}
      <span>{name}</span>
    </Link>
  );
}
