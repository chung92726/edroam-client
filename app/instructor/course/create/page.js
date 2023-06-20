'use client'

import CourseCreateForm from '@/components/form/CourseCreateForm'
import { useState, useEffect } from 'react'
import Resizer from 'react-image-file-resizer'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const CourseCreate = () => {
  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '9.99',
    uploading: false,
    paid: true,
    loading: false,

    category: '',
  })
  const router = useRouter()
  const [preview, setPreview] = useState('')
  const [image, setImage] = useState({})

  const handleChange = (e) => {
    e.preventDefault()
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleImage = (e) => {
    let file = e.target.files[0]
    setPreview(window.URL.createObjectURL(file))

    setValues({ ...values, uploading: true })
    Resizer.imageFileResizer(file, 720, 500, 'JPEG', 100, 0, async (url) => {
      try {
        let { data } = await axios.post('/api/course/upload-image', {
          image: url,
        })
        console.log('Image uploaded', data)
        setImage(data)
        setValues({ ...values, uploading: false })
        toast.success('Image uploaded')
      } catch (err) {
        console.log(err)
        setValues({ ...values, uploading: false })
        toast.error('Image upload failed. Try later')
      }
    })
  }

  const handleImageRemove = async () => {
    setValues({ ...values, uploading: true })
    try {
      const res = await axios.post('/api/course/remove-image', { image: image })
      setImage({})
      setPreview('')
      setValues({ ...values, uploading: false })
    } catch (err) {
      console.log(err)
      setValues({ ...values, uploading: false })
      toast.error('Image Remove failed. Try later')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setValues({ ...values, loading: true })
    try {
      const { data } = await axios.post('/api/course', {
        ...values,
        image: image,
      })
      toast.success(
        'Course created successfully !! Now you can start adding lessons'
      )
      setValues({ ...values, loading: false })
      router.push('/instructor')
    } catch (err) {
      console.log(err)
      toast.error(err.response.data)
      setValues({ ...values, loading: false })
    }
  }
  return (
    <div className='w-8/12'>
      <CourseCreateForm
        handleImage={handleImage}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        values={values}
        setValues={setValues}
        preview={preview}
        image={image}
        handleImageRemove={handleImageRemove}
      />
    </div>
  )
}

export default CourseCreate
