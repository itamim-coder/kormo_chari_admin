import React, { useEffect, useState } from "react";

const ManageSecondSub = () => {
  const [second_sub_categories, setsecond_sub_categories] = useState([]);
  const [control, setControl] = useState(false);

  useEffect(() => {
    fetch("https://kormo-backend-v2.vercel.app/api/v1/subcategories")
      .then((res) => res.json())
      .then((data) => setsecond_sub_categories(data));
  }, [control]);

  const handleDelete = (id) => {
    alert("are you sure?");
    fetch(
      `https://kormchari-api.onrender.com/deletesecondsubcategories/${id}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        if (data.statusCode == 200) {
          setControl(!control);
        }
      });
    console.log(id);
  };
  console.log(second_sub_categories)
  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl text-primary font-bold mb-6">
          Manage Second <span className="text-secondary">Sub Categories</span>
        </h1>
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr>
                {/* <th></th> */}
                <th>Title</th>
                <th>Image</th>
                <th>Description</th>
                {/* <th>Category</th> */}
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {second_sub_categories?.data?.map((secondsubcategory) => {
                console.log(secondsubcategory)
                return (
                  <>
                    {
                      secondsubcategory.second_sub?.map((sdata) => {
                        console.log(sdata)

                        // const c=0;
                        return (
                          <>
                            <tr>
                              {/* <th>{c + 1}</th> */}
                              <td>{sdata.second_sub_category_title}</td>
                              <td>
                                <img
                                  className="h-8 lg:h-20 w-8 lg:w-auto rounded-md lg:rounded-xl"
                                  src={sdata.thumbnail}
                                  alt="category"
                                />
                              </td>
                              <td>Quality Control Specialist</td>
                              {/* <td>{secondsubcategory.category}</td> */}
                              <td>
                                <button
                                  disabled
                                  // onClick={() => handleDelete(secondsubcategory?._id)}
                                  className="btn btn-active btn-secondary ml-2"
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          </>
                        );

                      })}

                  </>
                )
              })}
            </tbody>
            {/* row 1 */}
          </table>
        </div>
      </div>
    </>
  );
};

export default ManageSecondSub;
