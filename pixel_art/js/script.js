// js/script.js
function pixelArtApp() {
    return {
        currentColor: '#000000',
        canvas: null,
        cellColors: [],
        cellSize: null,
        isEraser: false,
        error: false,

        setRows(rows) {
            if (rows < 1 || rows > 100) {
                this.showError("Número de linhas inválido");
                return;
            }
            this.rows = rows;
            console.log("Linhas: " + this.rows);
        },

        setCols(cols) {
            if (cols < 1 || cols > 100) {
                this.showError("Número de colunas inválido");
                return;
            }
            this.cols = cols;
            console.log("Colunas: " + this.cols);
            if (this.canvas) {
                this.cellSize = this.canvas.width / this.cols;
            }
        },

        showError(message) {
            this.error = true;
            console.error(message);
            setTimeout(() => this.error = false, 3000); // Esconde o erro após 3 segundos
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
            console.log("Col: " + this.cols + " Lin: " + this.rows);

            this.cellColors = Array.from({ length: this.rows }, () => Array(this.cols).fill('#FFFFFF'));

            this.canvas = new p5((p) => {
                p.setup = () => {
                    const container = document.getElementById('canvas-container');
                    p.createCanvas(800, 800).parent(container);
                    this.cellSize = p.width / this.cols;
                    p.noLoop();
                };

                p.draw = () => {
                    for (let i = 0; i < this.cols; i++) {
                        for (let j = 0; j < this.rows; j++) {
                            p.fill(this.cellColors[j][i]);
                            p.rect(i * this.cellSize, j * this.cellSize, this.cellSize, this.cellSize);
                        }
                    }
                };

                p.mousePressed = () => this.fillCell(p, this.cellSize);
                p.mouseDragged = () => this.fillCell(p, this.cellSize);
            });
        },

        fillCell(p, cellSize) {
            const col = Math.floor(p.mouseX / cellSize);
            const row = Math.floor(p.mouseY / cellSize);

            if (col >= 0 && row >= 0 && col < this.cols && row < this.rows) {
                const color = this.isEraser ? '#FFFFFF' : this.currentColor;
                this.cellColors[row][col] = color;
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
            this.isEraser = false;
        },

        colorEntireGrid() {
            this.cellColors = Array.from({ length: this.rows }, () => Array(this.cols).fill(this.currentColor));
            if (this.canvas) {
                this.canvas.redraw();
            }
        },

        zoomIn() {
            this.cellSize = this.cellSize * 1.2;  // Aumenta o tamanho das células em 20%
            this.canvas.redraw();
        },

        zoomOut() {
            this.cellSize = this.cellSize / 1.2;  // Diminui o tamanho das células em 20%
            this.canvas.redraw();
        },

        setPresetSize(rows, cols) {
            this.rows = rows;
            this.cols = cols;
            this.generateGrid();
        },
    };
}
