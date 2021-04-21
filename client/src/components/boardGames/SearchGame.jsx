import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setGame } from '../../redux'
import axios from 'axios'
import {parseBggXmlApi2SearchResponse} from '@code-bucket/board-game-geek'

const SearchGame = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [keyword, setKeyword] = useState('')
  const [games, setGames] = useState([])
  const [isOpen, setIsOpen] = useState(false)


  const searchGameByKeyword = async (keyword) => {
    try {
      // const result = await axios.post(`${process.env.REACT_APP_API_URL}/bgg/search`, keyword)

      const response = await axios.get(`https://api.geekdo.com/xmlapi2/search?query=${keyword}`)
      // var xml = new XMLParser().parseFromString(response.data); 
      // console.log(xml)
      // console.log(response.data[0])
      const result = parseBggXmlApi2SearchResponse(response.data)
      // const result = await axios(`https://api.boardgameatlas.com/api/search?name=${keyword}&limit=5&client_id=${process.env.REACT_APP_BG_ATLAS_ID}`)
      if(result.items.length) {
        setIsOpen(true)
        setGames(result.items)
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
    <div className="pt-2 relative z-10 mx-auto text-gray-600">
      <input 
        className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none" 
        type="search" 
        name="keyword" 
        placeholder="Search ..." 
        value={keyword} 
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button type="submit" className="absolute right-0 top-0 mt-5 mr-4 focus:outline-none">
        <svg className="text-gray-600 h-4 w-4 fill-current " xmlns="http://www.w3.org/2000/svg"
          version="1.1" id="Capa_1" x="0px" y="0px"
          viewBox="0 0 56.966 56.966" style={{background: "new 0 0 56.966 56.966"}} 
          width="512px" height="512px">
          <path
            d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
        </svg>
      </button>
      {isOpen && 
        <div className='absolute left-0 mt-1 w-full py-2 bg-white rounded-lg shadow-xl flex flex-col items-center justify-center'>          
        {games && games.filter((game, index) => (index < 10)).map((game, index) => (
          <button 
            key={index} 
            className='btn-search w-full text-gray-700' 
            onClick={() => {
              setIsOpen(false)
              setKeyword('')
              dispatch(setGame(game))
              .then(res => {
                if(res) history.push(`/games/${game.id}`)
              })
            }}
          >
            <div className='flex items-center justify-between'>
              <div className='text-left w-4/5'>
                <span>{game.name}</span>
                <span>({game.yearpublished})</span>
                {/* <span>({game.year_published})</span> */}
              </div>
              {/* <div className='h-12 w-12 rounded overflow-hidden'>
                <img className='w-12 h-12' src={game.images.thumb} alt="Thumbnail"/>
              </div> */}
            </div>
          </button>
        ))}
        </div>
      }      
    </div>
  )
}

export default SearchGame
