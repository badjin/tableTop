import React, { useState, useEffect } from 'react'
import { getLoginInfo } from '../helpers/auth'
import { useHistory, useLocation } from 'react-router-dom'
import Popular from './games/Popular'
import MyList from './games/MyList'

const Games = () => {
  const history = useHistory()
  const location = useLocation()
  const [isPopular, setIsPopular] = useState(true)
  
  const checkLogin = () => {
    const loginInfo = getLoginInfo()
    if(!loginInfo) history.push('/login')
    else setIsPopular(false)
  }

  useEffect(() => {
    if(location.pathname === '/games/mylist') setIsPopular(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[location])

  return (
    <div className='max-w-screen-xl m-0 lg:m-10 bg-white shadow lg:rounded-lg'>
      <div className='flex items-center justify-center p-5 space-x-5'>
        <button 
          disabled={isPopular}
          className={`uppercase ${isPopular ? 'text-primary cursor-default' : 'btn-text'}`} 
          onClick={() => setIsPopular(true)}
        >
          Popular
        </button>
        <div className='h-8 w-1 bg-gray-500'></div>
        <button 
          disabled={!isPopular}
          className={`uppercase ${isPopular ? 'btn-text' : 'text-primary cursor-default'}`} 
          onClick={checkLogin}
        >
          My List
        </button>
      </div>      
      { isPopular ? (
          <Popular />
        ) : (
          <MyList />
        )
      }      
    </div>
  )
}

export default Games
