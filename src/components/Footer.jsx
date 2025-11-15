import { Link } from 'react-router-dom';
import { Mail, Github, Twitter } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          {/* Logo and Copyright */}
          <div className="flex flex-col items-center md:items-start space-y-2">
            <div className="font-heading font-bold text-2xl">
              <span className="text-primary-foreground">TOPSIS</span>
              <span className="text-accent">Calc</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 TOPSISCalc | Metode Keputusan Berbasis Data
            </p>
          </div>

          {/* Links */}
          <div className="flex space-x-8">
            <a
              href="mailto:info.topsiscalc.com"
              className="flex items-center space-x-2 text-sm hover:text-accent transition-smooth"
            >
              <Mail size={18} />
              <span>Email</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-2 text-sm hover:text-accent transition-smooth"
            >
              <Github size={18} />
              <span>Dokumentasi</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-2 text-sm hover:text-accent transition-smooth"
            >
              <Twitter size={18} />
              <span>Media Sosial</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};