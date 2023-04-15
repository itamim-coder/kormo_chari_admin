import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const AddCategories = () => {
  const [thumbnail, setThumbnail] = useState({});
  const [img, setImg] = useState({});
  // const [id,setid]
  const [categoryId, setcategoryId] = useState(0);
  const {
    register,
    handleSubmit,
    resetField,
    formState: { isDirty, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      thumbnail: "",
   
    },
  });
  console.log(thumbnail);
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
  useEffect(() => {
    fetch("https://kormocharidb-production.up.railway.app/categories")
      .then((res) => res.json())
      .then((data) => console.log(data.map((dt)=>setcategoryId(dt.category_id))));
  }, []);


  const onSubmit = (data) => {
    data.category_id = categoryId + 1;
    setcategoryId(data.category_id);
    data.thumbnail = thumbnail;
    fetch("https://kormocharidb-production.up.railway.app/categories", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          {
            if (result.insertedId) {
              alert("Submitted");
              resetField("title");
              resetField("thumbnail");
            } else {
              alert("Something wrong");
            }
          }
        }
        // console.log(result),
      );
    console.log(data);
    // for (key in formData){

    // }
    // console.log(e.target.files);

    // alert("Successfully added");
  };
  return (
    <>
      <div className="container mx-auto p-4" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-3xl text-primary font-bold mb-6">
          Add New <span className="text-secondary">Categories</span>
        </h1>
        <form className="flex flex-col">
          <input
            placeholder="Title"
            defaultValue=""
            className="input input-bordered mt-4 w-full"
            {...register("title")}
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
          <input type="submit" className="btn btn-block btn-secondary mt-4" />
          {/* <input type="submit" className="btn btn-block btn-secondary mt-4">Submit</input> */}
        </form>
      </div>
    </>
  );
};

export default AddCategories;
