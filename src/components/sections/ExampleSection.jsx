import { motion } from 'framer-motion';
import { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calculator } from 'lucide-react';

const dummyData = [
  { name: 'Laptop A', harga: 8, kualitas: 6, nilai: 7 },
  { name: 'Laptop B', harga: 7, kualitas: 9, nilai: 8 },
  { name: 'Laptop C', harga: 9, kualitas: 7, nilai: 6 },
];

const resultData = [
  { name: 'Laptop B', score: 0.682, rank: 1 },
  { name: 'Laptop C', score: 0.521, rank: 2 },
  { name: 'Laptop A', score: 0.418, rank: 3 },
];

export const ExampleSection = () => {
  const [showResults, setShowResults] = useState(false);

  return (
    <section id="contoh" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading font-bold text-4xl lg:text-5xl text-foreground mb-4">
            Lihat <span className="text-primary">Simulasi</span> Langsung
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Contoh perhitungan TOPSIS untuk pemilihan laptop terbaik
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="shadow-elegant-lg rounded-2xl border-border">
              <CardContent className="p-8">
                {/* Input Data Table */}
                <div className="mb-8">
                  <h3 className="font-heading font-semibold text-2xl text-foreground mb-4">
                    Data Alternatif & Kriteria
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b-2 border-primary">
                          <th className="text-left py-3 px-4 font-semibold text-foreground">Alternatif</th>
                          <th className="text-center py-3 px-4 font-semibold text-foreground">Harga (Cost)</th>
                          <th className="text-center py-3 px-4 font-semibold text-foreground">Kualitas (Benefit)</th>
                          <th className="text-center py-3 px-4 font-semibold text-foreground">Nilai (Benefit)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dummyData.map((row, idx) => (
                          <tr key={idx} className="border-b border-border hover:bg-muted transition-smooth">
                            <td className="py-3 px-4 font-medium text-foreground">{row.name}</td>
                            <td className="text-center py-3 px-4 text-muted-foreground">{row.harga}</td>
                            <td className="text-center py-3 px-4 text-muted-foreground">{row.kualitas}</td>
                            <td className="text-center py-3 px-4 text-muted-foreground">{row.nilai}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <span className="font-semibold text-foreground">Bobot:</span> Harga (30%), Kualitas (50%), Nilai (20%)
                    </p>
                  </div>
                </div>

                {/* Calculate Button */}
                <div className="flex justify-center mb-8">
                  <Button
                    size="lg"
                    onClick={() => setShowResults(!showResults)}
                    className="bg-accent hover:bg-accent-dark text-accent-foreground font-semibold px-8 py-6 rounded-xl shadow-accent transition-smooth"
                  >
                    <Calculator className="mr-2" size={20} />
                    {showResults ? 'Sembunyikan Hasil' : 'Hitung Sekarang'}
                  </Button>
                </div>

                {/* Results */}
                {showResults && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                  >
                    {/* Ranking Table */}
                    <div>
                      <h3 className="font-heading font-semibold text-2xl text-foreground mb-4">
                        Hasil Ranking
                      </h3>
                      <div className="space-y-3">
                        {resultData.map((result) => (
                          <div
                            key={result.name}
                            className={`flex items-center justify-between p-4 rounded-xl border-2 transition-smooth ${
                              result.rank === 1
                                ? 'bg-accent/10 border-accent'
                                : 'bg-muted border-border'
                            }`}
                          >
                            <div className="flex items-center space-x-4">
                              <div
                                className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold ${
                                  result.rank === 1
                                    ? 'bg-accent text-accent-foreground'
                                    : 'bg-primary text-primary-foreground'
                                }`}
                              >
                                {result.rank}
                              </div>
                              <span className="font-semibold text-lg text-foreground">{result.name}</span>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-accent">{result.score.toFixed(3)}</div>
                              <div className="text-xs text-muted-foreground">Skor Preferensi</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bar Chart */}
                    <div>
                      <h3 className="font-heading font-semibold text-2xl text-foreground mb-4">
                        Visualisasi Hasil
                      </h3>
                      <div className="bg-muted p-6 rounded-xl">
                        <ResponsiveContainer width="100%" height={300}>
                          <BarChart data={resultData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                            <XAxis dataKey="name" stroke="hsl(var(--foreground))" />
                            <YAxis stroke="hsl(var(--foreground))" />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: 'hsl(var(--card))',
                                border: '1px solid hsl(var(--border))',
                                borderRadius: '8px',
                              }}
                            />
                            <Bar dataKey="score" fill="hsl(var(--accent))" radius={[8, 8, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};