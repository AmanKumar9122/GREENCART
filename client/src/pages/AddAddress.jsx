import React, { useState } from 'react'
import { assets } from '../assets/assets'

// Input Field Component
const InputField = ({ type, placeholder, name, handleChange, address }) => {
  return (
    <input
      className='w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-grey-500 focus:border-primary transition'
      type={type}
      placeholder={placeholder}
      onChange={handleChange}
      name={name}
      value={address[name]}
      required
    />
  )
}

const AddAddress = () => {
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({ ...prevAddress, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log("Address Submitted:", address);
    // submit logic here
  };

  return (
    <div className='mt-16 pb-16'>
      <p className='text-2xl md:text-3xl text-gray-500'>
        Add Shipping <span className='font-semibold text-primary'>Address</span>
      </p>
      <div className='flex flex-col-reverse md:flex-row justify-between mt-10'>
        <div>
          <form onSubmit={onSubmitHandler} className='space-y-3 mt-6 text-sm'>

            <div className='grid grid-cols-2 gap-4'>
            <InputField handleChange={handleChange} address={address} name='firstName' type="text" placeholder="First Name" />
            <InputField handleChange={handleChange} address={address} name='lastName' type="text" placeholder="Last Name" />
            </div>

            <div className='grid grid-cols-2 gap-4'>
            <InputField handleChange={handleChange} address={address} name='email' type="email" placeholder="Email" />
            <InputField handleChange={handleChange} address={address} name='street' type="text" placeholder="Street" />
            </div>

            <div className='grid grid-cols-2 gap-4'>
            <InputField handleChange={handleChange} address={address} name='city' type="text" placeholder="City" />
            <InputField handleChange={handleChange} address={address} name='state' type="text" placeholder="State" />
            </div>

            <div className='grid grid-cols-2 gap-4'>
            <InputField handleChange={handleChange} address={address} name='country' type="text" placeholder="Country" />
            <InputField handleChange={handleChange} address={address} name='pincode' type="text" placeholder="Pincode" />
            </div>

            <InputField handleChange={handleChange} address={address} name='phone' type="text" placeholder="Phone" />
            <button type='submit' className='w-full bg-primary text-white py-2 rounded hover:bg-primary-dull transition'>SAVE ADDRESS</button>

          </form>
        </div>
        <img className="md:mr-16 mb-16 md:mt-0" src={assets.add_address_iamge} alt="Add Address" />
      </div>
    </div>
  );
};

export default AddAddress;
