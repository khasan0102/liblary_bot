import TelegramBot, { CallbackQuery, Message } from "node-telegram-bot-api";
import Users from "../models/Users";
import usersBtn from "../buttons/users";

const step1 = async (bot: TelegramBot, msg: Message) => {
    try {
        const chatId = msg.chat.id;
        const text = msg.text;

        if (!text || !/^[a-zA-Z\s]*$/.test(text) || text.length > 32) {
            bot.sendMessage(chatId, `Iltimos ismingizni to'g'ri kiriting`);
            return;
        }

        await Users.updateOne(chatId, text, null, 2);

        bot.sendMessage(
            chatId,
            `Barakalla ${text}! endi iltilos kontaktizni kiriting`,
            {
                reply_markup: usersBtn.phoneBtn,
            }
        );
    } catch (error) {
        console.log(error);
    }
};

const step2 = async (bot: TelegramBot, msg: Message) => {
    try {
        const chatId = msg.chat.id;
        const contact = msg.contact;

        if (!contact) {
            bot.sendMessage(
                chatId,
                `Iltimos contacktingizni kiriting. Bu siz bilan bog'lanishimiz uchun muhim`
            );
            return;
        }

        await Users.updateOne(chatId, null, contact.phone_number, 3);

        bot.sendMessage(
            chatId,
            `Readit botidan foydalanayotganiz uchun rahmat!\n\nAgarda botdan savol bo'lsa @abdukarimov_khasan ga murojat qiling`
        );
    } catch (error) {
        console.log(error);
    }
};

const cancel = async (bot: TelegramBot, query: CallbackQuery) => {
    try {
        const chatId = Number(query.message?.chat.id);
        await Users.updateOne(chatId, null, null, 0);

        bot.sendMessage(chatId, `Bekor qilindi 🙁`);
    } catch (error) {
        console.log(error);
    }
};

export default {
    step1,
    step2,
    cancel,
};
