import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BeatLoader } from 'react-spinners'
import { getGames } from '../../redux'
import GameCard from './GameCard'

const GamePanel = ({ history }) => {
  const dispatch = useDispatch()
  const boardGames = useSelector(state => state.boardGames.games)
  const [games, setGames] = useState(boardGames)
  const [loading, setLoading] = useState(false)  
  
  useEffect(() => {
    if(boardGames.length) return
    dispatch(getGames('order_by', 'popularity'))
    .then((res) => {
      // console.log(res)
      setGames(res)
      setLoading(true)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  if(!games.length) {
    return (
      <div className='flex items-center justify-center'>
        <BeatLoader color='green' loading={!loading} />
      </div>
    )
  }

  return (
    <div className='sm:w-full sm:grid sm:grid-cols-3 lg:grid-cols-6 sm:gap-4'>
      
      { games && games.filter((game, index) => (index < 6)).map((game, index) => (
        <div key={index} className=''>
          <GameCard game={game} />
        </div>
      ))}
      
    </div>
  )
}

export default GamePanel
