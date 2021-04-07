import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BeatLoader } from 'react-spinners'
import { toast } from 'react-toastify'
import { getGames } from '../../redux'
import GameCard from '../../components/boardGames/GameCard'

const Popular = () => {
  const dispatch = useDispatch()
  const boardGames = useSelector(state => state.boardGames.games)
  const [games, setGames] = useState(boardGames)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    if(boardGames.length){
      setLoading(false)
      return
    }
    dispatch(getGames('order_by', 'popularity'))
    .then((res) => {
      setGames(res)
      setLoading(false)
    })
    .catch((error) => {
      setLoading(false)
      toast.error(error)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  if(loading) {
    return (
      <div className='flex items-center justify-center px-10 py-4 w-screen'>
        <BeatLoader color='green' loading={loading} />
      </div>
    )
  }

  return (    
    <div className='flex items-start justify-center px-10 py-4'>
      <div className='px-10'>
        <div className='sm:w-full sm:grid sm:grid-cols-3 lg:grid-cols-6 sm:gap-4'>
    
          { games && games.map((game, index) => (
            <div key={index} className=''>
              <GameCard game={game} />
            </div>
          ))}
    
        </div>    
      </div>
    </div>
  )
}

export default Popular
