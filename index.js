const bot = require("./src/initialization/bot-init");
const switcher = require('./src/switcher');

bot.on('message', (message) => switcher(message));