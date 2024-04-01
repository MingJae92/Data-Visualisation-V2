import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();
const PORT = 9000;

app.get("/brands", async (req, res) => {
  try {
    const brands = await prisma.brand.findMany();
    res.status(200).json({ brands: brands });
    console.log(brands)
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/manufacturers", async (req, res) => {
  try {
    const manufacturers = await prisma.manufacturer.findMany();
    res.status(200).json({ manufacturers: manufacturers });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/prices", async (req, res) => {
  try {
    const prices = await prisma.price.findMany();
    res.status(200).json({ price: prices });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/products", async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.status(200).json({ products: products });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/promotions", async (req, res) => {
  try {
    const promotions = await prisma.promotion.findMany();
    res.status(200).json({ promotions: promotions });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/retailers", async (req, res) => {
  try {
    const retailers = await prisma.retailer.findMany();
    res.status(200).json({ retailers: retailers });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/categories", async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.status(200).json({ categories: categories });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server now connected to port ${PORT}`);
});

// Close Prisma connection when application shuts down
process.on("SIGINT", async () => {
  await prisma.$disconnect();
  server.close();
});
