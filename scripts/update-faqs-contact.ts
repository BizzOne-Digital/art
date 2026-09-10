import { connectDB } from "../src/lib/mongodb";
import { FaqModel, PageModel } from "../src/lib/models";

async function main() {
  await connectDB();

  const deleted = await FaqModel.deleteMany({
    $or: [
      { id: { $in: ["faq-2", "faq-5"] } },
      { question: /training sessions scheduled/i },
      { question: /train online or hybrid/i },
      { question: /how do training programs work/i },
    ],
  });
  console.log("FAQs deleted:", deleted.deletedCount);

  // Reorder remaining
  const remaining = await FaqModel.find().sort({ order: 1 });
  for (let i = 0; i < remaining.length; i++) {
    remaining[i].order = i + 1;
    await remaining[i].save();
  }
  console.log(
    "Remaining FAQs:",
    remaining.map((f) => f.question).join(" | ")
  );

  const page = await PageModel.findOne({ slug: "contact" });
  if (page) {
    const hero = page.sections.find((s) => s.key === "hero");
    if (hero) {
      hero.body =
        "Have questions about Elite Body Fitness Pros apps, packages, or shop products? Reach out — we respond fast.";
      page.markModified("sections");
      await page.save();
      console.log("Contact hero updated");
    }
  }

  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
