import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentBgImage } from '../redux'
import GamePanel from '../components/boardGames/GamePanel'



const Home = () => {
  const dispatch = useDispatch()
  const bgImages = useSelector(state => state.bgImage.bgImages)
  const currentBgImage = useSelector(state => state.bgImage.currentBgImage)
  const [ backgroundImage, setBackgroundImage ] = useState('')
  
  useEffect(() => {
    let tempImage = ''
    while(true){
      tempImage = bgImages[Math.floor(Math.random() * 20)].urls.regular
      if(currentBgImage !== tempImage) break
    }
    dispatch(setCurrentBgImage(tempImage))
    setBackgroundImage(tempImage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
      
    <div className='max-w-screen-xl m-0 lg:m-10 bg-white shadow lg:rounded-lg'>
      {backgroundImage && 
        (
          <>
            <div className='flex flex-col sm:flex-row items-center p-10'>
              <div className='sm:w-1/2 px-5'>
                <h2 className='text-4xl text-gray-500 mb-6'>Welcome</h2>
                <p>For you who are tired of your daily life, we recommend a board game to play with your family or friends. Don't think about what to play among the games you have. Sign up now and make your own game list right away. And get recommendations.</p>
                <div className='my-3 mb-4 flex items-center justify-center'>
                  <button className='btn-round text-secondary-100 border-secondary-100 hover:bg-secondary-100 focus:outline-none'>Guest Login</button>
                </div>
              </div>
              <div className='sm:w-1/2 overflow-hidden'>
                <img className='w-full max-h-80 object-cover bg-cover bg-center bg-no-repeat rounded' src={backgroundImage} alt="Welcome"/>
              </div>              
            </div>

            <div className='px-10'>
              <h2 className='text-4xl text-gray-500 px-5'>Popular Board games</h2>
              <p className='px-5 mb-6'>These are the most popular board games widely loved by the community in terms of consistency in game page visits, number of ratings, mentions, and other criteria.</p>
              <GamePanel />
              <div className="flex items-center justify-center mb-4">
                <Link to='/games' className='btn-text text-sm'>See More</Link>
              </div>
            </div>
          </>
        )
      }      
    </div>
  )
}

export default Home