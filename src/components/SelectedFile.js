import React from 'react'
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { motion } from "framer-motion"
import { useState } from 'react';
import axios from "axios"


export default function SelectedFile({ file }) {
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState("");
    const [clickUpload, setClickUpload] = useState(false);


    console.log(progress)

    const handleUploadProgress = (progressEvent) => {
        const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
        );
        setProgress(percentCompleted);
    };

    var CHUNK_SIZE = 1024 * 1024;
    const uploadFileChunk = async (file, start, end) => {
        var formData = new FormData();
        formData.append("file", file);
        formData.append("filename", file.name);
        formData.append("totalChunks", Math.ceil(file.size / CHUNK_SIZE));
        formData.append("currentChunk", Math.floor(start / CHUNK_SIZE));
        try {
            const res = await axios.post(
                "http://localhost:8080/upload",
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    onUploadProgress: handleUploadProgress,
                }
            );

            if (res.status === 200) {
                const nextStart = end;
                const nextEnd = Math.min(end + CHUNK_SIZE, file.size);

                if (nextStart < file.size) {

                    uploadFileChunk(file, nextStart, nextEnd);
                } else {
                    setClickUpload(true);
                    setMessage("Upload complete");
                }
            }
        } catch (error) {
            console.error(error);
            setMessage("Error uploading files.");
        }
    };
    const handleClick = () => {
        setMessage("Uploading The Files")
        for (let i = 0; i < file.length; i++) {
            uploadFileChunk(file[i], 0, Math.min(CHUNK_SIZE, file[i].size))
        }
    }
    return (
        <div className='selected-file-container'>
            <div className='file-detail-container'>
                {file.map((data, index) => (
                    <div key={index} className='file-detail'>
                        <FileCopyIcon />
                        <h4>
                            {data.name.slice(0, 30)}
                        </h4>
                        <div className='progress-bar-container'>
                            <div className='progress-bar' style={{ width: `${progress}%` }}>
                                {/* {progress > 0 && <span>{progress}%</span>} */}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {clickUpload ? <h1>{message}</h1> : <motion.button whileHover={{ scaleX: 1.1 }} className='upload-button' onClick={handleClick}><h3>Upload & Convert </h3> </motion.button>}

        </div>
    )
}
