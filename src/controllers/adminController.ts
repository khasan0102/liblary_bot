import TelegramBot, { CallbackQuery, Message } from "node-telegram-bot-api";
import usersBtn from "../buttons/users";
import Users from "../models/Users";

const allUsers = async (bot: TelegramBot, msg: Message) => {
    try {
        const chatId = msg.chat.id;
        const users = await Users.getAll(0, 10);
        const { count } = await Users.allCount();

        let responseText = users.length
            ? `<b>Natijalar 1-${users.length} ${count}taning ichidan</b>\n\n`
            : "Foydalanuvchilar mavjud emas";

        for (let i = 0; i < users.length; i++) {
            responseText += `<b>${i + 1}</b>.${users[i].username} - ${
                users[i].phone_number
            }\n`;
        }

        bot.sendMessage(chatId, responseText, {
            parse_mode: "HTML",
            reply_markup: {
                resize_keyboard: true,
                inline_keyboard: usersBtn.usersButtons(users, 0, count),
            },
        });
    } catch (err) {
        console.log(err);
    }
};

const userPagination = async (
    bot: TelegramBot,
    query: CallbackQuery,
    page: number
) => {
    try {
        const chatId = query.message?.chat.id;
        const messageId = query.message?.message_id;

        const { count } = await Users.allCount();

        const users = await Users.getAll(page * 10, 10);

        const start = page * 10;

        let responseText = `<b>Natijalar ${start + 1}-${
            start + users.length
        } ${count}taning ichidan</b>\n\n`;

        for (let i = 0; i < users.length; i++) {
            responseText += `<b>${i + 1}</b>.${users[i].username} - ${
                users[i].phone_number
            }\n`;
        }

        bot.editMessageText(responseText, {
            chat_id: chatId,
            message_id: messageId,
            parse_mode: "HTML",
            reply_markup: {
                inline_keyboard: usersBtn.usersButtons(users, page, count)
            }
        })
    } catch (error) {
        console.log(error)
    }
};


const user = async (bot: TelegramBot, query: CallbackQuery, userId: number): Promise<void> => {
    try {
        const user = await Users.getOne(userId);
        const chatId = query.message?.chat.id || "";

        if(!user) {
            bot.sendMessage(chatId, `Bunday user topilmadi!`);
            return;
        }
            
        
        const responseText = `<b>${user.username} - ${user.phone_number}</b>`;

        bot.sendMessage(chatId, responseText, {
            parse_mode: "HTML",
            reply_markup: {
                inline_keyboard: usersBtn.userButton(user)
            }
        })
    } catch(error) {
        console.log(error);
    }
}

export default {
    allUsers,
    userPagination,
    user
};
