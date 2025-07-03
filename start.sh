#!/bin/sh

npm install

npm run dev &
npm run storybook &

wait