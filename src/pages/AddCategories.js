import React from 'react'

const AddCategories = () => {
    return (
        <>
            <div className='container mx-auto p-4'>
                <h1 className='text-3xl text-primary font-bold mb-6'>Add New <span className='text-secondary'>Categories</span></h1>
                <form className='flex flex-col'>
                    <input type="text" placeholder="Title" className="input input-bordered mt-4 w-full" />
                    <input type="text" placeholder="Description" className="input input-bordered mt-4 w-full" />
                    <input type="file" className="file-input file-input-bordered file-input-primary mt-4 w-full" />
                    <button className="btn btn-block btn-secondary mt-4">Submit</button>
                </form>
            </div>
        </>
    )
}

export default AddCategories