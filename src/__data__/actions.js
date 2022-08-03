const bot = require("./bot-init");
const { commands } = require("../constants");
const stateManager = require("./state");
const { getCard, createButtons, viewCard } = require("../utils");
const { initDB } = require("./db-init");
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
        bot.sendMessage(chat.id, "Ошибка получения данных, попробуйте позже"); 
    } else {
        let card = getCard(state.currentCards.length + 1);
        viewCard(chat.id, card);
        state.currentCards.push(card);
    }
}

exports.clearAction = ({ chat }) => {
    stateManager.clearState();
    bot.sendMessage(chat.id, "Карточки успешно обнулены!");
};

exports.currentAction = ({ chat }) => {
    if (state.currentCards.length > 0) {
        const options = createButtons("current");
        bot.sendMessage(chat.id, `Текущие карточки:`, options);
    } else {
        bot.sendMessage(chat.id, `На данный момент карточек нет`);
    }
};

exports.updateDataAction = ({ chat }) => {
    initDB();
    bot.sendMessage(chat.id, `База данных обновлена`);
};