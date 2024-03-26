import express from "express"
import dotenv from "dotenv";
import path from "path";

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "..", "config", ".env") });

const app = express();
const PORT = process.env.SERVER_PORT || 5000;



try {
    app.listen((PORT), () => {
      console.log(`Server now connected to port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error.message);
  }
