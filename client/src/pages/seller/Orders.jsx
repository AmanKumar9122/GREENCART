import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import { assets, dummyOrders } from '../../assets/assets'

const Orders = () => {
  const { currency , axios} = useAppContext()
  const [orders, setOrders] = useState([])

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get('/api/orders/seller')
      if (data.success) {
        setOrders(data.orders)
      } else {
        console.error(data.message)
      }
    } catch (error) {
      
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  return (
    <div className="no-scrollbar flex flex-1 h-[95vh] overflow-y-scroll"> 
      <div className="md:p-10 p-4 space-y-4 w-full">
        <h2 className="text-lg font-medium">Orders List</h2>
        {orders.map((order, index) => (
          <div key={index} className="flex flex-col md:flex-row gap-5 p-5 w-full max-w-6xl rounded-md border border-gray-300 bg-white shadow-sm">
            
            {/* Order Items */}
            <div className="flex gap-4 min-w-[220px] max-w-[300px]">
              <img className="w-12 h-12 object-cover" src={assets.box_icon} alt="boxIcon" />
              <div>
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex flex-col">
                    <p className="font-medium">
                      {item.product.name}
                      <span className={`text-primary ${item.quantity < 2 ? "hidden" : ""}`}> x {item.quantity}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Address */}
            <div className="text-sm md:text-base text-black/60 min-w-[200px] max-w-[300px]">
              <p className="text-black font-medium">{order.address.firstName} {order.address.lastName}</p>
              <p>{order.address.street}, {order.address.city}</p>
              <p>{order.address.state}, {order.address.zipcode}, {order.address.country}</p>
              <p>{order.address.phone}</p>
            </div>

            {/* Amount */}
            <div className="flex items-center justify-center text-lg font-semibold min-w-[100px]">
              {currency}{order.amount}
            </div>

            {/* Payment Info */}
            <div className="text-sm md:text-base text-black/60 flex flex-col justify-center min-w-[160px] max-w-[200px]">
              <p>Method: {order.paymentType}</p>
              <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              <p>Payment: {order.isPaid ? "Paid" : "Pending"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders
