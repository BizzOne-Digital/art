import { Schema, models, model } from "mongoose";

const ProductSchema = new Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    description: { type: String, default: "" },
    category: { type: String, default: "General" },
    image: { type: String, default: "" },
    featured: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
    externalUrl: { type: String, default: "" },
    ctaLabel: { type: String, default: "" },
  },
  { timestamps: true }
);

export const ProductModel = models.Product || model("Product", ProductSchema);
