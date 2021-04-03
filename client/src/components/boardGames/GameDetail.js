import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { BeatLoader } from 'react-spinners'
import ReactStars from "react-rating-stars-component"

import { getGameDetail } from '../../redux'

const GameDetail = ({match}) => {
  const location = useLocation()
  const dispatch = useDispatch()
  const currentGame = useSelector(state => state.boardGames.game)
  const [ game, setGame ] = useState('')
  const [ gameId, setGameId ] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if(currentGame){
      setGame(currentGame)
      setGameId(match.params.id)
      setLoading(true)
      return
    }

    dispatch(getGameDetail(match.params.id))
    .then((res) => {
      setGame(res)
      setGameId(match.params.id)
      setLoading(true)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

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
              <div className='flex items-center justify-between mt-2'>
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
              <div className='flex items-center justify-between mt-2'>
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
                <a href={`${game.rules_url}`} target='_blank' className='btn-round text-green-300 border-green-300 hover:bg-green-300' rel='noopener noreferrer'>
                  See Rules
                </a>
                <a href={`${game.url}`} target='_blank' className='btn-round text-indigo-300 border-indigo-300 hover:bg-indigo-300' rel='noopener noreferrer'>
                  See More
                </a>
                <button className='btn-round text-yellow-300 border-yellow-300 hover:bg-yellow-300 focus:outline-none'>Add List</button>
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
