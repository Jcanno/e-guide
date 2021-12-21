import path from 'path'
import babelPlugin, { getBabelOutputPlugin } from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import { defineConfig } from 'rollup'
import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'

const extensions = ['.js', '.ts', '.tsx']
const { root } = path.parse(process.cwd())

function external(id) {
  return !id.startsWith('.') && !id.startsWith(root)
}

function createCommonJSConfig(input, output) {
  return defineConfig({
    input,
    output: [
      { file: output, format: 'cjs', exports: 'named' },
      { file: 'es/index.js', format: 'es' },
    ],
    external,
    plugins: [
      resolve({ extensions }),
      babelPlugin({
        extensions,
        comments: false,
        babelHelpers: 'bundled',
        plugins: [
          [
            '@babel/plugin-transform-typescript',
            {
              isTSX: true,
              jsxPragma: 'Guide.createElement',
              jsxPragmaFrag: 'Guide.Fragment',
            },
          ],
          [
            '@babel/plugin-transform-react-jsx',
            {
              pragma: 'Guide.createElement',
              pragmaFrag: 'Guide.Fragment',
            },
          ],
        ],

      }),
      getBabelOutputPlugin({
        presets: [
          [
            '@babel/preset-env',
            {
              exclude: [
                '@babel/plugin-transform-regenerator'
              ],
            }
          ]
        ],
      }),

      terser({
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          warnings: false,
        },
        format: {
          comments: RegExp(`${pkg.name}`),
        },
      }),
    ],
  })
}

export default function () {
  return [createCommonJSConfig('src/index.tsx', 'lib/index.js')]
}
