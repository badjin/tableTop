import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BeatLoader } from 'react-spinners'
import { toast } from 'react-toastify'
import { getMyList } from '../../redux'
import { getLoginInfo } from '../../helpers/auth'
import GameCard from '../../components/boardGames/GameCard'

const Mylist = ({isPopular, onPopular, setPopular}) => {
  const dispatch = useDispatch()
  const myList = useSelector(state => state.boardGames.myList)
  const [games, setGames] = useState(myList)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    if(myList.length){
      setLoading(false)
      return
    }
    dispatch(getMyList(getLoginInfo()))
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
        {
          games.length ? (
            <div className='sm:w-full sm:grid sm:grid-cols-3 lg:grid-cols-6 sm:gap-4'>
              {games.map((game, index) => (
                <div key={index} className=''>
                  <GameCard game={game} />
                </div>
              ))}
            </div>
          ) : (
            <div className='text-red-500 mt-10'>
              <span className=''>There is no data stored yet.</span>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Mylist
