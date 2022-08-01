const TelegramApi = require('node-telegram-bot-api');
const token = '5446314437:AAG37WfLuGgnN9js4_ynjUsT-FS7rMNC_Wk';
module.exports = new TelegramApi(token, { polling: true });