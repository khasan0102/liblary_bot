import TelegramBot, { Message, CallbackQuery } from "node-telegram-bot-api";
import { UserRouterMessage, UsersRouterQuery } from "./routers/users";
import Config from "./config";
import Users from "./models/Users";
import { AdminRouterMessage, AdminRouterQuery } from "./routers/admin";

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
        UserRouterMessage(bot, msg, user);
    } else {
        AdminRouterMessage(bot, msg, user);
    }
});

bot.on("callback_query", (query: CallbackQuery) => {
    if (query.data?.search("/admin") !== -1) AdminRouterQuery(bot, query);
    else UsersRouterQuery(bot, query);
});