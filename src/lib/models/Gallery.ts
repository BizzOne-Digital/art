import { Schema, models, model } from "mongoose";

const GallerySchema = new Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    category: { type: String, default: "Training" },
    image: { type: String, default: "" },
  },
  { timestamps: true }
);

export const GalleryModel = models.Gallery || model("Gallery", GallerySchema);
