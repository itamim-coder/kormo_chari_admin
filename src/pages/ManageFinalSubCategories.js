import React, { useEffect, useState } from "react";

const ManageFinalSubCategories = () => {
  const [finalsubcategories, setfinalsubCategories] = useState([]);
  const [control, setControl] = useState(false);

  useEffect(() => {
    fetch("https://kormocharidb-production.up.railway.app/finalsubcategories")
      .then((res) => res.json())
      .then((data) => setfinalsubCategories(data));
  }, [control]);

   const handleDelete = (id) => {
    alert("are you sure?");
    fetch(`https://kormocharidb-production.up.railway.app/deletefinalsubcategories/${id}`, {
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
                <th>Description</th>
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
                      <td>Quality Control Specialist</td>
                      <td>{subcategory.category}</td>
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
                              <span className="text-secondary">
                                Sub Categorys
                              </span>
                            </h1>
                            <form className="flex flex-col">
                              <select className="select select-bordered mt-4 w-full">
                                <option disabled selected>
                                  Select Category
                                </option>
                                <option>Han Solo</option>
                                <option>Greedo</option>
                              </select>
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

