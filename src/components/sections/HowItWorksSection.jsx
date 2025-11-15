import { motion } from 'framer-motion';
import { FileInput, Sliders, Calculator, TrendingUp, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: FileInput,
    number: '1',
    title: 'Masukkan Alternatif',
    description: 'Tentukan pilihan yang akan dibandingkan',
  },
  {
    icon: Sliders,
    number: '2',
    title: 'Masukkan Kriteria',
    description: 'Definisikan faktor pembanding',
  },
  {
    icon: Calculator,
    number: '3',
    title: 'Beri Bobot',
    description: 'Atur prioritas tiap kriteria',
  },
  {
    icon: CheckCircle,
    number: '4',
    title: 'Tekan Hitung',
    description: 'Proses otomatis dengan TOPSIS',
  },
  {
    icon: TrendingUp,
    number: '5',
    title: 'Lihat Ranking',
    description: 'Dapatkan hasil terbaik dengan visual menarik',
  },
];

export const HowItWorksSection = () => {
  return (
    <section id="cara-kerja" className="py-24 bg-muted">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading font-bold text-4xl lg:text-5xl text-foreground mb-4">
            Cara Kerja <span className="text-primary">Kalkulator</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hanya 5 langkah mudah untuk menemukan pilihan terbaik Anda.
          </p>
        </motion.div>

        {/* Desktop Timeline */}
        <div className="hidden md:block">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute top-16 left-0 right-0 h-1 bg-primary/20"></div>
            <div className="absolute top-16 left-0 h-1 bg-primary w-0 animate-pulse" style={{ width: '100%' }}></div>

            <div className="grid grid-cols-5 gap-4">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative flex flex-col items-center text-center"
                >
                  {/* Icon */}
                  <div className="relative z-10 w-32 h-32 rounded-2xl bg-card border-2 border-primary shadow-elegant flex items-center justify-center mb-4">
                    <step.icon className="text-primary" size={40} />
                  </div>
                  {/* Number Badge */}
                  <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-2 w-8 h-8 rounded-full bg-accent text-accent-foreground font-bold flex items-center justify-center text-sm shadow-accent z-20">
                    {step.number}
                  </div>
                  {/* Content */}
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Timeline */}
        <div className="md:hidden space-y-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-start space-x-4 bg-card p-6 rounded-xl shadow-elegant"
            >
              <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center relative">
                <step.icon className="text-accent" size={24} />
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center text-xs">
                  {step.number}
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-heading font-semibold text-lg text-foreground mb-1">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};