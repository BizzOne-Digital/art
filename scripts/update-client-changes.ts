import { connectDB } from "../src/lib/mongodb";
import { ProductModel, ProgramModel, ServiceModel, PageModel } from "../src/lib/models";

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

const services = [
  {
    id: "svc-1",
    title: "Scientifically Designed Program Structure",
    description: "",
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=900&q=80",
    icon: "layers",
  },
  {
    id: "svc-2",
    title: "Strength Programming",
    description: "",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=900&q=80",
    icon: "zap",
  },
  {
    id: "svc-3",
    title: "Nutritional Guidance",
    description: "",
    image:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=900&q=80",
    icon: "apple",
  },
];

const programs = [
  {
    id: "prog-1",
    title: "Strength Foundations",
    description:
      "Perfect for building consistent habits and foundational strength.",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=900&q=80",
    level: "Beginner",
  },
  {
    id: "prog-2",
    title: "Athletic Performance",
    description: "Our most popular package for serious transformation.",
    image:
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=900&q=80",
    level: "Intermediate",
  },
  {
    id: "prog-3",
    title: "Elite Transformation",
    description:
      "Maximum coaching intensity for athletes and high performers.",
    image:
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=900&q=80",
    level: "Advanced",
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

  for (const service of services) {
    await ServiceModel.findOneAndUpdate(
      { id: service.id },
      { $set: service },
      { upsert: true }
    );
  }

  for (const program of programs) {
    await ProgramModel.findOneAndUpdate(
      { id: program.id },
      { $set: program },
      { upsert: true }
    );
  }

  await PageModel.findOneAndUpdate(
    { slug: "about" },
    {
      $set: {
        "sections.$[elem].title": "What We Stand For",
        "sections.$[elem].body":
          "We believe real transformation happens with our expert training instructional apps. That's why we combine proven training methods with a culture of self belief, ensuring no one on their fitness journey ever feels like they're doing it alone. Elite Body Fitness Pros is a movement toward becoming your strongest and most self confident.",
      },
    },
    { arrayFilters: [{ "elem.key": "approach" }] }
  );

  console.log("Products, packages, programs, and about page updated.");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
