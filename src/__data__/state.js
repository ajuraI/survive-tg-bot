module.exports = {
    state: {
        data: {},
        currentCards: [],
        professions: [],
    },
    clearState: () => {
        this.state.data = {};
        this.state.currentCards = [];
        this.state.professions = [];
    }
}