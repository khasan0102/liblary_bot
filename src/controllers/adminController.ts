import TelegramBot, { Message } from "node-telegram-bot-api";
import usersBtn from "../buttons/users";
import Users from "../models/Users";

const allUsers = async (bot: TelegramBot, msg: Message) => {
    try {
        const chatId = msg.chat.id;
        const users = await Users.getAll();
        const { count } = await Users.allCount();

        let responseText = `<b>Natijalar 1-${users.length} ${count}taning ichidan</b>\n\n`;

        for (let i = 0; i < users.length; i++) {
            responseText += `<b>${i + 1}</b>.${users[i].username} - ${
                users[i].phone_number
            }\n`;
        };

        bot.sendMessage(chatId, responseText, {
            parse_mode: "HTML",
            reply_markup: {
                resize_keyboard: true,
                inline_keyboard: usersBtn.usersButtons(users, 0, count)
            }
        });
        
    } catch(err) {
        console.log(err);
    }
};



export default {
    allUsers
}