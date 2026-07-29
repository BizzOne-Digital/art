import { connectDB } from "../src/lib/mongodb";
import { PricingModel } from "../src/lib/models";

const pricing = [
  {
    id: "plan-1",
    name: "Starter Package",
    price: "$99",
    period: "",
    description:
      "Perfect for building consistent habits and foundational strength.",
    features: [
      "Beginners program",
      "Basic routine",
      "Form and functional exercises",
      "Start of journey!",
    ],
    highlighted: false,
  },
  {
    id: "plan-2",
    name: "Elite Package",
    price: "$199",
    period: "",
    description: "Our most popular package for serious transformation.",
    features: [
      "Full training workouts",
      "Intermediate clients who need structured programs",
      "Goal specific training system",
      "Form design program for max results",
    ],
    highlighted: true,
  },
  {
    id: "plan-3",
    name: "Platinum Package",
    price: "$299",
    period: "",
    description:
      "Maximum coaching intensity for athletes and high performers.",
    features: [
      "Full workout programs for advanced results",
      "Meal guidance",
      "Zoom accountability calls",
      "Weekly coach access",
      "Free workout t-shirt for motivation",
    ],
    highlighted: false,
  },
];

async function main() {
  await connectDB();
  await PricingModel.deleteMany({});
  await PricingModel.insertMany(pricing);
  console.log(
    "Pricing updated:",
    pricing.map((p) => `${p.name} ${p.price}`).join(" | ")
  );
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
