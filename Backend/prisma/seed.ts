import { parse } from "csv-parse";
import { createReadStream } from "fs";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();
let rowNumber = 0; // Counter variable to keep track of the row number

db.$connect();

createReadStream("data.csv")
  .pipe(
    parse({})
  )
  .on("data", async (row) => {
    rowNumber++; // Increment the row number for each new row

    console.log("Row data:", row); // Log row data for debugging

    // Check if the row has the expected number of fields (13 fields)
    if (row.length !== 13) {
      console.error(`Invalid number of fields in row ${rowNumber}:`, row);
      return; // Skip processing this row
    }

    const {
      date,
      retailer,
      ean,
      category,
      manufacturer,
      brand,
      product_title,
      image,
      on_promotion,
      promotion_description,
      base_price,
      shelf_price,
      promoted_price,
    } = row;

    try {
      const { id: categoryId } = await db.category.upsert({
        create: {
          name: category,
        },
        where: {
          name: category,
        },
        update: {
          name: category,
        },
      });

      const { id: manufacturerId } = await db.manufacturer.upsert({
        create: {
          name: manufacturer,
        },
        where: {
          name: manufacturer,
        },
        update: {
          name: manufacturer,
        },
      });

      const { id: retailerId } = await db.retailer.upsert({
        create: {
          name: retailer,
        },
        where: {
          name: retailer,
        },
        update: {
          name: retailer,
        },
      });

      const { id: productId } = await db.product.upsert({
        create: {
          ean,
          brand,
          productTitle
          image,
          manufacturerId,
          categoryId,
        },
        where: {
          ean,
        },
        update: {
          ean,
          brand,
          productTitle: product_title,
          image,
          manufacturerId,
          categoryId,
        },
      });

      const isOnPromotion = on_promotion.toUpperCase() === "TRUE";

      if (isOnPromotion) {
        const { id: promotionId } = await db.promotion.upsert({
          create: {
            description: promotion_description,
          },
          where: {
            description: promotion_description,
          },
          update: {
            description: promotion_description,
          },
        });

        await db.price.create({
          data: {
            date: new Date(date),
            basePrice: parseFloat(base_price),
            shelfPrice: parseFloat(shelf_price),
            promotedPrice: parseFloat(promoted_price),
            retailerId,
            productId,
            onPromotion: isOnPromotion,
            promotionId,
          },
        });
      } else {
        await db.price.create({
          data: {
            date: new Date(date),
            basePrice: parseFloat(base_price),
            shelfPrice: parseFloat(shelf_price),
            promotedPrice: parseFloat(promoted_price),
            retailerId,
            productId,
            onPromotion: isOnPromotion,
          },
        });
      }
    } catch (error) {
      console.error(`Error processing row ${rowNumber}:`, row);
      console.error(error);
    }
  })
  .on("end", () => {
    console.log("CSV file successfully processed");
  })
  .on("finish", () => {
    console.log("Database successfully processed");
    db.$disconnect();
  });
