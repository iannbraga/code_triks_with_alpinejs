function chessGame() {
  return {
    board: [],
    selectedCell: null, // Armazena a célula selecionada (linha e coluna)

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
      // Se já há uma célula selecionada, tenta mover a peça
      if (this.selectedCell) {
        const [selectedRow, selectedCol] = this.selectedCell;

        // Mover a peça para a nova posição
        this.board[row][col] = this.board[selectedRow][selectedCol];
        this.board[selectedRow][selectedCol] = '';

        // Limpa a seleção
        this.selectedCell = null;
      } else {
        // Seleciona a célula atual
        this.selectedCell = [row, col];
      }
    }
  };
}
