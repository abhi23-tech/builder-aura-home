import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="container mx-auto py-24 text-center">
      <h1 className="text-5xl font-extrabold">404</h1>
      <p className="text-muted-foreground mt-2">Page not found</p>
      <Link to="/" className="text-primary underline mt-4 inline-block">Return home</Link>
    </div>
  );
};

export default NotFound;
