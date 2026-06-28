import dotenv from "dotenv";
import mysql from "mysql2";

dotenv.config();

// Production aur Live deployment ke liye createPool sabse best hai
const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "foodiehub",
  waitForConnections: true,
  connectionLimit: 10,      // Ek baar me max 10 active connections allow karega
  queueLimit: 0,            // Koi limit nahi, requests queue me wait karengi crash hone ki jagah
  connectTimeout: 10000     // 10 seconds timeout limit
});

// Database Connection Check
db.getConnection((err, connection) => {
  if (err) {
    console.log("❌ Database Connection Failed!");
    console.log("Error Details:", err.message);
  } else {
    console.log("✅ MySQL Connected Successfully via Pool!");
    connection.release(); // Connection check karne ke baad use wapas free kar do
  }
});

export default db;