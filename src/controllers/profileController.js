import User from "../models/User.js";

export const profileSetup = async (req, res) => {
  try {
    const userId = req.user._id;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        ...req.body,
      },
      { new: true }
    );

    res.status(200).json({ message: "Profile updated", user: updatedUser });
  } catch (error) {
    res.json({ message: error.message });
  }
};
