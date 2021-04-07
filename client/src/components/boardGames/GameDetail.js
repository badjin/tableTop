import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useHistory } from 'react-router-dom'
import { BeatLoader } from 'react-spinners'
import ReactStars from "react-rating-stars-component"
import { toast } from 'react-toastify'

import { getGameDetail, addGame2MyList, removeGame } from '../../redux'
import { getLoginInfo } from '../../helpers/auth'
import { CustomModal } from '../Modal'

const GameDetail = ({match}) => {
  const location = useLocation()
  const history = useHistory()
  const dispatch = useDispatch()
  const myList = useSelector(state => state.boardGames.myList)
  const [ game, setGame ] = useState('')
  const [ gameId, setGameId ] = useState('')
  const [loading, setLoading] = useState(true)
  const [isModal, setIsModal] = useState(false)
  const [isOwned, setIsOwned] = useState(false)

  useEffect(() => {
    
    if(myList.length && myList.find((value) => (value.gameId === match.params.id))) setIsOwned(true)

    dispatch(getGameDetail(match.params.id))
    .then((res) => {
      setGame(res)
      setGameId(match.params.id)
      setLoading(false)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  const deleteGame = ((game) => {
    const {id, token} = getLoginInfo()

    // dispatch(removeGame(token, {id, game}))
    // .then((res) => {
    //   toast.success('This game has been removed from the list')
    //   setLoading(false)
    // })
    // .catch((error) => toast.error(error))

  })

  const addGame = ((game) => {
    const {id, token} = getLoginInfo()

    dispatch(addGame2MyList(token, {id, game}))
    .then((res) => {
      toast.success('This game has been added to the list')
      setLoading(false)
      history.push('/games/mylist')
    })
    .catch((error) => toast.error(error))

  })

  const userRating = {
    size: 14,
    value: game.average_user_rating,
    isHalf: true,
    edit: false
  }

  if(!gameId) {
    return (
      <div className='flex items-center justify-center'>
        <BeatLoader color='green' loading={loading} />
      </div>
    )
  }

  return (
    <div className='max-w-screen-xl m-0 lg:m-10 bg-white shadow lg:rounded-lg'>
      { game && 
        <>
          <div className='flex flex-col sm:flex-row items-start p-10 relative'>
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
              <div className='my-3 mb-4 flex items-center justify-between text-xs px-1'>                
                <a href={`${game.rules_url}`} target='_blank' className='btn-text uppercase' rel='noopener noreferrer'>
                  See Rules
                </a>
                <a href={`${game.url}`} target='_blank' className='btn-text uppercase' rel='noopener noreferrer'>
                  See More
                </a>          
              </div>
              {isOwned ? (
                <button className='btn-round absolute left-0 top-0 mt-1 ml-1 text-primary border-white hover:bg-primary focus:outline-none' onClick={() => (
                  getLoginInfo() ? setIsModal(true) : history.push('/login')
                )}>
                  <i className='fas fa-trash-alt w-6' />
                  Remove
                </button>
                ) : (
                <button className='absolute left-0 top-0 mt-1 ml-1 my-2 btn-round text-primary border-white hover:bg-primary focus:outline-none' onClick={() => (
                  getLoginInfo() ? setIsModal(true) : history.push('/login')
                )}>
                  <i className='fas fa-plus w-6' />
                  Add
                </button>
                )}          
            </div>
            <div className='sm:w-1/2 text-sm sm:px-5 sm:mt-0 mt-5'>
              <h2 className='text-4xl text-gray-500 mb-1'>{game.name}</h2>
              <p>{game.description_preview}</p>      
            </div>            
          </div>
          { isModal && 
            <CustomModal title={`${isOwned ? 'Remove' : 'Add'} this game`} btn='Add' 
              message={`This game will be ${isOwned ? 'removed from' : 'added to'} your game list.`}           
              confirmClick={() => {
                isOwned ? deleteGame(game) : addGame(game)
                setIsModal(false)
              }} 
              cancelClick={() => setIsModal(false)}
            /> 
          }
        </>        
      }
    </div>
  )
}

export default GameDetail
