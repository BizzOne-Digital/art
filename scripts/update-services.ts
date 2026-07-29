import { connectDB } from "../src/lib/mongodb";
import { ServiceModel } from "../src/lib/models";

const services = [
  {
    id: "svc-1",
    title: "Scientifically Designed Program Structure",
    description:
      "Placeholder package — replace with the client's final package details.",
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=900&q=80",
    icon: "layers",
  },
  {
    id: "svc-2",
    title: "Strength Programming",
    description:
      "Placeholder package — replace with the client's final package details.",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=900&q=80",
    icon: "zap",
  },
  {
    id: "svc-3",
    title: "Nutritional Guidance",
    description:
      "Placeholder package — replace with the client's final package details.",
    image:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=900&q=80",
    icon: "apple",
  },
];

async function main() {
  await connectDB();
  await ServiceModel.deleteMany({});
  await ServiceModel.insertMany(services);
  console.log(
    "Services updated:",
    services.map((s) => s.title).join(", ")
  );
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
