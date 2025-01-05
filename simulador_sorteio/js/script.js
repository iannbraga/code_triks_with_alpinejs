function simuladorSorteio() {
    return {
        tipoSorteio: 'faixa', // Tipo de sorteio: 'faixa' ou 'lista'
        inicioFaixa: 1, // Início da faixa
        fimFaixa: 100, // Fim da faixa
        listaNomes: '', // Lista de nomes
        resultado: null, // Resultado do sorteio

        sortear() {
            if (this.tipoSorteio === 'faixa') {
                // Sorteio por faixa
                const inicio = this.inicioFaixa;
                const fim = this.fimFaixa;
                if (inicio >= fim) {
                    alert('A faixa inicial deve ser menor que a final.');
                    return;
                }
                this.resultado = Math.floor(Math.random() * (fim - inicio + 1)) + inicio;
            } else if (this.tipoSorteio === 'lista') {
                // Sorteio por lista
                const nomes = this.listaNomes.split(',').map(nome => nome.trim()).filter(nome => nome);
                if (nomes.length === 0) {
                    alert('Insira pelo menos um nome para o sorteio.');
                    return;
                }
                const indiceSorteado = Math.floor(Math.random() * nomes.length);
                this.resultado = nomes[indiceSorteado];
            }
        }
    };
}
