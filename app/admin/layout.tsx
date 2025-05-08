"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  CircleUser,
  Home,
  LibraryBig,
  LineChart,
  ListOrdered,
  Menu,
  Package,
  Package2,
  ShoppingCart,
  Users,
} from "lucide-react";
import "../globals.css";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useSignoutMutation } from "@/redux/api/authApi";
import Search from "../customComponents/Search";
import { toast } from "@/hooks/use-toast";

interface AdminLayoutProps {
  children: ReactNode; // Correctly typing the children prop
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [activeTab, setactiveTab] = useState("Admin");
  const { toast } = useToast();
  const pathname = usePathname();
  const setActiveTab = (tab: string) => {
    setactiveTab(tab);
  };

  useEffect(() => {
    if (pathname.includes("/admin/productReviews")) {
      setActiveTab("Product Reviews");
    } else if (pathname.includes("/admin/customers")) {
      setActiveTab("Customers");
    } else if (pathname.includes("/admin/products")) {
      setActiveTab("Products");
    } else if (pathname.includes("/admin/categories")) {
      setActiveTab("Categories");
    } else if (pathname.includes("/admin/blogs")) {
      setActiveTab("Blogs");
    } else if (pathname.includes("/admin")) {
      setActiveTab("Admin");
    } else if (pathname.includes("/admin/orders")) {
      setActiveTab("Orders");
    } else {
      setActiveTab("");
    }
  }, [pathname]);

  const [signout] = useSignoutMutation();
  const router = useRouter();
  const handleSignout = async () => {
    try {
      await signout(null).unwrap();
      router.push("/", { scroll: false });
      toast({
        variant: "success",
        title: "Success",
        description: "Singout successfully",
      });
    } catch (error: any) {
      toast({
        variant: "error",
        title: "Error",
        description: error?.data?.message,
      });
    }
  };
  return (
    <div className="grid min-h-screen w-full lmd:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 lg:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="">Medsta Inc</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link
                onClick={() => {
                  setActiveTab("Admin");
                }}
                href="/admin"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                  activeTab === "Admin" && "bg-muted text-primary"
                }`}
              >
                <Home className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                onClick={() => {
                  setActiveTab("Categories");
                }}
                href="/admin/categories"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                  activeTab === "Categories" && "bg-muted text-primary"
                }`}
              >
                <ShoppingCart className="h-4 w-4" />
                Categories
              </Link>
              <Link
                onClick={() => {
                  setActiveTab("Products");
                }}
                href="/admin/products"
                className={`flex items-center gap-3 text-muted-foreground rounded-lg px-3 py-2 transition-all hover:text-primary ${
                  activeTab === "Products" && "bg-muted text-primary"
                }`}
              >
                <Package className="h-4 w-4" />
                Products{" "}
              </Link>
              <Link
                onClick={() => {
                  setActiveTab("Customers");
                }}
                href="/admin/customers"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                  activeTab === "Customers" && "bg-muted text-primary"
                }`}
              >
                <Users className="h-4 w-4" />
                Customers
              </Link>
              <Link
                onClick={() => {
                  setActiveTab("Orders");
                }}
                href="/admin/orders"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                  activeTab === "Orders" && "bg-muted text-primary"
                }`}
              >
                <ListOrdered className="h-4 w-4" />
                Orders
              </Link>
              <Link
                onClick={() => {
                  setActiveTab("Product Reviews");
                }}
                href="/admin/productReviews"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                  activeTab === "Product Reviews" && "bg-muted text-primary"
                }`}
              >
                <LineChart className="h-4 w-4" />
                Product Reviews
              </Link>
              <Link
                onClick={() => {
                  setActiveTab("Blogs");
                }}
                href="/admin/blogs"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                  activeTab === "Blogs" && "bg-muted text-primary"
                }`}
              >
                <LibraryBig className="h-4 w-4" />
                Blogs
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 lg:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Package2 className="h-6 w-6" />
                  <span className="sr-only">Acme Inc</span>
                </Link>
                <Link
                  onClick={() => {
                    setActiveTab("Admin");
                  }}
                  href="/admin"
                  className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground ${
                    activeTab === "Admin" && "bg-muted"
                  }`}
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  onClick={() => {
                    setActiveTab("Categories");
                  }}
                  href="/admin/categories"
                  className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground ${
                    activeTab === "Categories" && "bg-muted"
                  }`}
                >
                  <ShoppingCart className="h-5 w-5" />
                  Categories
                </Link>
                <Link
                  onClick={() => {
                    setActiveTab("Products");
                  }}
                  href="/admin/products"
                  className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground ${
                    activeTab === "Products" && "bg-muted"
                  }`}
                >
                  <Package className="h-5 w-5" />
                  Products
                </Link>
                <Link
                  onClick={() => {
                    setActiveTab("Customers");
                  }}
                  href="/admin/customers"
                  className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground ${
                    activeTab === "Customers" && "bg-muted"
                  }`}
                >
                  <Users className="h-5 w-5" />
                  Customers
                </Link>
                <Link
                  onClick={() => {
                    setActiveTab("Orders");
                  }}
                  href="/admin/orders"
                  className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground ${
                    activeTab === "Orders" && "bg-muted"
                  }`}
                >
                  <ListOrdered className="h-4 w-4" />
                  Orders
                </Link>
                <Link
                  onClick={() => {
                    setActiveTab("Product Reviews");
                  }}
                  href="/admin/productReviews"
                  className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground ${
                    activeTab === "Blog Reviews" && "bg-muted"
                  }`}
                >
                  <LineChart className="h-5 w-5" />
                  Product Reviews
                </Link>
                <Link
                  onClick={() => {
                    setActiveTab("Blogs");
                  }}
                  href="/admin/blogs"
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                    activeTab === "Blogs" && "bg-muted text-primary"
                  }`}
                >
                  <LibraryBig className="h-4 w-4" />
                  Blogs
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <form>
              <div className="relative w-[300px]">
                <Search />
              </div>
            </form>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={handleSignout}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
