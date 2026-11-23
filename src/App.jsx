import React from 'react'
import { Routes, Route } from "react-router";
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import AboutUs from './pages/AboutUs';
import Collection from './pages/Collection';
import Navbar from './component/Navbar';
import Account from './pages/Account';
import { Contact } from 'lucide-react';
import ProductDetails from './pages/ProductDetails';

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
                <Route path='/shop' element={<Collection />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/product/:id' element={<ProductDetails />} />
                <Route />
            </Routes>
        </div>
    )
}

export default App