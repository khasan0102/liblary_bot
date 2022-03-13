import TelegramBot, { CallbackQuery, Message } from "node-telegram-bot-api";
import UsersController from "../controllers/userController";
import { IUser } from "../types/interfaces";

export const UserRouterMessage = async (
    bot: TelegramBot,
    msg: Message,
    user: IUser
) => {
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
};

export const UsersRouterQuery = async (
    bot: TelegramBot,
    query: CallbackQuery
) => {
    if (query.data === "leftEnd") {
        bot.answerCallbackQuery({
            callback_query_id: query.id,
            text: "Siz eng bosh qismdasiz",
        });

        return;
    }

    if (query.data === "rightEnd") {
        bot.answerCallbackQuery({
            callback_query_id: query.id,
            text: "Siz eng oxirgi qismdasiz",
        });

        return;
    }

    if (query.data === "delete") {
        bot.deleteMessage(
            query.message?.chat.id || "",
            query.message?.message_id + ""
        );

        return;
    }

    if (query.data === "cancel") {
        UsersController.cancel(bot, query);
        return;
    }
};
