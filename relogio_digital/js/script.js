function relogio() {
    return {
        hora: '',
        data: '',
    
        atualizarHoraEData() {
            setInterval(() => {
                const agora = new Date();
            
                this.hora = agora.toLocaleTimeString('pt-BR', { 
                    hour: '2-digit', 
                    minute: '2-digit', 
                    second: '2-digit' 
                });
                
                this.data = agora.toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'short', 
                    year: 'numeric'
                }).toUpperCase();
            }, 1000);
        },

        init() {
            this.atualizarHoraEData();
        },

        destroy() {
            clearInterval(this.intervalo);
        }
    };
}
