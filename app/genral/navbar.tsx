import { Link } from "lucide-react";
import React from "react";

const Navbar = () => {
  return (
    <div className="w-full h-20 bg-emerald-800 sticky top-0">
      <div className="container mx-auto px-4 h-full">
        <div className="flex justify-between items-center h-full">
          <Link href="/">
            <a>Home</a>
          </Link>

          <Link href="/">
            <a>Shps</a>
          </Link>

          <Link href="/">
            <a>Pahes</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
