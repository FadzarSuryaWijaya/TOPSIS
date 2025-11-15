import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      window.location.href = '/#' + sectionId;
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: 'Beranda', href: '/', isHome: true },
    { label: 'Cara Kerja', section: 'cara-kerja' },
    { label: 'Contoh', section: 'contoh' },
    { label: 'Tentang', section: 'tentang' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-smooth ${isScrolled
        ? 'bg-primary/80 shadow-elegant backdrop-blur-xl'
        : 'bg-primary/20 backdrop-blur-xl'
        }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            onClick={() => {
              // Scroll ke atas halaman utama
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setIsMobileMenuOpen(false);
            }}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <div className="font-heading font-bold text-2xl">
              <span className={isScrolled ? 'text-primary-foreground' : 'text-primary'}>
                TOPSIS
              </span>
              <span className={isScrolled ? 'text-accent' : 'text-accent'}>
                Calc
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => {
                  if (link.isHome) {
                    window.location.href = '/';
                  } else {
                    scrollToSection(link.section);
                  }
                }}
                className={`text-md font-medium transition-smooth hover:text-accent ${isScrolled ? 'text-primary-foreground' : 'text-foreground'
                  }`}
              >
                {link.label}
              </button>
            ))}
            <Link to="/calculator">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent-dark text-foreground hover:text-white font-semibold shadow-accent hover:shadow-none rounded-xl transition-smooth"
              >
                Mulai Hitung
              </Button>

            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden ${isScrolled ? 'text-primary-foreground' : 'text-foreground'
              }`}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-4"
            >
              <div className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => {
                      if (link.isHome) {
                        window.location.href = '/';
                      } else {
                        scrollToSection(link.section);
                      }
                    }}
                    className={`text-left text-sm font-medium transition-smooth hover:text-accent ${isScrolled ? 'text-primary-foreground' : 'text-foreground'
                      }`}
                  >
                    {link.label}
                  </button>
                ))}
                <Link to="/calculator" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button
                    size="lg"
                    className="w-full bg-accent hover:bg-accent-dark text-foreground hover:text-white font-semibold shadow-accent rounded-xl transition-smooth"
                  >
                    Mulai Hitung
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};