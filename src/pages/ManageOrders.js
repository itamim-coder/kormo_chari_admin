import React from 'react'

const ManageOrders = () => {
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
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>1</th>
                                <td>Cy Ganderton</td>
                                <td>ganderton@gmail.com</td>
                                <td>Delivery</td>
                                <td>Road 1, Sector 10, Uttara, Dhaka</td>
                                <td>
                                    <select className="select select-primary w-full max-w-xs">
                                        <option selected>Pending</option>
                                        <option>Delivered</option>
                                    </select>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default ManageOrders