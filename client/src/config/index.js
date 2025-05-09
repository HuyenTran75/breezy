export const signUpFormControls = [
  {
    name: "userName",
    label: "Tên đăng nhập",
    type: "text",
    componentType: "input",
  },
  {
    name: "userEmail",
    label: "Email",
    type: "email",
    componentType: "input",
  },
  {
    name: "password",
    label: "Mật khẩu",
    type: "password",
    componentType: "input",
  },
];

export const signInFormControls = [
  {
    name: "userEmail",
    label: "Email",
    type: "email",
    componentType: "input",
  },
  {
    name: "password",
    label: "Mật khẩu",
    type: "password",
    componentType: "input",
  },
];

export const initialSignInFormData = {
  userEmail: "",
  password: "",
};

export const initialSignUpFormData = {
  userName: "",
  userEmail: "",
  password: "",
};



export const courseLevelOptions = [
  { id: "beginner", label: "Cơ bản" },
  { id: "intermediate", label: "Trung cấp" },
  { id: "advanced", label: "Nâng cao" },
];

export const courseCategories = [
  { id: "web-development", label: "Lập trình web" },
  { id: "backend-development", label: "Lập trình backend" },
  { id: "data-science", label: "Khoa học Dữ liệu" },
  { id: "machine-learning", label: "Học máy" },
  { id: "artificial-intelligence", label: "Trí tuệ nhân tạo" },
  { id: "cloud-computing", label: "Điện toán đám mây" },
  { id: "cyber-security", label: "An ninh mạng" },
  { id: "mobile-development", label: "Lập trình di động" },
  { id: "game-development", label: "Lập trình game" },
  { id: "software-engineering", label: "Kỹ thuật phần mềm" },
];

export const courseLandingPageFormControls = [
  {
    name: "title",
    label: "Tiêu đề",
    componentType: "input",
    type: "text",
  },
  {
    name: "danhMuc",
    label: "Danh mục",
    componentType: "select",
    type: "text",
    placeholder: "",
    options: courseCategories,
  },
  {
    name: "capDo",
    label: "Cấp độ",
    componentType: "select",
    type: "text",
    placeholder: "",
    options: courseLevelOptions,
  },
  
  {
    name: "subtitle",
    label: "Tiêu đề phụ",
    componentType: "input",
    type: "text",
  },
  {
    name: "description",
    label: "Mô tả",
    componentType: "textarea",
    type: "text",
  },
 
  {
    name: "objectives",
    label: "Mục tiêu",
    componentType: "textarea",
    type: "text",
  },
  {
    name: "welcomeMessage",
    label: "Giới thiệu khóa học",
    componentType: "textarea",
  },
];

export const courseLandingInitialFormData = {
  title: "",
danhMuc: "",
  capDo: "",
  subtitle: "",
  description: "",
  objectives: "",
  welcomeMessage: "",
  image: "",
};

export const courseCurriculumInitialFormData = [
  {
    title: "",
    videoUrl: "",
    freePreview: false,
    public_id: "",
  },
];

export const sortOptions = [
  { id: "title-atoz", label: "Tên: A tới Z" },
  { id: "title-ztoa", label: "Tên: Z tới A" },
];

export const filterOptions = {
  danhMuc: courseCategories,  // "Danh Mục"
  capDo: courseLevelOptions,   // "Cấp Độ"
};
