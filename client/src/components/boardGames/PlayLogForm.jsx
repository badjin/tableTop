import React, { useState } from "react"
import { useForm } from "react-hook-form"
import DatePicker from "react-datepicker"

import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import { addPlayLog } from '../../redux'

import "react-datepicker/dist/react-datepicker.css"

const PlayLogForm = ({gameId, log, isEdit, isShow, submitClick, cancelClick}) => {
  const { 
    register, 
    handleSubmit,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      gameId: gameId,
      comment: log.comment,
      playDate: log.playDate,
      players: log.players,
      playTime: (log.playTime ? log.playTime : null),
      winner: log.winner
    }
  })
  const user = useSelector(state => state.user.userData)
  const [startDate, setStartDate] = useState(new Date(log.playDate))
  const dispatch = useDispatch()

  const onSubmit = (data) => {
    const payload = {
      _id: (isEdit ? log._id : undefined),
      gameId,
      comment: data.comment,
      playDate: startDate,
      players: data.players,
      playTime: data.playTime,
      winner: data.winner
    }
    
    if(user.role === 'guest') {
      toast.error('You are logged in as a guest. Please sign up first.')
      return
    }

    dispatch(addPlayLog(payload, isEdit))
    .then(res => {
      toast.success(`This Playlog has been ${isEdit ? 'updated' : 'added'} to the game`)
      submitClick(res.filter((v) => v.gameId === gameId))
    })
    .catch(err => toast.error(err.response.data.error))    
  }

  return (
    <div className='flex flex-col items-center justify-center bg-white'>
      <form
        className='w-full my-6 flex-1 text-indigo-500'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='mx-auto max-w-xs uppercase text-sm'>
          <div className="flex items-center justify-between mb-2">
            <span className='text-gray-600 px-5'>Date</span>
            <DatePicker 
              disabled={isShow}
              dateFormat="dd/MM/yyyy"
              name='date'
              className='input-field text-gray-400'
              selected={startDate}
              onChange={date => setStartDate(date)}
            />
          </div>          
          <div className="flex items-center justify-between mb-2">
            <span className='text-gray-600 px-5 mr-2'>Players</span>            
            <input
              disabled={isShow}
              name='players'
              className='input-field text-gray-400'
              type='text'
              placeholder='Played with'
              ref={register({ required: true })}
            />            
          </div>

          <div className="flex items-center justify-between mb-2">
            <span className='text-gray-600 px-5 mr-3'>Winner</span>            
            <input
              disabled={isShow}
              name='winner'
              className='input-field text-gray-400'
              type='text'
              placeholder='Winner was...'
              ref={register()}
            />
          </div>

          <div className="flex items-center justify-between mb-2">
            <span className='text-gray-600 px-5 mr-1'>PlayTime</span>            
            <input
              disabled={isShow}
              name='playTime'
              className='input-field text-gray-400'
              type='number' min='10' max='360' step='10'
              placeholder='10 - 360 min'
              ref={register({ required: true, min:10, max:360 })}
            />
          </div>

          <textarea
            disabled={isShow}
            name='comment'
            className='form-textarea p-2 rounded-lg border-2  block w-full'
            rows="3"
            placeholder='Please leave a brief game review.'
            ref={register({ required: true, minLenth:8 })}
          ></textarea>       

          {isShow ? (
              <div className='flex items-center'>    
                <button
                  className='btn mt-3 bg-pink-500 text-gray-100 hover:bg-pink-700'
                  onClick={cancelClick}
                >
                  <i className='fas fa-sign-in-alt fa 1x w-6  -ml-2' />
                  <span className='ml-3'>Close</span>
                </button>
              </div>
            ) : (
              <div className='flex space-x-2'>
                <button
                  type='submit'
                  className='btn btn-submit mt-3'
                >
                  <i className={`fas ${isEdit ? 'fa-edit' : 'fa-cloud-upload-alt'} fa-edit fa 1x w-6 } -ml-2`} />
                  <span className='ml-3'>{isEdit ? 'Update' : 'Submit'}</span>
                </button>

                <button
                  className='btn mt-3 bg-pink-500 text-gray-100 hover:bg-pink-700'
                  onClick={cancelClick}
                >
                  <i className='fas fa-sign-in-alt fa 1x w-6  -ml-2' />
                  <span className='ml-3'>Close</span>
                </button>
              </div>
            )
          }
          
        </div>              
      </form>
    </div>
  )
}

export default PlayLogForm
