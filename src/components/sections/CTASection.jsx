import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';

export const CTASection = () => {
  return (
    <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-accent/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-accent/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-8"
        >
          <h2 className="font-heading font-bold text-4xl lg:text-5xl leading-tight">
            Ambil keputusan dengan <span className="text-accent">data</span>,<br />
            bukan perasaan.
          </h2>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto pb-4">
            Mulai gunakan kalkulator TOPSIS sekarang dan temukan pilihan terbaik dengan metode ilmiah
          </p>
          <Link to="/calculator" className="w-full sm:w-auto">
            <Button
              size="lg"
              className="
              w-full sm:w-auto 
              bg-accent hover:bg-accent-dark 
              text-foreground hover:text-white 
              font-semibold 
              text-base sm:text-lg 
              px-6 sm:px-10 
              py-5 sm:py-7 
              rounded-xl 
              shadow-glow hover:shadow-none 
              transition-smooth 
              group
            "
            >
              Gunakan Kalkulator Sekarang
              <ArrowRight
                className="ml-2 group-hover:translate-x-1 transition-smooth"
                size={22}
              />
            </Button>
          </Link>

        </motion.div>
      </div>
    </section>
  );
};