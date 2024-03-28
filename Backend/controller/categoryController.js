import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getAllCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.status(200).json({ categories: categories });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export { getAllCategories };
