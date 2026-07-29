import { connectDB } from "../src/lib/mongodb";
import { GalleryModel } from "../src/lib/models";

async function main() {
  await connectDB();
  const result = await GalleryModel.deleteMany({
    id: { $in: ["gal-3", "gal-6", "gal-8"] },
  });
  console.log("Deleted", result.deletedCount);

  // Re-id remaining items to match seed (optional cleanup of old ids)
  const remaining = await GalleryModel.find().lean();
  console.log(
    "Remaining:",
    remaining.map((i) => `${i.id} ${i.title}`).join(", ")
  );
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
