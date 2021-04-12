import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import { CustomModal } from '../../components/Modal'
import { removeLog } from '../../redux'

const TableRow = ({ log, index, onShowBtnClick, onEditBtnClick, onDeleteBtnClick }) => {
  return (
    <tr className={`border-b border-gray-200 hover:bg-gray-100 ${(index%2 && 'bg-gray-50')}`}>
      <td className="hidden lg:block py-3 md:px-6 px-3 text-left whitespace-nowrap">
        <div className="flex items-center">          
          <span className="font-medium">{index+1}</span>
        </div>
      </td>
      <td className="py-3 md:px-6 px-3 text-left">
        <span>{new Date(log.playDate).toLocaleDateString()}</span>
      </td>
      <td className="hidden sm:block mt-2 py-3 md:px-6 px-3 text-center">        
          <span className="">{log.players}</span>
      </td>
      <td className="mt-2 py-3 md:px-6 px-3 text-center">        
          <span className="">{log.winner}</span>
      </td>
      <td className="py-3 md:px-6 text-center">
      <span className="">{log.playTime}min.</span>
      </td>
      <td className="py-3 md:px-6 px-3 text-center">
        <div className="flex item-center justify-center">
          <button className="w-4 mr-2 transform hover:text-yellow-500 hover:scale-125 cursor-pointer focus:outline-none" onClick={() => { onShowBtnClick(log) }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
          <button className="w-4 mr-2 transform hover:text-yellow-500 hover:scale-125 cursor-pointer focus:outline-none" onClick={() => { onEditBtnClick(log) }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
          <button className="w-4 mr-2 transform hover:text-red-500 hover:scale-125 cursor-pointer focus:outline-none" onClick={() => { onDeleteBtnClick(log) }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            </button>         
        </div>
      </td>        
    </tr>
  )
}

const PlayLogTable = ({logs, onEditBtn, onShowBtn}) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.userData)
  const [isModal, setIsModal] = useState(false)
  const [ids, setIds] = useState({logId: '', gameId: ''})
  const [thisLogs, setThisLogs] = useState(logs)

  const deleteSelectedLog = () => {
    if(user.role === 'guest') {
      toast.error('You are logged in as a guest. Please sign up first.')
      return
    }
    
    dispatch(removeLog(ids))
    .then(res => {
      setThisLogs(res.filter((v) => v.gameId === ids.gameId))
    })
    .catch(error => toast.error(error.response.data.error))
  }

  useEffect(() => {
    setThisLogs(logs)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logs])

  return (
    // <div className={`bg-white shadow-md rounded my-4`}>
    <div className={`bg-white shadow-md rounded my-4 ${!thisLogs.length && 'hidden'}`}> 
      <table className='min-w-max w-full table-auto'>
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="hidden lg:flex items-center py-3 md:px-6 px-3 text-left">No</th>
            <th className="py-3 md:px-6 px-3 text-left">Date</th>
            <th className="hidden sm:block py-3 md:px-6 px-3 text-center">Players</th>
            <th className="py-3 md:px-6 px-3 text-center">Winner</th>
            <th className="py-3 md:px-6 px-3 text-center">Playtime</th>
            <th className="py-3 md:px-6 px-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">                  
        { thisLogs.map((v, index) => {
          return (
            <>
              <TableRow 
                key={index} 
                log={v} 
                index={index} 
                onDeleteBtnClick={(log) => {
                  setIds({logId:log._id, gameId:log.gameId})
                  setIsModal(true)
                }}
                onEditBtnClick={(log) => onEditBtn(log)}
                onShowBtnClick={(log) => onShowBtn(log)}
              />
            </>
          )            
        })}            
        </tbody>
      </table>
      {/* Delete Dialog */}
      { isModal && 
        <CustomModal title='Delete this log' btn='Delete'
          message="This play log will be removed from this game."         
          confirmClick={() => {
            deleteSelectedLog()
            setIsModal(false)
          }} 
          cancelClick={() => setIsModal(false)}
        /> 
      }
    </div>
  )
}

export default PlayLogTable
