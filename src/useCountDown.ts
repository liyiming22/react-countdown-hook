import { useCallback, useEffect, useRef, useState } from 'react'

import {
  ICountDownConfig,
  ITimerProps,
  ITimeRemain,
  ReturnValue
} from './types'

import {
  SECOND_UNIT,
  DAY_SECOND,
  HOUR_SECOND,
  MINUTE_SECOND
} from './constants'

const formatTimeString = (n: number) => Math.floor(n).toString().padStart(2, '0')

const formatSecond = (second: number): ITimeRemain => {
  const days = second / DAY_SECOND
  const hours = second % DAY_SECOND / HOUR_SECOND
  const minutes = second % HOUR_SECOND / MINUTE_SECOND
  const seconds = second % MINUTE_SECOND

  const currTimeRemain = {
    dd: Math.floor(days).toString(),
    hh: formatTimeString(hours),
    mm: formatTimeString(minutes),
    ss: formatTimeString(seconds)
  }

  return currTimeRemain
}

export const useCountDown = (initialRemain = 0, {
  startImmediately = true,
  onTimeOver
}: Partial<ICountDownConfig> = {}): ReturnValue => {

  const timer = useRef<ITimerProps>({ timeLeft: initialRemain })

  const [timeRemain, setTimeRemain] = useState<ITimeRemain>(() => formatSecond(initialRemain / SECOND_UNIT))

  const updateTime = useCallback((currTs: number) => {
    const currTimeRemain = formatSecond(currTs / SECOND_UNIT)
    setTimeRemain(currTimeRemain)
  }, [])

  const cancelRaf = useCallback(() => {
    if ('number' === typeof timer.current.requestRef) {
      window.cancelAnimationFrame(timer.current.requestRef)
    }
  }, [])

  const run: FrameRequestCallback = ts => {
    if (!timer.current.lastInterval) {
      timer.current.lastInterval = ts
    }

    const currElapsed = Math.min(SECOND_UNIT, timer.current.timeLeft)
    if (currElapsed <= ts - timer.current.lastInterval) {
      timer.current.lastInterval += currElapsed
      timer.current.timeLeft -= currElapsed
      updateTime(timer.current.timeLeft)
    }

    if (0 < timer.current.timeLeft) {
      timer.current.requestRef = window.requestAnimationFrame(run)
    } else {
      onTimeOver && onTimeOver()
      timer.current = { timeLeft: 0 }
    }
  }

  const pause = useCallback(() => {
    cancelRaf()
    timer.current.lastInterval = undefined
  }, [])

  const start = useCallback(() => {
    cancelRaf()
    timer.current.requestRef = window.requestAnimationFrame(run)
  }, [])

  useEffect(() => {
    if (startImmediately) {
      start()
    }
  }, [])

  return [ timeRemain, { start, pause } ]
}
