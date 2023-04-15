import { data } from "autoprefixer";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const Add_Second_Sub = () => {
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
      //   second_sub_categoryId: 0,
      second_sub_category_title: "",
    },
  });
  //   console.log(categories);
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


  useEffect(() => {
    fetch("https://kormocharidb-production.up.railway.app/subcategories")
      .then((res) => res.json())
      .then((data) => {
        setsubCategories(data);
      });
  }, []);
  const onSubmit = (data) => {
    setsecond_sub_categoryId(data.second_sub_categoryId);
    data.second_sub_category_Id = second_sub_categoryId + 1;
    fetch("https://kormocharidb-production.up.railway.app/secondsubcategories", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.insertedId) {
          alert("Submitted");
          setControl(!control);
          // resetField("");
          resetField("second_sub_category_title");
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
          <select
            {...register("sub_category_id")}
            className="select select-bordered mt-4 w-full"
          >
            <option selected>Select Sub Category</option>
            {subcategories.map((subcategory, index) => {
              return (
                <>
                  <option required value={subcategory.sub_category_id}>
                    {subcategory.sub_category_title}
                  </option>
                </>
              );
            })}
          </select>
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
          {/* <input
            type="file"
            className="file-input file-input-bordered file-input-primary mt-4 w-full"
          /> */}
          <input type="submit" className="btn btn-block btn-secondary mt-4" />
          {/* <button className="btn btn-block btn-secondary mt-4">Submit</button> */}
        </form>
      </div>
    </>
  );
};

export default Add_Second_Sub;
