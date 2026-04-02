import { Pool } from "pg";
import bcrypt from "bcryptjs";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // requerido por Neon
  },
});

async function setupUsers() {
  const client = await pool.connect();
  try {
    console.log("Starting database and user setup...");

    await client.query("BEGIN");

    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role VARCHAR(50) DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    const adminPassword = await bcrypt.hash(
      process.env.ADMIN_PASSWORD || "admin123",
      12
    );

    const adminResult = await client.query(
      `
      INSERT INTO users (username, email, password, role)
      VALUES ('admin', $1, $2, 'admin')
      ON CONFLICT (email) DO NOTHING
      RETURNING id;
      `,
      ["admin@test.com", adminPassword]
    );
    if (adminResult.rows[0]) console.log("Admin created with ID:", adminResult.rows[0].id);

    const userPassword = await bcrypt.hash(
      process.env.USER_PASSWORD || "user123",
      12
    );

    const userResult = await client.query(
      `
      INSERT INTO users (username, email, password, role)
      VALUES ('user', $1, $2, 'user')
      ON CONFLICT (email) DO NOTHING
      RETURNING id;
      `,
      ["user@test.com", userPassword]
    );
    if (userResult.rows[0]) console.log("User created with ID:", userResult.rows[0].id);

    // Revisar si reviews existe
    const reviewsCheck = await client.query(`SELECT to_regclass('public.reviews') AS exists;`);
    if (reviewsCheck.rows[0].exists) {
      await client.query(`
        ALTER TABLE reviews
        ADD COLUMN IF NOT EXISTS user_id INTEGER REFERENCES users(id) ON DELETE SET NULL;
      `);
      console.log("Reviews linked to users");
    }

    await client.query("COMMIT");
    console.log("Database setup completed successfully");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Error setting up database/users:", err);
  } finally {
    client.release();
    await pool.end();
  }
}

setupUsers();