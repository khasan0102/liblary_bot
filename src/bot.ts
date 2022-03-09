import TelegramBot, { Message } from "node-telegram-bot-api";
import Config from "./config";
import Users from "./models/Users";
import UsersController from "./controllers/userController";

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
        switch (user.step) {
            case 1:
                UsersController.step1(bot, msg);
                break;
            case 2: 
                UsersController.step2(bot, msg);
                break;
            default: 
                bot.sendMessage(chatId, "Received your message");
        }
    }
});
