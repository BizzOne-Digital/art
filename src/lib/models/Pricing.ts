import { Schema, models, model } from "mongoose";

const PricingSchema = new Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    price: { type: String, required: true },
    period: { type: String, default: "/month" },
    description: { type: String, default: "" },
    features: { type: [String], default: [] },
    highlighted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const PricingModel =
  models.PricingPlan || model("PricingPlan", PricingSchema);
