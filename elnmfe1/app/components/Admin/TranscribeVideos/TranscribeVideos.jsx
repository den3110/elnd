import React, { useState } from "react"
import axios from "axios"

const TranscribeVideos = () => {
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const handleTranscribeVideos = async () => {
    setLoading(true)
    setErrorMessage("")
    setSuccessMessage("")
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/transcribe_videos"
      )
      setSuccessMessage(response.data.message)
    } catch (error) {
      setErrorMessage(error.response.data.error)
    }
    setLoading(false)
  }

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <style>
        {`
          .button {
            display: inline-block;
            padding: 10px 20px;
            font-size: 16px;
            color: #fff;
            background-color: #3faf82;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
          }

          .button:hover {
            background-color: #2d855f;
          }

          .button:disabled {
            background-color: #ccc;
            cursor: not-allowed;
          }
        `}
      </style>
      <button
        className="button"
        onClick={handleTranscribeVideos}
        disabled={loading}
      >
        {loading ? "Processing..." : "Transcribe Videos"}
      </button>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
    </div>
  )
}

export default TranscribeVideos
