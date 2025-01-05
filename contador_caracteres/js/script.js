function contadorCaracteres() {
    return {
        texto: '', // Texto digitado no textarea
        contador: 0, // Contador de caracteres

        atualizarContador() {
            this.contador = this.texto.length;
        }
    };
}
