import typescript from 'rollup-plugin-typescript';
import scss from 'rollup-plugin-scss';
import resolve from 'rollup-plugin-node-resolve';

export default {
  input: './client/app.tsx',
  output: {
    file: './rollup-build/bundle.js',
    format: 'cjs'
  },
  plugins: [
    typescript(),
    scss(),
    resolve({
      customResolveOptions: {
        moduleDirectory: './packages'
      }
    }),
  ]
};
