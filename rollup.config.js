import resolve from '@rollup/plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'
import commonjs from '@rollup/plugin-commonjs'
import peerDepsExternal from "rollup-plugin-peer-deps-external"
import pkgJson from "./package.json"

const extensions = ['.ts']

export default {
  input: 'src/index.ts',
  output: {
    file: pkgJson.main,
    format: 'esm',
  },
  plugins: [
    peerDepsExternal(),
    resolve({ extensions }),
    commonjs({
      include: /node_modules/,
    }),
    typescript(/*{ plugin options }*/)
  ]
}
