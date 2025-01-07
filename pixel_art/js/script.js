function pixelArtApp() {
    return {
        rows: 50,
        cols: 50,
        currentColor: '#000000',
        canvas: null,
        cellColors: [],
        isEraser: false, // Estado para determinar o modo ativo

        setRows(rows) {
            if (rows < 1 || rows > 100) {
                console.error("Número de linhas inválido");
                return;
            }
            this.rows = rows;
            console.log("Linhas: " + this.rows);
        },
        
        setCols(cols) {
            if (cols < 1 || cols > 100) {
                console.error("Número de colunas inválido");
                return;
            }
            this.cols = cols;
            console.log("Colunas: " + this.cols);
        },

        palette: [
            '#000000', '#FFFFFF', '#FF0000', '#00FF00W', '#0000FF',
            '#FFFF00', '#FF00FF', '#00FFFF', '#800000', '#808000',
            '#008000', '#800080', '#808080', '#C0C0C0', '#FFA500',
            '#A52A2A', '#8B4513', '#40E0D0', '#6495ED', '#DC143C',
        ],

        generateGrid() {
            if (this.canvas) {
                this.canvas.remove();
            }
            console.log("Row: " + this.rows + " Col: " + this.cols );

            // Inicializa o array de cores
            this.cellColors = Array.from({ length: this.rows }, () => Array(this.cols).fill('#FFFFFF'));

            this.canvas = new p5((p) => {
                let cellSize;

                p.setup = () => {
                    const container = document.getElementById('canvas-container');
                    p.createCanvas(800, 800).parent(container);
                    cellSize = p.width / this.cols;
                    p.noLoop(); // Desenha a grade apenas uma vez
                };

                p.draw = () => {
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
            const col = Math.floor(p.mouseX / cellSize);
            const row = Math.floor(p.mouseY / cellSize);

            if (col >= 0 && row >= 0 && col < this.cols && row < this.rows) {
                const color = this.isEraser ? '#FFFFFF' : this.currentColor;
                this.cellColors[row][col] = color; // Atualiza a cor
                p.redraw();
            }
        },

        clearGrid() {
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

        activateEraser() {
            this.isEraser = true;
        },

        activateDrawing() {
            this.isEraser = false;
        },

        selectColor(color) {
            this.currentColor = color;
            this.isEraser = false; // Sai do modo borracha ao selecionar uma cor
        },
    };
}
