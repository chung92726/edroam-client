"use client";
import { useContext, useEffect, useState } from "react";
import { Context } from "@/context/index";
import UserRoute from "@/components/routes/UserRoutes";
import axios from "axios";

const ProfilePage = () => {
  const { state, dispatch } = useContext(Context);
  const { user } = state;
  const [values, setValues] = useState({});

  useEffect(() => {
    setValues(user);
  }, [state]);
  const handleChange = (e) => {
    e.preventDefault();
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  return (
    <UserRoute>
      <div className="text-center bg-gray-700 text-white w-full  py-[50px] flex flex-col justify-center text-[28px] items-start font-bold ">
        <h1 className="text-4xl pl-10">My Profile</h1>
      </div>
      <div className="flex grow flex-row w-full bg-gray-100 h-full items-center justify-center py-10 px-10">
        <div className="flex flex-col  items-center w-1/2  justify-center">
          <div className="avatar">
            <div className="w-48 rounded-full">
              <img src={user && user.picture} />
            </div>
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Upload a New Profile Image</span>
            </label>
            <input
              type="file"
              className="file-input file-input-bordered file-input-secondary w-full max-w-xs"
            />
          </div>
        </div>
        {values && (
          <div className="flex flex-col justify-center items-center gap-3 w-1/2 ">
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
              className="textarea textarea textarea-bordered textarea-sm w-full max-w-xl mx-2 min-h-[8rem]"
            />
            <div className="form-control w-full max-w-xl">
              <button className="btn btn-active btn-secondary">
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
