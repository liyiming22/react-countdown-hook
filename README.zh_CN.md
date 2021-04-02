<h1 align="center">React Countdown hook</h1>

<p align="center">使用 <a href="https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame">requestAnimationFrame</a> 实现的倒计时 hook，以 dd:hh:mm:ss 的形式返回剩余时间</p>

<p align="center">
  <a href="https://github.com/liyiming22/react-countdown-hook/actions">
    <img src="https://github.com/liyiming22/react-countdown-hook/workflows/Build/badge.svg" />
  </a>
  <a href="https://www.npmjs.com/package/use-countdown-hook">
    <img src="https://img.shields.io/npm/v/use-countdown-hook.svg" />
  </a>
  <a href="https://github.com/liyiming22/react-countdown-hook/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" />
  </a>
  <!-- <a href="https://app.codecov.io/gh/liyiming22/react-countdown-hook">
    <img src="https://codecov.io/gh/liyiming22/react-countdown-hook/branch/master/graph/badge.svg" />
  </a> -->
  <a href="https://www.npmjs.com/package/use-countdown-hook">
    <img src="https://img.shields.io/npm/dm/use-countdown-hook.svg" alt="npm downloads" />
  </a>
  <a href="https://badgen.net/bundlephobia/min/use-countdown-hook?label=size">
    <img src="https://badgen.net/bundlephobia/min/use-countdown-hook?label=size" />
  </a>
</p>
</p>

简体中文 | [English](README.md)

## 安装
```bash
yarn add use-countdown-hook
```
或者使用 npm
```bash
npm install use-countdown-hook
```

## 使用
```jsx
import { useCountDown } from 'use-countdown-hook'

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
```
