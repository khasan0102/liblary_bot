import { ILanguage } from "src/types/interfaces";

export default {
    languageBtns: (languages: ILanguage[], page: number, allCount: number) => {
        const first = [];
        const second = [];

        for (let i = 0; i < languages.length; i++) {
            if (i < 5) {
                first.push({
                    callback_data: `${languages[i].language_id}/languages/admin`,
                    text: `${+i + 1}`,
                });
            } else {
                second.push({
                    callback_data: `${languages[i].language_id}/languages/admin`,
                    text: `${+i + 1}`,
                });
            }
        }

        const leftData = page > 0 ? `${page - 1}/languageData/admin` : "leftEnd";
        const rightData =
            page < Math.ceil(allCount / 10) - 1
                ? `${page + 1}/languageData/admin`
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
    }
}