import { connectDB } from "../src/lib/mongodb";
import { ProductModel } from "../src/lib/models";

const products = [
  {
    id: "prod-1",
    name: "Apparel",
    description:
      "Training tees, hoodies, and performance wear from our Powerfulteees shop.",
    category: "Apparel",
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80",
    featured: true,
    active: true,
    externalUrl: "http://www.powerfulteees.etsy.com/",
    ctaLabel: "Visit Shop",
  },
  {
    id: "prod-2",
    name: "Resistance Bands",
    description:
      "Professional-grade resistance bands for warm-ups, mobility, and strength work.",
    category: "Equipment",
    image:
      "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=800&q=80",
    featured: true,
    active: true,
    externalUrl: "",
    ctaLabel: "Coming Soon!",
  },
  {
    id: "prod-3",
    name: "Accessories",
    description:
      "Fitness accessories and essentials including gym water bottles.",
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80",
    featured: true,
    active: true,
    externalUrl: "http://www.powerfulteees.etsy.com/",
    ctaLabel: "Visit Shop",
  },
];

async function main() {
  await connectDB();
  for (const product of products) {
    await ProductModel.findOneAndUpdate(
      { id: product.id },
      { $set: product },
      { upsert: true }
    );
  }
  console.log(
    "Shop products updated:",
    products.map((p) => p.name).join(", ")
  );
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
