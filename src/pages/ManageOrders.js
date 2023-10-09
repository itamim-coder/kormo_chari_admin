import React, { useEffect } from 'react'
import { useState } from 'react';

const ManageOrders = () => {
    const [order_data, setorder_data] = useState([]);
    const [control, setControl] = useState(false);
  
    useEffect(() => {
      fetch("https://kormchari-api.onrender.com/orders")
        .then((res) => res.json())
        .then((data) => setorder_data(data));
    }, [control]);
  
    return (
        <>
            <div className='container mx-auto p-4'>
                <h1 className='text-3xl text-primary font-bold mb-6'>Manage <span className='text-secondary'>Orders</span></h1>
                <div className="overflow-x-auto">
                    <table className="table table-compact w-full">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Service</th>
                                <th>Address</th>
                                <th>Phone Number</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                        {order_data.map((order, index) => {
                            console.log(order)
                            return(
                                <>
                                
                            <tr>
                                <th>{index+1}</th>
                                <td>{order.name}</td>
                                <td>{order.email}</td>
                                <td>{order.orderDetails.final_sub_category_title}</td>
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
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default ManageOrders