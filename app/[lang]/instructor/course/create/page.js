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
    detailDescription: '',
    price: '9.99',
    uploading: false,
    whatYouWillLearn: [],
    requirements: [],
    paid: true,
    category: [],
    level: 'All Levels',
    language: 'English',
    loading: false,
  })
  const router = useRouter()
  const [preview, setPreview] = useState('')
  const [image, setImage] = useState({})

  const handleChange = (e) => {
    e.preventDefault()
    if (
      (e.target.name === 'name' && e.target.value.length > 50) ||
      (e.target.name === 'description' && e.target.value.length > 300)
    ) {
      return
    }
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  const handleAddBullet = (section, e) => {
    e.preventDefault()
    setValues((prev) => ({
      ...prev,
      [section]: [...prev[section], ''],
    }))
  }

  const handleRemoveBullet = (section, index, e) => {
    e.preventDefault()
    setValues((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, idx) => idx !== index),
    }))
  }

  const handleBulletChange = (section, index, e) => {
    e.preventDefault()
    const newBulletPoints = [...values[section]]
    newBulletPoints[index] = e.target.value
    setValues({
      ...values,
      [section]: newBulletPoints,
    })
  }

  useEffect(() => {
    console.log(values)
  }, [values])

  const handleOptionsChange = async (data) => {
    // const cat = data.map(({ value }) => value);
    // console.log(cat);
    setValues({ ...values, category: data })
  }

  const handleImage = (e) => {
    let file = e.target.files[0]
    setPreview(file && window.URL.createObjectURL(file))

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
      const res = await axios.post('/api/course/remove-image', {
        image: image,
      })
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
    <div className=''>
      <div className='flex flex-col justify-center items-start bg-gray-700 text-white font-bold w-full py-[30px] md:py-[50px]'>
        <h1 className='text-2xl pl-10 md:text-4xl'>Create Courses</h1>
      </div>
      <CourseCreateForm
        handleImage={handleImage}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        values={values}
        setValues={setValues}
        preview={preview}
        image={image}
        handleImageRemove={handleImageRemove}
        handleOptionsChange={handleOptionsChange}
        handleAddBullet={handleAddBullet}
        handleRemoveBullet={handleRemoveBullet}
        handleBulletChange={handleBulletChange}
      />
    </div>
  )
}

export default CourseCreate
