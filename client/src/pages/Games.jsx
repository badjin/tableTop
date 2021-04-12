import React, { useState, useEffect } from 'react'
import { getLoginInfo } from '../helpers/auth'
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { BeatLoader } from 'react-spinners'

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
      if(!res.length){
        toast.error('There is no data in your list. Select a game from the popular list or use the search bar to select a game and add it to your list.')
        return
      }
      setGames(res)
      setIsPopular(flag)
      setLoading(false)
    })
    .catch(err => toast.error(err))
    setLoading(false)
  }

  const gotoMyList = () => {
    if(getLoginInfo()){
      getList(myList, getMyList, false)
    } else history.push('/login')
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

  if(loading) {
    return ( 
      <div className='flex items-center justify-center'>
        <BeatLoader color='green' loading={loading} />
      </div>
    )
  }

  return (    
    <div className='max-w-screen-xl m-0 lg:m-10 bg-white shadow lg:rounded-lg w-screen'>
      { !loading && (
        <div className='flex flex-col px-10'>
          <div className='flex items-center justify-between py-5 sm:px-5 space-x-2 sm:space-x-5'>

            <div className="flex items-center justify-between w-1/2">
              <div className='h-6 px-2 rounded-full bg-yellow-500'>Rank</div>
              <button 
                disabled={isPopular}
                className={`uppercase ${isPopular ? 'text-primary cursor-default font-bold' : 'btn-text'}`} 
                onClick={gotoGames}
              >
                Popular
              </button>
            </div>

            <div className='h-8 w-1 bg-gray-500'></div>

            <div className="flex items-center justify-between w-1/2">
              <button 
                disabled={!isPopular}
                className={`uppercase ${isPopular ? 'btn-text' : 'text-primary cursor-default font-bold'}`} 
                onClick={gotoMyList}
              >
                My List
              </button>
              <div className='h-6 px-2 rounded-full bg-indigo-500 text-gray-200'>Logs</div>
            </div>
          </div>

          <div className='flex items-start justify-center px-5'>
            
              {
                games.length ? (
                  <div className='sm:w-full sm:grid sm:grid-cols-3 lg:grid-cols-6 sm:gap-4'>
                    {
                      games.map((game, index) => <GameCard key={index} game={game} isPopular={isPopular} />)
                    }
                  </div>
                ) : (
                  <div className='text-red-500 mt-10'>
                    { isPopular 
                      ? setLoading(true)
                      : <span className=''>There is no data stored yet.</span>
                    }                    
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
