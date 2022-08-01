const bot = require("./__data__/bot-init");
const { commands } = require('./constants');
const { getCard, getCardMessage } = require('./utils');
const { state } = require('./__data__/state');
const { CMD_START, CMD_RANDOM } = commands;

module.exports = ({ text, chat: { username, id: chatId }}) => {
    const isDataEmpty = Object.keys(state.data).length === 0;

    switch (text) {
        case CMD_START: {
            bot.sendMessage(
                chatId, 
                `Привет, ${username}! \nДля получения случайных карточек введи команду ${CMD_RANDOM}`
            );
            break;
        }
        case CMD_RANDOM:  {
            if (isDataEmpty) {
                bot.sendMessage(chatId, "Ошибка получения данных, попробуйте позже"); 
            } else {
                let card = getCard();
                state.currentCards.push(card);
                state.professions.push(card.profession);
                let message = getCardMessage(card);
                bot.sendMessage(chatId, message);
            }
            break;
        }
        default: {
            break;
        }
    }
}