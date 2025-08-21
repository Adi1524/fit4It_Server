import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, unique: true },
    password: { type: String, required: true },
    gender: { type: String, enum: ["male", "female"], default: "male" },
    age: { type: Number },
    height: { type: Number },
    weight: { type: Number },
    mealPreference: { type: String, enum: ["veg", "nonveg"], default: "veg" },
    activityLevel: {
      type: String,
      enum: [
        "sedentary",
        "lightly_active",
        "moderately_active",
        "very_active",
        "extra_active",
      ],
      default: "sedentary",
    },
    workoutExperience: { type: String, enum: ["beginner", "intermediate"] },
    walking: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
