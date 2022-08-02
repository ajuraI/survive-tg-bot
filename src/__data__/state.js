module.exports = {
    state: {
        baseData: {},
        data: {},
        currentCards: [],
        professions: [],
    },
    clearState: function () {
        this.state.data = {...this.state.baseData};
        this.state.currentCards = [];
        this.state.professions = [];
    }
}