#!/bin/sh

npm install

npm run dev &
npm run storybook &
npm run docs:dev

wait