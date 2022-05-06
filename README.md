
## Description

API for the test task. The application runs in a docker container.

## Prepare the app

Create and update the .env file
```bash
# copy .env
$ cp .env.example .env
```
## Running the app

```bash
# run docker container
$ docker-compose up -d
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```