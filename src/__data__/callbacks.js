const { state } = require("./state");
const bot = require("./bot-init");
const { findCardByCardId, getCardMessage, createButtons } = require("../utils");

module.exports = {
    reroll: (msg, cardId) => {
        const options = {
            parse_node: "HTML",
            chat_id: msg.message.chat.id,
            message_id: msg.message.message_id,
            disable_web_page_preview: true,
            ...createButtons(cardId, "chooseCat"),
        }
        bot.editMessageText(msg.message.text, options);
    },
    rerollCat: (msg, data) => {
        const [ cardId, catId] = data.split(".");
        // const card = findCardByCardId(cardId);
        // const category = Object.keys(card)[Number(catId)];
        // card[category] = getCatForCard(getCatForCard);
    }
}