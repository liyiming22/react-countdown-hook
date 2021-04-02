import { hot } from 'react-hot-loader/root'
import React, { useState } from 'react'
import { useCountDown } from 'use-countdown-hook'

function Timer() {
  const [cnt, setCnt] = useState(0)
  const onTimeOver = () => {
    console.log(cnt)
  }
  
  const [{ dd, hh, mm, ss }, { start, pause }] = useCountDown(10 * 1000, {
    startImmediately: false,
    onTimeOver
  })
  
  return (
    <>
      <p>{ dd } Days</p>
      <p>{ hh } Hours</p>
      <p>{ mm } Minutes</p>
      <p>{ ss } Seconds</p>
      <button onClick={ start }>Start</button>
      <button onClick={ pause }>Pause</button>
      <button onClick={ () => setCnt(cnt => cnt + 1) }>add</button>
    </>
  )
}

function App() {
  const [show, setShow] = useState(true)
  return (
    <>
      <h1>App</h1>
      {
        show && <Timer />
      }
      <button onClick={() => setShow(show => !show)}>toggle</button>
    </>
  )
}

export default hot(App)
