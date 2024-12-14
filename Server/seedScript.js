import "dotenv/config.js";
import mongoose from "mongoose";
import { Category, Product } from "./src/models/index.js";
import { categories, products } from "./seedData.js";

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // Clear existing data
    await Product.deleteMany({});
    await Category.deleteMany({});

    // Insert categories and create mapping
    const categoryDocs = await Category.insertMany(categories);

    const categoryMap = categoryDocs.reduce((map, category) => {
      map[category.name] = category._id;
      return map;
    }, {});

    // Map products with correct Category field name
    const productsWithCategoryIds = products.map((product) => ({
      ...product,
      Category: categoryMap[product.category], // Changed from lowercase to uppercase
      category: undefined, // Remove the lowercase field if it exists
    }));

    // Insert products with correct Category field
    await Product.insertMany(productsWithCategoryIds);

    console.log("Database seeded successfully✅");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await mongoose.connection.close();
  }
}

seedDatabase();
