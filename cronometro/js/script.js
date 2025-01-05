function cronometro() {
    return {
        tempo: 0, // Tempo em segundos
        milissegundos: 0, // Milissegundos
        contador: null, // Referência para o setInterval
        tempoDisplay: "00:00:00", // Formato do display (HH:MM:SS:MS)

        iniciar() {
            if (this.contador === null) {
                this.contador = setInterval(() => {
                    this.milissegundos++;
                    if (this.milissegundos === 100) {
                        this.milissegundos = 0;
                        this.tempo++;
                    }
                    this.atualizarDisplay();
                }, 10); // Atualiza a cada 10 milissegundos
            }
        },

        pausar() {
            clearInterval(this.contador);
            this.contador = null;
        },

        resetar() {
            clearInterval(this.contador);
            this.contador = null;
            this.tempo = 0;
            this.milissegundos = 0;
            this.atualizarDisplay();
        },

        atualizarDisplay() {
            let minutos = Math.floor(this.tempo / 60);
            let segundos = this.tempo % 60;
            let milissegundos = this.milissegundos;

            // Formata o tempo como "MM:SS:MS"
            this.tempoDisplay = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}:${milissegundos.toString().padStart(2, '0')}`;
        }
    }
}
