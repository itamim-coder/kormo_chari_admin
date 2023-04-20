import { data } from "autoprefixer";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const Add_Second_Sub = () => {
  const [thumbnail, setThumbnail] = useState({});
  const [subcategories, setsubCategories] = useState([]);
  const [second_sub_categoryId, setsecond_sub_categoryId] = useState(0);
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
      sub_category_id: [0],
      //   second_sub_categoryId: 0,
      second_sub_category_title: "",
      thumbnail: "",
    },
  });
  //   console.log(categories);
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
    fetch("https://kormocharidb-production.up.railway.app/secondsubcategories")
      .then((res) => res.json())
      .then((data) =>
        data.map((dt) => {
          setsecond_sub_categoryId(dt.second_sub_category_Id);
          console.log(dt.second_sub_category_Id);
        })
      );
  }, [control]);

  console.log(second_sub_categoryId);

  const getid=(id)=>{
    console.log(id)
  }

  useEffect(() => {
    fetch("https://kormocharidb-production.up.railway.app/subcategories")
      .then((res) => res.json())
      .then((data) => {
        setsubCategories(data);
      });
  }, []);
  // const onSubmit = (data) => {
  //   setsecond_sub_categoryId(data.second_sub_categoryId);
  //   data.second_sub_category_Id = second_sub_categoryId + 1;
  //   data.thumbnail = thumbnail;
  //   fetch(
  //     "https://kormocharidb-production.up.railway.app/secondsubcategories",
  //     {
  //       method: "POST",
  //       headers: { "content-type": "application/json" },
  //       body: JSON.stringify(data),
  //     }
  //   )
  //     .then((res) => res.json())
  //     .then((result) => {
  //       if (result.insertedId) {
  //         alert("Submitted");
  //         setControl(!control);
  //         // resetField("");
  //         resetField("second_sub_category_title");
  //       } else {
  //         alert("Something wrong");
  //       }
  //     });

  //   // setCategories(data);
  //   console.log(data);
  //   // console.log(categories);
  //   // alert("Successfully added");
  // };

  const onSubmit = (data , e) => {
       
    console.log(data)
    // fetch(`https://drone-shop.onrender.com/status/${sub_category_id}`, {
    //     method: "PUT",
    //     headers: { "content-type": "application/json" },
    //     body: JSON.stringify(data),
    //   })
    //     .then((res) => res.json())
    //     .then((result) => console.log(result));
    //     e.preventDefault()
    };

  return (
    <>
      <div onSubmit={handleSubmit(onSubmit)} className="container mx-auto p-4">
        <h1 className="text-3xl text-primary font-bold mb-6">
          Add Second <span className="text-secondary">Sub Categories</span>
        </h1>
        <form className="flex flex-col">
          {/* <select {...register("category")} {...rest}>
            {categories.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select> */}
          {/* <select
            {...register("sub_category_id")}
            // onChange={getid( this)}
            className="select select-bordered mt-4 w-full"
          > */}
            {/* <option selected>Select Sub Category</option> */}
            {subcategories.map((subcategory, index) => {
              return (
                <>
                  <button  onClick={()=>getid(subcategory?._id)} value={subcategory?._id}>

                    {subcategory.sub_category_title}
                  </button>
                  {/* <option required value={subcategory.sub_category_id}>
                    {subcategory.sub_category_title}
                  </option> */}
                </>
              );
            })}
          {/* </select> */}
          <input
            placeholder="Add Second Sub-Category"
            defaultValue=""
            className="input input-bordered mt-4 w-full"
            {...register("second_sub_category_title")}
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
          <input type="submit" className="btn btn-block btn-secondary mt-4" />
          {/* <button className="btn btn-block btn-secondary mt-4">Submit</button> */}
        </form>
      </div>
    </>
  );
};

export default Add_Second_Sub;
