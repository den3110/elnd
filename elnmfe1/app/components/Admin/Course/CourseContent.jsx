
import { styles } from "@/app/styles/style"
import axios from "axios"
import React, { Fragment, useState } from "react"
import { toast } from "react-hot-toast"
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai"
import { BsLink45Deg, BsPencil } from "react-icons/bs"
import { MdOutlineKeyboardArrowDown } from "react-icons/md"
import ReactPlayer from "react-player"
import MemoVideo from "./MemoVideo"
const CourseContent = ({
  courseContentData,
  setCourseContentData,
  active,
  setActive,
  handleSubmit: handlleCourseSubmit,
  courseInfo,
  listVideoSection,
  setListVideoSection,
  isEdit
}) => {
  const [isCollapsed, setIsCollapsed] = useState(
    Array(courseContentData.length).fill(false)
  )

  const [activeSection, setActiveSection] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [dragging, setDragging] = useState(false)

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
        // setCourseInfo({ ...courseInfo, thumbnail: reader.result });
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
  }

  const handleCollapseToggle = index => {
    const updatedCollasped = [...isCollapsed]
    updatedCollasped[index] = !updatedCollasped[index]
    setIsCollapsed(updatedCollasped)
  }

  const handleRemoveLink = (index, linkIndex) => {
    const updatedData = [...courseContentData]
    updatedData[index].links.splice(linkIndex, 1)
    setCourseContentData(updatedData)
  }

  const handleAddLink = index => {
    const updatedData = [...courseContentData]
    updatedData[index].links.push({ title: "", url: "" })
    setCourseContentData(updatedData)
  }

  const newContentHandler = item => {
    if (
      item.title === "" ||
      item.description === "" ||
      item.links[0].title === "" ||
      item.links[0].url === "" ||
      item.videoLength === ""
    ) {
      toast.error("Please fill all the fields first!")
    } else {
      let newVideoSection = ""

      if (courseContentData.length > 0) {
        const lastVideoSection =
          courseContentData[courseContentData.length - 1].videoSection

        // use the last videoSection if available, else use user input
        if (lastVideoSection) {
          newVideoSection = lastVideoSection
        }
      }
      const newContent = {
        videoUrl: "",
        title: "",
        description: "",
        videoSection: newVideoSection,
        videoLength: "",
        links: [{ title: "", url: "" }]
      }

      setCourseContentData([...courseContentData, newContent])
    }
  }

  const addNewSection = () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      // courseContentData[courseContentData.length - 1].videoUrl === '' ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].url === ""
    ) {
      toast.error("Please fill all the fields first!")
    } else {
      setActiveSection(activeSection + 1)
      const newContent = {
        videoUrl: "",
        title: "",
        description: "",
        videoLength: "",
        videoSection: `Untitled Section ${activeSection}`,
        links: [{ title: "", url: "" }]
      }
      setCourseContentData([...courseContentData, newContent])
    }
  }

  const prevButton = () => {
    setActive(active - 1)
  }

  const handleOptions = async () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" 
      // courseContentData[courseContentData.length - 1].description === "" ||
      // courseContentData[courseContentData.length - 1].videoUrl === '' 
      // courseContentData[courseContentData.length - 1].links[0].title === "" ||
      // courseContentData[courseContentData.length - 1].links[0].url === "" ||
      
    ) {
      toast.error("section can't be empty!")
    } else {
      for (let i = 0; i < listVideoSection.length; i++) {
        const res = await handleUpload(listVideoSection[i])
        const updatedData = [...courseContentData]
        updatedData[i].videoUrl = res.url
        setCourseContentData(updatedData)
      }
      //   const res = await handleUpload();
      //   const updatedData = [...courseContentData];
      //   updatedData[courseContentData.length - 1].videoUrl = res.url;
      //   setCourseContentData(updatedData);
      setActive(active + 1)
      handlleCourseSubmit()
    }
  }

  const handleFileUploadChange = e => {
    setListVideoSection([...listVideoSection, e.target.files[0]])
  }
  const handleUpload = async file => {
    try {
      setIsLoading(true)
      let formData = new FormData()
      formData.append("file", file)
      formData.append("title", courseInfo.name)
      const res = await axios.post(
        process.env.NEXT_PUBLIC_SERVER_URI + "upload",
        formData
      )
      return res.data
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-[80%] m-auto mt-24 p-3">
      <form onSubmit={handleSubmit}>
        {courseContentData?.map((item, index) => {
          const showSectionInput =
            index === 0 ||
            item.videoSection !== courseContentData[index - 1].videoSection

          return (
            <Fragment key={index}>
              <div
                className={`w-full bg-[#cdc8c817] p-4 ${
                  showSectionInput ? "mt-10" : "mb-0"
                }`}
                
              >
                {showSectionInput && (
                  <>
                    <div className="flex w-full items-center">
                      <input
                        type="text"
                        className={`text-[20px] ${
                          item.videoSection === "Untitled Section"
                            ? "w-[170px]"
                            : "w-min"
                        } font-Poppins cursor-pointer dark:text-white text-black bg-transparent outline-none`}
                        value={item.videoSection}
                        onChange={e => {
                          const updatedData = [...courseContentData]
                          updatedData[index].videoSection = e.target.value
                          setCourseContentData(updatedData)
                        }}
                      />
                      <BsPencil className="cursor-pointer dark:text-white text-black" />
                    </div>
                    <br />
                  </>
                )}

                <div className="flex w-full items-center justify-between my-0">
                  {isCollapsed[index] ? (
                    <>
                      {item.title ? (
                        <p className="font-Poppins dark:text-white text-black">
                          {index + 1}. {item.title}
                        </p>
                      ) : (
                        <></>
                      )}
                    </>
                  ) : (
                    <div></div>
                  )}

                  {/* // arrow button for collasped video content */}
                  <div className="flex items-center">
                    <AiOutlineDelete
                      className={`dark:text-white text-[20px] mr-2 text-black ${
                        index > 0 ? "cursor-pointer" : "cursor-no-drop"
                      }`}
                      onClick={() => {
                        if (index > 0) {
                          const updatedData = [...courseContentData]
                          updatedData.splice(index, 1)
                          setCourseContentData(updatedData)
                        }
                      }}
                    />
                    <MdOutlineKeyboardArrowDown
                      fontSize="large"
                      className="dark:text-white text-black"
                      style={{
                        transform: isCollapsed[index]
                          ? "rotate(180deg)"
                          : "rotate(0deg)"
                      }}
                      onClick={() => handleCollapseToggle(index)}
                    />
                  </div>
                </div>
                {!isCollapsed[index] && (
                  <>
                    <div className="my-3">
                      <label className={styles.label}>Video Title</label>
                      <input
                        type="text"
                        placeholder="Project Plan..."
                        className={`${styles.input}`}
                        value={item.title}
                        onChange={e => {
                          const updatedData = [...courseContentData]
                          updatedData[index].title = e.target.value
                          setCourseContentData(updatedData)
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      {/* <label className={styles.label}>Video Url</label>
                    <input
                      type='file'
                      name=''
                      required
                      onChange={handleFileUploadChange}
                      id='video'
                      placeholder='Vui lòng chọn file'
                      className={`
          ${styles.input}`}
                    /> */}
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
                          {isEdit === true &&
                            courseContentData &&
                            courseContentData[index] && (
                              <div className="player-wrapper">
                                <ReactPlayer
                                  className="react-player"
                                  url={courseContentData[index]?.videoUrl}
                                  controls={true}
                                />
                              </div>
                            )}
                          {isEdit === true && !courseContentData[index] && (
                            <span className="text-black dark:text-white">
                              Drag and drop your demo video here or click to
                              browse
                            </span>
                          )}
                          {isEdit === false &&
                            listVideoSection &&
                            listVideoSection[index] && (
                              <div className="player-wrapper">
                                {/* <ReactPlayer
                                  className="react-player"
                                  url={URL.createObjectURL(
                                    listVideoSection[index]
                                  )}
                                  controls={true}
                                /> */}
                                {<MemoVideo video={listVideoSection[index]} />}
                              </div>
                            )}
                          {isEdit === false && !listVideoSection[index] && (
                            <span className="text-black dark:text-white">
                              Drag and drop your demo video here or click to
                              browse
                            </span>
                          )}
                        </label>
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className={styles.label}>
                        Video Length (in minutes)
                      </label>
                      <input
                        type="number"
                        placeholder="20"
                        className={`${styles.input}`}
                        value={item.videoLength}
                        onChange={e => {
                          const updatedData = [...courseContentData]
                          updatedData[index].videoLength = e.target.value
                          setCourseContentData(updatedData)
                        }}
                      />
                    </div>

                    <div className="mb-3">
                      <label className={styles.label}>Video Description</label>
                      <textarea
                        rows={8}
                        cols={30}
                        placeholder="Video description..."
                        className={`${styles.input} !h-min py-2`}
                        value={item.description}
                        onChange={e => {
                          const updatedData = [...courseContentData]
                          updatedData[index].description = e.target.value
                          setCourseContentData(updatedData)
                        }}
                      />
                      <br />
                    </div>
                    {item?.links.map((link, linkIndex) => (
                      <div className="mb-3 block" key={linkIndex}>
                        <div className="w-full flex items-center justify-between">
                          <label className={styles.label}>
                            Link {linkIndex + 1}
                          </label>
                          <AiOutlineDelete
                            className={`${
                              linkIndex === 0
                                ? "cursor-no-drop"
                                : "cursor-pointer"
                            } text-black dark:text-white text-[20px]`}
                            onClick={() =>
                              linkIndex === 0
                                ? null
                                : handleRemoveLink(index, linkIndex)
                            }
                          />
                        </div>
                        <input
                          type="text"
                          placeholder="Source Code... (Link title)"
                          className={`${styles.input}`}
                          value={link.title}
                          onChange={e => {
                            const updatedData = [...courseContentData]
                            updatedData[index].links[linkIndex].title =
                              e.target.value
                            setCourseContentData(updatedData)
                          }}
                        />
                        <input
                          type="url"
                          placeholder="Source Code Url... (Link URL)"
                          className={`${styles.input} mt-6`}
                          value={link.url}
                          onChange={e => {
                            const updatedData = [...courseContentData]
                            updatedData[index].links[linkIndex].url =
                              e.target.value
                            setCourseContentData(updatedData)
                          }}
                        />
                      </div>
                    ))}
                    <br />
                    {/* add link button */}
                    <div className="inline-block mb-4">
                      <p
                        className="flex items-center text-[18px] dark:text-white text-black cursor-pointer"
                        onClick={() => handleAddLink(index)}
                      >
                        <BsLink45Deg className="mr-2" /> Add Link
                      </p>
                    </div>
                  </>
                )}
                <br />
                {/* add new content */}
                {index === courseContentData.length - 1 && (
                  <div>
                    <p
                      className="flex items-center text-[18px] dark:text-white text-black cursor-pointer"
                      onClick={e => newContentHandler(item)}
                    >
                      <AiOutlinePlusCircle className="mr-2" /> Add New Content
                    </p>
                  </div>
                )}
              </div>
            </Fragment>
          )
        })}
        <br />
        <div
          className="flex items-center text-[20px] dark:text-white text-black cursor-pointer"
          onClick={() => addNewSection()}
        >
          <AiOutlinePlusCircle className="mr-2" /> Add new Section
        </div>
      </form>
      <br />
      <div className="w-full flex items-center justify-between">
        <div
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          onClick={() => prevButton()}
        >
          Prev
        </div>
        <div
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          onClick={() => handleOptions()}
        >
          Next
        </div>
      </div>
      <div
        className={`fixed inset-0 bg-gray-700 bg-opacity-50 z-50 ${
          isLoading ? "block" : "hidden"
        }`}
      >
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
      </div>
      <br />
      <br />
      <br />
    </div>
  )
}

export default CourseContent
