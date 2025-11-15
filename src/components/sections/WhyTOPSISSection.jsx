import { motion } from 'framer-motion';
import { Card, CardContent } from '../ui/card';
import { Target, Zap, Puzzle, BarChart } from 'lucide-react';

const features = [
  {
    icon: Target,
    title: 'Akurat & Objektif',
    description: 'Hasil keputusan berdasarkan perhitungan matematis yang terbukti ilmiah',
  },
  {
    icon: Zap,
    title: 'Cepat & Mudah',
    description: 'Interface intuitif memudahkan input data dan mendapatkan hasil dalam sekejap',
  },
  {
    icon: Puzzle,
    title: 'Serbaguna',
    description: 'Cocok untuk berbagai keputusan: gadget, properti, investasi, dan lainnya',
  },
  {
    icon: BarChart,
    title: 'Visualisasi Menarik',
    description: 'Hasil ditampilkan dalam grafik dan ranking yang mudah dipahami',
  },
];

export const WhyTOPSISSection = () => {
  return (
    <section id="kenapa" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading font-bold text-4xl lg:text-5xl text-foreground mb-4">
            Kenapa Memilih Metode{' '}
            <span className="text-primary">TOPSIS</span>?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            TOPSIS membantu mengambil keputusan berbasis data, bukan asumsi.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-elegant-lg transition-smooth hover:-translate-y-2 border-border bg-card rounded-xl">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center">
                    <feature.icon className="text-accent" size={32} />
                  </div>
                  <h3 className="font-heading font-semibold text-xl text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};