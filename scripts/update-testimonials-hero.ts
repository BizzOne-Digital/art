import { connectDB } from "../src/lib/mongodb";
import { PageModel } from "../src/lib/models";

async function main() {
  await connectDB();
  const page = await PageModel.findOne({ slug: "testimonials" });
  if (!page) {
    console.error("Testimonials page not found");
    process.exit(1);
  }
  const hero = page.sections.find((s) => s.key === "hero");
  if (!hero) {
    console.error("Hero section not found");
    process.exit(1);
  }
  hero.title = "Designed App Results";
  hero.subtitle = "Testimonials";
  hero.body =
    "Real stories from people using Elite Body Fitness Pros designed fitness apps — smarter tracking, personalized plans, and results that stick.";
  page.markModified("sections");
  await page.save();
  console.log("Testimonials hero updated");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
