import Link from "next/link";
const Footer = () => {
  return (
    <footer className="bg-white py-8 md:py-12">
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 sm:grid-cols-2 md:grid-cols-4 md:px-6 lg:max-w-7xl">
        <div className="flex flex-col items-start gap-4">
          <Link href="#" className="flex items-center gap-2" prefetch={false}>
            <span className="text-lg font-semibold">Medsta</span>
          </Link>
          <p className="text-muted-foreground">
            Medsta store - World wide store since 2020. We sell over 200+
            category products on our website.
          </p>
        </div>
        <div className="grid gap-2">
          <h4 className="text-sm font-semibold">Quick Links</h4>
          <Link href="/" className="text-sm hover:underline" prefetch={false}>
            Home
          </Link>
          <Link
            href="/about-us"
            className="text-sm hover:underline"
            prefetch={false}
          >
            About Us
          </Link>
          <Link
            href="/product"
            className="text-sm hover:underline"
            prefetch={false}
          >
            Products
          </Link>
          <Link
            href="/contact-us"
            className="text-sm hover:underline"
            prefetch={false}
          >
            Contact
          </Link>
        </div>
        <div className="grid gap-2">
          <h4 className="text-sm font-semibold">Resources</h4>
          <Link href="#" className="text-sm hover:underline" prefetch={false}>
            Documentation
          </Link>
          <Link
            href="/blog"
            className="text-sm hover:underline"
            prefetch={false}
          >
            Blog
          </Link>
          <Link href="#" className="text-sm hover:underline" prefetch={false}>
            Support
          </Link>
          <Link
            href="/faq"
            className="text-sm hover:underline"
            prefetch={false}
          >
            FAQs
          </Link>
        </div>
        <div className="grid gap-2">
          <h4 className="text-sm font-semibold">Legal</h4>
          <Link href="#" className="text-sm hover:underline" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-sm hover:underline" prefetch={false}>
            Privacy Policy
          </Link>
          <Link href="#" className="text-sm hover:underline" prefetch={false}>
            Cookie Policy
          </Link>
        </div>
      </div>
      <div className="mt-8 border-t pt-4 text-center text-xs text-muted-foreground md:mt-12 md:pt-6">
        <p>&copy; 2025 Medsta. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
