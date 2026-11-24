import React from 'react'
import { Routes, Route } from "react-router";
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import AboutUs from './pages/AboutUs';
import Collection from './pages/Collection';
import Navbar from './component/Navbar';
import Account from './pages/Account';
// import { Contact } from 'lucide-react';
import ProductDetails from './pages/ProductDetails';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import OrderSuccess from "./pages/OrderSuccess";
import Checkout from './pages/Checkout';
import Contacts from './pages/Contacts';

const App = () => {
    return (
        <div className='flex min-h-screen flex-col'>
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/about' element={<AboutUs />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/shop' element={<Shop />} />
                <Route path='/account' element={<Account />} />
                <Route path='/Collection' element={<Collection />} />
                <Route path='/contact' element={<Contacts/>} />
                <Route path='/product/:id' element={<ProductDetails />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/checkout" element={<Checkout/>} />
                <Route path="/order-success" element={<OrderSuccess />} />
            </Routes>
        </div>
    )
}

export default App