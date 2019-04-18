import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import { uglify } from 'rollup-plugin-uglify';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';

import common from './rollup.config.common';

const external = Object.keys(common.output.globals);

const UMD = {
  input: common.input,
  output: {
    file: 'dist/index.umd.js',
    format: 'umd',
    name: common.output.name,
    globals: common.output.globals,
  },
  external,
  plugins: [
    resolve(),
    commonjs(common.plugins.commonJs),
    babel(common.plugins.babel),
    replace({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    sizeSnapshot(),
  ],
};

const ESM = {
  input: common.input,
  output: {
    file: 'dist/index.esm.js',
    format: 'esm',
    name: common.output.name,
    globals: common.output.globals,
  },
  external: id => !id.startsWith('\0') && !id.startsWith('.') && !id.startsWith('/'),
  plugins: [
    babel(common.plugins.babel),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    sizeSnapshot(),
  ],
};

const CJS = {
  input: common.input,
  output: {
    file: 'dist/index.cjs.js',
    format: 'cjs',
    name: common.output.name,
    globals: common.output.globals,
  },
  external: id => !id.startsWith('\0') && !id.startsWith('.') && !id.startsWith('/'),
  plugins: [
    babel(common.plugins.babel),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    sizeSnapshot(),
  ],
};

const minify = (config) => ({
  ...config,
  output: {
    ...config.output,
    file: config.output.file.replace('.js', '.min.js'),
  },
  plugins: [
    ...config.plugins,
    uglify(),
  ],
});

export default [
  CJS,
  minify(CJS),
  ESM,
  UMD,
  minify(UMD),
];
