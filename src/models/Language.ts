import { fetch, fetchAll } from "src/lib/postgres";
import { ILanguage } from "src/types/interfaces";

const LANGUAGES = `
    SELECT 
        *
    FROM languages l
    ORDER BY l.created_at
`;

const LANGUAGE = `
    SELECT *
    FROM languages l
    WHERE l.language_id = $1
`;

const CREATE = `
    INSERT INTO languages (language)
    VALUES($1)
    RETURNING *
`;

const UPDATE_ONE = `
    UPDATE languages 
        SET language = $2
    WHERE language_id = $1
    RETURNING *
`;

const DELETE = `
    DELETE FROM languages
    WHERE language = $1
    RETURNING *
`;

const getAll = (): Promise<ILanguage[]> => fetchAll(LANGUAGES);

const create = (language: string): Promise<ILanguage> =>
    fetch(CREATE, language);

const getOne = (languageId: number): Promise<ILanguage | undefined> =>
    fetch(LANGUAGE, languageId);

const updateOne = (
    lanaguageId: number,
    language: string
): Promise<ILanguage | undefined> => fetch(UPDATE_ONE, lanaguageId, language);

const deleteOne = (languageId: number): Promise<ILanguage | undefined> =>
    fetch(DELETE, languageId);

export default {
    getAll,
    getOne,
    create,
    updateOne,
    deleteOne,
};