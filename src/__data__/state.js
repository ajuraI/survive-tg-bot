const cloneDeep = require('lodash/cloneDeep');

module.exports = {
    state: {
        baseData: {},
        data: {},
        currentCards: [],
    },
    clearState: function () {
        this.state.data = cloneDeep(this.state.baseData);
        this.state.currentCards = [];
    }
}