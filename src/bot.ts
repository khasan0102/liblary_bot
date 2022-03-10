import TelegramBot, { Message } from "node-telegram-bot-api";
import UserRouter from "./routers/users";
import Config from "./config";
import Users from "./models/Users";

const bot = new TelegramBot(Config.TOKEN, { polling: true });

bot.on("message", async (msg: Message) => {
    const chatId = msg.chat.id;
    let user = await Users.getOne(chatId);

    if (!user) {
        user = await Users.create(chatId);
        bot.sendMessage(
            chatId,
            `Assalomu alaykum xurmatli foydalanuchi. Iltimos ismingizni kiriting`
        );
    } else if (user.role === "user") {
        UserRouter(bot, msg, user);
    }
});
