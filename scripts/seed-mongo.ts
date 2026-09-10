import { connectDB, MONGODB_URI } from "../src/lib/mongodb";
import { seedData } from "../src/lib/seed";
import {
  FaqModel,
  GalleryModel,
  OrderModel,
  PageModel,
  PricingModel,
  ProductModel,
  ProgramModel,
  ServiceModel,
  SettingsModel,
} from "../src/lib/models";

async function seed() {
  console.log("Connecting to MongoDB...");
  console.log("URI:", MONGODB_URI);
  await connectDB();

  console.log("Clearing existing collections...");
  await Promise.all([
    PageModel.deleteMany({}),
    ProductModel.deleteMany({}),
    GalleryModel.deleteMany({}),
    FaqModel.deleteMany({}),
    PricingModel.deleteMany({}),
    ServiceModel.deleteMany({}),
    ProgramModel.deleteMany({}),
    OrderModel.deleteMany({}),
    SettingsModel.deleteMany({}),
  ]);

  console.log("Inserting seed data...");
  await SettingsModel.create({ key: "site", ...seedData.settings });
  await PageModel.insertMany(seedData.pages);
  await ProductModel.insertMany(seedData.products);
  await GalleryModel.insertMany(seedData.gallery);
  await FaqModel.insertMany(seedData.faqs);
  await PricingModel.insertMany(seedData.pricing);
  await ServiceModel.insertMany(seedData.services);
  await ProgramModel.insertMany(seedData.programs);
  if (seedData.orders.length) {
    await OrderModel.insertMany(seedData.orders);
  }

  const counts = {
    pages: await PageModel.countDocuments(),
    products: await ProductModel.countDocuments(),
    gallery: await GalleryModel.countDocuments(),
    faqs: await FaqModel.countDocuments(),
    pricing: await PricingModel.countDocuments(),
    services: await ServiceModel.countDocuments(),
    programs: await ProgramModel.countDocuments(),
    orders: await OrderModel.countDocuments(),
    settings: await SettingsModel.countDocuments(),
  };

  console.log("Seed complete:", counts);
  console.log("\nOpen MongoDB Compass and connect to:");
  console.log(MONGODB_URI);
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
