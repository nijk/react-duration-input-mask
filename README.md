# React Duration Input Mask

[![npm version](https://img.shields.io/npm/v/react-duration-input-mask.svg)](https://www.npmjs.com/package/react-duration-input-mask) [![Build Status](https://img.shields.io/travis/nijk/react-duration-input-mask/master.svg)](https://travis-ci.org/nijk/react-duration-input-mask) [![codecov](https://codecov.io/gh/nijk/react-duration-input-mask/branch/master/graph/badge.svg)](https://codecov.io/gh/nijk/react-duration-input-mask) [![Bundle size](https://img.shields.io/bundlephobia/minzip/react-duration-input-mask.svg)](https://bundlephobia.com/result?p=react-duration-input-mask) [![License](https://img.shields.io/github/license/nijk/react-duration-input-mask.svg)](https://github.com/nijk/react-duration-input-mask/blob/master/LICENSE)

### Install
`npm install react-duration-input-mask` or `yarn add react-duration-input-mask`

### Documentation
You can find the [docs and demos here](https://react-duration-input-mask.netlify.com/)

### Contributing
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/dwyl/esta/issues)

#### Development
Runs the docz dev server with file watching:

`yarn start`

#### Git
To avoid issues with merge conflicts on `.size-snapshot.json`,
set a merge driver:
`git config merge.ours.driver true`

#### Tests
Run on push via husky and can be run separately:

`yarn test`

Or using file watch mode:

`yarn run test:dev`

#### Linting
Run on commit via husky and can be run separately:

`yarn run lint`

#### Publish

Publish to npm registry from `master`

##### Patch version
`yarn version --patch && git push origin --tags`

##### Minor version
`yarn version --minor && git push origin --tags`

##### Major version
`yarn version --major && git push origin --tags`
