import TelegramBot from "node-telegram-bot-api";
import path from "path";
import dotenv from "dotenv";

dotenv.config(path.join(process.cwd(), '.env'));

const token = process.env.TOKEN;
const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1];

  bot.sendMessage(chatId, resp);
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  
  bot.sendMessage(chatId, 'Received your message');
});
