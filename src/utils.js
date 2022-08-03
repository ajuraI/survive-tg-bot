const { state } = require('./__data__/state');
const { tables } = require('./constants');
const bot = require("./__data__/bot-init");

const getRandomIndex = (max, min = 0) => {
    return Math.floor(min + Math.random() * (max-min));
};

exports.createButtons = createButtons = (type, cardId) => {
    if (type === "chooseCat") {
        let i = 3;
        const catButtons = Object.keys(tables).reduce((acc, cat, index) => {
            const callbackData = `rerollCat::${cardId}.${index + 1}`
            const btn = {
                text: tables[cat],
                callback_data: callbackData,
            };
            if (i > 0) {
                acc[acc.length - 1].push(btn);
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
                acc[acc.length - 1].push(btn);
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

exports.getCatForCard = getCatForCard = (category, unique = false) => {
    const catValues = state.data[category];
    const index = getRandomIndex(catValues.length);
    let value = catValues[index];
    if (value.includes("[") && value.includes("]")) {
        const start = value.indexOf("[");
        const end = value.indexOf("]");
        const interval = value.slice(start+1, end).split("-");
        const randomNumber = getRandomIndex(Number(interval[1]) + 1, Number(interval[0]));
        value = [value.slice(0, start), randomNumber, value.slice(end + 1, value.length)].join("");
    }
    if (unique) {
        /** Убираем полученное значение из данных  */
        catValues.splice(index, 1);
    }
    return value;
};

exports.getCard = (id) => {
    let card = { id };
    for (let key in tables) {
        card[key] = getCatForCard(key, !tables[key].includes("*"));
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