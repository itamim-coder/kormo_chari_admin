import React, { useEffect, useState } from "react";

const ManageSubCategories = () => {
  const [subcategories, setsubCategories] = useState([]);
  const [control, setControl] = useState(false);

  useEffect(() => {
    fetch("https://kormo-backend-v2.vercel.app/api/v1/subcategories")
      .then((res) => res.json())
      .then((data) => setsubCategories(data));
  }, [control]);
  console.log(subcategories);
  const handleDelete = (id) => {
    alert("are you sure?");
    fetch(`https://kormo-backend-v2.vercel.app/api/v1/subcategories/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.statusCode == 200) {
          setControl(!control);
        }
      });
    console.log(id);
  };
  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl text-primary font-bold mb-6">
          Manage <span className="text-secondary">Sub Categories</span>
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
                {/* <th>Category</th> */}
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {subcategories?.data?.map((subcategory, index) => {
                return (
                  <>
                    <tr>
                      <th>{index + 1}</th>
                      <td>{subcategory.title}</td>
                      <td>
                        <img
                          className="h-8 lg:h-20 w-8 lg:w-auto rounded-md lg:rounded-xl"
                          src={subcategory.thumbnail}
                          alt="category"
                        />
                      </td>
                      <td>Quality Control Specialist</td>
                      {/* <td>{subcategory.category}</td> */}
                      <td>
                        <button
                          onClick={() => handleDelete(subcategory?._id)}
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

export default ManageSubCategories;
