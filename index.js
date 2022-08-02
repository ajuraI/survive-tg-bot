const bot = require("./src/__data__/bot-init");
const switcher = require('./src/switcher');
const { initDB } = require("./src/__data__/db-init");
const callbacks = require("./src/__data__/callbacks");

initDB();

bot.on('message', msg => {
    switcher(msg);
});

bot.on('callback_query', msg => {
    if (msg.data) {
        const [ name, data ] = msg.data.split("::");
        if (callbacks[name]) {
            callbacks[name](msg, data);
        }
    }
});
