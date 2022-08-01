const { state } = require('./__data__/state');
const { tables } = require('./constants');

const getRandomIndex = (max) => {
    return Math.floor(Math.random() * max);
};

exports.getCard = () => {
    let card = {};
    for (let key in tables) {
        const category = state.data[key];
        card[key] = category[getRandomIndex(category.length)];
    };
    return card;
}

exports.getCardMessage = (card) => {
    let message = "";
    for (let key in card) {
        message += `${tables[key]}: ${card[key]} \n`
    }
    return message;
};