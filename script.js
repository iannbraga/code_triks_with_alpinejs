function orcamento() {
    return {
        itens: [],
        novoItem: {
            descricao: '',
            valor: 0,
            tipo: 'receita'
        },
        get totalReceitas() {
            return this.itens
                .filter(item => item.tipo === 'receita')
                .reduce((acc, item) => acc + item.valor, 0);
        },
        get totalDespesas() {
            return this.itens
                .filter(item => item.tipo === 'despesa')
                .reduce((acc, item) => acc + item.valor, 0);
        },
        get saldo() {
            return this.totalReceitas - this.totalDespesas;
        },
        adicionarItem() {
            if (this.novoItem.descricao && this.novoItem.valor > 0) {
                this.itens.push({
                    descricao: this.novoItem.descricao,
                    valor: this.novoItem.valor,
                    tipo: this.novoItem.tipo
                });
                this.novoItem.descricao = '';
                this.novoItem.valor = 0;
                this.novoItem.tipo = 'receita';
            }
        },
        removerItem(index) {
            this.itens.splice(index, 1);
        }
    };
}
