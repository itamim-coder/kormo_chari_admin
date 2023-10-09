import React, { useEffect, useState } from "react";

const ManageFinalSubCategories = () => {
  const [finalsubcategories, setfinalsubCategories] = useState([]);
  const [control, setControl] = useState(false);

  useEffect(() => {
    fetch("https://kormchari-api.onrender.com/finalsubcategories")
      .then((res) => res.json())
      .then((data) => setfinalsubCategories(data));
  }, [control]);

  const handleDelete = (id) => {
    alert("are you sure?");
    fetch(`https://kormchari-api.onrender.com/deletefinalsubcategories/${id}`, {
      method: "DELETE",
    })
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
          Manage Final<span className="text-secondary">Sub Categories</span>
        </h1>
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Title</th>
                <th>thumbnail</th>
                <th>Category</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {finalsubcategories.map((subcategory, index) => {
                return (
                  <>
                    <tr>
                      <th>{index + 1}</th>
                      <td>{subcategory.final_sub_category_title}</td>
                      <td>
                        <img
                          className="h-8 lg:h-20 w-8 lg:w-16 rounded-md lg:rounded-xl"
                          src={subcategory.thumbnail}
                          alt="category"
                        />
                      </td>
                      <td>{subcategory.second_sub_category_title}</td>
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

export default ManageFinalSubCategories;
