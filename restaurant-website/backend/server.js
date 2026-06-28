import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import db from "./config/db.js";

// ROUTES
import authRoutes from "./routes/authRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import foodRoutes from "./routes/foodRoutes.js";
import productsRoutes from "./routes/products.js";
import paymentRoutes from "./routes/paymentRoutes.js";

dotenv.config();

const app = express();

/* =========================
   MIDDLEWARE & CORS
========================= */
// Live domain par CORS error na aaye, isliye methods aur credentials allow kiya hai
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.use(
  express.json({
    limit: "10mb",
  }),
);

app.use(
  express.urlencoded({
    extended: true,
  }),
);

/* =========================
   DATABASE CHECK
   (Note: Db connection pool is already handled in config/db.js)
========================= */

/* =========================
   ROUTES
========================= */
app.use("/api/auth", authRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/foods", foodRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/payment", paymentRoutes);

/* =========================
   TEST ROUTES
========================= */
app.get("/", (req, res) => {
  res.send("🚀 FoodieHub API Running");
});

app.get("/api", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API Working Successfully",
  });
});

/* =========================
   404 ROUTE
========================= */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

/* =========================
   SERVER
========================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server Running On Port ${PORT}`);
});
