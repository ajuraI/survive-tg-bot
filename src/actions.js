const bot = require("./__data__/bot-init");
const { commands } = require('./constants');
const stateManager = require('./__data__/state');
const { getCard, getCardMessage } = require('./utils');
const { initDB } = require("./__data__/db-init");
const { state } = stateManager;
const { CMD_RANDOM } = commands;

exports.startAction = ({ chat }) => {
    bot.sendMessage(
        chat.id, 
        `Привет, ${chat.username}! \nДля получения случайных карточек введи команду ${CMD_RANDOM}`
    );
}

exports.randomAction = ({ chat }) => {
    const isDataEmpty = Object.keys(state.data).length === 0;
    if (isDataEmpty) {
        bot.sendMessage(chatId, "Ошибка получения данных, попробуйте позже"); 
    } else {
        let card = getCard();
        state.currentCards.push(card);
        state.professions.push(card.profession);
        let message = getCardMessage(card);
        bot.sendMessage(chat.id, message);
    }
}

exports.clearAction = ({ chat }) => {
    stateManager.clearState();
    bot.sendMessage(chat.id, "Карточки успешно обнулены!");
};

exports.currentAction = ({ chat }) => {
    if (state.professions.length > 0) {
        bot.sendMessage(chat.id, `Текущие карточки: ${state.professions}`);
    } else {
        bot.sendMessage(chat.id, `На данный момент карточек нет`);
    }
};

exports.updateDataAction = ({ chat }) => {
    initDB();
    bot.sendMessage(chat.id, `База данных обновлена`);
};