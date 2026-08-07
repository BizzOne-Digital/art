import { Schema, models, model } from "mongoose";

const ServiceSchema = new Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    description: { type: String, default: "" },
    image: { type: String, default: "" },
    icon: { type: String, default: "dumbbell" },
  },
  { timestamps: true }
);

export const ServiceModel = models.Service || model("Service", ServiceSchema);
