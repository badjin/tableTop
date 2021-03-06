import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentBgImage } from '../redux'


const SidePanel = () => {
  const dispatch = useDispatch()
  const bgImages = useSelector(state => state.bgImage.bgImages)
  const currentBgImage = useSelector(state => state.bgImage.currentBgImage)
  const location = useLocation()
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
  }, [location])

  return (
    <>
      {backgroundImage && 
        <div className='w-full bg-cover bg-center bg-no-repeat' style={{ backgroundImage: `url(${backgroundImage})` }} >
          <div className='flex flex-col justify-end h-full bg-indigo-900 bg-opacity-30'>
            <h1 className='p-12 text-left text-xl text-gray-100'>Make your own game diary and keep your memories with your friends or family.</h1>
          </div>
        </div>
      }
    </>
    

  )
}

export default SidePanel
