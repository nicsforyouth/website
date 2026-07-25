import Link from "next/link";
import Logo from "@/assets/nics-no-text-transparent.png";
import Image from "next/image";
import { NavLink } from "./HeroNavbar";

export const navItems: NavLink[] = [
  {
    name: "Home",
    id: "home",
    type: "link",
    href: "/",
  },
  { name: "About", id: "about-us", type: "link", href: "/#about" },
  {
    name: "What We Do",
    id: "what-we-do",
    type: "link",
    href: "/#what-we-do",
  },
  {
    name: "Events",
    id: "events",
    type: "link",
    href: "/#events",
  },
  {
    name: "Community",
    id: "community",
    type: "link",
    href: "/#community",
  },
  {
    name: "Articles",
    id: "articles",
    type: "link",
    href: "/articles",
  },
] as const;

export default function Navbar() {
  return (
    <header
      className={`sticky min-h-20 top-0 flex items-center left-0 right-0 z-50 bg-white border-b border-border transition-all duration-300`}
    >
      <div className="max-w-300 w-full mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          prefetch
          href="/"
          scroll={true}
          id="navbar-logo-btn"
          className="flex items-center gap-2 cursor-pointer group"
          aria-label="NICS Home"
        >
          <Image loading="eager" src={Logo} alt="NICS" className="w-15 h-15" />
        </Link>

        <nav
          id="desktop-nav"
          className="hidden md:flex items-center gap-8 relative"
        >
          {navItems.map(
            (item) =>
              item.type === "link" && (
                <Link
                  prefetch
                  key={item.id}
                  href={item.href}
                  className={`btn-text text-sm cursor-pointer py-1 transition-colors hover:text-primary text-muted-foreground`}
                >
                  {item.name}
                </Link>
              ),
          )}
        </nav>

        {/* Desktop CTA */}
        <div id="desktop-cta" className="md:flex items-center">
          <Link
            id="navbar-cta-btn"
            href={"/join"}
            className="btn-text bg-primary text-white px-5 py-2.5 rounded-full hover:bg-primary/90 transition-colors cursor-pointer shadow-sm shadow-primary/10 hover:shadow-md hover:shadow-primary/20"
          >
            Join NICS
          </Link>
        </div>
      </div>
    </header>
  );
}
