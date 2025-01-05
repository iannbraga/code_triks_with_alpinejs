function semaforo() {
    return {
        cor: 'vermelho', // Cor inicial
        tempo: 5, // Tempo inicial
        bloqueioMouse: false, // Controla se o mouse está bloqueado
        timer: null, // Referência para o setInterval
        iniciar() {
            this.alternarCor(); // Inicia o ciclo de cores imediatamente
        },
        alternarCor() {
            clearInterval(this.timer); // Limpa o timer anterior

            if (this.cor === 'vermelho') {
                this.cor = 'amarelo';
                this.tempo = 2; // 2 segundos para o amarelo
            } else if (this.cor === 'amarelo') {
                this.cor = 'verde';
                this.tempo = 5; // 5 segundos para o verde
            } else {
                this.cor = 'vermelho';
                this.tempo = 5; // 5 segundos para o vermelho
            }

            this.iniciarTimer();
        },
        iniciarTimer() {
            this.bloqueioMouse = this.cor === 'vermelho'; // Bloqueia o mouse no vermelho
            this.bloquearMouse(); // Aplica o bloqueio
            this.timer = setInterval(() => {
                if (this.tempo > 0) {
                    this.tempo--; // Decrementa o tempo
                } else {
                    this.alternarCor(); // Alterna a cor quando o tempo acabar
                }
            }, 1000); // Atualiza a cada segundo
        },
        bloquearMouse() {
            // Se a luz for vermelha, bloqueia o mouse
            if (this.bloqueioMouse) {
                document.body.style.pointerEvents = 'none'; // Desabilita toda interação
            } else {
                document.body.style.pointerEvents = 'auto'; // Restaura a interação
            }
        }
    };
}
