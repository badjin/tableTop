import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setGame } from '../../redux'
// import ReactStars from "react-rating-stars-component"

const GameCard = ({game, isPopular}) => {
  const history = useHistory()
  const dispatch = useDispatch()

  // const userRating = {
  //   size: 14,
  //   value: game.average_user_rating,
  //   isHalf: true,
  //   edit: false
  // }

  const moveToGameDetail = () => {
    const id = game.id ? game.id : game.gameId
    dispatch(setGame(game))
    .then(res => {
      if(res) history.push(`/games/${id}`)
    })
  }

  return (
    <div className='mb-4 mx-6 sm:mx-0 bg-white border-2 border-gray-200 rounded-lg shadow flex flex-col items-center justify-center text-xs relative hover:shadow-lg cursor-pointer' onClick={moveToGameDetail}>
      
      <img className='w-32 h-32 py-2 object-contain' src={game.thumbnail} alt="Poster"/>
      <span className='w-full px-1 text-center uppercase text-gray-600 font-bold'>{game.name}</span>
      <div className='flex justify-between space-x-8 mb-2'>
        {/* <ReactStars {...userRating} /> */}
        <span className='text-gray-400'><i>{game.yearPublished}</i></span>
      </div>
      { isPopular ? (
          <div className='absolute left-0 top-0 -mt-2 -ml-1 rounded-full border-gray-800 bg-yellow-500 text-gray-800 px-2 py-1'>
            {game.rank}
          </div>
        ) : (
          <>          
            <div className='absolute left-0 top-0 -mt-2 -ml-1 rounded-full border-gray-800 bg-yellow-500 text-gray-800 px-2 py-1'>
              {game.rank}
            </div>
            <div className={`${!game.logCount && 'hidden'} absolute right-0 top-0 -mt-2 -mr-1 rounded-full border-gray-800 bg-indigo-500 text-gray-100 px-2 py-1`}>
              {game.logCount}
            </div>
          </>
          
        )
      }
      
    </div>
  )
}

export default GameCard
