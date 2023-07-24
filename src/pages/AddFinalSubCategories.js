import { data } from "autoprefixer";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const AddFinalSubCategories = () => {
  const [secondsubcategories, setsecondsubCategories] = useState([]);
  const [thumbnail, setThumbnail] = useState({});
  const [imgData, setImgdata] = useState({});
  //   const [second_sub_categoryId, setsecond_sub_categoryId] = useState(0);
  //   const [control, setControl] = useState(false);
  const {
    register,
    handleSubmit,
    resetField,
    rest,
    formState: { isDirty, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      //   second_sub_categoryId: 0,
      final_sub_category_title: "",
    },
  });
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
  //   useEffect(() => {
  //     fetch("http://localhost:8000/finalsubcategories")
  //       .then((res) => res.json())
  //       .then((data) =>
  //         data.map((dt) => {
  //         //   setsecond_sub_categoryId(dt.second_sub_category_Id);
  //           console.log(dt.second_sub_category_Id);
  //         })
  //       );
  //   }, [control]);

  //   console.log(second_sub_categoryId);

  useEffect(() => {
    fetch("https://kormchari-api.onrender.com/subcategories")
      .then((res) => res.json())
      .then((data) => {
        setsecondsubCategories(data);
      });
  }, []);
  const onSubmit = (data) => {
    // setsecond_sub_categoryId(data.second_sub_categoryId);
    // data.second_sub_category_Id = second_sub_categoryId + 1;
    data.thumbnail = thumbnail;
    fetch("https://kormchari-api.onrender.com/addfinalsubcategories", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.insertedId) {
          alert("Submitted");
          //   setControl(!control);
          // resetField("");
          resetField("final_sub_category_title");
        } else {
          alert("Something wrong");
        }
      });

    // setCategories(data);
    console.log(data);
    // console.log(categories);
    // alert("Successfully added");
  };

  return (
    <>
      <div onSubmit={handleSubmit(onSubmit)} className="container mx-auto p-4">
        <h1 className="text-3xl text-primary font-bold mb-6">
          Add final <span className="text-secondary">Sub Categories</span>
        </h1>
        <form className="flex flex-col">
          {/* <select {...register("category")} {...rest}>
            {categories.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select> */}
          <select
            // {...register("second_sub_category_id")}
            {...register("second_sub_category_title")}
            className="select select-bordered mt-4 w-full"
          >
            <option disabled selected>
              Select Second Sub Category
            </option>
            {secondsubcategories.map((subcategory, index) => {
              // console.log(subcategory)
              return (
                <>
                  {subcategory.second_sub?.map((sdata) => {
                    // console.log(sdata)
                    return (
                      <>
                        <option
                          required
                          // value={sdata.second_sub_category_Id}
                          value={sdata.second_sub_category_title}
                        >
                          {sdata.second_sub_category_title}
                        </option>
                      </>
                    );
                  })}
                </>
              );
            })}
          </select>
          <input
            placeholder="Add Final Sub-Category"
            defaultValue=""
            className="input input-bordered mt-4 w-full"
            {...register("final_sub_category_title")}
            required
          />

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

    
          {/* <button className="btn btn-block btn-secondary mt-4">Submit</button> */}
        </form>
      </div>
    </>
  );
};

export default AddFinalSubCategories;
