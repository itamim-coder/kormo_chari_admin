// import { data } from "autoprefixer";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

const Add_Second_Sub = () => {
  const [thumbnail, setThumbnail] = useState({});
  const [imgData, setImgdata] = useState({});
  const [subcategories, setsubCategories] = useState([]);
  const [control, setControl] = useState(false);
  const [second_sub_categoryId, setsecond_sub_categoryId] = useState(0);
  const [id, setid] = useState();
  const {
    register,
    handleSubmit,
    resetField,
    rest,
    formState: { isDirty, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      // sub_category_id: [0],
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
  //   fetch("http://localhost:8000/secondsubcategories")
  //     .then((res) => res.json())
  //     .then((data) =>
  //       data.map((dt) => {
  //         setsecond_sub_categoryId(dt.second_sub_category_Id);
  //         console.log(dt.second_sub_category_Id);
  //       })
  //     );
  // }, [control]);
  useEffect(() => {
    const maxarr = [];
    fetch("https://kormchari-api.onrender.com/subcategories")
      .then((res) => res.json())
      .then((data) =>
        // console.log("loaddata"),

        data.map((dt) => {
          let max = 0;

          dt.second_sub.map((d) => {
            console.log(d)
            console.log(d.second_sub_category_Id)
            if (max < d.second_sub_category_Id) {
              max = d.second_sub_category_Id;
            }
          });
          //   //
          //   // console.log(dt.second_sub_category_Id);
          // }

          maxarr.push(max);
          const maxx = Math.max(...maxarr);
          console.log("maxx", maxx);
          setsecond_sub_categoryId(maxx);

        })
      );
  }, [control]);

  console.log("updated", second_sub_categoryId);

  const getid = (id) => {
    console.log(id);

    setid(id);
  };
  console.log(imgData)
  useEffect(() => {
    fetch("https://kormchari-api.onrender.com/subcategories")
      .then((res) => res.json())
      .then((data) => {
        setsubCategories(data);
      });
  }, []);


  const onSubmit = (data, e) => {
    resetField("second_sub_category_title");
    data.second_sub_category_Id = second_sub_categoryId + 1;
    setsecond_sub_categoryId(data.second_sub_category_Id);
    data.thumbnail = thumbnail;
    // console.log(data);
    fetch(`https://kormchari-api.onrender.com/subcategories/${id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => console.log(res))
      .then((result) => {
        {
          console.log(result);
          alert("Submitted");
          // setImgdata();
        }
      });
    // e.preventDefault();
    setImgdata({})
    setThumbnail({})
    setControl(!control);

  };

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl text-primary font-bold mb-6">
          Add Second <span className="text-secondary">Sub Categories</span>
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <h1 className="text-xl text-primary font-bold mb-6">
            Select <span className="text-secondary">Sub Category</span>
          </h1>

          <div className="grid grid-cols-2 gap-4">
            {subcategories.map((subcategory, index) => {
              return (
                <>
                  <button
                    onClick={() => getid(subcategory?._id)}
                    value={subcategory?._id}
                    className="btn btn-primary"
                  >
                    {subcategory.sub_category_title}
                  </button>

                </>
              );
            })}
          </div>

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

export default Add_Second_Sub;
