function currencyConverter() {
    return {
        fromCurrency: 'USD',
        toCurrency: 'BRL',
        amount: 1,
        result: null,

        async convertCurrency() {
            // Se a moeda de origem ou destino for Bitcoin ou Ethereum
            if (this.fromCurrency === 'BTC' || this.fromCurrency === 'ETH' || this.toCurrency === 'BTC' || this.toCurrency === 'ETH') {
                // Usando a API CoinGecko para obter cotações de BTC e ETH
                const coinGeckoUrl = `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd`;
                const response = await fetch(coinGeckoUrl);
                const data = await response.json();

                let fromRate = 1;
                let toRate = 1;

                if (this.fromCurrency === 'BTC') {
                    fromRate = data.bitcoin.usd;
                } else if (this.fromCurrency === 'ETH') {
                    fromRate = data.ethereum.usd;
                }

                if (this.toCurrency === 'BTC') {
                    toRate = data.bitcoin.usd;
                } else if (this.toCurrency === 'ETH') {
                    toRate = data.ethereum.usd;
                }

                const resultInUSD = this.amount * fromRate;
                this.result = (resultInUSD / toRate).toFixed(6); // Para BTC e ETH, com mais casas decimais
            } else {
                // Usando a API ExchangeRate-API para taxas de câmbio tradicionais
                const url = `https://api.exchangerate-api.com/v4/latest/${this.fromCurrency}`;
                const response = await fetch(url);
                const data = await response.json();
                const rate = data.rates[this.toCurrency];
                this.result = (this.amount * rate).toFixed(2);
            }
        }
    }
}
