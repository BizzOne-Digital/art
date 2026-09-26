import { connectDB } from "../src/lib/mongodb";
import { SettingsModel } from "../src/lib/models";

async function main() {
  await connectDB();
  await SettingsModel.findOneAndUpdate(
    { key: "site" },
    {
      $set: {
        disclaimer:
          "Consult your physician before beginning this or any exercise program. This information is not intended as a substitute for medical advice. Use of information provided on this site is solely at your own risk.",
        heroExternalUrl: "http://www.powerfulteees.etsy.com/",
        heroExternalLabel: "Visit Our Shop",
      },
    },
    { upsert: true }
  );
  console.log("Settings updated");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
