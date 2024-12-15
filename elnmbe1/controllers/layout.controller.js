import ErrorHandler from "../utils/ErrorHandler"
import { CatchAsyncError } from "../middleware/catchAsyncErrors"
import LayoutModel from "../models/layout.model"
import cloudinary from "cloudinary"

// create layout
export const createLayout = CatchAsyncError(async (req, res, next) => {
  try {
    const { type } = req.body
    const isTypeExist = await LayoutModel.findOne({ type })
    if (isTypeExist) {
      return next(new ErrorHandler(`${type} already exist`, 400))
    }
    if (type === "Banner") {
      const { image, title, subTitle } = req.body
      const myCloud = await cloudinary.v2.uploader.upload(image, {
        folder: "layout"
      })
      const banner = {
        type: "Banner",
        banner: {
          image: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url
          },
          title,
          subTitle
        }
      }
      await LayoutModel.create(banner)
    }
    if (type === "FAQ") {
      const { faq } = req.body
      const faqItems = await Promise.all(
        faq.map(async item => {
          return {
            question: item.question,
            answer: item.answer
          }
        })
      )
      await LayoutModel.create({ type: "FAQ", faq: faqItems })
    }
    if (type === "Categories") {
      const { categories } = req.body
      const categoriesItems = await Promise.all(
        categories.map(async item => {
          return {
            title: item.title
          }
        })
      )
      await LayoutModel.create({
        type: "Categories",
        categories: categoriesItems
      })
    }

    res.status(200).json({
      success: true,
      message: "Layout created successfully"
    })
  } catch (error) {
    return next(new ErrorHandler(error.message, 500))
  }
})

// Edit layout
export const editLayout = CatchAsyncError(async (req, res, next) => {
  try {
    const { type } = req.body
    if (type === "Banner") {
      const bannerData = await LayoutModel.findOne({ type: "Banner" })

      const { image, title, subTitle } = req.body

      const data = image.startsWith("https")
        ? bannerData
        : await cloudinary.v2.uploader.upload(image, {
            folder: "layout"
          })

      const banner = {
        type: "Banner",
        image: {
          public_id: image.startsWith("https")
            ? bannerData.banner.image.public_id
            : data?.public_id,
          url: image.startsWith("https")
            ? bannerData.banner.image.url
            : data?.secure_url
        },
        title,
        subTitle
      }
      console.log(bannerData)
      await LayoutModel.findByIdAndUpdate(bannerData._id, { banner })
    }

    if (type === "FAQ") {
      const { faq } = req.body
      const FaqItem = await LayoutModel.findOne({ type: "FAQ" })
      const faqItems = await Promise.all(
        faq.map(async item => {
          return {
            question: item.question,
            answer: item.answer
          }
        })
      )
      await LayoutModel.findByIdAndUpdate(FaqItem?._id, {
        type: "FAQ",
        faq: faqItems
      })
    }
    if (type === "Categories") {
      const { categories } = req.body
      const categoriesData = await LayoutModel.findOne({
        type: "Categories"
      })
      const categoriesItems = await Promise.all(
        categories.map(async item => {
          return {
            title: item.title
          }
        })
      )
      await LayoutModel.findByIdAndUpdate(categoriesData?._id, {
        type: "Categories",
        categories: categoriesItems
      })
    }

    res.status(200).json({
      success: true,
      message: "Layout Updated successfully"
    })
  } catch (error) {
    return next(new ErrorHandler(error.message, 500))
  }
})

export const deleteLayout = CatchAsyncError(async (req, res, next) => {
  try {
    const { type, title } = req.params; // Lấy 'type' và 'title' từ params

    if (type === "Categories") {
      const categoriesData = await LayoutModel.findOne({
        type: "Categories",
      });

      if (!categoriesData) {
        return res.status(404).json({
          success: false,
          message: "Categories layout not found",
        });
      }

      // Tìm và xoá mục có title cụ thể khỏi danh mục
      const updatedCategories = categoriesData.categories.filter(
        (category) => category !== title // So sánh title để xoá
      );

      // Cập nhật lại dữ liệu với danh sách categories đã xoá mục
      await LayoutModel.findByIdAndUpdate(categoriesData._id, {
        $set: { categories: updatedCategories },
      });

      res.status(200).json({
        success: true,
        message: "Category deleted successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Invalid layout type",
      });
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// get layout by type
export const getLayoutByType = CatchAsyncError(async (req, res, next) => {
  try {
    const { type } = req.params
    const layout = await LayoutModel.findOne({ type })
    res.status(201).json({
      success: true,
      layout
    })
  } catch (error) {
    return next(new ErrorHandler(error.message, 500))
  }
})
