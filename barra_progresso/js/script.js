function barraProgresso() {
    return {
        progresso: 0, // Progresso atual
        intervalo: null, // Referência para o intervalo
        animando: false, // Flag para verificar se a animação está em andamento

        animarProgresso() {
            if (this.animando) return; // Impede de iniciar nova animação enquanto uma já está em andamento
            this.animando = true;

            this.intervalo = setInterval(() => {
                if (this.progresso < 100) {
                    this.progresso++;
                } else {
                    clearInterval(this.intervalo); // Para a animação quando atinge 100%
                    this.animando = false;
                }
            }, 100); // Atualiza o progresso a cada 100ms
        },

        resetarProgresso() {
            clearInterval(this.intervalo); // Interrompe qualquer animação em andamento
            this.progresso = 0; // Zera o progresso
            this.animando = false; // Reseta a flag de animação
        }
    };
}
