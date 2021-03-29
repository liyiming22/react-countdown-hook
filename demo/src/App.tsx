import { hot } from 'react-hot-loader/root'
import React, { useCallback } from 'react'
import { useCountDown } from 'use-countdown-hook'

function App() {
  const onTimeOver = useCallback(
    () => {
      console.log('time over...')
    },
  [])
  
  const [{ dd, hh, mm, ss }, { start, pause }] = useCountDown(60 * 1000, {
    startImmediately: false,
    onTimeOver
  })
  
  return (
    <>
      <p>
        <span>{ dd }Days</span>
        <span>{ hh }Hours</span>
        <span>{ mm }Minutes</span>
        <span>{ ss }Seconds</span>
      </p>
      <button onClick={ start }>Start</button>
      <button onClick={ pause }>Pause</button>
    </>
  )
}

export default hot(App)
