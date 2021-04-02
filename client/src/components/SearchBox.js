import React, { useRef, useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import axios from 'axios'
import { toast } from 'react-toastify'

import InputValidate from './InputValidate'
import SearchGame from './boardGames/SearchGame'


const SearchBox = () => {
  const [keyword1, setKeyword1] = useState('')
  const [keyword2, setKeyword2] = useState('')
  const [keyword3, setKeyword3] = useState('')

  const searchGameByKeyword = async (keyword) => {
    try {
      console.log(keyword)
      const result = await axios(`https://api.boardgameatlas.com/api/search?name=${keyword}&client_id=${process.env.REACT_APP_BG_ATLAS_ID}`)
      console.log(result)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    // console.log(keyword1)
    if(keyword1.length > 2) searchGameByKeyword(keyword1)
    // (keyword1 && searchGameByKeyword(keyword1))
  }, [keyword1])

  const onSubmit = () => {
    console.log(keyword1)
    console.log(keyword2)
    console.log(keyword3)
  } 
  return (
    <div className='w-full flex-1 my-4 text-indigo-500'>
      <form
        className='mx-auto'
        onSubmit={onSubmit}
      >
        <div className='flex flex-col sm:flex-row items-center justify-between space-y-6 sm:space-y-0 sm:space-x-4'>
          
          <div className='w-full sm:w-1/3'>            
            {/* <input
              name='keyword1'
              className='input-field'
              type='search'
              value={keyword1}
              placeholder='1st Tilte'
              onChange={(e) => setKeyword1(e.target.value)}
            /> */}
            <SearchGame />
          </div>    

          <div className='w-full sm:w-1/3'>
            <input
              name='keyword2'
              className='input-field'
              type='search'
              value={keyword2}
              placeholder='2nd Tilte'
              onChange={(e) => setKeyword2(e.target.value)}
            />
          </div>
          
          <div className='w-full sm:w-1/3'>
            <input
              name='keyword3'
              className='input-field'
              type='search'
              value={keyword3}
              placeholder='3rd Tilte'
              onChange={(e) => setKeyword3(e.target.value)}
            />
          </div>
        </div>

        <div className='flex flex-col sm:flex-row justify-between items-center space-y-6 sm:space-y-0 sm:space-x-4 mt-6'>
          <button type='submit' className='btn btn-submit' >
            <i className='fas fa-chess fa 1x w-6  -ml-2' />
            <span className='ml-3'>Submit</span>
          </button>

          <button className='btn bg-pink-500 text-gray-100 hover:bg-pink-700'
            onClick={() => {
              setKeyword1('')
              setKeyword2('')
              setKeyword3('')
            }}
          >
            <i className='fas fa-undo-alt fa 1x w-6  -ml-2' />
            <span className='ml-3'>Reset</span>
          </button>
        </div>        
      </form>
    </div>
  )
}

export default SearchBox
