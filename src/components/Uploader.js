import React from 'react'
import { motion } from "framer-motion"
import { useState, useRef } from 'react'
import SelectedFile from './SelectedFile'


export default function Uploader() {
  const [file, setFile] = useState([])
  const [message, setMessage] = useState("")

  const handleFileSelect = (e) => {
    e.preventDefault()

    const selectedFiles = e.target.files

    if (selectedFiles.length > 0) {
      const isPdf = Array.from(selectedFiles).filter(file => file.type === "application/pdf");

      if (isPdf.length > 0) {
        setFile(isPdf)
      } else {
        setMessage("Only PDF Files Are Allowed")
      }
    }

  }

  return (
    <div className='uploader-container'>
      {file.length === 0 ? <> <h1 className='tagline'>Ubah PDF ke JPG </h1>
        <motion.label whileHover={{ scaleX: 1.2 }} htmlFor="fileInput" className="button-like-input"><h4>Convert PDF </h4></motion.label>
        <input type="file" multiple name="files[]" id="fileInput" onChange={handleFileSelect} /></> :
        <SelectedFile
          file={file}
        />}
      {message && <div>{message}</div>}
    </div>
  )
}
