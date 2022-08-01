const bot = require("./src/__data__/bot-init");
const switcher = require('./src/switcher');
const { initDB } = require("./src/__data__/db-init");

initDB();

bot.on('message', (message) => {
    switcher(message);
});