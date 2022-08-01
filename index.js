const bot = require("./src/initialization/bot-init");
const baseData = require("./src/initialization/db-init");
const switcher = require('./src/switcher');

bot.on('message', (message) => {
    const data = {...baseData};
    switcher(data, message)
});