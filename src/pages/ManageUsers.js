import React from 'react'

const ManageUsers = () => {
    return (
        <>
            <div className='container mx-auto p-4'>
                <h1 className='text-3xl text-primary font-bold mb-6'>Manage <span className='text-secondary'>Users</span></h1>
                <div className="overflow-x-auto">
                    <table className="table table-compact w-full">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Last Login</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>1</th>
                                <td>Cy Ganderton</td>
                                <td>ganderton@gmail.com</td>
                                <td>12/16/2020</td>
                                <td>
                                    <button className="btn btn-active btn-secondary ml-2">Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default ManageUsers