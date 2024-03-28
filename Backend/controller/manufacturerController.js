import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAllManufacturers = async (req, res) => {
  try {
    const manufacturers = await prisma.manufacturer.findMany();
    res.json(manufacturers);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};