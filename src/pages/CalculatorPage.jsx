import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Alert, AlertDescription } from '../components/ui/alert';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Calculator, Plus, Minus, AlertCircle, TrendingUp, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';
import { calculateTOPSIS } from '../utils/topsisCalculation.js';

export default function CalculatorPage() {
  const [numAlternatives, setNumAlternatives] = useState(3);
  const [numCriteria, setNumCriteria] = useState(3);
  const [alternativeNames, setAlternativeNames] = useState(['Alternatif A', 'Alternatif B', 'Alternatif C']);
  const [criteriaNames, setCriteriaNames] = useState(['Kriteria 1', 'Kriteria 2', 'Kriteria 3']);
  const [matrix, setMatrix] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ]);
  const [weights, setWeights] = useState([30, 50, 20]);
  const [criteriaTypes, setCriteriaTypes] = useState(['benefit', 'benefit', 'benefit']);
  const [results, setResults] = useState(null);
  const [showForm, setShowForm] = useState(true);

  // Reset to initial state
  const handleReset = () => {
    setNumAlternatives(3);
    setNumCriteria(3);
    setAlternativeNames(['Alternatif A', 'Alternatif B', 'Alternatif C']);
    setCriteriaNames(['Kriteria 1', 'Kriteria 2', 'Kriteria 3']);
    setMatrix([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ]);
    setWeights([30, 50, 20]);
    setCriteriaTypes(['benefit', 'benefit', 'benefit']);
    setResults(null);
    toast.success('Data telah direset ke keadaan awal');
  };

  // Update dimensions
  const updateDimensions = (alternatives, criteria) => {
    const newAlts = Math.max(2, Math.min(10, alternatives));
    const newCrits = Math.max(2, Math.min(10, criteria));

    setNumAlternatives(newAlts);
    setNumCriteria(newCrits);

    // Update alternative names
    const newAltNames = [];
    for (let i = 0; i < newAlts; i++) {
      newAltNames.push(alternativeNames[i] || `Alternatif ${String.fromCharCode(65 + i)}`);
    }
    setAlternativeNames(newAltNames);

    // Update criteria names
    const newCritNames = [];
    for (let i = 0; i < newCrits; i++) {
      newCritNames.push(criteriaNames[i] || `Kriteria ${i + 1}`);
    }
    setCriteriaNames(newCritNames);

    // Update matrix
    const newMatrix = [];
    for (let i = 0; i < newAlts; i++) {
      const row = [];
      for (let j = 0; j < newCrits; j++) {
        row.push(matrix[i]?.[j] || 5);
      }
      newMatrix.push(row);
    }
    setMatrix(newMatrix);

    // Update weights
    const newWeights = [];
    const equalWeight = Math.floor(100 / newCrits);
    for (let i = 0; i < newCrits; i++) {
      newWeights.push(weights[i] || equalWeight);
    }
    setWeights(newWeights);

    // Update criteria types
    const newTypes = [];
    for (let i = 0; i < newCrits; i++) {
      newTypes.push(criteriaTypes[i] || 'benefit');
    }
    setCriteriaTypes(newTypes);

    setResults(null);
  };

  // Update matrix value
  const updateMatrixValue = (row, col, value) => {
    const numValue = parseInt(value) || 0;
    const clampedValue = Math.max(0, Math.min(100, numValue));
    const newMatrix = [...matrix];
    newMatrix[row][col] = clampedValue;
    setMatrix(newMatrix);
  };

  // Update weight
  const updateWeight = (index, value) => {
    const numValue = parseInt(value) || 0;
    const clampedValue = Math.max(0, Math.min(100, numValue));
    const newWeights = [...weights];
    newWeights[index] = clampedValue;
    setWeights(newWeights);
  };

  // Update criteria type
  const updateCriteriaType = (index, value) => {
    const newTypes = [...criteriaTypes];
    newTypes[index] = value;
    setCriteriaTypes(newTypes);
  };

  // Validate weights
  const validateWeights = () => {
    const totalWeight = weights.reduce((sum, w) => sum + w, 0);
    return totalWeight === 100;
  };

  // Calculate TOPSIS
  const handleCalculate = () => {
    if (!validateWeights()) {
      toast.error('Total bobot harus sama dengan 100%!');
      return;
    }

    try {
      const topsisResults = calculateTOPSIS(
        matrix,
        weights.map(w => w / 100),
        criteriaTypes,
        alternativeNames,
        criteriaNames
      );
      setResults(topsisResults);
      setShowForm(false);
      toast.success('Perhitungan TOPSIS berhasil!');
    } catch (error) {
      toast.error('Terjadi kesalahan dalam perhitungan: ' + error.message);
    }
  };

  const totalWeight = weights.reduce((sum, w) => sum + w, 0);
  const isWeightValid = totalWeight === 100;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-16 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-foreground mb-3 sm:mb-4">
              <span className="text-primary">Kalkulator TOPSIS</span> Interaktif
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Masukkan data Anda dan temukan hasil keputusan terbaik dengan metode TOPSIS
            </p>
          </div>

          {showForm ? (
            <div className="space-y-6 sm:space-y-8">
              {/* Step 1: Set Dimensions */}
              <Card className="shadow-elegant-lg rounded-xl sm:rounded-2xl border-border">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="flex items-center space-x-2 text-foreground text-lg sm:text-xl">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-md sm:rounded-lg bg-accent text-accent-foreground flex items-center justify-center font-bold text-sm sm:text-base">
                      1
                    </div>
                    <span>Tentukan Jumlah Alternatif dan Kriteria</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <Label className="text-foreground mb-2 block text-sm sm:text-base">Jumlah Alternatif</Label>
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateDimensions(numAlternatives - 1, numCriteria)}
                          disabled={numAlternatives <= 2}
                          className="rounded-lg h-10 w-10 sm:h-12 sm:w-12"
                        >
                          <Minus size={16} />
                        </Button>
                        <Input
                          type="number"
                          value={numAlternatives}
                          onChange={(e) => updateDimensions(parseInt(e.target.value) || 2, numCriteria)}
                          min="2"
                          max="10"
                          className="text-center font-semibold text-base sm:text-lg rounded-lg h-10 sm:h-12"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateDimensions(numAlternatives + 1, numCriteria)}
                          disabled={numAlternatives >= 10}
                          className="rounded-lg h-10 w-10 sm:h-12 sm:w-12"
                        >
                          <Plus size={16} />
                        </Button>
                      </div>
                    </div>
                    <div>
                      <Label className="text-foreground mb-2 block text-sm sm:text-base">Jumlah Kriteria</Label>
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateDimensions(numAlternatives, numCriteria - 1)}
                          disabled={numCriteria <= 2}
                          className="rounded-lg h-10 w-10 sm:h-12 sm:w-12"
                        >
                          <Minus size={16} />
                        </Button>
                        <Input
                          type="number"
                          value={numCriteria}
                          onChange={(e) => updateDimensions(numAlternatives, parseInt(e.target.value) || 2)}
                          min="2"
                          max="10"
                          className="text-center font-semibold text-base sm:text-lg rounded-lg h-10 sm:h-12"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateDimensions(numAlternatives, numCriteria + 1)}
                          disabled={numCriteria >= 10}
                          className="rounded-lg h-10 w-10 sm:h-12 sm:w-12"
                        >
                          <Plus size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Step 2: Input Matrix */}
              <Card className="shadow-elegant-lg rounded-xl sm:rounded-2xl border-border">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="flex items-center space-x-2 text-foreground text-lg sm:text-xl">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-md sm:rounded-lg bg-accent text-accent-foreground flex items-center justify-center font-bold text-sm sm:text-base">
                      2
                    </div>
                    <span>Masukkan Matriks Keputusan</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-2 sm:p-6">
                  <div className="overflow-x-auto -mx-2 sm:mx-0">
                    <div className="min-w-max px-2 sm:px-0">
                      <table className="w-full border-collapse text-sm sm:text-base">
                        <thead>
                          <tr className="border-b-2 border-primary">
                            <th className="text-left py-2 px-2 sm:py-3 sm:px-3 font-semibold text-foreground min-w-[100px] sm:min-w-[120px]">
                              Alternatif
                            </th>
                            {Array.from({ length: numCriteria }).map((_, idx) => (
                              <th key={idx} className="text-center py-2 px-1 sm:py-3 sm:px-2 min-w-[80px] sm:min-w-[100px]">
                                <Input
                                  value={criteriaNames[idx]}
                                  onChange={(e) => {
                                    const newNames = [...criteriaNames];
                                    newNames[idx] = e.target.value;
                                    setCriteriaNames(newNames);
                                  }}
                                  className="text-center font-semibold bg-muted border-border rounded-lg text-xs sm:text-sm h-8 sm:h-10"
                                  placeholder={`K${idx + 1}`}
                                />
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {Array.from({ length: numAlternatives }).map((_, rowIdx) => (
                            <tr key={rowIdx} className="border-b border-border hover:bg-muted transition-smooth">
                              <td className="py-1 px-2 sm:py-2 sm:px-3">
                                <Input
                                  value={alternativeNames[rowIdx]}
                                  onChange={(e) => {
                                    const newNames = [...alternativeNames];
                                    newNames[rowIdx] = e.target.value;
                                    setAlternativeNames(newNames);
                                  }}
                                  className="font-medium bg-muted border-border rounded-lg text-xs sm:text-sm h-8 sm:h-10"
                                  placeholder={`Alt ${String.fromCharCode(65 + rowIdx)}`}
                                />
                              </td>
                              {Array.from({ length: numCriteria }).map((_, colIdx) => (
                                <td key={colIdx} className="py-1 px-1 sm:py-2 sm:px-2">
                                  <Input
                                    type="number"
                                    value={matrix[rowIdx][colIdx]}
                                    onChange={(e) => updateMatrixValue(rowIdx, colIdx, e.target.value)}
                                    min="0"
                                    max="100"
                                    step="1"
                                    className="text-center rounded-lg text-xs sm:text-sm h-8 sm:h-10"
                                  />
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-3 sm:mt-4 px-2 sm:px-0">
                    Masukkan nilai untuk setiap alternatif dan kriteria (0-100)
                  </p>
                </CardContent>
              </Card>

              {/* Step 3: Set Weights and Types */}
              <Card className="shadow-elegant-lg rounded-xl sm:rounded-2xl border-border">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="flex items-center space-x-2 text-foreground text-lg sm:text-xl">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-md sm:rounded-lg bg-accent text-accent-foreground flex items-center justify-center font-bold text-sm sm:text-base">
                      3
                    </div>
                    <span>Atur Bobot dan Tipe Kriteria</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                  {!isWeightValid && (
                    <Alert variant="destructive" className="rounded-lg sm:rounded-xl">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription className="text-sm">
                        Total bobot harus 100%. Saat ini: {totalWeight}%
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-3 sm:space-y-4">
                    {Array.from({ length: numCriteria }).map((_, idx) => (
                      <div key={idx} className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 p-3 sm:p-4 bg-muted rounded-lg sm:rounded-xl">
                        <div>
                          <Label className="text-xs sm:text-sm text-muted-foreground mb-1 block">Kriteria</Label>
                          <div className="font-semibold text-foreground text-sm sm:text-base">{criteriaNames[idx]}</div>
                        </div>
                        <div>
                          <Label className="text-xs sm:text-sm text-muted-foreground mb-2 block">Bobot (%)</Label>
                          <Input
                            type="number"
                            value={weights[idx]}
                            onChange={(e) => updateWeight(idx, e.target.value)}
                            min="0"
                            max="100"
                            step="1"
                            className="rounded-lg text-sm sm:text-base h-9 sm:h-10"
                          />
                        </div>
                        <div>
                          <Label className="text-xs sm:text-sm text-muted-foreground mb-2 block">Tipe</Label>
                          <Select value={criteriaTypes[idx]} onValueChange={(value) => updateCriteriaType(idx, value)}>
                            <SelectTrigger className="rounded-lg text-sm sm:text-base h-9 sm:h-10">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="benefit" className="text-sm">Benefit (Maksimal)</SelectItem>
                              <SelectItem value="cost" className="text-sm">Cost (Minimal)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 sm:p-4 bg-accent/10 rounded-lg sm:rounded-xl border-2 border-accent">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-foreground text-sm sm:text-base">Total Bobot:</span>
                      <span className={`text-xl sm:text-2xl font-bold ${isWeightValid ? 'text-accent' : 'text-destructive'}`}>
                        {totalWeight}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleReset}
                  className="font-semibold text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 rounded-xl border-2 border-destructive/20 text-destructive hover:bg-destructive/10 hover:text-destructive w-full sm:w-auto"
                >
                  <RotateCcw className="mr-2" size={20} />
                  Reset Data
                </Button>
                <Button
                  size="lg"
                  onClick={handleCalculate}
                  disabled={!isWeightValid}
                  className="bg-accent hover:bg-accent-dark text-accent-foreground font-semibold text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 rounded-xl shadow-accent transition-smooth w-full sm:w-auto"
                >
                  <Calculator className="mr-2" size={20} />
                  Hitung TOPSIS
                </Button>
              </div>
            </div>
          ) : (
            <ResultsView
              results={results}
              onReset={() => {
                setShowForm(true);
                setResults(null);
              }}
            />
          )}
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}


function ResultsView({ results, onReset }) {
  if (!results) return null;

  const [activeStep, setActiveStep] = useState(0);

  const chartData = results.ranking.map(item => ({
    name: item.alternative,
    score: parseFloat(item.closeness.toFixed(3)),
    rank: item.rank
  }));

  const COLORS = ['hsl(var(--accent))', 'hsl(var(--primary))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

  const steps = [
    {
      title: "Matriks Keputusan",
      description: "Data input alternatif dan kriteria"
    },
    {
      title: "Matriks Normalisasi",
      description: "Normalisasi menggunakan metode pembagian dengan akar kuadrat"
    },
    {
      title: "Matriks Ternormalisasi Terbobot",
      description: "Hasil normalisasi dikalikan dengan bobot kriteria"
    },
    {
      title: "Solusi Ideal Positif & Negatif",
      description: "Menentukan nilai terbaik dan terburuk untuk setiap kriteria"
    },
    {
      title: "Jarak Alternatif",
      description: "Menghitung jarak setiap alternatif terhadap solusi ideal"
    },
    {
      title: "Hasil Akhir & Ranking",
      description: "Kedekatan relatif dan peringkat alternatif"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 sm:space-y-8"
    >
      {/* Results Header */}
      <Card className="shadow-elegant-lg rounded-xl sm:rounded-2xl border-border bg-gradient-to-br from-accent/10 to-primary/5">
        <CardContent className="p-6 sm:p-8 text-center">
          <TrendingUp className="mx-auto mb-3 sm:mb-4 text-accent" size={32} />
          <h2 className="font-heading font-bold text-xl sm:text-2xl lg:text-3xl text-foreground mb-2">
            Proses Perhitungan TOPSIS
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Ikuti langkah-langkah perhitungan metode TOPSIS
          </p>
        </CardContent>
      </Card>

      {/* Step Navigator */}
      <Card className="shadow-elegant-lg rounded-xl sm:rounded-2xl border-border">
        <CardContent className="p-4 sm:p-6">
          <div className="flex overflow-x-auto gap-1 sm:gap-2 pb-2 -mx-1 sm:mx-0 px-1 sm:px-0">
            {steps.map((step, index) => (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className={`flex-shrink-0 px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold transition-smooth text-xs sm:text-sm ${activeStep === index
                  ? 'bg-accent text-accent-foreground shadow-accent'
                  : 'bg-muted text-muted-foreground hover:bg-accent/20'
                  }`}
              >
                <div>Langkah {index + 1}</div>
                <div className="mt-1 opacity-80 hidden sm:block">{step.title}</div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Step Content */}
      <motion.div
        key={activeStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="shadow-elegant-lg rounded-xl sm:rounded-2xl border-border">
          <CardHeader className="p-4 sm:p-6">
            <div className="flex items-center space-x-2 sm:space-x-3 mb-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-accent text-accent-foreground flex items-center justify-center font-bold text-sm sm:text-base">
                {activeStep + 1}
              </div>
              <div>
                <CardTitle className="text-foreground text-lg sm:text-xl lg:text-2xl">{steps[activeStep].title}</CardTitle>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">{steps[activeStep].description}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            {activeStep === 0 && <DecisionMatrixStep results={results} />}
            {activeStep === 1 && <NormalizedMatrixStep results={results} />}
            {activeStep === 2 && <WeightedMatrixStep results={results} />}
            {activeStep === 3 && <IdealSolutionStep results={results} />}
            {activeStep === 4 && <DistanceStep results={results} />}
            {activeStep === 5 && <FinalRankingStep results={results} chartData={chartData} COLORS={COLORS} />}
          </CardContent>
        </Card>
      </motion.div>

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
        <Button
          variant="outline"
          onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
          disabled={activeStep === 0}
          className="rounded-xl px-4 sm:px-6 w-full sm:w-auto order-2 sm:order-1"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Sebelumnya
        </Button>

        {activeStep === steps.length - 1 ? (
          <Button
            size="lg"
            variant="outline"
            onClick={onReset}
            className="font-semibold px-6 sm:px-8 py-5 sm:py-6 rounded-xl w-full sm:w-auto order-1 sm:order-2 mb-3 sm:mb-0"
          >
            Hitung Ulang
          </Button>
        ) : (
          <Button
            onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
            className="bg-accent hover:bg-accent-dark text-accent-foreground rounded-xl px-4 sm:px-6 w-full sm:w-auto order-1 sm:order-2 mb-3 sm:mb-0"
          >
            Selanjutnya
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </motion.div>
  );
}

function DecisionMatrixStep({ results }) {
  return (
    <div className="overflow-x-auto -mx-2 sm:mx-0">
      <div className="min-w-max px-2 sm:px-0">
        <table className="w-full border-collapse text-sm sm:text-base">
          <thead>
            <tr className="bg-muted">
              <th className="border border-border p-2 sm:p-3 text-left font-semibold">Alternatif</th>
              {results.criteriaNames?.map((name, idx) => (
                <th key={idx} className="border border-border p-2 sm:p-3 text-center font-semibold">{name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {results.decisionMatrix?.map((row, rowIdx) => (
              <tr key={rowIdx} className="hover:bg-muted/50">
                <td className="border border-border p-2 sm:p-3 font-medium">{results.alternativeNames?.[rowIdx]}</td>
                {row.map((value, colIdx) => (
                  <td key={colIdx} className="border border-border p-2 sm:p-3 text-center">{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function NormalizedMatrixStep({ results }) {
  return (
    <div className="space-y-3 sm:space-y-4">
      <Alert className="rounded-lg sm:rounded-xl bg-blue-50 border-blue-200">
        <AlertCircle className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-900 text-sm sm:text-base">
          Normalisasi: r<sub>ij</sub> = x<sub>ij</sub> / √(Σx<sub>ij</sub>²)
        </AlertDescription>
      </Alert>
      <div className="overflow-x-auto -mx-2 sm:mx-0">
        <div className="min-w-max px-2 sm:px-0">
          <table className="w-full border-collapse text-sm sm:text-base">
            <thead>
              <tr className="bg-muted">
                <th className="border border-border p-2 sm:p-3 text-left font-semibold">Alternatif</th>
                {results.criteriaNames?.map((name, idx) => (
                  <th key={idx} className="border border-border p-2 sm:p-3 text-center font-semibold">{name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {results.normalizedMatrix?.map((row, rowIdx) => (
                <tr key={rowIdx} className="hover:bg-muted/50">
                  <td className="border border-border p-2 sm:p-3 font-medium">{results.alternativeNames?.[rowIdx]}</td>
                  {row.map((value, colIdx) => (
                    <td key={colIdx} className="border border-border p-2 sm:p-3 text-center">{value.toFixed(4)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function WeightedMatrixStep({ results }) {
  return (
    <div className="space-y-3 sm:space-y-4">
      <Alert className="rounded-lg sm:rounded-xl bg-purple-50 border-purple-200">
        <AlertCircle className="h-4 w-4 text-purple-600" />
        <AlertDescription className="text-purple-900 text-sm sm:text-base">
          Matriks Terbobot: y<sub>ij</sub> = w<sub>j</sub> × r<sub>ij</sub>
        </AlertDescription>
      </Alert>
      <div className="overflow-x-auto -mx-2 sm:mx-0">
        <div className="min-w-max px-2 sm:px-0">
          <table className="w-full border-collapse text-sm sm:text-base">
            <thead>
              <tr className="bg-muted">
                <th className="border border-border p-2 sm:p-3 text-left font-semibold">Alternatif</th>
                {results.criteriaNames?.map((name, idx) => (
                  <th key={idx} className="border border-border p-2 sm:p-3 text-center font-semibold">
                    {name}
                    <div className="text-xs font-normal text-muted-foreground">
                      (w = {results.weights?.[idx]?.toFixed(2)})
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {results.weightedMatrix?.map((row, rowIdx) => (
                <tr key={rowIdx} className="hover:bg-muted/50">
                  <td className="border border-border p-2 sm:p-3 font-medium">{results.alternativeNames?.[rowIdx]}</td>
                  {row.map((value, colIdx) => (
                    <td key={colIdx} className="border border-border p-2 sm:p-3 text-center">{value.toFixed(4)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function IdealSolutionStep({ results }) {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-green-50 border-2 border-green-200 rounded-lg sm:rounded-xl p-4 sm:p-6">
          <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4 text-green-900 flex items-center">
            <span className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500 text-white rounded-md sm:rounded-lg flex items-center justify-center mr-2 text-sm sm:text-base">+</span>
            Solusi Ideal Positif (A+)
          </h3>
          <div className="space-y-2">
            {results.idealPositive?.map((value, idx) => (
              <div key={idx} className="flex justify-between items-center bg-white p-2 sm:p-3 rounded-lg text-sm sm:text-base">
                <span className="font-medium">{results.criteriaNames?.[idx]}</span>
                <span className="font-bold text-green-700">{value.toFixed(4)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-red-50 border-2 border-red-200 rounded-lg sm:rounded-xl p-4 sm:p-6">
          <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4 text-red-900 flex items-center">
            <span className="w-6 h-6 sm:w-8 sm:h-8 bg-red-500 text-white rounded-md sm:rounded-lg flex items-center justify-center mr-2 text-sm sm:text-base">-</span>
            Solusi Ideal Negatif (A-)
          </h3>
          <div className="space-y-2">
            {results.idealNegative?.map((value, idx) => (
              <div key={idx} className="flex justify-between items-center bg-white p-2 sm:p-3 rounded-lg text-sm sm:text-base">
                <span className="font-medium">{results.criteriaNames?.[idx]}</span>
                <span className="font-bold text-red-700">{value.toFixed(4)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function DistanceStep({ results }) {
  return (
    <div className="space-y-3 sm:space-y-4">
      <Alert className="rounded-lg sm:rounded-xl bg-amber-50 border-amber-200">
        <AlertCircle className="h-4 w-4 text-amber-600" />
        <AlertDescription className="text-amber-900 text-sm sm:text-base">
          D+ = √(Σ(y<sub>ij</sub> - A+<sub>j</sub>)²) dan D- = √(Σ(y<sub>ij</sub> - A-<sub>j</sub>)²)
        </AlertDescription>
      </Alert>
      <div className="overflow-x-auto -mx-2 sm:mx-0">
        <div className="min-w-max px-2 sm:px-0">
          <table className="w-full border-collapse text-sm sm:text-base">
            <thead>
              <tr className="bg-muted">
                <th className="border border-border p-2 sm:p-3 text-left font-semibold">Alternatif</th>
                <th className="border border-border p-2 sm:p-3 text-center font-semibold text-green-700">
                  Jarak ke A+ (D+)
                </th>
                <th className="border border-border p-2 sm:p-3 text-center font-semibold text-red-700">
                  Jarak ke A- (D-)
                </th>
              </tr>
            </thead>
            <tbody>
              {results.ranking?.map((item, idx) => (
                <tr key={idx} className="hover:bg-muted/50">
                  <td className="border border-border p-2 sm:p-3 font-medium">{item.alternative}</td>
                  <td className="border border-border p-2 sm:p-3 text-center text-green-700 font-semibold">
                    {item.distanceToPositive?.toFixed(4) || 'N/A'}
                  </td>
                  <td className="border border-border p-2 sm:p-3 text-center text-red-700 font-semibold">
                    {item.distanceToNegative?.toFixed(4) || 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function FinalRankingStep({ results, chartData, COLORS }) {
  return (
    <div className="space-y-4 sm:space-y-6">
      <Alert className="rounded-lg sm:rounded-xl bg-green-50 border-green-200">
        <AlertCircle className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-900 text-sm sm:text-base">
          Kedekatan Relatif: C<sub>i</sub> = D- / (D+ + D-)
        </AlertDescription>
      </Alert>

      {/* Ranking Cards */}
      <div className="space-y-3 sm:space-y-4">
        {results.ranking.map((item, index) => (
          <motion.div
            key={item.alternative}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              className={`shadow-elegant rounded-lg sm:rounded-xl border-2 transition-smooth hover:shadow-elegant-lg ${item.rank === 1
                ? 'border-accent bg-accent/5'
                : 'border-border bg-card'
                }`}
            >
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center font-bold text-lg sm:text-xl ${item.rank === 1
                        ? 'bg-accent text-accent-foreground shadow-accent'
                        : 'bg-primary text-primary-foreground'
                        }`}
                    >
                      {item.rank}
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-lg sm:text-xl text-foreground">
                        {item.alternative}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">Skor Preferensi</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-accent">
                      {item.closeness.toFixed(3)}
                    </div>
                    {item.rank === 1 && (
                      <div className="text-xs sm:text-sm font-semibold text-accent mt-1">
                        🏆 Terbaik
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Visualization */}
      <div className="bg-muted p-4 sm:p-6 rounded-lg sm:rounded-xl">
        <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">Visualisasi Hasil</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="name"
              stroke="hsl(var(--foreground))"
              angle={-45}
              textAnchor="end"
              height={60}
              fontSize={12}
            />
            <YAxis
              stroke="hsl(var(--foreground))"
              fontSize={12}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '12px',
                fontSize: '12px'
              }}
            />
            <Bar dataKey="score" radius={[8, 8, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}