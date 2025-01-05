function pixelArtApp() {
    return {
        rows: 16,
        cols: 16,
        currentColor: '#000000',
        canvas: null,
        cellColors: [], // Array para armazenar as cores de cada célula

        generateGrid() {
            if (this.canvas) {
                this.canvas.remove();
            }

            // Inicializa o array de cores
            this.cellColors = Array.from({ length: this.rows }, () => Array(this.cols).fill('#FFFFFF'));

            this.canvas = new p5((p) => {
                let cellSize;

                p.setup = () => {
                    const container = document.getElementById('canvas-container');
                    p.createCanvas(500, 500).parent(container);
                    cellSize = p.width / this.cols;
                    p.noLoop(); // Desenha a grade apenas uma vez
                };

                p.draw = () => {
                    // Desenha a grade e preenche com as cores armazenadas
                    for (let i = 0; i < this.cols; i++) {
                        for (let j = 0; j < this.rows; j++) {
                            p.fill(this.cellColors[j][i]);
                            p.rect(i * cellSize, j * cellSize, cellSize, cellSize);
                        }
                    }
                };

                p.mousePressed = () => this.fillCell(p, cellSize);
                p.mouseDragged = () => this.fillCell(p, cellSize);
            });
        },

        fillCell(p, cellSize) {
            // Calcula a posição da célula clicada
            const col = Math.floor(p.mouseX / cellSize);
            const row = Math.floor(p.mouseY / cellSize);

            // Verifica se está dentro dos limites do canvas
            if (col >= 0 && row >= 0 && col < this.cols && row < this.rows) {
                this.cellColors[row][col] = this.currentColor; // Atualiza a cor da célula
                p.redraw(); // Redesenha apenas a parte alterada
            }
        },

        clearGrid() {
            // Redefine todas as células para a cor branca
            this.cellColors = Array.from({ length: this.rows }, () => Array(this.cols).fill('#FFFFFF'));
            if (this.canvas) {
                this.canvas.redraw();
            }
        },

        saveImage() {
            if (this.canvas) {
                this.canvas.saveCanvas('pixel-art', 'png');
            }
        },
    };
}
