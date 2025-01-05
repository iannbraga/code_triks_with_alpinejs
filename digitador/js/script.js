function efeitoTexto() {
    return {
        texto: "Este é um exemplo de efeito de texto digitado.",
        textoExibido: "",
        index: 0,
        velocidade: 100,
       
        digitar() {
            if (this.index < this.texto.length) {
                this.textoExibido += this.texto.charAt(this.index);
                this.index++;
                setTimeout(() => this.digitar(), this.velocidade);
            }
        },

        reiniciarDigitar() {
            this.index = 0;
            this.textoExibido = "";
            this.digitar();
        },
       
        init() {
            this.digitar();
        }
    };
}
