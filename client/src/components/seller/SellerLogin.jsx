import React, { useState, useEffect } from 'react'
import { useAppContext } from '../../context/AppContext'

const SellerLogin = () => {
  const { isSeller, setIsSeller, navigate } = useAppContext()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    if (isSeller) {
      navigate("/seller")
    }
  }, [isSeller])

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    // In real world: validate credentials here
    setIsSeller(true)
  }

  return !isSeller && (
    <form onSubmit={onSubmitHandler} className='min-h-screen flex items-center justify-center text-sm text-gray-600'>
      <div className='flex flex-col gap-5 m-auto items-start p-8 py-12 min-w-80 sm:min-w-88 rounded-lg shadow-xl border border-gray-200'>
        <p className='text-2xl font-medium m-auto'>
          <span className="text-primary">Seller</span> Login
        </p>

        <div className="w-full">
          <p>Email</p>
          <input 
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
            required
          />
        </div>

        <div className="w-full">
          <p>Password</p>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded w-full mt-4"
        >
          Login
        </button>
      </div>
    </form>
  )
}

export default SellerLogin
