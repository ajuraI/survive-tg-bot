module.exports = {
    state: {
        baseData: {},
        data: {},
        currentCards: [],
    },
    clearState: function () {
        this.state.data = {...this.state.baseData};
        this.state.currentCards = [];
    }
}