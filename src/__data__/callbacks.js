const { state } = require("./state");

module.exports = {
    reroll: (id) => {
        console.log(state.currentCards.find(card => card.id === Number(id)))
    },
}