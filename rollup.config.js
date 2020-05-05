/* eslint-disable no-undef */
import copy from 'rollup-plugin-copy';
import del from 'rollup-plugin-delete';
import { eslint } from 'rollup-plugin-eslint';
import livereload from 'rollup-plugin-livereload';
import postcss from 'rollup-plugin-postcss';
import serve from 'rollup-plugin-serve';
import { terser } from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';

// Builds based on environment
const OUTPUT =
  process.env.BUILD === 'development' ? 'output/dev' : 'output/dist';
const SOURCEMAP = process.env.BUILD === 'development' ? 'inline' : false;
const MINIFY = process.env.BUILD === 'development' ? null : terser();
const SERVER =
  process.env.BUILD === 'development'
    ? [serve(OUTPUT), livereload(OUTPUT)]
    : [];

export default {
  input: './src/index.js',
  output: {
    dir: OUTPUT,
    format: 'es',
    sourcemap: SOURCEMAP,
  },
  plugins: [
    resolve(),
    babel({
      babelHelpers: 'bundled',
      include: 'src/**/*.js',
      exclude: 'node_modules/**',
    }),
    del({ targets: OUTPUT }),
    eslint({
      fix: true,
      include: 'src/**/*.js',
      exclude: ['node_modules/**', 'src/**/*.css'],
    }),

    MINIFY,
    postcss({
      extensions: ['.css'],
      extract: true,
      minimize: true,
    }),
    copy({
      targets: [{ src: 'public/*', dest: OUTPUT }],
    }),
    ...SERVER,
  ],
};
