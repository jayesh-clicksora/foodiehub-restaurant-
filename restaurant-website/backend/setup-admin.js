import db from "./config/db.js";
import bcrypt from "bcryptjs";

console.log("Starting admin setup...");

// 1. पहले से मौजूद एडमिन को डिलीट करें
db.query("DELETE FROM admins WHERE email = ?", ["admin@example.com"], async (err1) => {
  if (err1 && err1.code !== "ER_BAD_TABLE_ERROR") {
    console.log("Warning during delete:", err1.message);
  }
  
  // 2. पासवर्ड हैश करें
  const password = "admin123";
  const hashedPassword = await bcrypt.hash(password, 10);
  
  console.log("Creating admin with hash...");
  
  // 3. नया एडमिन इन्सर्ट करें
  const sql = "INSERT INTO admins (name, email, password) VALUES (?, ?, ?)";
  db.query(sql, ["Admin", "admin@example.com", hashedPassword], (err2) => {
    if (err2) {
      console.log("❌ Error creating admin:", err2.message);
    } else {
      console.log("✅ Admin created successfully");
      console.log("📧 Email: admin@example.com");
      console.log("🔑 Password: admin123");
    }
    
  });
});