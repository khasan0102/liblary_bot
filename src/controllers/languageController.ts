import TelegramBot, { Message } from "node-telegram-bot-api";
import Users from "../models/Users";
import Languages from "../models/Language";
import { allCount } from "../lib/postgres";
import langBtns from "../buttons/language";

const createLanguage = async (bot: TelegramBot, msg: Message) => {
    try {
        if (!msg.text || /[0-9]/.test(msg.text)) {
            bot.sendMessage(
                msg.chat.id,
                `Iltimos Til nomini to'g'ri kiriting;)`
            );
            return;
        }

        await Languages.create(msg.text);
        await Users.updateOne(msg.chat.id, null, null, 0);

        bot.sendMessage(msg.chat.id, `Til muvofaqiyatli qo'shildi :)`);
    } catch (error) {
        console.log(error);
    }
};

const languages = async (bot: TelegramBot, msg: Message) => {
    try {
        const { count } = await allCount("languages");

        const langs = await Languages.getAll(0, 10);

        if(langs.length < 1){
            bot.sendMessage(msg.chat.id, `Tillar mavjud emas. Iltimos til qo'shing!`)
            return;
        }

        let responseText = `Barcha tillar.\n`;

        for (let i = 0; i < langs.length; i++) {
            responseText += `<b>${i + 1}. ${langs[i].language}\n</b>`;
        }

        bot.sendMessage(msg.chat.id, responseText, {
            parse_mode: "HTML",
            reply_markup: {
                inline_keyboard: langBtns.languageBtns(langs, 0, count),
            },
        });
    } catch (error) {
        console.log(error);
    }
};

export default {
    createLanguage,
    languages,
};
