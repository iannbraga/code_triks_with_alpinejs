function investmentSimulator() {
    return {
        initialInvestment: 0,
        initialContribution: 0,
        monthlyContribution: 0,
        interestRate: 0,
        years: 0,
        interestType: 'simple', // Tipo de juros (simples ou compostos)
        investmentValue: null,

        // Função para calcular o valor do investimento futuro
        calculateInvestment() {
            let totalAmount = this.initialInvestment + this.initialContribution; // Inicia com o valor inicial e o aporte inicial

            if (this.interestType === 'simple') {
                // Juros Simples: A = P + (P * r * t) + Aporte Mensal
                totalAmount += this.calculateSimpleInterest();
            } else {
                // Juros Compostos: A = P * (1 + r)^t + Aporte Mensal
                totalAmount += this.calculateCompoundInterest();
            }

            this.investmentValue = totalAmount;
        },

        // Função para calcular o investimento com Juros Simples
        calculateSimpleInterest() {
            const principal = this.initialInvestment + this.initialContribution;
            const rate = this.interestRate / 100; // Taxa de juros anual em decimal
            const time = this.years;

            let simpleInterest = principal * rate * time;

            // Calculando os aportes mensais durante o período de tempo
            if (this.monthlyContribution > 0) {
                simpleInterest += this.monthlyContribution * 12 * time;
            }

            return simpleInterest;
        },

        // Função para calcular o investimento com Juros Compostos
        calculateCompoundInterest() {
            const principal = this.initialInvestment + this.initialContribution;
            const rate = this.interestRate / 100; // Taxa de juros anual em decimal
            const time = this.years;

            // Fórmula dos Juros Compostos: A = P * (1 + r)^t
            let compoundInterest = principal * Math.pow((1 + rate), time) - principal;

            // Calculando os aportes mensais durante o período de tempo
            if (this.monthlyContribution > 0) {
                const monthlyRate = Math.pow((1 + rate), 1 / 12) - 1; // Taxa de juros mensal
                let compoundMonthlyInterest = 0;

                // Calculando o efeito dos aportes mensais
                for (let month = 1; month <= time * 12; month++) {
                    compoundMonthlyInterest += this.monthlyContribution * Math.pow((1 + monthlyRate), (time * 12 - month));
                }

                compoundInterest += compoundMonthlyInterest;
            }

            return compoundInterest;
        }
    };
}
