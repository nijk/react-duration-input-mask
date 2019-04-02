export default {
  input: './src/DurationInputMask.js',
  output: {
    name: 'ReactDurationInputMask',
    globals: {
      react: 'React',
      'prop-types': 'PropTypes',
    },
  },
  plugins: {
    babel: {
      exclude: '**/node_modules/**',
    },
    commonJs: {
      include: '**/node_modules/**',
    },
  },
};
