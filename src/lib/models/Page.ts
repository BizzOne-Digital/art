import { Schema, models, model } from "mongoose";

const PageSectionSchema = new Schema(
  {
    id: { type: String, required: true },
    key: { type: String, required: true },
    title: { type: String, required: true, default: "" },
    subtitle: { type: String, default: "" },
    body: { type: String, default: "" },
    image: { type: String, default: "" },
    ctaText: { type: String, default: "" },
    ctaLink: { type: String, default: "" },
  },
  { _id: false }
);

const PageSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    sections: { type: [PageSectionSchema], default: [] },
  },
  { timestamps: true }
);

export const PageModel = models.Page || model("Page", PageSchema);
