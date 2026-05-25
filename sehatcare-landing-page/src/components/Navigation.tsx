import { useState, useEffect } from "react";
import { Heart, Menu, X, ShieldAlert, PhoneCall, Key, ArrowRight } from "lucide-react";

interface NavigationProps {
  onOpenDemo: () => void;
  onOpenContact: () => void;
}

export default function Navigation({ onOpenDemo, onOpenContact }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "Fitur Unggulan", href: "#fitur" },
    { label: "Demo Simulator", href: "#simulator" },
    { label: "Cara Kerja", href: "#cara-kerja" },
    { label: "Paket Harga", href: "#harga" },
    { label: "Hubungi Kami", href: "#hubungi" },
  ];

  return (
    <nav
      id="main-nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-neutral-950/80 backdrop-blur-sm shadow-md py-4 border-b border-neutral-800/50"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          id="logo-brand"
          href="#"
          className="flex items-center gap-2.5 group focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-brand-blue flex items-center justify-center shadow-md shadow-brand-blue/30 transition-transform group-hover:scale-105 duration-300">
            <Heart className="w-5.5 h-5.5 text-white fill-white/10" />
          </div>
          <span className="font-display font-bold text-2xl tracking-tight text-brand-dark">
            Sehat<span className="text-brand-blue">Care</span>
          </span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              id={`nav-link-${index}`}
              className="text-[15px] font-medium text-brand-dark/70 hover:text-brand-blue transition-colors duration-200"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-4">
          <button
            id="nav-btn-demo"
            onClick={onOpenDemo}
            className="text-[14px] font-semibold text-brand-blue hover:text-brand-blue/80 px-4 py-2 transition-colors"
          >
            Coba Demo
          </button>
          <a
            id="nav-btn-download"
            href="#simulator"
            className="bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-white text-[14px] font-semibold px-5 py-2.5 rounded-xl shadow-lg transition-all active:scale-[0.98]"
          >
            Unduh Aplikasi
          </a>
        </div>

        {/* Mobile Menu Trigger */}
        <button
          id="nav-mobile-hamburger"
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-brand-dark/80 hover:text-brand-blue focus:outline-none transition-colors"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        id="mobile-nav-drawer"
        className={`fixed inset-0 top-[73px] bg-neutral-950 z-40 transition-transform duration-300 ease-in-out border-t border-neutral-800 p-6 md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-6">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              id={`mobile-nav-link-${index}`}
              onClick={() => setIsOpen(false)}
              className="text-lg font-semibold text-brand-dark border-b border-neutral-900 pb-3 hover:text-brand-blue transition-colors"
            >
              {item.label}
            </a>
          ))}
          <div className="flex flex-col gap-3 mt-4">
            <button
              id="mobile-nav-btn-demo"
              onClick={() => {
                setIsOpen(false);
                onOpenDemo();
              }}
              className="w-full bg-[#171717] border border-neutral-800 text-brand-blue font-bold py-3 rounded-xl transition-all hover:bg-neutral-800"
            >
              Coba Demo Interaktif
            </button>
            <a
              id="mobile-nav-btn-download"
              href="#simulator"
              onClick={() => setIsOpen(false)}
              className="w-full bg-brand-blue text-white text-center font-bold py-3 rounded-xl shadow-md transition-all hover:bg-brand-blue/90"
            >
              Unduh Aplikasi Sekarang
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
