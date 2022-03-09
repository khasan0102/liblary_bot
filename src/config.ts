import { config } from "dotenv";
import path from "path";

config({ path: path.join(__dirname, "..", ".env") });

export default {
    PG_CONNECTION: process.env.PG_CONNECTION || "",
    TOKEN: process.env.TOKEN || "",
}