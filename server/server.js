require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth-routes/index");
const mediaRoutes = require("./routes/instructor-routes/media-routes");
const instructorCourseRoutes = require("./routes/instructor-routes/course-routes");
const studentViewCourseRoutes = require("./routes/student-routes/course-routes");
const studentViewOrderRoutes = require("./routes/student-routes/order-routes");
const studentCoursesRoutes = require("./routes/student-routes/student-courses-routes");

const app = express();

const PORT = process.env.PORT || 10000;
const MONGO_URI = process.env.MONGO_URI;
const DEPLOYED_FRONTEND_URL = process.env.FRONTEND_URL;

if (!MONGO_URI) {
  console.error("FATAL ERROR: MONGO_URI is not defined in environment variables.");
  process.exit(1);
}

console.log("Attempting to connect to MongoDB with URI:", MONGO_URI ? 'URI_IS_SET' : 'URI_IS_UNDEFINED');

const vercelBase = "https://breezy";
const vercelProjectId = "trans-projects-d9e5e158.vercel.app";

// Danh sách gốc cố định
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "https://breezy-eta.vercel.app"
];

if (DEPLOYED_FRONTEND_URL && !allowedOrigins.includes(DEPLOYED_FRONTEND_URL)) {
  allowedOrigins.push(DEPLOYED_FRONTEND_URL);
}

const isAllowedVercelOrigin = (origin) => {
  return origin && origin.startsWith(vercelBase) && origin.endsWith(vercelProjectId);
};

app.use(
  cors({
    origin: function (origin, callback) {
      console.log("Incoming request origin:", origin);

      if (!origin || allowedOrigins.includes(origin) || isAllowedVercelOrigin(origin)) {
        callback(null, origin); // cho phép origin này
      } else {
        console.warn(`CORS BLOCKED: ${origin}`);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Origin",
      "X-Requested-With",
      "Accept"
    ],
  })
);

app.use(express.json());

// Kết nối tới MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB is connected"))
  .catch((e) => console.log(e));

// Route test
app.get('/', (req, res) => {
  res.send('<h1>Breezy Backend API is running!</h1>');
});

// Các route thực tế
app.use("/auth", authRoutes);
app.use("/media", mediaRoutes);
app.use("/instructor/course", instructorCourseRoutes);
app.use("/student/course", studentViewCourseRoutes);
app.use("/student/order", studentViewOrderRoutes);
app.use("/student/courses-bought", studentCoursesRoutes);

// Middleware xử lý lỗi
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong",
  });
});

// Lắng nghe server
app.listen(PORT, () => {
  console.log(`Server is now running on port ${PORT}`);
});
