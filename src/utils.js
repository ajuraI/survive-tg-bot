const { state } = require('./__data__/state');
const { tables } = require('./constants');

const getRandomIndex = (max) => {
    return Math.floor(Math.random() * max);
};

exports.createButton = (cardId) => {
    return {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: "Реролл характеристики",
                    callback_data: `reroll::${cardId}`,
                }]
            ]
        }
    }
};

exports.getCard = (id) => {
    let card = {
        id: id,
    };
    for (let key in tables) {
        const category = state.data[key];
        card[key] = category[getRandomIndex(category.length)];
    };
    return card;
}

exports.getCardMessage = (card) => {
    let message = "";
    for (let key in card) {
        if (key !== "id") {
            message += `${tables[key]}: ${card[key]} \n`
        }
    }
    return message;
};