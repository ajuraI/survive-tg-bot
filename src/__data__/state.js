module.exports = {
    state: {
        data: {},
        currentCards: [],
        professions: [],
    },
    clearState: function() {
        console.log(this);
        this.state.data = {};
        this.state.currentCards = [];
        this.state.professions = [];
    }
}