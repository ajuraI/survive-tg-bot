const { state } = require('./__data__/state');
const { tables } = require('./constants');
const bot = require("./__data__/bot-init");

const getRandomIndex = (max) => {
    return Math.floor(Math.random() * max);
};

exports.createButtons = createButtons = (type, cardId) => {
    if (type === "chooseCat") {
        let i = 3;
        const catButtons = Object.keys(tables).reduce((acc, cat, index) => {
            const btn = {
                text: tables[cat],
                callback_data: `rerollCat::${cardId}.${index+1}`,
            };
            if (i > 0) {
                acc[acc.length-1].push(btn);
                i--;
            } else {
                acc.push([btn]);
                i = 2;
            }
            return acc;
        }, [[]]);
        return {
            reply_markup: {
                inline_keyboard: catButtons
            }
        }
    } else if (type === "current") {
        const currentCards = state.currentCards;
        let i = 2;
        const catButtons = currentCards.reduce((acc, card) => {
            const btn = {
                text: card.profession,
                callback_data: `viewCard::${card.id}`,
            };
            if (i > 0) {
                acc[acc.length-1].push(btn);
                i--;
            } else {
                acc.push([btn]);
                i = 1;
            }
            return acc;
        }, [[]]);
        return {
            reply_markup: {
                inline_keyboard: catButtons
            }
        }
    };
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

exports.getCardMessage = getCardMessage = (card) => {
    let message = "";
    for (let key in card) {
        if (key !== "id") {
            message += `<b>${tables[key]}</b>: ${card[key]} \n`
        }
    }
    return message;
};

exports.findCardByCardId = (cardId) => {
    return state.currentCards.find(card => card.id === Number(cardId));
};


exports.viewCard = (chatId, card) => {
    const button = createButtons("default", card.id);
    let message = getCardMessage(card);
    bot.sendMessage(chatId, message, { parse_mode: "HTML", ...button });
};