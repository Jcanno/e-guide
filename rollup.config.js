import path from 'path'
import babelPlugin from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import { defineConfig } from 'rollup'
import { terser } from 'rollup-plugin-terser'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import pkg from './package.json'

const extensions = ['.js', '.ts', '.tsx']
const { root } = path.parse(process.cwd())
const isDevelopment = process.env.BUILD === 'development'

function external(id) {
  return isDevelopment ? false : !id.startsWith('.') && !id.startsWith(root)
}

const dynamicPulgins = isDevelopment
  ? [
      serve({
        open: true,
        port: 8080,
        openPage: '/examples/index.html',
      }),
      livereload('es'),
    ]
  : [
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
    ]

const plugins = [
  ...dynamicPulgins,
  babelPlugin({
    extensions,
    comments: false,
    babelHelpers: 'runtime',
    plugins: [
      '@babel/plugin-transform-runtime',
      [
        '@babel/plugin-transform-typescript',
        {
          isTSX: true,
        },
      ],
      [
        '@babel/plugin-transform-react-jsx',
        {
          runtime: 'automatic',
          importSource: 'use-jsx',
        },
      ],
    ],
  }),
  resolve({ extensions }),
]

function createRollupConfig(input) {
  return defineConfig({
    input,
    output: [
      { file: 'lib/index.js', format: 'cjs', exports: 'named' },
      { file: 'es/index.js', format: 'es' },
    ],
    external,
    plugins,
  })
}

function createUMDOutput(input) {
  return defineConfig({
    input,
    output: [{ file: 'dist/e-guide.js', format: 'umd', name: 'Guide' }],
    plugins,
  })
}

export default function () {
  return [createRollupConfig('src/index.tsx'), createUMDOutput('src/index.tsx')]
}
