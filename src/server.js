import dotenv from "dotenv";
import connectDB from "./config/db";
import authRoutes from "./routes/auth.js";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
