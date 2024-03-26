import express from "express";

const app = express();
const PORT = 9000;

try {
  app.listen(PORT, () => {
    console.log(`Server now connected to port ${PORT}`);
  });
} catch (error) {
  console.error("Error starting the server:", error.message);
}
