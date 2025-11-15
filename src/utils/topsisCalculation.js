/**
 * TOPSIS (Technique for Order of Preference by Similarity to Ideal Solution) Calculation
 */

export function calculateTOPSIS(matrix, weights, criteriaTypes, alternativeNames, criteriaNames) {
  const m = matrix.length; // number of alternatives
  const n = matrix[0].length; // number of criteria

  // Step 1: Normalize the decision matrix
  const normalizedMatrix = normalizeMatrix(matrix);

  // Step 2: Calculate weighted normalized matrix
  const weightedMatrix = applyWeights(normalizedMatrix, weights);

  // Step 3: Determine ideal and negative-ideal solutions
  const idealSolution = getIdealSolution(weightedMatrix, criteriaTypes);
  const negativeIdealSolution = getNegativeIdealSolution(weightedMatrix, criteriaTypes);

  // Step 4: Calculate separation measures
  const separationFromIdeal = [];
  const separationFromNegativeIdeal = [];

  for (let i = 0; i < m; i++) {
    let sumIdeal = 0;
    let sumNegativeIdeal = 0;

    for (let j = 0; j < n; j++) {
      sumIdeal += Math.pow(weightedMatrix[i][j] - idealSolution[j], 2);
      sumNegativeIdeal += Math.pow(weightedMatrix[i][j] - negativeIdealSolution[j], 2);
    }

    separationFromIdeal.push(Math.sqrt(sumIdeal));
    separationFromNegativeIdeal.push(Math.sqrt(sumNegativeIdeal));
  }

  // Step 5: Calculate relative closeness to ideal solution
  const closeness = [];
  for (let i = 0; i < m; i++) {
    const c = separationFromNegativeIdeal[i] / (separationFromIdeal[i] + separationFromNegativeIdeal[i]);
    closeness.push(c);
  }

  // Step 6: Rank alternatives
  const ranking = closeness.map((c, index) => ({
    alternative: alternativeNames[index],
    closeness: c,
    distanceToPositive: separationFromIdeal[index],
    distanceToNegative: separationFromNegativeIdeal[index],
    index
  }));


  ranking.sort((a, b) => b.closeness - a.closeness);

  // Add rank
  ranking.forEach((item, index) => {
    item.rank = index + 1;
  });

  return {
  decisionMatrix: matrix, 
  normalizedMatrix,
  weightedMatrix,
  idealPositive: idealSolution,
  idealNegative: negativeIdealSolution,
  separationFromIdeal,
  separationFromNegativeIdeal,
  closeness,
  ranking,
  alternativeNames,      // ✅ tambahkan ini
  criteriaNames
};
}

function normalizeMatrix(matrix) {
  const m = matrix.length;
  const n = matrix[0].length;
  const normalizedMatrix = [];

  for (let j = 0; j < n; j++) {
    let sumOfSquares = 0;
    for (let i = 0; i < m; i++) {
      sumOfSquares += Math.pow(matrix[i][j], 2);
    }
    const denominator = Math.sqrt(sumOfSquares);

    for (let i = 0; i < m; i++) {
      if (!normalizedMatrix[i]) {
        normalizedMatrix[i] = [];
      }
      normalizedMatrix[i][j] = denominator === 0 ? 0 : matrix[i][j] / denominator;
    }
  }

  return normalizedMatrix;
}

function applyWeights(normalizedMatrix, weights) {
  const m = normalizedMatrix.length;
  const n = normalizedMatrix[0].length;
  const weightedMatrix = [];

  for (let i = 0; i < m; i++) {
    weightedMatrix[i] = [];
    for (let j = 0; j < n; j++) {
      weightedMatrix[i][j] = normalizedMatrix[i][j] * weights[j];
    }
  }

  return weightedMatrix;
}

function getIdealSolution(weightedMatrix, criteriaTypes) {
  const n = weightedMatrix[0].length;
  const idealSolution = [];

  for (let j = 0; j < n; j++) {
    const column = weightedMatrix.map(row => row[j]);
    if (criteriaTypes[j] === 'benefit') {
      idealSolution[j] = Math.max(...column);
    } else {
      idealSolution[j] = Math.min(...column);
    }
  }

  return idealSolution;
}

function getNegativeIdealSolution(weightedMatrix, criteriaTypes) {
  const n = weightedMatrix[0].length;
  const negativeIdealSolution = [];

  for (let j = 0; j < n; j++) {
    const column = weightedMatrix.map(row => row[j]);
    if (criteriaTypes[j] === 'benefit') {
      negativeIdealSolution[j] = Math.min(...column);
    } else {
      negativeIdealSolution[j] = Math.max(...column);
    }
  }

  return negativeIdealSolution;
}