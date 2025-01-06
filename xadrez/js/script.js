function chessGame() {
  return {
    board: [],
    selectedCell: null, // Armazena a célula selecionada (linha e coluna)
    currentPlayer: 'white', // Jogador atual

    init() {
      // Inicializa o tabuleiro com peças padrão
      this.board = [
        ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
        ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
        ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖']
      ];
    },

    selectCell(row, col) {
      if (this.selectedCell) {
        const [selectedRow, selectedCol] = this.selectedCell;
        const selectedPiece = this.board[selectedRow][selectedCol];
        const targetPiece = this.board[row][col];

        // Verifica se é a vez do jogador correto
        if (this.isCorrectPlayerTurn(selectedPiece)) {
          // Verifica se a jogada é válida para o tipo de peça
          if (this.isValidMove(selectedPiece, selectedRow, selectedCol, row, col, targetPiece)) {
            // Mover a peça para a nova posição
            this.board[row][col] = selectedPiece;
            this.board[selectedRow][selectedCol] = ''; // Limpar a casa original
            // Troca de turno
            this.currentPlayer = this.currentPlayer === 'white' ? 'black' : 'white';
          }
        }
        this.selectedCell = null; // Limpar a célula selecionada após o movimento
      } else {
        // Seleciona a célula atual
        this.selectedCell = [row, col];
      }
    },

    // Verifica se é a vez do jogador correto
    isCorrectPlayerTurn(piece) {
      if (this.currentPlayer === 'white' && piece === piece.toUpperCase()) {
        return true;
      }
      if (this.currentPlayer === 'black' && piece === piece.toLowerCase()) {
        return true;
      }
      return false;
    },

    // Função genérica para verificar se o movimento é válido para uma peça
    isValidMove(piece, startRow, startCol, endRow, endCol, targetPiece) {
      switch (piece.toLowerCase()) {
        case '♙':  // Peão
          return this.isValidPawnMove(startRow, startCol, endRow, endCol, targetPiece);
        case '♖':  // Torre
          return this.isValidRookMove(startRow, startCol, endRow, endCol, targetPiece);
        case '♘':  // Cavalo
          return this.isValidKnightMove(startRow, startCol, endRow, endCol);
        case '♗':  // Bispo
          return this.isValidBishopMove(startRow, startCol, endRow, endCol, targetPiece);
        case '♕':  // Rainha
          return this.isValidQueenMove(startRow, startCol, endRow, endCol, targetPiece);
        case '♔':  // Rei
          return this.isValidKingMove(startRow, startCol, endRow, endCol);
        default:
          return false;
      }
    },

    // Validação de movimento do peão
    isValidPawnMove(startRow, startCol, endRow, endCol, targetPiece) {
      const direction = this.currentPlayer === 'white' ? -1 : 1; // Para peões brancos (subem) e pretos (descem)

      // Movimento de uma casa para frente
      if (startCol === endCol) {
        if (endRow === startRow + direction && targetPiece === '') {
          return true;
        }

        // Movimento de duas casas para frente no primeiro movimento
        const startRowLimit = this.currentPlayer === 'white' ? 6 : 1;
        if (startRow === startRowLimit && endRow === startRow + direction * 2 && targetPiece === '') {
          return true;
        }
      }

      // Captura na diagonal
      if (Math.abs(startCol - endCol) === 1 && endRow === startRow + direction && targetPiece !== '' && targetPiece !== targetPiece.toLowerCase()) {
        return true;
      }

      return false;
    },

    // Validação de movimento da torre
    isValidRookMove(startRow, startCol, endRow, endCol, targetPiece) {
      if (startRow === endRow || startCol === endCol) {
        // Verifica se não há peças bloqueando o caminho (mesma linha ou coluna)
        return this.isPathClear(startRow, startCol, endRow, endCol);
      }
      return false;
    },

    // Validação de movimento do cavalo
    isValidKnightMove(startRow, startCol, endRow, endCol) {
      const rowDiff = Math.abs(startRow - endRow);
      const colDiff = Math.abs(startCol - endCol);
      return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);
    },

    // Validação de movimento do bispo
    isValidBishopMove(startRow, startCol, endRow, endCol, targetPiece) {
      if (Math.abs(startRow - endRow) === Math.abs(startCol - endCol)) {
        return this.isPathClear(startRow, startCol, endRow, endCol);
      }
      return false;
    },

    // Validação de movimento da rainha
    isValidQueenMove(startRow, startCol, endRow, endCol, targetPiece) {
      return this.isValidRookMove(startRow, startCol, endRow, endCol, targetPiece) || this.isValidBishopMove(startRow, startCol, endRow, endCol, targetPiece);
    },

    // Validação de movimento do rei
    isValidKingMove(startRow, startCol, endRow, endCol) {
      const rowDiff = Math.abs(startRow - endRow);
      const colDiff = Math.abs(startCol - endCol);
      return (rowDiff <= 1 && colDiff <= 1);
    },

    // Verifica se o caminho está livre (não há peças no caminho)
    isPathClear(startRow, startCol, endRow, endCol) {
      const rowStep = startRow === endRow ? 0 : startRow < endRow ? 1 : -1;
      const colStep = startCol === endCol ? 0 : startCol < endCol ? 1 : -1;

      let row = startRow + rowStep;
      let col = startCol + colStep;

      while (row !== endRow || col !== endCol) {
        if (this.board[row][col] !== '') {
          return false;
        }
        row += rowStep;
        col += colStep;
      }

      return true;
    }
  };
}
