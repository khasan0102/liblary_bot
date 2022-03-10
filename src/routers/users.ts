import TelegramBot, { Message } from "node-telegram-bot-api";
import UsersController from "../controllers/userController";
import IUser from "../interfaces/users";

export default async (bot: TelegramBot, msg: Message, user: IUser) => {
    const chatId = msg.chat.id;
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