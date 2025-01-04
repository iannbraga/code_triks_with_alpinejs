function activityApp() {
    return {
        newActivity: '',
        activities: [],

        // Função para adicionar uma nova atividade
        addActivity() {
            if (this.newActivity.trim() !== '') {
                this.activities.push(this.newActivity.trim());
                this.newActivity = ''; // Limpa o campo de entrada após adicionar
            }
        },

        // Função para remover uma atividade da lista
        removeActivity(index) {
            this.activities.splice(index, 1);
        }
    };
}
