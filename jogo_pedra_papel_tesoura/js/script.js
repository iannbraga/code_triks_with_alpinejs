function jogo() {
    return {
        escolhaUsuario: '',
        escolhaComputador: '',
        resultado: '',

        jogar(escolhaUsuario) {
            const opcoes = ['pedra', 'papel', 'tesoura'];

            // Escolha do computador
            const escolhaComputador = opcoes[Math.floor(Math.random() * opcoes.length)];

            // Exibe a escolha do computador
            this.escolhaComputador = "O computador escolheu: " + escolhaComputador;

            // Lógica para determinar o vencedor
            if (escolhaUsuario === escolhaComputador) {
                this.resultado = 'Empate!';
            } else if (
                (escolhaUsuario === 'pedra' && escolhaComputador === 'tesoura') ||
                (escolhaUsuario === 'papel' && escolhaComputador === 'pedra') ||
                (escolhaUsuario === 'tesoura' && escolhaComputador === 'papel')
            ) {
                this.resultado = 'Você ganhou!';
            } else {
                this.resultado = 'Você perdeu!';
            }
        }
    }
}
