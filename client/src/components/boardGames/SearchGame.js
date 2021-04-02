import React, { useState, useEfect, useEffect } from 'react'
import axios from 'axios'

const SearchGame = () => {
  const [keyword, setKeyword] = useState('')
  const [games, setGames] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  const searchGameByKeyword = async (keyword) => {
    try {
      const result = await axios(`https://api.boardgameatlas.com/api/search?name=${keyword}&client_id=${process.env.REACT_APP_BG_ATLAS_ID}`)
      if(result.data.games.length) {
        setIsOpen(true)
        setGames(result.data.games)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if(!keyword) {
      setIsOpen(false)
      return
    }
    if(keyword.length > 2) searchGameByKeyword(keyword)
  },[keyword])

  return (
    <div className='relative'>
      <input
        name='keyword'
        className='input-field'
        type='search'
        value={keyword}
        placeholder='1st Tilte'
        onChange={(e) => setKeyword(e.target.value)}
      />
      {isOpen && 
        <div className='absolute left-0 mt-2 w-full py-2 bg-gray-100 rounded-lg shadow-xl flex flex-col items-center justify-center overflow-y-scroll'>
        {games && games.map((game, index) => (
          <button key={index} className='btn-search w-full text-center text-gray-700' onClick={() => setIsOpen(false)}>
            <span>{game.name}</span>
            <span>[{game.year_published}]</span>
          </button>
        ))}
      </div>
      }
      
    </div>
  )
}

export default SearchGame
