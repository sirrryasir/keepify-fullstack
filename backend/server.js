import express from "express"
import cors from "cors";
import dotenv from "dotenv"
dotenv.config();

import authRoutes from "./routes/authRoutes.js"

import connectDB from "./config/db.js";

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
// CORS is enabled here! (The solution for tonight's session)
app.use(cors());

app.use("/api", authRoutes);

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
