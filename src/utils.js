const { state } = require('./__data__/state');
const { tables } = require('./constants');

const getRandomIndex = (max) => {
    return Math.floor(Math.random() * max);
};

exports.createButtons = (cardId, type) => {
    if (type === "chooseCat") {
        const catButtons = Object.keys(tables).map((cat, index) => {
            return [{
                text: tables[cat],
                callback_data: `rerollCat::${cardId}.${index+1}`,
            }];
        })
        return {
            reply_markup: {
                inline_keyboard: catButtons
            }
        }
    }
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

exports.getCatForCard = getCatForCard = (category) => {
    const catValues = state.data[category];
    return catValues[getRandomIndex(catValues.length)];
};

exports.getCard = (id) => {
    let card = { id };
    for (let key in tables) {
        card[key] = getCatForCard(key);
    };
    return card;
}

exports.getCardMessage = (card) => {
    let message = "";
    for (let key in card) {
        if (key !== "id") {
            message += `**${tables[key]}**: ${card[key]} \n`
        }
    }
    return message;
};

exports.findCardByCardId = (cardId) => {
    return state.currentCards.find(card => card.id === Number(cardId));
};