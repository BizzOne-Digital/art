import { Schema, models, model } from "mongoose";

const OrderSchema = new Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    type: {
      type: String,
      enum: ["product_inquiry", "booking", "contact"],
      default: "contact",
    },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: "" },
    message: { type: String, default: "" },
    productId: { type: String },
    productName: { type: String },
    service: { type: String },
    preferredDate: { type: String },
    status: {
      type: String,
      enum: ["new", "reviewed", "closed"],
      default: "new",
    },
    createdAt: { type: String, required: true },
  },
  { timestamps: true }
);

export const OrderModel = models.Order || model("Order", OrderSchema);
