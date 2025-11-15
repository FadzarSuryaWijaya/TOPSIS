import { motion } from 'framer-motion';
import { Card, CardContent } from '../ui/card';
import { GraduationCap, Briefcase, Code, Users } from 'lucide-react';

const audiences = [
  {
    icon: GraduationCap,
    title: 'Mahasiswa',
    description: 'Untuk tugas akhir, penelitian, atau keputusan akademik',
  },
  {
    icon: Briefcase,
    title: 'Profesional',
    description: 'Evaluasi vendor, proyek, atau strategi bisnis',
  },
  {
    icon: Code,
    title: 'Developer',
    description: 'Pilih teknologi, tools, atau framework terbaik',
  },
  {
    icon: Users,
    title: 'Umum',
    description: 'Keputusan sehari-hari: gadget, properti, investasi',
  },
];

export const WhoSection = () => {
  return (
    <section id="tentang" className="py-24 bg-muted">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading font-bold text-4xl lg:text-5xl text-foreground mb-4">
            Siapa yang Cocok <span className="text-primary">Menggunakan</span>?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Kalkulator TOPSIS dirancang untuk berbagai kebutuhan dan profesi
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {audiences.map((audience, index) => (
            <motion.div
              key={audience.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-elegant-lg transition-smooth hover:-translate-y-2 border-border bg-card rounded-xl">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <audience.icon className="text-primary" size={36} />
                  </div>
                  <h3 className="font-heading font-semibold text-xl text-foreground">
                    {audience.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {audience.description}
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