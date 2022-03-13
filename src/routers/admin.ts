import TelegramBot, { Message, CallbackQuery } from "node-telegram-bot-api";
import AdminController from "../controllers/adminController";

export const AdminRouterMessage = async (bot: TelegramBot, msg: Message) => {
    switch (msg.text) {
        case "/users":
            AdminController.allUsers(bot, msg);
            break;
    }
};

export const AdminRouterQuery = (
    bot: TelegramBot,
    query: CallbackQuery
): void => {
    query.data = query.data?.slice(0, -6);

    if (query.data?.search("/usersData") !== -1) {
        AdminController.userPagination(
            bot,
            query,
            Number(query.data?.slice(0, -10))
        );
        return;
    }

    if (query.data?.search("/users") !== -1) {
        AdminController.user(bot, query, Number(query.data.slice(0, -6)));
        return;
    }
};
