module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true
  },
  extends: 'airbnb',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: 'babel-eslint',
  plugins: [
    'react',
    'jsx-a11y',
    'import',
  ],
  rules: {
    'no-multiple-empty-lines': ['error', { max: 1 }],
    'react/jsx-filename-extension': [1, { extensions: ['.js'] }],
    'react/no-did-update-set-state': ['off'],
  },
};
