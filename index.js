const TelegramApi = require('node-telegram-bot-api');

const token = '5446314437:AAG37WfLuGgnN9js4_ynjUsT-FS7rMNC_Wk';

const bot = new TelegramApi(token, { polling: true });

bot.on('message', ({ text, chat: { username, id: chatId }}) => {
    if (text === '/start') {
        bot.sendMessage(chatId, `Hello, ${username}! \nType /random to get random number from 1 to 100`);
    }
    if (text === '/random') {
        bot.sendMessage(chatId, Math.floor(Math.random()*100));
    }
});