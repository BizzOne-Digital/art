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
    name: "Accessories",
    description:
      "Fitness accessories and essentials available through our online shop.",
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1579722820308-d74e57ce3e79?w=800&q=80",
    featured: true,
    active: true,
    externalUrl: "http://www.powerfulteees.etsy.com/",
    ctaLabel: "Visit Shop",
  },
  {
    id: "prod-3",
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
];

async function main() {
  await connectDB();
  await ProductModel.deleteMany({});
  await ProductModel.insertMany(products);
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
