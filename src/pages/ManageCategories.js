import React, { useEffect, useState } from "react";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [control, setControl] = useState(false);

  useEffect(() => {
    fetch("https://kormocharidb-production.up.railway.app/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, [control]);

  const handleDelete = (id) => {
    alert("are you sure?");
    fetch(
      `https://kormocharidb-production.up.railway.app/deletecategory/${id}`,
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
                        {/* The button to open modal */}
                        <label
                          htmlFor="my-modal"
                          className="btn btn-outline btn-primary"
                        >
                          Edit
                        </label>

                        {/* Put this part before </body> tag */}
                        <input
                          type="checkbox"
                          id="my-modal"
                          className="modal-toggle"
                        />
                        <div className="modal">
                          <div className="modal-box relative">
                            <h1 className="text-3xl text-primary font-bold mb-6">
                              Edit{" "}
                              <span className="text-secondary">Category</span>
                            </h1>
                            <form className="flex flex-col">
                              <input
                                type="text"
                                placeholder="Title"
                                className="input input-bordered mt-4 w-full"
                              />
                              <input
                                type="text"
                                placeholder="Description"
                                className="input input-bordered mt-4 w-full"
                              />
                              <input
                                type="file"
                                className="file-input file-input-bordered file-input-primary mt-4 w-full"
                              />
                              <button className="btn btn-block btn-secondary mt-4">
                                Submit
                              </button>
                            </form>
                            <div className="modal-action">
                              <label
                                htmlFor="my-modal"
                                className="btn btn-ghost"
                              >
                                Close
                              </label>
                            </div>
                          </div>
                        </div>
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
