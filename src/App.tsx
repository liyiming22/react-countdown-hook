import { hot } from 'react-hot-loader/root'
import React from 'react'
import Test from './Test'
import './index.less'

function App() {
  return (
    <div className='app'>
      <Test />
    </div>
  )
}

export default hot(App)
