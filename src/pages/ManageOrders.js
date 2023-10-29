import React, { useEffect } from "react";
import { useState } from "react";

const ManageOrders = () => {
  const [orderData, setOrderData] = useState({ data: [], meta: {} });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch(`https://kormo-backend-v2.vercel.app/api/v1/order?page=${currentPage}`)
      .then((res) => res.json())
      .then((data) => setOrderData(data));
  }, [currentPage]);

  const { data, meta } = orderData;
  const { page, limit, total } = meta;
  const totalPages = Math.ceil(total / limit);
  console.log(data);
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
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
                <th>Order Status</th>
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
                      <td>
                        <select className="select select-primary w-full max-w-xs">
                          <option selected>Pending</option>
                          <option>Delivered</option>
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
            className={`join-item btn ${page === index + 1 ? 'bg-primary-content text-black' : ''}`}
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
