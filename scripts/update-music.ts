import { connectDB } from "../src/lib/mongodb";
import { SettingsModel } from "../src/lib/models";

async function main() {
  await connectDB();
  await SettingsModel.findOneAndUpdate(
    { key: "site" },
    {
      $set: {
        musicUrl: "https://open.spotify.com/track/2siqSsVoviIIkwb9D4A9wj",
      },
    },
    { upsert: true }
  );
  console.log("Music URL updated to Spotify track");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
