import { data } from "autoprefixer";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const AddSubCategories = () => {
  const [categories, setCategories] = useState([]);
  const [sub_categoryId, setsub_categoryId] = useState(0);
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
      category_id: 0,
      sub_category_title: "",
    },
  });
  console.log(categories);
  useEffect(() => {
    fetch("https://kormocharidb-production.up.railway.app/subcategories")
      .then((res) => res.json())
      .then((data) =>
        data.map((dt) => {
          setsub_categoryId(dt.sub_category_id);
          console.log(dt);
        })
      );
  }, [control]);

  useEffect(() => {
    fetch("https://kormocharidb-production.up.railway.app/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      });
  }, []);
  const onSubmit = (data) => {
    data.sub_category_id = sub_categoryId + 1;
    setsub_categoryId(data.sub_categoryId);
    fetch("https://kormocharidb-production.up.railway.app/subcategories", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.insertedId) {
            alert("Submitted");
            setControl(!control);
              // resetField("category");
              resetField("sub_category_title");
          } else {
            alert("Something wrong");
          }
        }
        // console.log(result.insertedId),

        //         if(result.insertedId){
        // alert("SUbmitted")
        //         }
      );
    // setCategories(data);
    console.log(data);
    console.log(categories);
    // alert("Successfully added");
  };

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
            {...register("category_id")}
            className="select select-bordered mt-4 w-full"
          >
            <option selected>Select Category</option>
            {categories.map((category, index) => {
              return (
                <>
                  <option required value={category.category_id}>
                    {category.title}
                  </option>
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
