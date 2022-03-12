import TelegramBot, { Message, CallbackQuery } from "node-telegram-bot-api";
import AdminController from "../controllers/adminController";

export const AdminRouterMessage = async (bot: TelegramBot, msg: Message) => {
    switch(msg.text){
        case "/users":
            AdminController.allUsers(bot, msg);
            break;
    }
}


export const AdminRouterQuery = (bot: TelegramBot, query: CallbackQuery): any => {
    console.log(bot.addListener, query.id);
}