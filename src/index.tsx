import { useCallback, useEffect, useRef, useState } from 'react'

export const START_TIME = '00'

export interface ITimerProps {
  timeLeft: number
  requestRef?: ReturnType<typeof window.requestAnimationFrame>
  startedTime?: number
  lastInterval?: number
}

export interface ITimeRemain {
  dd: string
  hh: string
  mm: string
  ss: string
}

export type UseCountDown = (initialRemain: number, startImmediately?: boolean) => [ITimeRemain, () => void]

const formatTimeString = (n: number) => Math.floor(n).toString().padStart(2, '0')

const useCountDown: UseCountDown = (initialTime, startImmediately = true) => {
  const timer = useRef<ITimerProps>({ timeLeft: initialTime })
  const [timeRemain, setTimeRemain] = useState<ITimeRemain>({
    dd: START_TIME,
    hh: START_TIME,
    mm: START_TIME,
    ss: START_TIME
  })

  const updateTime = useCallback((currTs: number) => {
    const days = currTs / 1000 / 60 / 60 / 24

    const hours = currTs / 1000 / 60 / 60 - (24 * Math.floor(days))

    const minutes = currTs / 1000 / 60 - (24 * 60 * Math.floor(days)) - (60 * Math.floor(hours))

    const seconds = currTs / 1000 - (24 * 60 * 60 * Math.floor(days)) - (60 * 60 * Math.floor(hours)) - (60 * Math.floor(minutes))

    setTimeRemain({
      dd: Math.floor(days).toString(),
      hh: formatTimeString(hours),
      mm: formatTimeString(minutes),
      ss: formatTimeString(seconds)
    })

  }, [])

  const run: FrameRequestCallback = ts => {
    if (!timer.current.startedTime || !timer.current.lastInterval) {
      timer.current.startedTime = ts
      timer.current.lastInterval = ts
    }

    const currElapsed = Math.min(1000, timer.current.timeLeft)
    if (currElapsed <= ts - timer.current.lastInterval) {
      timer.current.lastInterval += currElapsed
      timer.current.timeLeft -= currElapsed
      updateTime(timer.current.timeLeft)
    }

    if (0 < timer.current.timeLeft) {
      timer.current.requestRef = window.requestAnimationFrame(run)
    } else {
      timer.current = { timeLeft: 0 }
    }
  }

  const start = useCallback(() => {
    if ('number' === typeof timer.current.requestRef) {
      window.cancelAnimationFrame(timer.current.requestRef)
    }

    timer.current.requestRef = window.requestAnimationFrame(run)
  }, [])

  useEffect(() => {
    if (startImmediately) {
      start()
    }
  }, [])

  return [ timeRemain, start ]
}

export default useCountDown
