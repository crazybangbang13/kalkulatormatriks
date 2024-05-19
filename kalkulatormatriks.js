function generateMatrix() {
    const matrixSize = parseInt(document.getElementById('matrixSize').value);
    const matrixContainer = document.getElementById('matrixContainer');
    matrixContainer.innerHTML = '';
  
    for (let i = 0; i < matrixSize; i++) {
      const row = document.createElement('div');
      for (let j = 0; j < matrixSize; j++) {
        const input = document.createElement('input');
        input.type = 'text';
        input.name = `matrix[${i}][${j}]`;
        row.appendChild(input);
      }
      matrixContainer.appendChild(row);
    }
  }
  
  function getMatrixValues() {
    const matrixSize = parseInt(document.getElementById('matrixSize').value);
    const matrix = [];
    for (let i = 0; i < matrixSize; i++) {
      matrix[i] = [];
      for (let j = 0; j < matrixSize; j++) {
        const value = parseFloat(document.getElementsByName(`matrix[${i}][${j}]`)[0].value);
        matrix[i][j] = value;
      }
    }
    return matrix;
  }
  
  function calculateDeterminant() {
    const matrix = getMatrixValues();
    const determinant = findDeterminant(matrix);
    document.getElementById('result').innerHTML = `Determinan: ${determinant}`;
    
  }
  
  function findDeterminant(matrix) {
    const n = matrix.length;
    if (n === 2) {
      return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    } else {
      let det = 0;
      for (let i = 0; i < n; i++) {
        det += matrix[0][i] * cofactor(matrix, 0, i);
      }
      return det;
    }
  }
  
  function cofactor(matrix, row, col) {
    return Math.pow(-1, row + col) * findDeterminant(minor(matrix, row, col));
  }
  
  function minor(matrix, row, col) {
    return matrix.filter((_, i) => i !== row).map(row => row.filter((_, j) => j !== col));
  }



  window.onload = generateMatrix;