import React, { useEffect, useState } from 'react'
import { dummyOrders } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([])
  const { currency } = useAppContext()

  const fetchMyOrders = async () => {
    setMyOrders(dummyOrders)
  }

  useEffect(() => {
    fetchMyOrders()
  }, [])

  return (
    <div className='mt-16 pb-16'>
      <div className='flex flex-col items-end w-max mb-8'>
        <p className='text-2xl font-medium uppercase'>My Orders</p>
        <div className='w-16 h-0.5 bg-primary rounded-full'></div>
      </div>

      {myOrders.map((order, index) => (
        <div
          key={order._id || index}
          className='border border-gray-300 rounded-lg mb-10 p-4 py-5 max-w-4xl w-full'
        >
          <p className='flex justify-between md:items-center text-gray-400 md:font-medium max-md:flex-col'>
            <span>Order ID: {order._id}</span>
            <span>Payment: {order.paymentType}</span>
            <span>Total Amount: {currency} {order.amount}</span>
          </p>

          <div className='mt-6'>
            {order.items.map((item, i) => (
              <div key={item._id || i} className='flex justify-between items-start border-b py-4 gap-4'>
                {/* Left section: Image and details */}
                <div className='flex items-center'>
                  <div className='bg-primary/10 p-4 rounded-lg'>
                    <img
                      src={item.product?.image?.[0] || '/fallback.jpg'}
                      alt={item.product?.name || 'Product Image'}
                      className='w-16 h-16 object-cover'
                    />
                  </div>
                  <div className='ml-4'>
                    <h2 className='text-lg font-semibold text-gray-800'>{item.product?.name}</h2>
                    <p className='text-sm text-gray-500'>Category: {item.product?.category}</p>
                  </div>
                </div>

                {/* Right section */}
                <div className='text-right text-sm text-gray-600'>
                  <p>Quantity: {item.quantity || 1}</p>
                  <p>Status: {order.status}</p>
                  <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default MyOrders
