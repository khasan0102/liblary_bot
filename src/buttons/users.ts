import IUser from "src/types/interfaces";

export default {
    phoneBtn: {
        one_time_keyboard: true,
        resize_keyboard: true,
        keyboard: [
            [
                {
                    text: "Send Phone",
                    request_contact: true,
                },
            ],
        ],
    },
    usersButtons: (users: IUser[], page: number, allCount: number) => {
        const first = [];
        const second = [];

        for (let i = 0; i < users.length; i++) {
            if (i < 5) {
                first.push({
                    callback_data: `${users[i].chat_id}/users`,
                    text: `${+i + 1}`,
                });
            } else {
                second.push({
                    callback_data: `${users[i].chat_id}/users`,
                    text: `${+i + 1}`,
                });
            }
        }

        const leftData = page > 0 ? `${page - 1}/data` : "leftEnd";
        const rightData =
            page < Math.ceil(allCount / 10) - 1
                ? `${page + 1}/data`
                : "rightEnd";

        return [
            first,
            second,
            [
                {
                    text: "⬅️",
                    callback_data: leftData,
                },
                {
                    text: "❌",
                    callback_data: "delete",
                },
                {
                    text: "➡️",
                    callback_data: rightData,
                },
            ],
        ];
    },
};
