import { hot } from 'react-hot-loader/root'
import React from 'react'
import useCountDown from './useCountDown'

function App() {
  const [{ dd, hh, mm, ss }, start] = useCountDown(60 * 1000, false)

  return (
    <div className='app'>
      <p>
        <span>{ dd }天</span>
        <span>{ hh }小时</span>
        <span>{ mm }分钟</span>
        <span>{ ss }秒</span>
      </p>
      <button onClick={start}>Start</button>
    </div>
  )
}

export default hot(App)
