import React from 'react'
import { AiOutlineFileZip } from 'react-icons/ai'
import { BiDownload } from 'react-icons/bi'
import axios from 'axios'

const LectureNotes = ({ course, currentLesson }) => {
  const downloadFile = async (file, fileName) => {
    const res = await axios.get(
      `/api/course/supplementary-download/${file.Key}`,
      { responseType: 'arraybuffer' } // Set the response type to arraybuffer
    )

    console.log(res.data)
    const binaryData = new Uint8Array(res.data) // Convert the data to a Uint8Array

    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(
      new Blob([binaryData]) // Pass the binaryData as an array
    )
    link.download = fileName + '.' + file.Key.split('.')[1]
    document.body.appendChild(link)
    link.dispatchEvent(
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window,
      })
    )
  }
  return (
    <div className='flex flex-col justify-start items-start w-full my-2'>
      {course.lessons[currentLesson].supplementary_resources.length > 0 ? (
        course.lessons[currentLesson].supplementary_resources.map(
          (resource, i) => (
            <div className='flex flex-row justify-between items-center w-full my-2 border-b-2'>
              <div className='flex flex-col justify-start items-start ml-4'>
                <h1 className='font-bold flex gap-2 flex-row items-center text-[16px] my-1'>
                  <AiOutlineFileZip size={20} className='text-blue-400' />
                  <a
                    className='link link-secondary'
                    onClick={() => {
                      downloadFile(resource.file, resource.title)
                    }}
                  >
                    {resource.title}
                  </a>
                </h1>
                <p className='text-[14px] my-1'>
                  {resource.description && resource.description}
                </p>
                <p className='text-[12px] my-1'>
                  Created At:{' '}
                  {new Date(resource.createdAt).toLocaleDateString()}
                </p>
                <p className='text-[12px] mb-4'>
                  Updated At:{' '}
                  {new Date(resource.updatedAt).toLocaleDateString()}
                </p>
              </div>
              <a
                className='cursor-pointer'
                // href={resource.file.Location}
                // download={resource.title}
              >
                <BiDownload
                  size={22}
                  className='text-blue-400'
                  onClick={() => {
                    downloadFile(resource.file, resource.title)
                  }}
                />
              </a>
            </div>
          )
        )
      ) : (
        <h1 className='font-bold my-4'>
          There is no supplementary file in this lesson
        </h1>
      )}
    </div>
  )
}

export default LectureNotes
