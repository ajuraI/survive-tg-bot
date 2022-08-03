const bot = require("./bot-init");
const { commands } = require("../constants");
const stateManager = require("./state");
const { getCard, createButtons, viewCard, getRandomIndex } = require("../utils");
const { initDB } = require("./db-init");
const { state } = stateManager;
const { CMD_RANDOM } = commands;

exports.startAction = ({ chat }) => {
    bot.sendMessage(
        chat.id, 
        `Привет, ${chat.username}! \nДля получения случайных карточек введи команду ${CMD_RANDOM}`
    );
}

exports.randomCatAction = ({ chat }) => {
    const options = createButtons("chooseCat", null);
    bot.sendMessage(
        chat.id, 
        "Выбери характеристику из списка:",
        options,
    );
}

exports.specialAction = ({ message_id, chat }) => {
    const options = {
        parse_mode: "HTML",
        chat_id: chat.id,
        message_id: message_id,
        disable_web_page_preview: true,
        ...createButtons("special"),
    }
    bot.sendMessage(
        chat.id, 
        `<b>Спец. условие</b> - ${state.specialConditions[getRandomIndex(state.specialConditions.length)]}`,
        options
    );
};

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