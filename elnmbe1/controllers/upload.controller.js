import { CatchAsyncError } from "../middleware/catchAsyncErrors"
import cloudinary from "cloudinary"
import ErrorHandler from "../utils/ErrorHandler"
import fs from 'fs';
import path from 'path';

export const uploadVideoController = CatchAsyncError(async (req, res, next) => {
  try {
    // console.log("req.files", req.files);
    const file = req.files.file;

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ msg: "No files were uploaded." });
    }

    // Đường dẫn để lưu file
    const uploadDir = path.join(__dirname, '../uploads/videos/');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Tên file và đường dẫn lưu
    const filePath = path.join(uploadDir, `${Date.now()}_${file.name}`);

    // Di chuyển file từ temp sang thư mục upload
    file.mv(filePath, (err) => {
      if (err) {
        // console.error("Error while moving file:", err);
        return next(new ErrorHandler(err.message, 500));
      }

      // Response trả về URL file đã lưu
      const fileUrl = `https://${req.get('host')}/uploads/videos/${path.basename(filePath).replaceAll(" ", "%20")}`;
      // console.log("url", fileUrl);

      return res.status(200).json({ url: fileUrl });
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});