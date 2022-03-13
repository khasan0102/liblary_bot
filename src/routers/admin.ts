import TelegramBot, { Message, CallbackQuery } from "node-telegram-bot-api";
import { IUser } from "src/types/interfaces";
import AdminController from "../controllers/adminController";
import LanguageController from "../controllers/languageController";

export const AdminRouterMessage = async (
    bot: TelegramBot,
    msg: Message,
    user: IUser
) => {
    if (user.step === 0) {
        switch (msg.text) {
            case "/users":
                AdminController.allUsers(bot, msg);
                break;
            case "/newLanguage":
                AdminController.adminStep(
                    bot,
                    msg,
                    1,
                    "<b>Itimos til nomini kiriting!</b>"
                );
                break;
            case "/languages":
                LanguageController.languages(bot, msg);
                break;
        }
    } else {
        switch(user.step) {
            case 1: 
                LanguageController.createLanguage(bot, msg);
                break;
        }
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
