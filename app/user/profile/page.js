"use client";
import { useContext, useEffect, useState } from "react";
import { Context } from "@/context/index";
import UserRoute from "@/components/routes/UserRoutes";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const { state, dispatch } = useContext(Context);
  const { user } = state;
  const [img, setImg] = useState("");
  const [values, setValues] = useState({
    name: "",
    website: "",
    biography: "",
    picture: {},
    loading: false,
  });
  const router = useRouter();

  const handleImage = (e) => {
    let file = e.target.files[0];
    Resizer.imageFileResizer(file, 180, 180, "JPEG", 100, 0, async (url) => {
      setImg(url);
    });
    // setImg(file && window.URL.createObjectURL(file));
    setValues({ ...values, picture: img });
  };

  const removeImg = async (img) => {
    try {
      const res = await axios.post("/api/course/remove-image", {
        image: img,
      });
      // setValues({ ...values, uploading: false });
    } catch (err) {
      console.log(err);
      setValues({ ...values, uploading: false });
      // toast.error("Image Remove failed. Try later");
    }
  };

  const uploadImg = async (img) => {
    try {
      let { data } = await axios.post("/api/course/upload-image", {
        image: img,
      });
      // console.log("Image uploaded", data);
      setValues({ ...values, uploading: false });
      return data;
      // toast.success("Image uploaded");
    } catch (err) {
      console.log(err);
      setValues({ ...values, uploading: false });
      // toast.error("Image upload failed. Try later");
    }
  };

  const handleSubmit = async () => {
    let s3Img;
    if (user.picture !== "/guest.png") {
      setValues({ ...values, uploading: true });

      if (user.picture.Bucket) {
        await removeImg(user.picture);
      }
      s3Img = await uploadImg(img);
    }

    try {
      const { data } = await axios.post("/api/user/updateInfo", {
        ...values,
        picture: s3Img,
      });
      setValues({ ...values, loading: false, picture: s3Img });
      dispatch({
        type: "UPDATE",
        payload: data,
      });
      window.localStorage.setItem("user", JSON.stringify(data));
      // console.log(data);
      toast.success("Profile updated successfully !!");
      router.push("/user/profile");
    } catch (err) {
      console.log(err);
      toast.error("Profile update failed. Try later");
      setValues({ ...values, loading: false });
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setValues(user);
    setImg(user && user.picture);
    console.log(user);
  }, [state]);

  // useEffect(() => {
  //   console.log(values);
  // }, [values]);

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  return (
    <UserRoute>
      <div className="flex flex-col justify-center items-start bg-gray-700 text-white font-bold w-full py-[30px] md:py-[50px]">
        <h1 className="text-2xl pl-10 md:text-4xl">My Profile</h1>
      </div>
      <div className="flex flex-col w-full items-center justify-center my-5">
        <div className="avatar w-[30%] aspect-square max-w-[180px]">
          <img className="rounded-full" src={img} />
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
          />
        </div>

        {values && (
          <div className="flex flex-col justify-center items-center gap-3 mt-3 w-[90%]">
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleChange}
              value={values.name}
              className="input input-bordered w-full max-w-xl mx-2"
            />
            <input
              type="text"
              name="website"
              placeholder="Website Url"
              onChange={handleChange}
              value={values.website}
              className="input input-bordered w-full max-w-xl mx-2"
            />
            <textarea
              type="text"
              name="biography"
              placeholder="Biography"
              onChange={handleChange}
              value={values.biography}
              className="textarea textarea-bordered textarea-sm w-full max-w-xl mx-2 min-h-[8rem]"
            />
            <div className="form-control w-full max-w-xl">
              <button
                className="btn btn-active btn-secondary"
                onClick={handleSubmit}
              >
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>
    </UserRoute>
  );
};

export default ProfilePage;
