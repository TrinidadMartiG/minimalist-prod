import React, { useCallback, useEffect, useState } from 'react'
import timerSound from '../sounds/beep-beep.mp3'
import '../styles/TimerStyles.scss'
import { AiOutlinePlayCircle, AiOutlineStop } from 'react-icons/ai'

let Timer = () => {
  const [hours, setHours] = useState('00')
  const [minutes, setMinutes] = useState('00')
  const [seconds, setSeconds] = useState('00')
  const [remainingTime, setRemainingTime] = useState('00:00:00')
  const [isRunning, setIsRunning] = useState(false)
  const [validationMessage, setValidationMessage] = useState('')
  const [hasEnded, setHasEnded] = useState(false)

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60

    return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`
  }

  const updateTimer = useCallback(() => {
    const [hours, minutes, seconds] = remainingTime.split(':').map(Number)
    let totalSeconds = hours * 3600 + minutes * 60 + seconds

    if (totalSeconds <= 0) {
      setHasEnded(true)
      setIsRunning(false)
      const audio = document.getElementById('timer-sound')
      try {
        const playSound = () => audio.play()
        Array.from({ length: 5 }).forEach((_, index) => {
          setTimeout(playSound, index * 888)
        })
      } catch (error) {
        console.error('Failed to play the sound:', error)
      }

      return
    }

    totalSeconds--
    const newTime = formatTime(totalSeconds)
    setRemainingTime(newTime)
  }, [remainingTime, setRemainingTime, formatTime])

  useEffect(() => {
    let interval
    if (isRunning && remainingTime !== '') {
      interval = setInterval(updateTimer, 1000)
    }
    return () => clearInterval(interval)
  }, [isRunning, remainingTime, updateTimer])

  const startTimer = (h = hours, m = minutes, s = seconds) => {
    const hoursValue = parseInt(h, 10)
    const minutesValue = parseInt(m, 10)
    const secondsValue = parseInt(s, 10)

    if (
      hoursValue >= 0 &&
      hoursValue <= 24 &&
      minutesValue >= 0 &&
      minutesValue < 60 &&
      secondsValue >= 0 &&
      secondsValue < 60
    ) {
      const totalSeconds = hoursValue * 3600 + minutesValue * 60 + secondsValue

      if (totalSeconds > 0) {
        setHours(h)
        setMinutes(m)
        setSeconds(s)
        setIsRunning(true)
        setRemainingTime(formatTime(totalSeconds))
        setHasEnded(false)
      } else {
        setValidationMessage('Please enter a valid time.')
      }
    }
  }

  const stopTimer = () => {
    setIsRunning(false)
    setHours('00')
    setMinutes('00')
    setSeconds('00')
  }

  const resumeTimer = () => {
    const [resumeHours, resumeMinutes, resumeSeconds] = remainingTime
      .split(':')
      .map(Number)
    const totalSeconds = resumeHours * 3600 + resumeMinutes * 60 + resumeSeconds
    setIsRunning(true)
    setRemainingTime(formatTime(totalSeconds))
  }

  const padZero = (value) => {
    return value.toString().padStart(2, '0')
  }

  return (
    <>
      <div>
        { !isRunning ? 
        <div className="timer-input-container">
          <input
            className="timer-input"
            type="number"
            id="hours"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            onFocus={(e) => {
              if (e.target.value === '00') {
                e.target.value = ''
              }
            }}
            inputMode="numeric" // Set input mode to "numeric"
            maxLength="2" /* Limit input to 2 characters */
            max="24" /* Set maximum input value to 24 */
          />
          <span>:</span>
          <input
            className="timer-input"
            type="number"
            id="minutes"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            onFocus={(e) => {
              if (e.target.value === '00') {
                e.target.value = ''
              }
            }}
            inputMode="numeric" // Set input mode to "numeric"
            maxLength="2" /* Limit input to 2 characters */
            max="59" /* Set maximum input value to 59 */
          />
          <span>:</span>
          <input
            className="timer-input"
            type="number"
            id="seconds"
            value={seconds}
            onChange={(e) => setSeconds(e.target.value)}
            onFocus={(e) => {
              if (e.target.value === '00') {
                e.target.value = ''
              }
            }}
            inputMode="numeric" // Set input mode to "numeric"
            maxLength="2" /* Limit input to 2 characters */
            max="59" /* Set maximum input value to 59 */
          />
        </div> : <span className='void'></span>
        }
        {hours > 24 || minutes >= 60 || seconds >= 60 ? (
          <div className="validation-message">
            Please enter a valid input 24Hrs : 60Min : 60Sec.
          </div>
        ) : null}
        {isRunning === false ? (
          <div className="validation-message">{validationMessage}</div>
        ) : null}
        {/* Timer section */}

      {isRunning ?
        <div id="timer">{remainingTime}</div> : null
      }
      {!isRunning && remainingTime !== '00:00:00'?
        <div id="timer">{remainingTime}</div> : null
      }
      </div>
      {/* Finish message */}
      {hasEnded === true ? (
        <div className="succes-message">You did it! Take some rest</div>
      ) : null}

      {/* Buttons section */}
      <div className="input">
        {isRunning === false ? (
          <button
            className="task-button-timer"
            onClick={() => {
              const newInput =
                hours !== '00' || minutes !== '00' || seconds !== '00'
              if (newInput) {
                startTimer(hours, minutes, seconds)
              } else if (remainingTime !== '00:00:00') {
                resumeTimer()
              } else {
                setValidationMessage('Please enter a valid time.')
              }
            }}
          >
            <span className='button-text'>Start</span>
            <AiOutlinePlayCircle className='icon'/>
          </button>
        ) : null}
        <button className="task-button-timer" onClick={() => stopTimer()}>
        <span className='button-text'>Stop</span>
          <AiOutlineStop className='icon'/>
        </button>
        <audio id="timer-sound" src={timerSound} />
      </div>
      <div className="fix-timer-con">
        <div className="fix-timer">
          <button
            className="task-button-timer"
            onClick={() => startTimer('00', '25', '00')}
          >
            25
          </button>
        </div>
        <div className="fix-timer">
          <button
            className="task-button-timer"
            onClick={() => startTimer('00', '45', '00')}
          >
            45
          </button>
        </div>
        <div className="fix-timer">
          <button
            className="task-button-timer"
            onClick={() => startTimer('01', '00', '00')}
          >
            60
          </button>
        </div>
      </div>
    </>
  )
}

export default Timer
