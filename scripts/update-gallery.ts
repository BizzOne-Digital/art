import { connectDB } from "../src/lib/mongodb";
import { GalleryModel } from "../src/lib/models";

const GALLERY_ITEMS = [
  {
    id: "gal-1",
    title: "Strength Session",
    category: "Training",
    image:
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=1000&q=80",
  },
  {
    id: "gal-2",
    title: "Cardio Burn",
    category: "Training",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1000&q=80",
  },
  {
    id: "gal-3",
    title: "Mobility Work",
    category: "Recovery",
    image:
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=1000&q=80",
  },
  {
    id: "gal-4",
    title: "Heavy Lift Focus",
    category: "Training",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1000&q=80",
  },
];

async function main() {
  await connectDB();

  await GalleryModel.deleteMany({ title: "Pull Day" });
  await GalleryModel.deleteMany({ id: "gal-5" });

  for (const item of GALLERY_ITEMS) {
    await GalleryModel.findOneAndUpdate(
      { id: item.id },
      { $set: item },
      { upsert: true }
    );
  }

  const remaining = await GalleryModel.find().lean();
  console.log(
    "Gallery updated:",
    remaining.map((i) => `${i.id} ${i.title}`).join(", ")
  );
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
