import { Schema, models, model } from "mongoose";

const FaqSchema = new Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    question: { type: String, required: true },
    answer: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const FaqModel = models.Faq || model("Faq", FaqSchema);
