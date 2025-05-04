import React, { use, useEffect } from 'react'
import { useAppContext } from '../context/AppContext'
import { useLocation } from 'react-router-dom'

const Loading = () => {
    // This component is used to show a loading spinner while the app is loading
    const {navigate} = useAppContext()
    let {search} = useLocation()
    const params = new URLSearchParams(search)
    const nextUrl = query.get('next')

    useEffect(() => {
        if (nextUrl) {
            navigate(setTimeout(() => {
                navigate(`/${nextUrl}`)
            }, 5000))
        }
    }, [nextUrl])

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className="animate-spin rounded-full h-24 w-24 border-4 border-gray-300 border-t-primary"></div>
      
    </div>
  )
}

export default Loading
