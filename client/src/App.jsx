import React from 'react';
import Navbar from './components/Navbar';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import { Toaster } from 'react-hot-toast';
import Footer from './components/Footer';
import { useAppContext } from './context/AppContext';
import Login from './components/Login';
import AllProducts from './pages/AllProducts';
import ProductCategory from './pages/ProductCategory';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import SellerLogin from './components/seller/SellerLogin';
import SellerLayout from './pages/seller/SellerLayout';
import AddProduct from './pages/seller/AddProduct';
import ProductList from './pages/seller/ProductList';
import Orders from './pages/seller/Orders';

const App = () => {
  const isSellerPath = useLocation().pathname.includes('seller');
  const { showUserLogin, isSeller } = useAppContext();

  return (
    <div className="text-default min-h-screen text-grey-700 bg-white">
      {isSellerPath ? null : <Navbar />}
      {showUserLogin ? <Login /> : null}

      <Toaster />

      <div className={`${isSellerPath ? '' : 'px-6 md:px-16 lg:px-24 xl:px-32'}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/:category" element={<ProductCategory />} />
          <Route path="/products/:category/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          
          <Route path="/seller" element={isSeller ? <SellerLayout /> : <SellerLogin />}>
            <Route path="add-product" element={isSeller ? <AddProduct /> : null} />
            <Route path="product-list" element={isSeller ? <ProductList /> : null} />
            <Route path="orders" element={isSeller ? <Orders /> : null} />
          </Route>
        </Routes>
      </div>
      
      {!isSellerPath && <Footer />}
    </div>
  );
};

export default App;
