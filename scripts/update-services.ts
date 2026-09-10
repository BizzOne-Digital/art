import { connectDB } from "../src/lib/mongodb";
import { ServiceModel } from "../src/lib/models";

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

async function main() {
  await connectDB();
  for (const service of services) {
    await ServiceModel.findOneAndUpdate(
      { id: service.id },
      { $set: service },
      { upsert: true }
    );
  }
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
