import { Schema, models, model } from "mongoose";

const SettingsSchema = new Schema(
  {
    key: { type: String, required: true, unique: true, default: "site" },
    siteName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    headline: { type: String, required: true },
    tagline: { type: String, required: true },
    disclaimer: { type: String, default: "" },
    heroExternalUrl: { type: String, default: "" },
    heroExternalLabel: { type: String, default: "" },
    musicUrl: { type: String, default: "" },
    videoUrl: { type: String, default: "" },
  },
  { timestamps: true }
);

export const SettingsModel =
  models.Settings || model("Settings", SettingsSchema);
