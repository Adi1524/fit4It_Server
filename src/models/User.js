import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, enum: ["male", "female"], default: "male" },
    goal: {
      type: String,
      enum: ["cutting", "maintenance", "bulking"],
      default: "maintenance",
    },
    dietType: { type: String, enum: ["veg", "non-veg"], default: "veg" },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
