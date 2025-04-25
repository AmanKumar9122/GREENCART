import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import ProductCard from "../components/ProductCard";

const ProductDetails = () => {
  const { products, navigate, currency, addToCart } = useAppContext();
  const { id } = useParams();

  // Find the current product
  const product = products.find(item => item._id === id);

  // Local state
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);

  // Build related products once product is available
  useEffect(() => {
    if (product) {
      const related = products
        .filter(
          item =>
            item.category === product.category &&
            item._id !== product._id &&
            item.inStock
        )
        .slice(0, 5);
      setRelatedProducts(related);
    }
  }, [product, products]);

  // Set the main thumbnail when product loads
  useEffect(() => {
    setThumbnail(product?.image[0] ?? null);
  }, [product]);

  // Fallback if no product found
  if (!product) {
    return (
      <div className="flex justify-center items-center mt-20">
        <p className="text-gray-500">Product not found or loading…</p>
      </div>
    );
  }

  return (
    <div className="mt-12 px-4 md:px-0">
      {/* Breadcrumb */}
      <p className="text-sm text-gray-600 mb-4">
        <Link to="/" className="hover:underline">Home</Link> /
        <Link to="/products" className="hover:underline ml-1">Products</Link> /
        <Link
          to={`/products/${product.category.toLowerCase()}`}
          className="hover:underline ml-1 capitalize"
        >
          {product.category}
        </Link> /
        <span className="text-primary ml-1">{product.name}</span>
      </p>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-16">
        {/* Thumbnails & Main Image */}
        <div className="flex gap-4">
          <div className="flex flex-col gap-3">
            {product.image.map((imgUrl, idx) => (
              <div
                key={idx}
                onClick={() => setThumbnail(imgUrl)}
                className="border border-gray-300 rounded overflow-hidden cursor-pointer max-w-[60px]"
              >
                <img
                  src={imgUrl}
                  alt={`${product.name} thumbnail ${idx + 1}`}
                  className="w-full h-auto"
                />
              </div>
            ))}
          </div>
          <div className="border border-gray-300 rounded overflow-hidden flex-shrink-0">
            <img
              src={thumbnail}
              alt={`${product.name} selected`}
              className="w-[300px] h-auto"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1 text-gray-700">
          <h1 className="text-3xl font-semibold mb-2">{product.name}</h1>
          <div className="flex items-center gap-1 mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <img
                key={i}
                src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                alt={`${i < 4 ? "filled" : "empty"} star`}
                className="w-4 h-4"
              />
            ))}
            <span className="ml-2 text-sm text-gray-500">(4)</span>
          </div>

          <div className="mb-6">
            <p className="line-through text-gray-500">
              MRP: {currency}{product.price}
            </p>
            <p className="text-2xl font-medium">
              MRP: {currency}{product.offerPrice}
            </p>
            <p className="text-xs text-gray-500">(inclusive of all taxes)</p>
          </div>

          <div className="mb-6">
            <p className="font-medium mb-2">About this product</p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
              {product.description.map((line, idx) => (
                <li key={idx}>{line}</li>
              ))}
            </ul>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => addToCart(product._id)}
              className="flex-1 py-3 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 transition"
            >
              Add to Cart
            </button>
            <button
              onClick={() => { 
                navigate("/cart");
                window.scrollTo(0, 0);
              }}
              className="flex-1 py-3 bg-primary text-white rounded hover:bg-primary-dull transition"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-20 flex flex-col items-center">
          <div className="flex flex-col items-center">
            <p className="text-3xl font-medium">Related Products</p>
            <div className="w-20 h-0.5 bg-primary rounded-full mt-2"></div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-6 w-full">
            {relatedProducts.map(item => (
              <ProductCard key={item._id} product={item} />
            ))}
          </div>

          <button
            onClick={() => {
              navigate("/products");
              window.scrollTo(0, 0);
            }}
            className="mt-8 px-12 py-3 border border-primary text-primary rounded hover:bg-primary/10 transition"
          >
            See More
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
