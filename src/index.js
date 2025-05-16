const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const productRoutes = require("./routes/product.routes");
const orderRoutes = require("./routes/order.routes");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
dotenv.config();
connectDB();

const app = express();

app.use(express.json());

const allowedOrigins = [
  "http://localhost:3000",
  "https://change-network-frontend.vercel.app/",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));
// app.use(cors());

// Routes
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => res.send("API Running 🚀"));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server Rocking on port ${PORT}`));
