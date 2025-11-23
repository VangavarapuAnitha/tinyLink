import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

//Connection pool
// export const pool = new Pool({
//   host: process.env.DATABASE_HOST,
//   port: Number(process.env.DATABASE_PORT),
//   user: process.env.DATABASE_USER,
//   password: process.env.DATABASE_PASSWORD,
//   database: process.env.DATABASE_NAME,
// });

export const pool = new Pool({
  connectionString: process.env.PG_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});
