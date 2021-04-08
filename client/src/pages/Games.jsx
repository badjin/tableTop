import React, { useState, useEffect } from 'react'
import { getLoginInfo } from '../helpers/auth'
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import { getGames, getMyList } from '../redux'
import GameCard from '../components/boardGames/GameCard'

const Games = () => {
  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()

  const [games, setGames] = useState([])
  const [isPopular, setIsPopular] = useState(true)
  const [loading, setLoading] = useState(true)

  const gameList = useSelector(state => state.boardGames.games)
  const myList = useSelector(state => state.boardGames.myList)

  const getList = (list, loadList, flag) => {
    if(list.length) {
      setGames(list)
      setIsPopular(flag)
      setLoading(false)
      return
    }

    dispatch(loadList())
    .then(res => {
      setGames(res)
      setIsPopular(flag)
      setLoading(false)
    })
    .catch(err => toast.error(err))
    setLoading(false)
  }

  const gotoMyList = () => {
    getLoginInfo() 
    ? getList(myList, getMyList, false) 
    : history.push('/login')
  }

  const gotoGames = () => {
    getList(gameList, getGames, true)
  }

  useEffect(() => {
    location.pathname === '/games/mylist' 
    ? getList(myList, getMyList, false) 
    : getList(gameList, getGames, true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[location])

  return (    
    <div className='max-w-screen-xl m-0 lg:m-10 bg-white shadow lg:rounded-lg w-screen'>
      { !loading && (
        <div className='flex flex-col px-10'>
          <div className='flex items-center justify-center p-5 space-x-5'>
            <button 
              disabled={isPopular}
              className={`uppercase ${isPopular ? 'text-primary cursor-default' : 'btn-text'}`} 
              onClick={gotoGames}
            >
              Popular
            </button>
            <div className='h-8 w-1 bg-gray-500'></div>
            <button 
              disabled={!isPopular}
              className={`uppercase ${isPopular ? 'btn-text' : 'text-primary cursor-default'}`} 
              onClick={gotoMyList}
            >
              My List
            </button>
          </div>

          <div className='flex items-start justify-center px-5'>
            
              {
                games.length ? (
                  <div className='sm:w-full sm:grid sm:grid-cols-3 lg:grid-cols-6 sm:gap-4'>
                    {games.map((game, index) => (
                      <GameCard key={index} game={game} />
                      // <div key={index} className=''>
                      //   <GameCard game={game} />
                      // </div>
                    ))}
                  </div>
                ) : (
                  <div className='text-red-500 mt-10'>
                    <span className=''>There is no data stored yet.</span>
                  </div>
                )
              }
           
          </div>    
        </div>
      )}
    </div>
  )
}

export default Games
