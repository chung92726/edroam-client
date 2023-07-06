"use client";

import { MdOutlineSaveAlt } from "react-icons/md";
import Select from "react-select";
import { useState } from "react";

const optionList = [
  { value: "WebDesign", label: "Web Design" },
  { value: "UIUXDesign", label: "UI/UX Design" },
  { value: "GraphicDesign", label: "Graphic Design" },
  { value: "3DModeling", label: "3D Modeling" },
  { value: "VideoEditing", label: "Video Editing" },
  { value: "Others", label: "Others" },
];

const CourseCreateForm = ({
  handleImage,
  handleSubmit,
  handleChange,
  values,
  setValues,
  preview,
  image,
  handleImageRemove,
  handleOptionsChange,
  imgRef,
  editPage = false,
}) => {
  const children = [];
  for (let i = 1.99; i <= 100.99; i++) {
    children.push(
      <option
        key={i.toFixed(2)}
        value={i.toFixed(2)}
        selected={values.price == i.toFixed(2)}
      >
        ${i.toFixed(2)}
      </option>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* <pre>{JSON.stringify(values, null, 4)}</pre> */}
      <div className="flex flex-col justify-center items-center gap-3 w-full">
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          value={values.name}
          className="input input-bordered w-full  mx-2"
        />
        {/* <input
          type="text"
          name="category"
          placeholder="Course Category"
          onChange={handleChange}
          value={values.category}
          className="input input-bordered w-full  mx-2"
        /> */}
        <Select
          // defaultValue={[colourOptions[2], colourOptions[3]]}
          placeholder="Course Category..."
          isMulti
          name="colors"
          options={optionList}
          className="w-full mx-2 text-[1rem] "
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              borderColor: "hsl(214,30%,32%, 0.2)",
              borderRadius: "0.5rem",
            }),
          }}
          theme={(theme) => ({
            ...theme,
            borderRadius: 0,
            colors: {
              ...theme.colors,
              primary: "hsl(214,30%,32%, 0.2)",
            },
          })}
          classNamePrefix="select"
          onChange={handleOptionsChange}
          value={values.category}
        />
        <textarea
          type="text"
          name="description"
          placeholder="Description"
          onChange={handleChange}
          value={values.description}
          className="textarea textarea-bordered textarea-sm w-full  mx-2 min-h-[20rem]"
        />
        <select
          className="select select-bordered w-full  mx-2"
          onChange={handleChange}
        >
          <option selected={values.level === "All Levels"} value="All Levels">
            All Levels
          </option>
          <option selected={values.level === "Beginner"} value="Beginner">
            Beginner
          </option>
          <option
            selected={values.level === "Intermediate"}
            value="Intermediate"
          >
            Intermediate
          </option>
          <option selected={values.level === "Expert"} value="Expert">
            Expert
          </option>
        </select>
        <select
          className="select select-bordered w-full  mx-2"
          onChange={handleChange}
        >
          <option selected={values.language === "English"} value="English">
            English
          </option>
          <option selected={!values.language === "Chinese"} value="Chinese">
            Chinese
          </option>
        </select>
        <select
          className="select select-bordered w-full  mx-2"
          onChange={(v) => {
            if (v.target.value == "true") {
              setValues({ ...values, paid: true, price: 9.99 });
            } else {
              setValues({ ...values, paid: false, price: 0 });
            }
          }}
        >
          <option selected={values.paid} value={true}>
            Paid Course
          </option>
          <option selected={!values.paid} value={false}>
            Free Course
          </option>
        </select>
        {values.paid && (
          <>
            <label className="label mx-2">SELECT COURSE PRICE</label>

            <select
              className="select select-bordered w-full  mx-2"
              onChange={(v) => setValues({ ...values, price: v.target.value })}
              // defaultValue={values.price}
            >
              {children}
            </select>
          </>
        )}

        <div className="form-control w-full  mx-2">
          <label className="label">
            <span className="label-text">
              {values.uploading ? "Uploading . . ." : "UPLOAD COURSE IMAGE"}
            </span>
          </label>
          <input
            type="file"
            name="image"
            onChange={handleImage}
            accept="image/*"
            className="file-input file-input-bordered w-full "
            ref={imgRef}
          />
        </div>
        {preview && (
          <div className="avatar my-4">
            <div className="w-32 rounded relative">
              <div
                className="badge badge-secondary h-[20px] w-[20px] bg-red-600 badge-sm absolute right-0 cursor-pointer "
                onClick={handleImageRemove}
              >
                X
              </div>
              <img src={preview} />
            </div>
          </div>
        )}

        {values.image && editPage && !preview && (
          <div className="avatar my-4">
            <div className="w-32 rounded relative">
              <img src={values.image.Location} />
            </div>
          </div>
        )}
        <button
          className="btn mt-3 btn-wide btn-primary mb-5"
          onClick={handleSubmit}
          disabled={
            values.loading ||
            values.uploading ||
            !values.name ||
            !values.description
          }
        >
          {values.loading || values.uploading ? (
            <>
              <span className="loading loading-spinner"></span>
              loading
            </>
          ) : (
            <>
              <MdOutlineSaveAlt />
              Save and Continue
            </>
          )}
        </button>
        {/* <pre>{JSON.stringify(values, null, 4)}</pre>
        <hr />
        <pre>{JSON.stringify(image, null, 4)}</pre> */}
      </div>
    </form>
  );
};

export default CourseCreateForm;