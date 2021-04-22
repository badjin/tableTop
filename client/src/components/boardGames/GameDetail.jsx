import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useHistory } from 'react-router-dom'
import { BeatLoader } from 'react-spinners'
import ReactStars from "react-rating-stars-component"
import { toast } from 'react-toastify'
import TruncateMarkup from 'react-truncate-markup'
import Parser from 'html-react-parser'

import { getGameDetail, addGame2MyList, removeGame, getPlayLogs, getMyList } from '../../redux'
import { getLoginInfo } from '../../helpers/auth'
import { CustomModal } from '../Modal'
import PlayLogForm from './PlayLogForm'
import PlayLogTable from './PlayLogTable'
// import axios from 'axios'

const GameDetail = ({match}) => {
  const location = useLocation()
  const history = useHistory()
  const dispatch = useDispatch()
  const [myList, setMyList] = useState(useSelector(state => state.boardGames.myList))
  const [playLogs, setPlayLogs] = useState(useSelector(state => state.boardGames.playLogs))
  const user = useSelector(state => state.user.userData)

  const [ game, setGame ] = useState('')
  const [ gameId, setGameId ] = useState('')
  const [loading, setLoading] = useState(true)
  const [isModal, setIsModal] = useState(false)
  const [isOwned, setIsOwned] = useState(false)
  const [isTruncated, setIsTruncated] = useState(false)
  const [isLogForm, setIsLogForm] = useState(false)
  const [thisLogs, setThisLogs] = useState([])
  const [currentLog, setCurrentLog] = useState({
    gameId: '',
    comment: '',
    playData: new Date(),
    players: '',
    playTime: 0,
    winner: ''
  })
  const [isEdit, setIsEdit] = useState(false)
  const [isShow, setIsShow] = useState(false)
  const [wasTruncated, setWasTruncated] = useState(false)

  useEffect(() => {
    // refresh 후에 데이터 날라감
    if(getLoginInfo()) {
      if(!myList.length) {
        dispatch(getMyList())
        .then(res => {
          setMyList(res)
          setIsOwned(res.find((value) => (value.gameId === match.params.id)))
        })
      } else setIsOwned(myList.length && myList.find((value) => (value.gameId === match.params.id)))
  
      if(!playLogs.length) {
        dispatch(getPlayLogs())
        .then(res => setPlayLogs(res))
      }
    }

    dispatch(getGameDetail(match.params.id))
    .then((res) => {
      setThisLogs(playLogs.filter((v) => v.gameId === res.id))
      res.description = res.description.split("&#10;").join("<br />")
      console.log(res)
      setGame(res)
      setGameId(match.params.id)
      setLoading(false)
    })    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  const deleteGame = (() => {

    if(user.role === 'guest') {
      toast.error('You are logged in as a guest. Please sign up first.')
      return
    }

    dispatch(removeGame(gameId))
    .then((res) => {
      toast.success('This game has been removed from the list')
      setLoading(false)
      history.push('/games/mylist')
    })
    .catch((error) => toast.error(error))

  })

  const addGame = ((game) => {

    if(user.role === 'guest') {
      toast.error('You are logged in as a guest. Please sign up first.')
      return
    }

    dispatch(addGame2MyList(game))
    .then((res) => {
      toast.success('This game has been added to the list')
      setLoading(false)
      history.push('/games/mylist')
    })
    .catch((error) => toast.error(error))

  })

  // const getRandomData = () => {
  //   const gameId = myList[Math.floor(Math.random() * myList.length)].gameId
  //   const startDate = new Date(2019, 0, 1)
  //   const endDate = new Date()
  //   const playDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()))
  //   const playersArray = ['All family', 'Oli, Ash, Lani & Jin', 'Friends', 'Neighbors', 'Colleagues']
  //   const players = playersArray[Math.floor(Math.random() * playersArray.length)]
  //   const randomNum1 = Math.floor(Math.random() * 290) + 1
  //   const playTime = Math.floor(randomNum1 * 10 / 100) * 10 + 30
  //   const comment = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam vel asperiores amet atque sint tenetur blanditiis quibusdam officiis. Velit tempora ut vero voluptatum aperiam nemo dolores neque iste beatae nesciunt.'
  //   const winnerArray = ['Oli', 'Ash', 'Lani', 'Jin']
  //   const winner = winnerArray[Math.floor(Math.random() * winnerArray.length)]
  //   return { gameId, playDate, players, playTime, comment, winner }
  // }

  // const dummyPlayLog = () => {
  //   const payload = []

  //   for(let i = 0; i < 100; i++){
  //     payload.push(getRandomData())
  //   }
    // payload.sort((a,b) => {
    //   var c = new Date(a.playDate)
    //   var d = new Date(b.playDate)
    //   return c-d
    // })

  //   const { token, id } = getLoginInfo()
  //   myList.map((v, i) => {
  //     return (
  //       axios.post(`${process.env.REACT_APP_API_URL}/games/logs/resetlogcount`, {id, gameId: v.gameId}, {
  //         headers: {
  //           Authorization: `Bearer ${token}`
  //         }
  //       })
  //       .then( res => {
  //         console.log(res.data.gameList)
  //       })
  //     )
  //   })
      
  //   // console.log(payload)
  //   payload.map((v, i) => {
  //     return (
  //       dispatch(addPlayLog(v, false))
  //       .then(res => {
  //         console.log(res)
  //       })
  //       .catch(err => toast.error(err.response.data.error))
  //     )
  //   })
  // }

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
    <div className='max-w-screen-xl m-0 md:m-10 lg:mx-20 xl:mx-32 bg-white shadow lg:rounded-lg md:h-2/3'>
      { game && 
        <div className='flex flex-col p-3'>
          <div className='flex items-center justify-between'>
            <div>
              { isOwned 
                ? (
                  <button 
                    className='btn-round text-primary border-white hover:bg-primary focus:outline-none' 
                    onClick={() => (getLoginInfo() ? setIsModal(true) : history.push('/login'))}
                  >
                    <i className='fas fa-trash-alt w-6' />
                    Delete
                  </button>
                ) 
                : (
                  <button 
                    className='btn-round text-primary border-white hover:bg-primary focus:outline-none' 
                    onClick={() => (getLoginInfo() ? setIsModal(true) : history.push('/login'))}
                  >
                    <i className='fas fa-plus w-6' />
                    Add
                  </button>
                )
              }
            </div>
            <div className='flex items-center'>              
              <button 
                className='btn-round text-primary border-white hover:bg-primary focus:outline-none'
                onClick={() => ( isOwned ? history.push('/games/mylist') : history.push('/games'))}
              >
                <i className='fas fa-undo-alt w-6' />
                List
              </button>
            </div>
          </div>
          <div className='flex flex-col sm:flex-row items-center sm:items-start p-10 sm:space-x-4'>
            <div className='sm:w-1/2  overflow-hidden'>
              <div className='flex justify-center'>
                <img className='h-64 bg-cover bg-center bg-no-repeat rounded' src={game.image_url} alt="Title"/>
              </div>
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
              <div className='mt-2'>
                <div className="flex items-center justify-between">
                  <div>
                    <i className='fas fa-users w-6 text-primary' />
                    <span>{game.min_players} - {game.max_players}</span>
                  </div>
                  <div>
                    <i className='fas fa-clock w-6 text-primary' />
                    <span>{game.min_playtime} - {game.max_playtime}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className='ml-1'>
                    <i className='fas fa-user w-6 text-primary' />
                    <span>{game.min_age}+</span>
                  </div>
                  <div>
                    <i className='fas fa-calendar-alt w-6 text-primary' />
                    <span>{game.year_published}</span>
                  </div>
                </div>
              </div>
              <div className='my-3 flex items-center justify-between text-sm px-2'>  
                { game.rules_url && (
                  <a href={`${game.rules_url}`} target='_blank' className='btn-text ' rel='noopener noreferrer'>
                    See Rules
                  </a>
                ) }    
                
                { game.url && (
                  <a href={`${game.url}`} target='_blank' className='btn-text ' rel='noopener noreferrer'>
                    More information
                  </a>     
                )}
              </div>
            </div>
            <div className='relative sm:w-1/2 text-sm sm:px-5 sm:mt-0 mt-5'>
              { isLogForm && (
                <div className="absolute inset-0 -mt-8 text-base">
                  <PlayLogForm 
                    gameId={gameId} 
                    log={currentLog} 
                    isEdit={isEdit}
                    isShow={isShow}
                    submitClick={(logs) => {
                      setThisLogs(logs)
                      setIsLogForm(false)
                    }} 
                    cancelClick={() => setIsLogForm(false)} 
                  />
                </div>
              )}
              <h2 className='text-2xl text-gray-500 mb-1'>{game.name}</h2>
              { !isTruncated 
                ? (
                  <TruncateMarkup lines={16} ellipsis={                    
                    <div className={`text-right text-sm mt-3 ${ isLogForm && 'hidden' }`}>
                      <button className='btn-text' onClick={() => setIsTruncated(true)}>Show more</button>
                    </div>
                  } onTruncate={(flag) => setWasTruncated(flag)}>
                    <div className={`${(isLogForm && !wasTruncated) && 'h-80'}`}>
                    { Parser(game.description) }
                    </div>
                  </TruncateMarkup>
                ) 
                : (
                  <div>
                    { Parser(game.description) }
                  </div>
                )
              }
              
              { isTruncated && (
                <div className='text-right text-sm mt-3'>
                  <button className='btn-text' onClick={() => setIsTruncated(false)}>Hide content</button>
                </div>
              )}
                
            </div>
          </div>
          { isOwned && (
            <>
              <div className="flex items-center justify-end mt-3 sm:-mt-3">
                <button 
                  className='btn-round text-primary border-white hover:bg-primary focus:outline-none'
                  onClick={() => {
                    setCurrentLog({
                      gameId: '',
                      comment: '',
                      playDate: new Date(),
                      players: '',
                      playTime: 0,
                      winner: ''
                    })
                    setIsTruncated(false)
                    setIsLogForm(true)
                    setIsEdit(false)
                    setIsShow(false)
                  }}
                  // onClick={dummyPlayLog}
                >
                  <i className='fas fa-edit w-6' />
                  Play log
                </button>
              </div>
              { thisLogs.length > 0 && (
                <PlayLogTable 
                  logs={thisLogs} 
                  onEditBtn={(log) => {
                    if(isLogForm) return
                    setCurrentLog(log)
                    setIsTruncated(false)
                    setIsLogForm(true)
                    setIsShow(false)
                    setIsEdit(true)
                  }}
                  onShowBtn={(log) => {
                    if(isLogForm) return
                    setCurrentLog(log)
                    setIsTruncated(false)
                    setIsLogForm(true)
                    setIsShow(true)
                    setIsEdit(true)
                  }} 
                />
              )}
            </>
          )}

          { isModal && 
            <CustomModal title={`${isOwned ? 'Delete' : 'Add'} this game`} btn={`${isOwned ? 'Delete' : 'Add'}`}
              message={`This game will be ${isOwned ? 'removed from' : 'added to'} your game list.`}           
              confirmClick={() => {
                isOwned ? deleteGame() : addGame(game)
                setIsModal(false)
              }} 
              cancelClick={() => setIsModal(false)}
            /> 
          }          
        </div>
      }
    </div>
  )
}

export default GameDetail
