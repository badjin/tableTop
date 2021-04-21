import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { BeatLoader } from 'react-spinners'

import { getLoginInfo } from '../helpers/auth'
import { getGames, getMyList } from '../redux'
import GameCard from '../components/boardGames/GameCard'
import RandomPick from '../components/boardGames/RandomPick'

const Games = () => {
  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()

  const [games, setGames] = useState([])
  const [isPopular, setIsPopular] = useState(true)
  const [loading, setLoading] = useState(true)
  const [isModal, setIsModal] = useState(false)
  
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
        history.push('/games')
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

  const setRandomModal = () => {
    if(myList.length < 5) {
      toast.error('The number of games on the list must be at least 5.')
      return
    }
    setIsModal(true)
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
              <div className='rounded-full px-2 text-xs font-bold border-2 border-yellow-500 bg-yellow-500'>Rank</div>
              <button 
                disabled={isPopular}
                className={`uppercase ${isPopular ? 'text-primary cursor-default font-bold' : 'btn-text'}`} 
                onClick={gotoGames}
              >
                Tranding
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
              <div className="flex items-center space-x-2">
                <button 
                  disabled={isPopular}  
                  className={`rounded-full px-2 text-xs font-bold tracking-wider cursor-pointer border-2 transition ease-out duration-500 hover:text-white text-red-400 border-red-400 hover:bg-red-400 focus:outline-none hidden ${!isPopular && 'sm:block'}`}
                  onClick={() => setRandomModal()}
                >
                  Random
                </button>                
                <div className='rounded-full px-2 text-xs font-bold border-2 border-indigo-500 bg-indigo-500 text-gray-200'>Logs</div>

              </div>
            </div>
          </div>
          <button 
            className={`btn-round mb-4 text-secondary-100 border-secondary-100 hover:bg-secondary-100 focus:outline-none sm:hidden ${isPopular && 'hidden'}`}
            onClick={() => setRandomModal()}
          >
            Random
          </button>

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
          { isModal && !isPopular &&
            <RandomPick
              games={myList}
              randomClick={() => {                
                setIsModal(false)
              }} 
              cancelClick={() => setIsModal(false)}
            /> 
          }
        </div>
      )}
    </div>
  )
}

export default Games
