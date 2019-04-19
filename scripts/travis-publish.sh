#!/bin/sh

setup_git() {
  git config --global user.email "travis@travis-ci.org"
  git config --global user.name "Travis CI"
  git checkout -b master
}

version_bump() {
  npm version minor
}

commit_and_push() {
  git commit --message "Travis build: $TRAVIS_BUILD_NUMBER"
  git remote add origin https://${GH_TOKEN}@github.com/nijk/react-duration-input-mask.git > /dev/null 2>&1
  git push --quiet --set-upstream origin master
}

setup_git
version_bump
commit_and_push
