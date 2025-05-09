const Course = require("../../models/Course");
const StudentCourses = require("../../models/StudentCourses");

const getAllStudentViewCourses = async (req, res) => {
  try {
    const {
      danhMuc = [], // Default to empty array
      capDo = [], // Default to empty array
      sortBy = "title-atoz", // Default sort
    } = req.query;

    console.log("Request Query Params:", req.query);

    let filters = {};
    
    // Nếu category và level có giá trị, thêm vào filters
    if (danhMuc.length > 0) {
      filters.danhMuc = { $in: danhMuc }; // Không cần split nếu category là mảng
    }
    if (capDo.length > 0) {
      filters.capDo = { $in: capDo }; // Tương tự với level
    }

    // Xử lý sắp xếp theo sortBy, bỏ giá
    const sortOptions = {
      "title-atoz": { title: 1 },
      "title-ztoa": { title: -1 },
    };

    // Sử dụng sortOptions để chọn tham số sắp xếp
    const sortParam = sortOptions[sortBy] || { title: 1 }; // Mặc định là sắp xếp theo title

    // Lấy danh sách khóa học với các filter và sort
    const coursesList = await Course.find(filters).sort(sortParam);

    // Trả về kết quả
    res.status(200).json({
      success: true,
      data: coursesList,
    });
  } catch (e) {
    console.error("Error fetching courses:", e); // Cải thiện log lỗi
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
      error: e.message, // Thêm thông tin lỗi
    });
  }
};


const getStudentViewCourseDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const courseDetails = await Course.findById(id);

    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "No course details found",
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      data: courseDetails,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const checkCoursePurchaseInfo = async (req, res) => {
  try {
    const { id, studentId } = req.params;
    const studentCourses = await StudentCourses.findOne({
      userId: studentId,
    });
    console.log('Received studentId:', studentId);


    if (!studentCourses) {
      return res.status(200).json({
        success: true,
        data: false, // chưa mua
      });
    }
    

    const ifStudentAlreadyBoughtCurrentCourse =
      studentCourses.courses.findIndex((item) => item.courseId === id) > -1;

    res.status(200).json({
      success: true,
      data: ifStudentAlreadyBoughtCurrentCourse,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};
const confirmCoursePurchase = async (req, res) => {
  try {
    const { userId, courseId, courseTitle } = req.body;

    // Tìm khóa học của sinh viên
    const studentCourses = await StudentCourses.findOne({ userId });

    if (!studentCourses) {
      return res.status(404).json({
        success: false,
        message: "Student not found.",
      });
    }

    // Thêm khóa học vào danh sách khóa học của sinh viên
    studentCourses.courses.push({
      courseId,
      courseTitle,
      status: "active", // Hoặc trạng thái nào bạn muốn
    });

    // Lưu lại danh sách khóa học mới
    await studentCourses.save();

    res.status(200).json({
      success: true,
      message: "Course added to student's courses list.",
    });
  } catch (error) {
    console.error("Error confirming course purchase:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while confirming course purchase.",
      error: error.message,
    });
  }
};


module.exports = {
  getAllStudentViewCourses,
  getStudentViewCourseDetails,
  checkCoursePurchaseInfo,
  confirmCoursePurchase,
};
