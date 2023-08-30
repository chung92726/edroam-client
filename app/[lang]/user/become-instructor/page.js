"use client"

import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { Context } from "../../../context"
import { toast } from "react-toastify"
import Resizer from "react-image-file-resizer"
import { useRouter } from "next/navigation"
import { MdOutlineSaveAlt } from "react-icons/md"

const BecomeInstructor = () => {
  const [loading, setLoading] = useState(false)
  const { state, dispatch } = useContext(Context)
  const { user } = state
  const [img, setImg] = useState("")
  const [values, setValues] = useState({
    picture: {},
    name: "",
    gender: "",
    ageRange: "",
    website: "",
    phoneNumber: "",
    // address: "",
    biography: "",
    courseDetails: "",
    teachingExperience: "",
    loading: false,
  })

  const router = useRouter()

  const handleImage = (e) => {
    let file = e.target.files[0]
    Resizer.imageFileResizer(file, 180, 180, "JPEG", 100, 0, async (url) => {
      setImg(url)
    })
    // setImg(file && window.URL.createObjectURL(file));
    setValues({ ...values, picture: img })
  }

  const removeImg = async (img) => {
    try {
      const res = await axios.post("/api/course/remove-image", {
        image: img,
      })
      // setValues({ ...values, uploading: false });
    } catch (err) {
      console.log(err)
      setValues({ ...values, uploading: false })
      // toast.error("Image Remove failed. Try later");
    }
  }

  const uploadImg = async (img) => {
    try {
      let { data } = await axios.post("/api/course/upload-image", {
        image: img,
      })
      // console.log("Image uploaded", data);
      setValues({ ...values, uploading: false })
      return data
      // toast.success("Image uploaded");
    } catch (err) {
      console.log(err)
      setValues({ ...values, uploading: false })
      // toast.error("Image upload failed. Try later");
    }
  }

  const handleSubmit = async () => {
    let s3Img
    if (img && img !== user.picture) {
      setValues({ ...values, uploading: true })

      if (user.picture?.Bucket) {
        await removeImg(user.picture)
      }
      s3Img = await uploadImg(img)
    }

    try {
      const { data } = await axios.post("/api/user/updateInstructorInfo", {
        ...values,
        picture: s3Img ? s3Img : user.picture,
      })
      setValues({ ...values, loading: false, picture: s3Img })
      dispatch({
        type: "UPDATE",
        payload: data,
      })
      window.localStorage.setItem("user", JSON.stringify(data))
      // console.log(data);
      toast.success("Profile updated successfully !!")
      router.push("/user/create-stripe")
    } catch (err) {
      console.log(err)
      toast.error("Profile update failed. Try later")
      setValues({ ...values, loading: false })
    }
  }

  const handleChange = (e) => {
    e.preventDefault()
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleRatioChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    setValues({ ...values, ...user })
    setImg(user && user.picture)
    // console.log(user)
    if (user?.role.includes("Instructor") || user?.role.includes("Pending"))
      router.push("/")
  }, [state])

  const [ok, setOk] = useState(false)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get("/api/current-user")
        // console.log(data)
        if (data.ok) setOk(true)
      } catch (err) {
        console.log(err)
        router.push("/login")
      }
    }
    fetchUser()
  }, [])

  // useEffect(() => {
  //   console.log(values)
  //   // console.log(img)
  // }, [values])

  return (
    <div className="flex flex-col w-full items-center justify-center my-5">
      {ok && values && (
        <>
          <div className="avatar w-[30%] aspect-square max-w-[180px]">
            <img
              className="rounded-full"
              src={
                img
                  ? img.Location !== undefined
                    ? img.Location
                    : img
                  : "/guest.png"
              }
            />
          </div>
          <div className="form-control justify-center items-center w-[90%] max-w-xl">
            <label className="label">
              <span className="label-text">Upload a New Profile Image</span>
            </label>
            <input
              type="file"
              className="file-input file-input-bordered file-input-secondary file-input-sm w-full max-w-xs"
              onChange={handleImage}
              accept="image/*"
              disabled={values.loading}
            />
          </div>

          <div className="flex flex-col justify-center items-center gap-3 mt-5 w-[90%]">
            <div className="form-control w-full max-w-xl mx-2">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                name="email"
                placeholder={values.email}
                disabled
                value={values.email}
                className="input input-bordered !bg-white !text-gray-950 "
              />
            </div>
            {/* <h1>Name</h1> */}
            <div className="form-control w-full max-w-xl mx-2">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                onChange={handleChange}
                value={values.name}
                className="input input-bordered "
                disabled={values.loading}
              />
            </div>
            {/* <h1>Gender</h1> */}
            <div className="flex flex-row gap-3">
              <div className="form-control">
                <label className="label cursor-pointer gap-3">
                  <span className="label-text">Male</span>
                  <input
                    type="radio"
                    name="gender"
                    className="radio"
                    checked={values.gender === "male"}
                    value="male"
                    onChange={handleRatioChange}
                    disabled={values.loading}
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer gap-3">
                  <span className="label-text">Female</span>
                  <input
                    type="radio"
                    name="gender"
                    className="radio"
                    checked={values.gender === "female"}
                    value="female"
                    onChange={handleRatioChange}
                    disabled={values.loading}
                  />
                </label>
              </div>
            </div>
            <div className="form-control w-full max-w-xl mx-2">
              <label className="label">
                <span className="label-text">Age</span>
              </label>
              <select
                className="select select-bordered"
                onChange={handleChange}
                // defaultValue=""
                name="ageRange"
                disabled={values.loading}
                value={values.ageRange}
              >
                <option disabled value="">
                  --Choose an age range --
                </option>
                <option value="1">18 to 24</option>
                <option value="2">25 to 34</option>
                <option value="3">35 to 44</option>
                <option value="4">45 to 54</option>
                <option value="5">55 to 64</option>
                <option value="6">65 or over</option>
              </select>
            </div>
            <div className="form-control w-full max-w-xl mx-2">
              <label className="label">
                <span className="label-text">Website</span>
              </label>
              {/* <h1>Website</h1> */}
              <input
                type="text"
                name="website"
                placeholder="Url"
                onChange={handleChange}
                value={values.website}
                className="input input-bordered"
                disabled={values.loading}
              />
            </div>
            <div className="form-control w-full max-w-xl mx-2">
              <label className="label">
                <span className="label-text">Contact Phone Number</span>
              </label>
              {/* <h1>Contact Phone Number</h1> */}
              <input
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                onChange={handleChange}
                value={values.phoneNumber}
                className="input input-bordered"
                disabled={values.loading}
              />
            </div>
            {/* <h1>Contact Address</h1>
          <input
            type="text"
            name="address"
            placeholder="Address"
            onChange={handleChange}
            value={values.address}
            className="input input-bordered w-full max-w-xl mx-2"
          /> */}
            <div className="form-control w-full max-w-xl mx-2">
              <label className="label">
                <span className="label-text">Biography</span>
              </label>
              {/* <h1>Biography</h1> */}
              <textarea
                type="text"
                name="biography"
                placeholder="A brief description of your background, expertise, and qualifications"
                onChange={handleChange}
                value={values.biography}
                className="textarea textarea-bordered textarea-sm min-h-[8rem] resize-none"
                disabled={values.loading}
              />
            </div>
            <div className="form-control w-full max-w-xl mx-2">
              <label className="label">
                <span className="label-text">Teaching experience</span>
              </label>
              {/* <h1>Teaching experience</h1> */}
              <textarea
                type="text"
                name="teachingExperience"
                placeholder="Previous teaching experience, if applicable."
                onChange={handleChange}
                value={values.teachingExperience}
                className="textarea textarea-bordered textarea-sm min-h-[8rem] resize-none"
                disabled={values.loading}
              />
            </div>
            <div className="form-control w-full max-w-xl mx-2">
              <label className="label">
                <span className="label-text">Course Details</span>
              </label>
              {/* <h1>Course Details</h1> */}
              <textarea
                type="text"
                name="courseDetails"
                placeholder="A brief description about the Course you want to create"
                onChange={handleChange}
                value={values.courseDetails}
                className="textarea textarea-bordered textarea-sm min-h-[8rem] resize-none"
                disabled={values.loading}
              />
            </div>
            <div className="form-control w-full max-w-xl">
              <button
                className="btn btn-secondary"
                onClick={handleSubmit}
                disabled={
                  !values.name ||
                  !values.gender ||
                  !values.ageRange ||
                  !values.website ||
                  !values.phoneNumber ||
                  !values.biography ||
                  !values.teachingExperience ||
                  !values.courseDetails ||
                  !img
                }
              >
                {values.loading ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    loading
                  </>
                ) : (
                  <>Continous</>
                )}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default BecomeInstructor
