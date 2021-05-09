import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT ?? 9000;
export const MONGO_DB_URL: string = process.env.MONGO_DB_URL ?? "";

export const ACCES_TOKEN: string = process.env.ACCES_TOKEN ?? ""
export const REFRESH_TOKEN: string = process.env.REFRESH_TOKEN ?? ""