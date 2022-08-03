const { state } = require("./state");
const bot = require("./bot-init");
const { findCardByCardId, getCardMessage, createButtons, getCatForCard, viewCard } = require("../utils");

module.exports = {
    reroll: (msg, cardId) => {
        const options = {
            parse_mode: "HTML",
            chat_id: msg.message.chat.id,
            message_id: msg.message.message_id,
            disable_web_page_preview: true,
            ...createButtons("chooseCat", cardId),
        }
        bot.editMessageText(msg.message.text, options);
    },
    rerollCat: (msg, data) => {
        const [ cardId, catId] = data.split(".");
        const card = findCardByCardId(cardId);
        const category = Object.keys(card)[Number(catId)];
        card[category] = getCatForCard(category);
        const cardText = getCardMessage(card);
        const options = {
            parse_mode: "HTML",
            chat_id: msg.message.chat.id,
            message_id: msg.message.message_id,
            disable_web_page_preview: true,
            ...createButtons("default", cardId),
        }
        bot.editMessageText(cardText, options);
    },
    viewCard: (msg, cardId) => {
        const card = findCardByCardId(Number(cardId));
        viewCard(msg.message.chat.id, card);
    }
}