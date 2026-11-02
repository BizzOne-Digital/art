import { connectDB } from "../src/lib/mongodb";
import { PageModel } from "../src/lib/models";

const missionBody =
  "We believe fitness should fit your life — not the other way around. That's why we built Elite Body Fitness Pros, a choice of fitness apps designed to meet you wherever you are, whether that's a packed gym, a quiet living room, or the middle of a busy travel schedule.\n\nWe're not here to sell you a one-size-fits-all program. We're here to give you tools that adapt — smart tracking, personalized plans, and real support — so consistency feels achievable, not exhausting. So you can “Unleash the strongest version of you”.";

async function main() {
  await connectDB();
  const page = await PageModel.findOne({ slug: "about" });
  if (!page) {
    console.error("About page not found");
    process.exit(1);
  }

  const mission = page.sections.find((s) => s.key === "mission");
  if (!mission) {
    console.error("Mission section not found");
    process.exit(1);
  }

  mission.title = "Our Mission";
  mission.subtitle = "Mission Statement";
  mission.body = missionBody;
  if (!mission.image) {
    mission.image =
      "https://images.unsplash.com/photo-1599058945522-28d584b6f14f?w=1200&q=80";
  }

  const approach = page.sections.find((s) => s.key === "approach");
  if (approach && !approach.image) {
    approach.image =
      "https://images.unsplash.com/photo-1574680096145-d05b974e3047?w=1200&q=80";
  }

  const hero = page.sections.find((s) => s.key === "hero");
  if (hero && !hero.image) {
    hero.image =
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=1600&q=80";
  }
  page.markModified("sections");
  await page.save();

  console.log("About mission updated");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
