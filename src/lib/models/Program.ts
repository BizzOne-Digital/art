import { Schema, models, model } from "mongoose";

const ProgramSchema = new Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    description: { type: String, default: "" },
    image: { type: String, default: "" },
    level: { type: String, default: "All Levels" },
  },
  { timestamps: true }
);

export const ProgramModel =
  models.TrainingProgram || model("TrainingProgram", ProgramSchema);
