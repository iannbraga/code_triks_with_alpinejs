function simuladorDados() {
    return {
        resultado: null,
        lançarDado() {
            this.resultado = Math.floor(Math.random() * 6) + 1;
        }
    };
}
