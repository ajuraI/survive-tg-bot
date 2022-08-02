const bot = require("./src/__data__/bot-init");
const switcher = require('./src/switcher');
const { initDB } = require("./src/__data__/db-init");
const callbacks = require("./src/__data__/callbacks");

initDB();

bot.on('message', msg => {
    switcher(msg);
});

bot.on('callback_query', msg => {
    const callbackData = msg.message.reply_markup.inline_keyboard[0][0].callback_data;
    if (callbackData) {
        const [ callbackName, id ] = callbackData.split("::");
        if (callbacks[callbackName]) {
            callbacks[callbackName](id);
        }
    }
});
