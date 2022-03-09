import { Pool } from "pg";
import Config from "../config";

const pool = new Pool({
    connectionString: Config.PG_CONNECTION,
});

export const fetch = async (query: string, ...params: any): Promise<any> => {
    const client = await pool.connect();
    try {
        const {
            rows: [row],
        } = await client.query(query, params.length ? params : null);

        return row;
    } finally {
        client.release()
    }
};


export const fetchAll = async (query: string, ...params: any): Promise<any[]> => {
    const client = await pool.connect();
    try {
        const {
            rows
        } = await client.query(query, params.length ? params : null);

        return rows;
    } finally {
        client.release()
    }
}