const cloudinary = require("cloudinary").v2;

//configure with env data
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadMediaToCloudinary(filePath) {
  console.log("🔥 Bắt đầu upload file:", filePath);
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "course_files",
      resource_type: "auto",
    });
    console.log("✅ Upload Cloudinary thành công:", result.secure_url);
    return result;
  } catch (error) {
    console.error("❌ Upload Cloudinary lỗi:", error);
    throw error;
  }
}


const deleteMediaFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "auto", // để tự nhận là ảnh, video, pdf, v.v
    });

    console.log("🗑️ Xóa file Cloudinary:", result);

    if (result.result === "ok" || result.result === "not found") {
      return true; // Xóa thành công hoặc không tìm thấy (coi như đã xóa)
    } else {
      throw new Error("Failed to delete asset from Cloudinary");
    }
  } catch (error) {
    console.error("❌ Lỗi khi xóa Cloudinary:", error);
    throw new Error(error.message || "Failed to delete asset from Cloudinary");
  }
};


module.exports = { uploadMediaToCloudinary, deleteMediaFromCloudinary };
