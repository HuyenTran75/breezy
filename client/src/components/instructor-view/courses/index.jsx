import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  courseCurriculumInitialFormData,
  courseLandingInitialFormData,
} from "@/config";
import { InstructorContext } from "@/context/instructor-context";
import { Delete, Edit } from "lucide-react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/api/axiosInstance";

function InstructorCourses({ listOfCourses }) {
  const navigate = useNavigate();
  const [courses, setCourses] = useState(listOfCourses || []); // Dùng state để quản lý courses
  const {
    setCurrentEditedCourseId,
    setCourseLandingFormData,
    setCourseCurriculumFormData,
  } = useContext(InstructorContext);

  async function handleDeleteCourse(courseId) {
    if (!window.confirm("Bạn có chắc chắn muốn xóa khóa học này không?")) {
      return;
    }

    try {
      const response = await axiosInstance.delete(`/instructor/course/delete/${courseId}`);
      if (response?.data?.success) {
        setCourses(courses.filter(course => course._id !== courseId));
      } else {
        alert("Xóa khóa học thất bại!");
      }
    } catch (error) {
      console.error("❌ Lỗi khi xóa khóa học:", error);
      alert("Đã xảy ra lỗi khi xóa khóa học.");
    }
  }

  return (
    <Card>
      <CardHeader className="flex justify-between flex-row items-center">
        <CardTitle className="text-3xl font-extrabold">Tất cả khóa học</CardTitle>
        <Button
          onClick={() => {
            setCurrentEditedCourseId(null);
            setCourseLandingFormData(courseLandingInitialFormData);
            setCourseCurriculumFormData(courseCurriculumInitialFormData);
            navigate("/instructor/create-new-course");
          }}
          className="p-6"
        >
          Tạo Khóa Học Mới
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Khóa học</TableHead>
                <TableHead>Số Lượng Học Viên</TableHead>
                <TableHead className="text-right">Tùy Chọn</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses && courses.length > 0
                ? courses.map((course) => (
                    <TableRow key={course._id}>
                      <TableCell className="font-medium">
                        {course?.title}
                      </TableCell>
                      <TableCell>{course?.students?.length}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          onClick={() => {
                            navigate(`/instructor/edit-course/${course?._id}`);
                          }}
                          variant="ghost"
                          size="sm"
                        >
                          <Edit className="h-6 w-6" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteCourse(course?._id)}
                        >
                          <Delete className="h-6 w-6" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                : <TableRow><TableCell colSpan="3" className="text-center">Chưa có khóa học nào</TableCell></TableRow>}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

export default InstructorCourses;
