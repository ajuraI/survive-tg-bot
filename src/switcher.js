const { commands } = require('./constants');
const bot = require("./initialization/bot-init");
const data = require("./initialization/db-init");
const { CMD_START, CMD_RANDOM_ALL } = commands;

module.exports = ({ text, chat: { username, id: chatId }}) => {
    switch (text) {
        case CMD_START: {
            bot.sendMessage(
                chatId, 
                `Привет, ${username}! \nДля получения случайных карточек введи команду ${CMD_RANDOM_ALL}`
            );
            break;
        }
        case CMD_RANDOM_ALL:  {
            if (Object.keys(data).length > 0) {
                console.log(data);
            }
            break;
        }
        default: {
            break;
        }
    }
}