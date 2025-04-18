import React from 'react'
import MainBanner from '../components/MainBanner'
import Categories from '../components/Categories'
import BestSeller from '../components/BestSeller'

const Home = () => {
  return (
    <div className='mt-10'>
      <MainBanner/>
      <Categories/>
      <BestSeller/>
    </div>
  )
}

export default Home
