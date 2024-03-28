import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getAllPromotions = async (req, res) => {
  try {
    const promotions = await prisma.promotion.findMany();
    res.json(promotions);
    res.status.json({promotions:"Promotions found"})
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export { getAllPromotions };
