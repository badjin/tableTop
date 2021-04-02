import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BeatLoader } from 'react-spinners'
import { getMyList } from '../../redux'
import { getLoginInfo } from '../../helpers/auth'
import GameCard from '../../components/boardGames/GameCard'

const Mylist = () => {
  const dispatch = useDispatch()
  const myList = useSelector(state => state.boardGames.mylist)
  const [games, setGames] = useState(myList)
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    if(myList.length) return
    dispatch(getMyList(getLoginInfo().token))
    .then((res) => {
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
    <div className='flex items-start justify-center px-10 py-5'>
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

export default Mylist
