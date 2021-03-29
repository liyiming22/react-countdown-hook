export interface ICountDownConfig {
  startImmediately?: Boolean
  onTimeOver?: () => void
}

export interface ITimerProps {
  timeLeft: number
  requestRef?: ReturnType<typeof window.requestAnimationFrame>
  lastInterval?: number
}

export interface IOperationsProps {
  start: () => void
  pause: () => void
}

export interface ITimeRemain {
  dd: string
  hh: string
  mm: string
  ss: string
}

export type ReturnValue = [ITimeRemain, IOperationsProps]
