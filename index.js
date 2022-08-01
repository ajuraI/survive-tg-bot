const db = require("./src/db-init");
const bot = require("./src/bot-init");
const { CMD_START, CMD_RANDOM_ALL } = require('./src/commands');

bot.on('message', ({ text, chat: { username, id: chatId }}) => {
    if (text === CMD_START) {
        bot.sendMessage(
            chatId, 
            `Привет, ${username}! \nДля получения случайных карточек введи команду ${RANDOM_ALL}`
        );
    }
    if (text === CMD_RANDOM_ALL) {
        bot.sendMessage(chatId, Math.floor(Math.random()*100));
    }
});