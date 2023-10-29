import React, { useEffect } from "react";
import { useState } from "react";

const ManageOrders = () => {
  const [orderData, setOrderData] = useState({ data: [], meta: {} });
  const [currentPage, setCurrentPage] = useState(1);
  const [defaultOrderStatus, setDefaultOrderStatus] = useState("Pending");
  useEffect(() => {
    fetch(
      `https://kormo-backend-v2.vercel.app/api/v1/order?page=${currentPage}`
    )
      .then((res) => res.json())
      .then((data) => setOrderData(data));
  }, [currentPage]);

  const { data, meta } = orderData;
  const { page, limit, total } = meta;
  const totalPages = Math.ceil(total / limit);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  if (data.defaultOrderStatus) {
    setDefaultOrderStatus(data.defaultOrderStatus);
  }

  const handleStatusChange = (newStatus, id) => {
    setDefaultOrderStatus(newStatus);
    const url = `https://kormo-backend-v2.vercel.app/api/v1/order/${id}`;
    const data = {
      orderStatus: newStatus,
    };
    fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          // Request was successful
          return response.json();
        } else {
          // Handle errors here
          throw new Error("Failed to update order status");
        }
      })
      .then((responseData) => {
        // Handle the response data if needed
        console.log("Order status updated:", responseData);
        window.location.reload();
        // You may want to update your component state or perform other actions here
      })
      .catch((error) => {
        // Handle any errors that occurred during the fetch
        console.error("Error updating order status:", error);
      });
    console.log(newStatus);
    console.log(id);
    // You can also perform any other actions related to the status change here, such as making an API call to update the order status on the server.
  };

  const updateStatus = (id) => {
    console.log(id);
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl text-primary font-bold mb-6">
          Manage <span className="text-secondary">Orders</span>
        </h1>
        <div className="overflow-x-auto">
          <table className="table table-compact w-full">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Service</th>
                <th>Date</th>
                <th>Address</th>
                <th>Phone Number</th>
                <th>Paid Status </th>
                <th>Order Status </th>
                <th>Order State</th>
              </tr>
            </thead>
            <tbody>
              {data.map((order, index) => {
                console.log(order);
                return (
                  <>
                    <tr>
                      <th>{index + 1}</th>
                      <td>{order.name}</td>
                      <td>{order.email}</td>
                      <td>{order.orderDetails[0]?.title}</td>
                      <td>{new Date(order.createdAt).toLocaleString()}</td>
                      <td>{order.address}</td>
                      <td>{order.phoneNumber}</td>
                      <td>{order.paidStatus}</td>
                      <td>{order.orderStatus}</td>
                      <td>
                        <select
                          className="select select-primary w-full max-w-xs"
                          defaultValue={order.orderStatus}
                          onChange={(e) =>
                            handleStatusChange(e.target.value, order._id)
                          }
                        >
                          <option value="Pending">Pending</option>
                          <option value="On Process">On Process</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </td>
                  
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="join">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`join-item btn ${
                page === index + 1 ? "bg-primary-content text-black" : ""
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default ManageOrders;
