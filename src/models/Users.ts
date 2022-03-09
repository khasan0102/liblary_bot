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

const getAll = async (): Promise<IUser[]> => fetchAll(GET_ALL);
const getOne = async (chatId: number): Promise<IUser | undefined> => fetch(GET_ONE, chatId);
const create = async (chatId: number): Promise<IUser> => fetch(CREATE, chatId);
const deleteOne = async (chatId: number): Promise<IUser | undefined> => fetch(DELETE_ONE, chatId);
const updateOne = async (
    chatId: number,
    username: typeS,
    phone_number: typeS,
    step: typeN,
    role?: typeN
): Promise<IUser | undefined> => fetch(UPDATE_ONE, chatId, username, phone_number, step, role);

export default {
    getAll,
    getOne,
    create,
    updateOne,
    deleteOne
};
