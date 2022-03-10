import { fetch, fetchAll } from "../lib/postgres";
import IUser from "../interfaces/users";
import { typeN, typeS } from "../interfaces/types";

const GET_ALL = `
    SELECT 
        u.chat_id,
        u.username,
        u.phone_number,
        u.step,
        u.created_at,
        CASE WHEN u.role = 1 THEN 'admin'
             ELSE 'user'
        END as role
    FROM users u
    WHERE u.role = 2
    ORDER BY u.created_at DESC
    OFFSET $1 ROWS FETCH FIRST $2 ROWS ONLY
`;

const GET_ONE = `
    SELECT u.chat_id,
        u.username,
        u.phone_number,
        u.step,
        u.created_at,
        CASE
            WHEN u.role = 1 THEN 'admin'
            ELSE 'user'
        END as role
    FROM users u
    WHERE u.chat_id = $1
`;

const ALL_COUNT = `
    SELECT COUNT(*)
    FROM users u
    WHERE u.role = 2
`;

const CREATE = `
    INSERT INTO users(chat_id)
    VALUES ($1)
    RETURNING *
`;

const UPDATE_ONE = `
    UPDATE users 
    SET 
        username = updateIfChanged($2, username),
        phone_number = updateIfChanged($3, phone_number),
        step = updateIfChanged($4, step),
        role = updateIfChanged($5, role)
    WHERE chat_id = $1
    RETURNING *
`;

const DELETE_ONE = `
    DELETE FROM users 
    WHERE chat_id = $1
`;

const allCount = async (): Promise<{ count: number }> => fetch(ALL_COUNT);

const create = async (chatId: number): Promise<IUser> => fetch(CREATE, chatId);

const getOne = async (chatId: number): Promise<IUser | undefined> =>
    fetch(GET_ONE, chatId);

const getAll = async (page: number = 0, count: number = 1000): Promise<IUser[]> =>
    fetchAll(GET_ALL, page, count);

const deleteOne = async (chatId: number): Promise<IUser | undefined> =>
    fetch(DELETE_ONE, chatId);

const updateOne = async (
    chatId: number,
    username: typeS,
    phone_number: typeS,
    step: typeN,
    role?: typeN
): Promise<IUser | undefined> =>
    fetch(UPDATE_ONE, chatId, username, phone_number, step, role);

export default {
    getAll,
    getOne,
    create,
    allCount,
    updateOne,
    deleteOne,
};
