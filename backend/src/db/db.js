import pg from "pg";

const db = new pg.Pool({
  user: "postgres",
  host: "localhost",
  database: "expense_tracker",
  password: "1234",
  port: 5432,
});

export default db;