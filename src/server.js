import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import connectDB from "./config/db.js";
import User from "./models/User.js";
import authRoutes from "./routes/auth.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Session middleware
app.use(
  session({
    secret: process.env.AUTH_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let existingUser = await User.findOne({
          email: profile.emails[0].value,
        });

        if (existingUser) {
          return done(null, existingUser);
        }

        let newUser = new User({
          email: profile.emails[0].value,
          name: profile.displayName,
        });
        await newUser.save();
        return done(null, newUser);
      } catch (error) {
        return done(err, null);
      }
    }
  )
);

app.post("/api/complete-profile", async (req, res) => {
  const { age, vegMeals } = req.body;
  const userId = req.user._id;

  await User.findByIdAndUpdate(userId, {
    age,
    vegMeals,
  });

  res.json({ success: true, message: "Profile completed" });
});

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

app.get("/", (req, res) => res.send("Home Page"));

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    if (req.user.age) {
      res.redirect("/profile");
    } else {
      res.redirect("/complete-profile");
    }
  }
);

app.get("/profile", (req, res) => {
  res.send("You are logged in with Google!");
});

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
