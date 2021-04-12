import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import mobileLogo from "../../assests/mobileLogo.png"
import { getPlayLogs } from '../../redux'

const RandomPick = ({ games, randomClick, cancelClick }) => {
  const [isRunRandom, setIsRunRandom] = useState(false)
  const [randomGames, setRandomGames] = useState([])
  const [randomPick, setRandomPick] = useState('')
  const [showRandomResult, setShowRandomResult] = useState(false)
  const [buttonClickCount, setButtonClickCount] = useState(0)
  const buttonRef = useRef(null)
  const dispatch = useDispatch()
  const [playLogs, setPlayLogs] = useState(useSelector(state => state.boardGames.playLogs))

  const runRandom = () => {
    setIsRunRandom(true)
    getGames()
    if(buttonClickCount < 50) {
      // Auto click 50 times for visual random
      setTimeout(() => {
        (buttonRef.current && buttonRef.current.click())        
      },100)
      setButtonClickCount(buttonClickCount+1)
    } else {
      if(!showRandomResult) {
        setRandomPick(getGames4Last())
        setShowRandomResult(true)
        setIsRunRandom(false)
      } else {
        randomClick(randomPick)
      }
    }    
  }

  const cancelRandom = () => {
    setButtonClickCount(50)
    setIsRunRandom(false)
    cancelClick()
  }

  const getGames = () => {    
    const num = generator(5,0,games.length-1)
    const newGames = num.map((v, i) => {
      return games.find((item, index) => index === v)
    })
    setRandomGames(newGames)
  }

  const wasWeeksAgo = (weeksAgo, date) => {
    // Create a date
    var weekStart = new Date();
    // Set time to 00:00:00
    weekStart.setHours(0,0,0,0);
    // Set to previous Sunday
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    // Set to Sunday on weeksAgo
    weekStart.setDate(weekStart.getDate() - 7*weeksAgo)
    
    return date >= weekStart
  }

  const isWithin2Weeks = (game) => {
    if(!playLogs.length) {
      dispatch(getPlayLogs())
      .then(res => setPlayLogs(res))
    }

    let isIn2Weeks = false
    const logs = playLogs.filter((v, i) => v.gameId === game.gameId)
    logs.map((v, i) => {
      if(wasWeeksAgo(2, new Date(v.playDate))) isIn2Weeks = true
      return isIn2Weeks
    })
    return isIn2Weeks
  }

  const getGames4Last = () => {
    let index = Math.floor(Math.random() * games.length)
    if(!games[index].logCount) {
      return games[index]
    }
    let count = 0
    while(isWithin2Weeks(games[index])){      
      index = Math.floor(Math.random() * games.length)
      if(!games[index].logCount || count >= 10) {
        break
      }
      count++
    }
    return games[index]
  }

  const generator = (size, lowest, highest) => {
    let numbers = []
    for(let i = 0; i < size; i++) {
      let add = true
      let randomNumber = Math.floor(Math.random() * highest) + 1
      for(let y = 0; y < highest; y++) {
        if(numbers[y] === randomNumber) {
          add = false
        }
      }
      if(add) {
        numbers.push(randomNumber)
      } else {
        i--
      }
    }
    
    let highestNumber = 0
    for(let m = 0; m < numbers.length; m++) {
      for(let n = m + 1; n < numbers.length; n++) {
        if(numbers[n] < numbers[m]) {
          highestNumber = numbers[m]
          numbers[m] = numbers[n]
          numbers[n] = highestNumber
        }
      }
    }

    return numbers
  }

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        
          {/* Background overlay, show/hide based on modal state.

          Entering: "ease-out duration-300"
            From: "opacity-0"
            To: "opacity-100"
          Leaving: "ease-in duration-200"
            From: "opacity-100"
            To: "opacity-0" */}
      
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        {/* <!-- This element is to trick the browser into centering the modal contents. --> */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        {/* <!--
          Modal panel, show/hide based on modal state.

          Entering: "ease-out duration-300"
            From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            To: "opacity-100 translate-y-0 sm:scale-100"
          Leaving: "ease-in duration-200"
            From: "opacity-100 translate-y-0 sm:scale-100"
            To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        --> */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <img className="h-6" src={mobileLogo} alt="BoardGameLab" />
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left pt-2">
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                  Today's Game is...
                </h3>
                

                {isRunRandom ? (
                  <div className="flex items-center justify-center space-x-3 mt-2">
                    { games && randomGames.map((game, index) => (
                      <div key={index} className='h-12 w-12 rounded-full border-2 border-gray-500 overflow-hidden mt-2'>
                        <img className='w-12 h-12' src={game.images.thumb} alt="Game"/>
                      </div>
                    ))}
                  </div>
                ) : ( showRandomResult ? (
                  <div className="flex items-center justify-center space-x-3 mt-2">               
                    <div className='h-12 w-12 rounded-full border-2 border-gray-500 overflow-hidden mt-2'>
                      <img className='w-12 h-12' src={randomPick.images.thumb} alt="Game"/>
                    </div>
                    <div className='font-bold mt-1'>{randomPick.name}</div>
                  </div>
                ) : (
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      We randomly recommend a game that you will enjoy today. Please Click Random button.
                    </p>
                  </div>
                ))}                
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm" 
            onClick={() => runRandom()} ref={buttonRef}>
              {showRandomResult ? "Today's Pick" : 'Random'}
            </button>
            <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" 
            onClick={() => cancelRandom()}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>

  )
}


export default RandomPick
