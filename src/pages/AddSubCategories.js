import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const AddSubCategories = () => {
  const [categories, setCategories] = useState([]);
  const {
    register,
    handleSubmit,
    resetField,
    rest,
    formState: { isDirty, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      category: "",
      sub_category_title: "",
    },
  });

  const onSubmit = (data) => {
    fetch("https://kormochariapi.vercel.app/subcategories", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.insertedId) {
            alert("Submitted");
          }
          else{
            alert("Something wrong")
          }
        },
        // console.log(result.insertedId),

        resetField("category"),
        resetField("sub_category_title")

        //         if(result.insertedId){
        // alert("SUbmitted")
        //         }
      );
    console.log(data);
    // alert("Successfully added");
  };

  useEffect(() => {
    fetch("https://kormochariapi.vercel.app/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);
  return (
    <>
      <div onSubmit={handleSubmit(onSubmit)} className="container mx-auto p-4">
        <h1 className="text-3xl text-primary font-bold mb-6">
          Add New <span className="text-secondary">Sub Categories</span>
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
            {...register("category")}
            className="select select-bordered mt-4 w-full"
          >
            <option disabled selected>
              Select Category
            </option>
            {categories.map((category, index) => {
              return (
                <>
                  <option required value={category.title}>{category.title}</option>
                </>
              );
            })}
          </select>
          <input
            placeholder="Add Sub-Category"
            defaultValue=""
            className="input input-bordered mt-4 w-full"
            {...register("sub_category_title")}
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

export default AddSubCategories;
