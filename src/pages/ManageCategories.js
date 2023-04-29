import React, { useEffect, useState } from "react";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [control, setControl] = useState(false);

  useEffect(() => {
    fetch("https://kormchari-api.onrender.com/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, [control]);

  const handleDelete = (id) => {
    alert("are you sure?");
    fetch(
      `https://kormchari-api.onrender.com/deletecategory/${id}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount) {
          setControl(!control);
        }
      });
    console.log(id);
  };
  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl text-primary font-bold mb-6">
          Manage <span className="text-secondary">Categories</span>
        </h1>
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Title</th>
                <th>Image</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => {
                return (
                  <>
                    <tr>
                      <th>{index + 1}</th>
                      <td>{category.title}</td>
                      <td>
                        <img
                          className="h-8 lg:h-20 w-8 lg:w-auto rounded-md lg:rounded-xl"
                          src={category.thumbnail}
                          alt="category"
                        />
                      </td>
                      <td>Quality Control Specialist</td>
                      <td>
                        <button
                          onClick={() => handleDelete(category?._id)}
                          className="btn btn-active btn-secondary ml-2"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </>
                );
              })}
              {/* row 1 */}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ManageCategories;
