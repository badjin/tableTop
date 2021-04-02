import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BeatLoader } from 'react-spinners'
import ReactStars from "react-rating-stars-component"

import { getGameDetail } from '../../redux'

const GameDetail = ({match}) => {
  const dispatch = useDispatch()
  const currentGame = useSelector(state => state.boardGames.game)
  const [ game, setGame ] = useState(currentGame)
  const [ gameId, setGameId ] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    dispatch(getGameDetail(match.params.id))
    .then((res) => {
      console.log(res)
      setGame(res)
      setGameId(match.params.id)
      setLoading(true)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const userRating = {
    size: 14,
    value: game.average_user_rating,
    isHalf: true,
    edit: false
  }

  if(!gameId) {
    return (
      <div className='flex items-center justify-center'>
        <BeatLoader color='green' loading={!loading} />
      </div>
    )
  }

  return (
    <div className='max-w-screen-xl m-0 lg:m-10 bg-white shadow lg:rounded-lg'>
      { game && 
        <>
          <div className='flex flex-col sm:flex-row items-start p-10'>
            <div className='sm:w-1/2 overflow-hidden'>
              <img className='w-full  object-cover bg-cover bg-center bg-no-repeat rounded' src={game.image_url} alt="Welcome"/>
              <div className='flex items-center justify-between'>
                <div className='flex items-center justify-start space-x-2'>
                  <ReactStars {...userRating} />
                  <span className='text-sm'>{Number(game.average_user_rating).toFixed(1)} / 5</span>
                  <span className='block text-xs'>({game.num_user_ratings} ratings)</span>
                </div>
                <div>
                  <span className='text-sm'>Rank</span>
                  <span className='text-sm rounded-full border-gray-800 bg-yellow-500 text-gray-800 px-2 py-1 ml-1'>{game.rank}</span>
                </div>
              </div>
              <div className='flex items-center justify-between'>
                <div>
                  <i className='fas fa-users w-6 text-primary' />
                  <span>{game.min_players} - {game.max_players}</span>
                </div>
                <div>
                  <i className='fas fa-clock w-6 text-primary' />
                  <span>{game.min_playtime} - {game.max_playtime}</span>
                </div>
                <div>
                  <i className='fas fa-user w-6 text-primary' />
                  <span>{game.min_age}+</span>
                </div>
                <div>
                  <i className='fas fa-calendar-alt w-6 text-primary' />
                  <span>{game.year_published}</span>
                </div>
              </div>
              <div className='my-3 mb-4 flex items-center justify-center space-x-8'>
                <a href={`${game.rules_url}`} target='_blank' className='btn-round text-secondary-100 border-secondary-100 hover:bg-secondary-100' rel='noopener noreferrer'>
                  See Rules
                </a>
                <button className='btn-round text-secondary-100 border-secondary-100 hover:bg-secondary-100 focus:outline-none'>Add List</button>
              </div>
            </div>     
            <div className='sm:w-1/2 text-sm sm:px-5 sm:mt-0 mt-5'>
              <h2 className='text-4xl text-gray-500 mb-1'>{game.name}</h2>
              <p>{game.description_preview}</p>      
            </div>
          </div>          
        </>
      }
    </div>
  )
}

export default GameDetail
