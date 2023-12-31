#!/bin/bash

if [ ! -f ".env" ]; then
  cp .env.example .env
fi
if [ ! -f ".env.test" ]; then
  cp .env.example .env.test
fi

# npm install

npx prisma migrate dev

npm run start:dev
