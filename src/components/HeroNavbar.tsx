import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Logo from "@/assets/nics-no-text-transparent.png";
import Image from "next/image";

interface BaseNavItem {
  name: string;
  id: string;
}

export interface NavLink extends BaseNavItem {
  type: "link";
  href: string;
}

interface NavButton extends BaseNavItem {
  type: "button";
}

export type NavItem = NavLink | NavButton;

interface NavbarProps {
  smoothScroll: (itemId: string) => void;
  activeSection: string;
}

const NavItems: NavItem[] = [
  { type: "button", name: "Home", id: "home" },
  { type: "button", name: "About", id: "about" },
  { type: "button", name: "What We Do", id: "what-we-do" },
  { type: "button", name: "Events", id: "events" },
  { type: "button", name: "Community", id: "community" },
  { type: "link", name: "Articles", id: "articles", href: "articles" },
];

export default function HeroNavbar({
  smoothScroll,
  activeSection,
}: NavbarProps) {
  const handleNavClick = (item: NavItem) => {
    if (item.type === "button") smoothScroll(item.id);
  };

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuCloseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    return () => {
      if (menuCloseTimerRef.current) clearTimeout(menuCloseTimerRef.current);
    };
  }, []);

  const handleDesktopLinkClick = (item: NavItem) => handleNavClick(item);

  const handleMobileLinkClick = (item: NavItem) => {
    setIsOpen(false);
    menuCloseTimerRef.current = setTimeout(() => handleNavClick(item), 320);
  };

  return (
    <header
      id="navbar-header"
      className={`fixed top-0 left-0 right-0 z-50 bg-white border-b border-border transition-all duration-300 ${
        scrolled ? "shadow-[0_2px_16px_rgba(0,0,0,0.06)] py-3" : "py-4"
      }`}
    >
      <div className="max-w-300 mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          scroll={true}
          id="navbar-logo-btn"
          className="flex items-center gap-2 cursor-pointer group"
          aria-label="NICS Home"
        >
          <Image loading="eager" src={Logo} alt="NICS" className="w-15 h-15" />
        </Link>

        {/* Desktop Nav — relative so the underline anchors here */}
        <nav
          id="desktop-nav"
          className="hidden md:flex items-center gap-8 relative"
        >
          {NavItems.map((item) =>
            item.type === "button" ? (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleDesktopLinkClick(item)}
                className={`btn-text text-sm cursor-pointer py-1 transition-colors hover:text-primary ${
                  activeSection === item.id
                    ? "text-primary font-semibold"
                    : "text-muted-foreground"
                }`}
              >
                {item.name}
              </button>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={`btn-text text-sm cursor-pointer py-1 transition-colors hover:text-primary ${
                  activeSection === item.href
                    ? "text-primary font-semibold"
                    : "text-muted-foreground"
                }`}
              >
                {item.name}
              </Link>
            ),
          )}

          {/* <ActiveUnderline activeId={activeSection} /> */}
        </nav>

        {/* Desktop CTA */}
        <div id="desktop-cta" className="hidden md:flex items-center">
          <button
            id="navbar-cta-btn"
            onClick={() => smoothScroll("community")}
            className="btn-text bg-primary text-white px-5 py-2.5 rounded-full hover:bg-primary/90 transition-colors cursor-pointer shadow-sm shadow-primary/10 hover:shadow-md hover:shadow-primary/20"
          >
            Join NICS
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          id="mobile-nav-toggle"
          onClick={() => setIsOpen((prev) => !prev)}
          className="md:hidden p-2 text-dark hover:text-primary transition-colors cursor-pointer"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-nav-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-white border-t border-border overflow-hidden"
          >
            <div className="flex flex-col px-6 py-6 gap-5">
              {NavItems.map((item) =>
                item.type === "button" ? (
                  <button
                    key={item.id}
                    id={`mobile-nav-link-${item.id}`}
                    onClick={() => handleMobileLinkClick(item)}
                    className={`btn-text text-left text-lg py-2 transition-colors hover:text-primary ${
                      activeSection === item.id
                        ? "text-primary font-semibold"
                        : "text-dark"
                    }`}
                  >
                    {item.name}
                  </button>
                ) : (
                  <Link
                    key={item.id}
                    href={item.href}
                    id={`mobile-nav-link-${item.id}`}
                    onClick={() => handleMobileLinkClick(item)}
                    className={`btn-text text-left text-lg py-2 transition-colors hover:text-primary ${
                      activeSection === item.id
                        ? "text-primary font-semibold"
                        : "text-dark"
                    }`}
                  />
                ),
              )}
              <button
                id="mobile-navbar-cta-btn"
                onClick={() => smoothScroll("community")}
                className="btn-text bg-primary text-white text-center py-3 rounded-full hover:bg-primary/90 transition-colors w-full cursor-pointer mt-2"
              >
                Join NICS
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function ActiveUnderline({ activeId }: { activeId: string }) {
  const [underline, setUnderline] = useState<{
    left: number;
    width: number;
  } | null>(null);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      const btn = document.getElementById(`nav-link-${activeId}`);
      const nav = document.getElementById("desktop-nav");
      if (!btn || !nav) {
        setUnderline(null);
        return;
      }
      const navRect = nav.getBoundingClientRect();
      const btnRect = btn.getBoundingClientRect();
      setUnderline({
        left: btnRect.left - navRect.left,
        width: btnRect.width,
      });
    });
    return () => cancelAnimationFrame(id);
  }, [activeId]);

  if (!underline) return null;

  return (
    <motion.span
      aria-hidden
      className="absolute h-0.5 bg-primary pointer-events-none"
      initial={false}
      animate={{ left: underline.left, width: underline.width, bottom: 0 }}
      transition={{ type: "spring", stiffness: 380, damping: 30 }}
    />
  );
}
