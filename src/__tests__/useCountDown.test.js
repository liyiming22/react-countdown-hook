import { renderHook, act } from '@testing-library/react-hooks'
import { useCountDown } from '../useCountDown'

describe('check return values', () => {
  test('check initial values', () => {
    const { result } = renderHook(() => useCountDown(60 * 1000, {
      startImmediately: false,
    }))
    const [ timeLeft ] = result.current
    const { dd, hh, mm, ss } = timeLeft
    
    expect(dd).toBe('0')
    expect(hh).toBe('00')
    expect(mm).toBe('01')
    expect(ss).toBe('00')
  })

  test('check handler return types', () => {
    const { result } = renderHook(() => useCountDown(10 * 1000, {
      startImmediately: false,
    }))
    const [ , { start, pause } ] = result.current
    
    expect(typeof start).toBe('function')
    expect(typeof pause).toBe('function')
  })
})

describe('check functions', () => {
  test('test start immediately', async () => {
    jest.useFakeTimers()
    const { result, waitForNextUpdate } = renderHook(() => useCountDown(60 * 1000, {
      startImmediately: true,
    }))

    await waitForNextUpdate()
    await waitForNextUpdate()

    expect(result.current[0].mm).toBe('00')
    expect(result.current[0].ss).toBe('58')
  })

  test('test start fnc', async () => {
    jest.useFakeTimers()
    const { result, waitForNextUpdate } = renderHook(() => useCountDown(60 * 1000, {
      startImmediately: false,
    }))

    expect(result.current[0].mm).toBe('01')

    const [, { start }] = result.current

    act(() => {
      start()
    })

    await waitForNextUpdate()
    await waitForNextUpdate()

    expect(result.current[0].mm).toBe('00')
    expect(result.current[0].ss).toBe('58')
  })
})
