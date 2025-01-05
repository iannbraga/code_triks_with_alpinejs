function quizInterativo() {
    return {
        perguntas: [], // Lista de perguntas
        pergunta: {}, // Pergunta atual
        mensagem: '', // Mensagem de feedback

        // Carrega as perguntas do arquivo JSON
        async carregarPerguntas() {
            const resposta = await fetch('js/perguntas.json');
            this.perguntas = await resposta.json();
            this.pergunta = this.perguntas[0]; // Seleciona a primeira pergunta
        },

        // Verifica se a resposta está correta
        verificarResposta(index) {
            if (index === this.pergunta.certa) {
                this.mensagem = 'Parabéns! Você acertou!';
            } else {
                this.mensagem = 'Ops! Tente novamente.';
            }

            // Exibe a próxima pergunta após o feedback
            setTimeout(() => {
                const indiceProximaPergunta = this.perguntas.indexOf(this.pergunta) + 1;
                if (indiceProximaPergunta < this.perguntas.length) {
                    this.pergunta = this.perguntas[indiceProximaPergunta];
                    this.mensagem = ''; // Limpa a mensagem antes de exibir a próxima
                } else {
                    this.mensagem = 'Quiz finalizado!';
                }
            }, 2000);
        },

        // Inicializa o quiz
        init() {
            this.carregarPerguntas();
        }
    };
}
