import "dotenv/config";
import { createPool } from "mysql2/promise";
//@ts-ignore
export const con = createPool(process.env.DATABASE_URL);
