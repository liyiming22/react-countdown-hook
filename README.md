<h1 align="center">React Countdown hook</h1>

<p align="center">A simple React coutdown hook implemented by <a href="https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame">requestAnimationFrame</a></p>

<p align="center">
  <a href="https://github.com/liyiming22/react-countdown-hook/actions">
    <img src="https://github.com/liyiming22/react-countdown-hook/workflows/Build/badge.svg" />
  </a>
  <a href="https://www.npmjs.com/package/use-countdown-hook">
    <img src="https://img.shields.io/npm/v/use-countdown-hook.svg" />
  </a>
</p>
</p>

## Usage
```javascript
const [{ dd, hh, mm, ss }, start] = useCountDown(60 * 1000, false)

return (
  <div className='app'>
    <p>
      <span>{ dd }Days</span>
      <span>{ hh }Hours</span>
      <span>{ mm }Minutes</span>
      <span>{ ss }Seconds</span>
    </p>
    <button onClick={start}>Start</button>
  </div>
)
```
