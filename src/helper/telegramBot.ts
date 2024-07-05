import * as TelegramBot from 'node-telegram-bot-api';
const token = "7137988902:AAFKaRJlccuE3ZODAqZUGLJ64QHMXFq0DZk"

const bot = new TelegramBot(token, { polling: true });
export default bot;