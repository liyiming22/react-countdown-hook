import typescript from '@rollup/plugin-typescript'

export default {
  input: 'src/index.tsx',
  output: {
    file: 'public/index.js',
    format: 'es',
    exports: 'named',
    sourcemap: true
  },
  plugins: [
    typescript()
  ]
}
