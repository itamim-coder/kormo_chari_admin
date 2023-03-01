import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink
} from "react-router-dom";
import AddCategories from './pages/AddCategories';
import ManageCategories from './pages/ManageCategories';
import AddSubCategories from './pages/AddSubCategories';
import ManageSubCategories from './pages/ManageSubCategories';
import ManageOrders from './pages/ManageOrders';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <BrowserRouter>
      <div className="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <div className="navbar bg-base-200">
            <div className="navbar-start">
              <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost drawer-button lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
              </label>
              <NavLink to='/' className="btn btn-ghost font-bold text-primary text-xl">LOGO</NavLink>
            </div>
            <div className="navbar-end">
              <button className="btn btn-ghost btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </button>
              <button className="btn btn-ghost btn-circle">
                <div className="indicator">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                  <span className="badge badge-xs badge-primary indicator-item"></span>
                </div>
              </button>
            </div>
          </div>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/addcategories" element={<AddCategories />} />
            <Route path="/managecategories" element={<ManageCategories />} />
            <Route path="/addsubcategories" element={<AddSubCategories />} />
            <Route path="/managesubcategories" element={<ManageSubCategories />} />
            <Route path="/manageorders" element={<ManageOrders />} />
          </Routes>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-64 bg-base-200 text-base-content">
            <h1 className='text-2xl text-primary font-bold'>Admin<span className='text-secondary'>Panel</span></h1>
            <li>
              <NavLink to='/' className='text-lg mt-6'>Dashboard</NavLink>
            </li>
            <li>
              <div className="dropdown dropdown-bottom mt-1">
                <label tabIndex={0} className='flex text-lg'>
                  Categories
                  <svg className="fill-current ml-2.5 mt-1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>
                </label>
                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                  <li>
                    <NavLink to='/addcategories' className='text-lg mt-1'>Add Categories</NavLink>
                  </li>
                  <li>
                    <NavLink to='/managecategories' className='text-lg mt-1'>Manage Categories</NavLink>
                  </li>
                  <li>
                    <NavLink to='/addsubcategories' className='text-lg mt-1'>Add Sub Categories</NavLink>
                  </li>
                  <li>
                    <NavLink to='/managesubcategories' className='text-lg mt-1'>Manage Sub Categories</NavLink>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <NavLink to='/manageorders' className='text-lg mt-1'>Manage Orders</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </BrowserRouter>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
