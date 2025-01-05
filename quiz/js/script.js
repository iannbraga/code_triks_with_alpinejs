function quizInterativo() {
    return {
        respostaCorreta: 'Júpiter', // Resposta correta
        mensagem: '', // Mensagem de resultado

        verificarResposta(resposta) {
            if (resposta === this.respostaCorreta) {
                this.mensagem = 'Parabéns! Você acertou!';
            } else {
                this.mensagem = 'Ops! Tente novamente.';
            }
        }
    };
}
