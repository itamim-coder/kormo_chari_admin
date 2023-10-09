import { data } from "autoprefixer";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const AddSubCategories = () => {
  const categories = [
    {
      id: 0,
      name: "Select A Category",
    },
    {
      id: 1,
      name: "Construction",
    },
    {
      id: 2,
      name: "Shifting",
    },
    {
      id: 3,
      name: "Renovation & Printing",
    },
    {
      id: 4,
      name: "Cleanliness",
    },
    {
      id: 5,
      name: "Repair any Gadget",
    },
    {
      id: 6,
      name: "Men & Women Beauty & Salon",
    },
    {
      id: 7,
      name: "Emergency Medical Service",
    },
    {
      id: 8,
      name: "Education Service",
    },
    {
      id: 9,
      name: "Vehicle",
    },
    {
      id: 10,
      name: "Delivery & Courier",
    },
    {
      id: 11,
      name: "Event Management & Video Photography",
    },
    {
      id: 12,
      name: "Recruitment of Permanent & Temporary Employees",
    },
    {
      id: 13,
      name: "IT Services",
    },
    {
      id: 14,
      name: "Social Services",
    },
  ];

  const [thumbnail, setThumbnail] = useState({});
  const [imgData, setImgdata] = useState({});
  // const [categories, setCategories] = useState([]);
  // const [sub_categoryId, setsub_categoryId] = useState(0);
  const [control, setControl] = useState(false);
  const {
    register,
    handleSubmit,
    resetField,

    rest,
    formState: { isDirty, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      categoryId: 0,

      thumbnail: "",
    },
  });
  console.log(categories);
  const imageHostKey = "46e1122b071589a93cdc571daf353fc7";
  const imageup = (e, data) => {
    const imgFiles = e.target.files;

    // let imgArr = [];

    let imageData = new FormData();
    imageData.set("key", imageHostKey);
    imageData.append("image", imgFiles[0]);

    axios
      .post("https://api.imgbb.com/1/upload", imageData)
      .then((res) => {
        console.log(res.data.data.display_url);
        setImgdata(res.data.data);
        setThumbnail(res.data.data.display_url); // set1st
        // imgArr.push(res.data.data.display_url);
        // console.log(imgArr);
        // setImgData2(imgArr); // set2nd
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(imageData);
  };
  // useEffect(() => {
  //   fetch("https://kormchari-api.onrender.com/subcategories")
  //     .then((res) => res.json())
  //     .then((data) =>
  //       data.map((dt) => {
  //         setsub_categoryId(dt.sub_category_id);
  //         console.log(dt);
  //       })
  //     );
  // }, [control]);

  // useEffect(() => {
  //   fetch("https://kormchari-api.onrender.com/categories")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setCategories(data);
  //     });
  // }, []);
  const onSubmit = (data) => {
    data.thumbnail = thumbnail;
    fetch("https://kormo-backend-v2.vercel.app/api/v1/subcategories", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result)
        if (result.statusCode == 200) {
          alert("Submitted");
          setControl(!control);
          // resetField("category_id");
          resetField("thumbnail");
          resetField("sub_category_title");
        } else {
          alert("Something wrong");
        }
      });

    console.log(data);

    // alert("Successfully added");
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl text-primary font-bold mb-6">
          Add New <span className="text-secondary">Sub Categories</span>
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <select
            {...register("categoryId")}
            className="select select-bordered mt-4 w-full"
          >
            {categories?.map((category, index) => {
              return (
                <>
                  console.log(category)
                  <option required value={category.id}>
                    {category.name}
                  </option>
                </>
              );
            })}
          </select>
          <input
            placeholder="Add Sub-Category"
            defaultValue=""
            className="input input-bordered mt-4 w-full"
            {...register("title")}
            required
          />

          {/* <input
            type="text"
            placeholder="Description"
            className="input input-bordered mt-4 w-full"
          /> */}
          <input
            onChange={(e) => imageup(e)}
            multiple="multiple"
            accept="image/jpeg, image/png, image/jpg"
            type="file"
            className="file-input file-input-bordered file-input-primary mt-4 w-full"
          />

          {imgData.id ? (
            <input
              type="submit"
              className=" btn btn-block btn-secondary mt-4"
            />
          ) : (
            <input
              type="submit"
              disabled
              className=" btn btn-block btn-secondary mt-4"
            />
          )}
        </form>
      </div>
    </>
  );
};

export default AddSubCategories;
