const { commands } = require('./constants');
const bot = require("./initialization/bot-init");
const { CMD_START, CMD_RANDOM } = commands;
const { tables } = require('./constants');
const getRandomIndex = require('./utils');

module.exports = (data, { text, chat: { username, id: chatId }}) => {
    const isDataEmpty = Object.keys(data).length === 0;
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
                let message = "";
                for (let key in tables) {
                    const category = data[key];
                    const value = category[getRandomIndex(category.length)];
                    message += `${tables[key]}: ${value} \n`
                }
                bot.sendMessage(chatId, message); 
            }
            break;
        }
        default: {
            break;
        }
    }
}