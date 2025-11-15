import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { ArrowRight, BarChart3 } from 'lucide-react';

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center gradient-hero overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl leading-tight text-foreground">
              Temukan Pilihan Terbaik dengan{' '}
              <span className="text-primary">Kalkulator TOPSIS</span>{' '}
              <span className="text-accent">Serbaguna</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Gunakan metode ilmiah untuk mengambil keputusan terbaik dari laptop,
              makanan, hingga hunian. Objektif, akurat, dan mudah digunakan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/calculator">
                <Button
                  size="lg"
                  className="bg-accent hover:bg-accent-dark text-accent-foreground font-semibold text-lg px-8 py-6 rounded-xl shadow-accent transition-smooth group"
                >
                  Mulai Hitung Sekarang
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-smooth" />
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Right Content - Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative w-full h-96">
              {/* Data Matrix Illustration */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full max-w-lg rounded-3xl p-8 border border-white/20 shadow-[0_8px_40px_rgba(0,0,0,0.1)] bg-gradient-to-tr from-accent/20 via-accent/5 to-transparent backdrop-blur-md overflow-hidden">
                  {/* soft radial glow layer */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(56,189,248,0.15),transparent_70%)]"></div>
                  {/* Image Container - Positioned Higher */}
                  <div className="flex items-center justify-center w-full h-full -mt-8">
                    <motion.img
                      src="/img/libra.svg"
                      alt="Timbangan Libra"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="w-96 h-96 object-contain drop-shadow-2xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};