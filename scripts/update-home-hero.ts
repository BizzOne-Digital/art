import { connectDB } from "../src/lib/mongodb";
import { PageModel } from "../src/lib/models";
import { HOME_HERO_IMAGE } from "../src/lib/site-assets";

async function main() {
  await connectDB();
  const page = await PageModel.findOne({ slug: "home" });
  if (!page) {
    console.error("Home page not found");
    process.exit(1);
  }
  const hero = page.sections.find((s) => s.key === "hero");
  if (!hero) {
    console.error("Hero section not found");
    process.exit(1);
  }
  hero.image = HOME_HERO_IMAGE;
  page.markModified("sections");
  await page.save();
  console.log("Home hero image updated to", HOME_HERO_IMAGE);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
