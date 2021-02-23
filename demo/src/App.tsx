import { hot } from 'react-hot-loader/root'
import React from 'react'
import useCountDown from 'use-countdown-hook'

function App() {
  const [{ ss }] = useCountDown(60 * 1000)

  return (
    <>
      <h1>Demo</h1>
      <p>{ ss }</p>
    </>
  )
}

export default hot(App)
