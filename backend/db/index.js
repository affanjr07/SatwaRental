import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  host: process.env.PG_HOST,
  user: process.env.PG_USER,
  password: process.env.PG_PASS,
  database: process.env.PG_DB,
  port: process.env.PG_PORT,
});

pool.connect()
  .then(() => console.log("PostgreSQL Connected"))
  .catch(err => console.log("DB Error:", err));

export default pool;
