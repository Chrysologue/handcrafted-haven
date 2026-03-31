import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export async function query(text: string, params?: any[]) {
  const start = Date.now();
  try {
    const result = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log("Executed query", { text, duration, rows: result.rowCount });
    return result;
  } catch (error) {
    console.error("Query error:", error);
    throw error;
  }
}

export async function checkUsers() {
  try {
    const result = await query("SELECT id, name, email FROM users");
    console.log("Users in database:", result.rows);
    return result.rows;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}

export default pool;
