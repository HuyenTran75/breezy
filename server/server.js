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

// Lấy PORT từ biến môi trường hoặc dùng mặc định 5000
const PORT = process.env.PORT || 10000;
const MONGO_URI = process.env.MONGO_URI;
const DEPLOYED_FRONTEND_URL = process.env.FRONTEND_URL;

if (!MONGO_URI) {
  console.error("FATAL ERROR: MONGO_URI is not defined in environment variables.");
  process.exit(1); // Thoát nếu không có URI để tránh lỗi không rõ ràng
}
console.log("Attempting to connect to MongoDB with URI:", MONGO_URI ? 'URI_IS_SET' : 'URI_IS_UNDEFINED'); // Log để kiểm tra trên Render

// Cấu hình CORS
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "https://breezy-ac6zc1lo1-trans-projects-d9e5e158.vercel.app",
  "https://breezy-eta.vercel.app",
  "https://breezy-mbmqrsyzd-trans-projects-d9e5e158.vercel.app",
  "https://breezy-bv275qjdp-trans-projects-d9e5e158.vercel.app"
];

if (DEPLOYED_FRONTEND_URL && !allowedOrigins.includes(DEPLOYED_FRONTEND_URL)) {
  allowedOrigins.push(DEPLOYED_FRONTEND_URL);
}

console.log("Allowed CORS Origins for this deployment:", allowedOrigins);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.warn(`CORS: Origin ${origin} was blocked.`);
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Origin", 
        "X-Requested-With",
        "Accept"
        // Thêm bất kỳ header nào khác mà bạn thấy trong Access-Control-Request-Headers
    ],
  })
);



app.use(express.json());

// Kết nối tới MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB is connected"))
  .catch((e) => console.log(e));

app.get('/', (req, res) => {
  res.send('<h1>Breezy Backend API is running!</h1>');
});

// Cấu hình các route
app.use("/auth", authRoutes);
app.use("/media", mediaRoutes);
app.use("/instructor/course", instructorCourseRoutes);
app.use("/student/course", studentViewCourseRoutes);
app.use("/student/order", studentViewOrderRoutes);
app.use("/student/courses-bought", studentCoursesRoutes);
// app.use("/student/course-progress", studentCourseProgressRoutes);

// Xử lý lỗi
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong",
  });
});

// Lắng nghe kết nối tại cổng PORT
app.listen(PORT, () => {
  console.log(`Server is now running on port ${PORT}`);
});
