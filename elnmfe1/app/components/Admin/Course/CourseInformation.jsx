import { styles } from "@/app/styles/style"
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi"
import React, { useEffect, useRef, useState } from "react"

//add
import axios from "axios"
import ReactPlayer from "react-player"

const CourseInformation = ({
  courseInfo,
  setCourseInfo,
  active,
  setActive,
  //start add
  file,
  setFile,
  isEdit
  //end add
}) => {
  const [dragging, setDragging] = useState(false)
  const { data } = useGetHeroDataQuery("Categories", {})
  const [categories, setCategories] = useState([])

  //start add
  // const [file, setFile] = useState<any>();
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef(null)
  const handleFileUploadChange = e => {
    setFile(e.target.files[0])
  }
  const handleUpload = async () => {
    try {
      setIsLoading(true)
      let formData = new FormData()
      formData.append("file", file)
      formData.append("title", courseInfo.name)
      const res = await axios.post(
        "http://localhost:8000/api/v1/upload",
        formData
      )
      return res.data
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }
  //end start

  useEffect(() => {
    if (data) {
      setCategories(data?.layout?.categories)
    }
  }, [data])

  const handleSubmit = async e => {
    e.preventDefault()
    //end add
    let dUrl
    const res = await handleUpload()
    if (res) {
      dUrl = res
    } else {
      dUrl = courseInfo?.demoUrl
    }
    setCourseInfo({ ...courseInfo, demoUrl: dUrl })
    //end add
    setActive(active + 1)
  }

  const handleFileChange = e => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()

      reader.onload = e => {
        if (reader.readyState === 2) {
          setCourseInfo({ ...courseInfo, thumbnail: reader.result })
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDragOver = e => {
    e.preventDefault()
    setDragging(true)
  }

  const handleDragLeave = e => {
    e.preventDefault()
    setDragging(false)
  }

  const handleDrop = e => {
    e.preventDefault()
    setDragging(false)

    const file = e.dataTransfer.files?.[0]

    if (file) {
      const reader = new FileReader()

      reader.onload = () => {
        setCourseInfo({ ...courseInfo, thumbnail: reader.result })
      }
      reader.readAsDataURL(file)
    }
  }

  //start add
  useEffect(() => {
    if (inputRef.current && file) {
      inputRef.current.defaultValue = file.name
    }
  }, [file])
  //end add

  return (
    <div className="w-[80%] m-auto mt-24">
      <form onSubmit={handleSubmit} className={`${styles.label}`}>
        <div>
          <label htmlFor="">Course Name</label>
          <input
            type="name"
            name=""
            //required
            value={courseInfo.name}
            onChange={e =>
              setCourseInfo({
                ...courseInfo,
                name: e.target.value
              })
            }
            id="name"
            placeholder=""
            className={`
            ${styles.input}`}
          />
        </div>
        <br />
        <div className="mb-5">
          <label className={`${styles.label}`}>Course Description</label>
          <textarea
            name=""
            id=""
            cols={30}
            rows={8}
            placeholder=""
            className={`${styles.input} !h-min !py-2`}
            value={courseInfo.description}
            onChange={e =>
              setCourseInfo({
                ...courseInfo,
                description: e.target.value
              })
            }
          ></textarea>
        </div>
        <br />
        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label className={`${styles.label}`} htmlFor="email">
              Course Tags
            </label>
            <input
              type="text"
              //required
              name=""
              value={courseInfo.tags}
              onChange={e =>
                setCourseInfo({
                  ...courseInfo,
                  tags: e.target.value
                })
              }
              id="tags"
              placeholder="HTML, CSS, PROGRAMING, TAIWINLD CSS, ..."
              className={`
            ${styles.input}`}
            />
          </div>
          <div className="w-[50%]">
            <label className={`${styles.label} w-[50%]`}>
              Course Categories
            </label>
            <select
              name=""
              id=""
              className="w-full text-black dark:text-white bg-transparent border rounded h-[40px] px-2 outline-none mt-[10px] font-Poppins"
              value={courseInfo.category}
              onChange={e =>
                setCourseInfo({
                  ...courseInfo,
                  categories: e.target.value
                })
              }
            >
              <option value="">Select Category</option>
              {categories &&
                categories.map(item => (
                  <option
                    value={item.title}
                    key={item._id}
                    className="dark:text-black"
                  >
                    {item.title}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <br />
        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label className={`${styles.label}`}>Course Level</label>
            <input
              type="text"
              name=""
              value={courseInfo.level}
              //required
              onChange={e =>
                setCourseInfo({
                  ...courseInfo,
                  level: e.target.value
                })
              }
              id="level"
              placeholder="Beginner/Intermediate/Expert"
              className={`
            ${styles.input}`}
            />
          </div>
          {/*<div className='w-[50%]'>*/}
          {/*  <label className={`${styles.label} w-[50%]`}>*/}
          {/*    Upload Video*/}
          {/*  </label>*/}
          {/*  <input*/}
          {/*      type='file'*/}
          {/*      name=''*/}
          {/*      required*/}
          {/*      onChange={handleFileUploadChange}*/}
          {/*      id='video'*/}
          {/*      placeholder='Vui lòng chọn file'*/}
          {/*      className={`*/}
          {/*${styles.input}`}*/}
          {/*  />*/}
          {/*</div>*/}
        </div>
        <br />
        {/*<div className='w-full'>*/}
        {/*  {file && (*/}
        {/*      <div>*/}
        {/*        <ReactPlayer*/}
        {/*            url={URL.createObjectURL(file)}*/}
        {/*            controls={true}*/}
        {/*        />*/}
        {/*      </div>*/}
        {/*  )}*/}
        {/*</div>*/}
        <div className="w-full">
          <input
            type="file"
            id="video"
            accept="video/mp4,video/x-m4v,video/*"
            className="hidden"
            onChange={handleFileUploadChange}
          />
          <label
            htmlFor="video"
            className={`w-full min-h-[10vh] dark:border-white border-[#00000026] p-3 border flex items-center justify-center ${
              dragging ? "bg-blue-500" : "bg-transparent"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {isEdit === true && courseInfo?.demoUrl && (
              <ReactPlayer url={courseInfo?.demoUrl} controls={true} />
            )}
            {isEdit === true && !courseInfo?.demoUrl && (
              <span className="text-black dark:text-white">Upload Video </span>
            )}
            {isEdit !== true && file && (
              <ReactPlayer url={URL.createObjectURL(file)} controls={true} />
            )}
            {isEdit !== true && !file && (
              <span className="text-black dark:text-white">Upload Video </span>
            )}
          </label>
        </div>
        <br />
        <div className="w-full">
          <input
            type="file"
            accept="image/*"
            id="file"
            className="hidden"
            onChange={handleFileChange}
          />
          <label
            htmlFor="file"
            className={`w-full min-h-[10vh] dark:border-white border-[#00000026] p-3 border flex items-center justify-center ${
              dragging ? "bg-blue-500" : "bg-transparent"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {courseInfo.thumbnail ? (
              <img
                src={courseInfo.thumbnail}
                alt=""
                className="max-h-full w-full object-cover"
              />
            ) : (
              <span className="text-black dark:text-white">
                Drag and drop your thumbnail here or click to browse
              </span>
            )}
          </label>
        </div>

        <br />
        <div className="w-full flex items-center justify-end">
          <input
            type="submit"
            value="Next"
            className="w-full 800px:w-[180px] h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          />
        </div>
        <br />
        <br />
      </form>
      <div
        className={`fixed inset-0 bg-gray-700 bg-opacity-50 z-50 ${
          isLoading ? "block" : "hidden"
        }`}
      >
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
      </div>
    </div>
  )
}

export default CourseInformation
