import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="container mx-auto py-10 grid gap-8 md:grid-cols-4 text-sm">
        <div>
          <div className="font-extrabold text-lg"><span className="text-primary">Campus</span>Xchange</div>
          <p className="mt-2 text-muted-foreground">Buy, sell, and rent with students on your campus.</p>
        </div>
        <div>
          <div className="font-semibold mb-2">Marketplace</div>
          <ul className="space-y-1 text-muted-foreground">
            <li><Link to="/listings">Browse items</Link></li>
            <li><Link to="/add-item">List an item</Link></li>
            <li><Link to="/profile">Your profile</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-2">Help</div>
          <ul className="space-y-1 text-muted-foreground">
            <li><Link to="/contact">Contact & support</Link></li>
            <li><a href="#" onClick={(e)=>e.preventDefault()}>Safety tips</a></li>
            <li><a href="#" onClick={(e)=>e.preventDefault()}>Community guidelines</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-2">Get the best deals</div>
          <p className="text-muted-foreground">Follow trending categories and never miss a bargain.</p>
        </div>
      </div>
      <div className="border-t">
        <div className="container mx-auto py-4 flex items-center justify-between text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} CampusXchange</p>
          <div className="flex items-center gap-4">
            <a href="#" onClick={(e)=>e.preventDefault()}>Terms</a>
            <a href="#" onClick={(e)=>e.preventDefault()}>Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
