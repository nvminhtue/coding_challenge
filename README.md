## CODING_CHALLENGE
## Introduction

This is a web application built on NodeJS using NestJS Framework [https://nestjs.com/] and ReactJS supported by Create-React-App [https://create-react-app.dev/]

This application's main function is to allow the user to import CSV file with keywords contained for Google searching and crawling.

- Heroku based running app: https://google-massive-searching.herokuapp.com/

## Project Setup

This project has 2 main parts: `server` and `client`

### Database

- PostgreSQL version recommended on: 12.3

- In case using docker:
  ```sh
    docker pull postgres
    docker pull redis                                                                                                          
  ```
  ```sh
    docker run --name somename -v mypostgres:/var/lib/postgresql/data -e POSTGRES_DB="database" -e POSTGRES_PASSWORD="password" -d -p 5432:5432 postgres 
    docker run --name somename -v mypostgres:/var/lib/postgresql/data -e POSTGRES_DB="database_test" -e POSTGRES_PASSWORD="password" -d -p 5432:5432 postgres 
  ```

  ```sh
    docker run --name redis -p 6379:6379 -d redis
  ```

### Server side

- Node version should be set on v14.17.6

- Node version manager is recommended: [https://github.com/nvm-sh/nvm]

  ```sh
  nvm install 14.17.6
  nvm use 14.17.6
  ```

#### Development
- Create environment keys:
  ```sh
  cd server
  cp .env.sample .env
  ```

    | Environment Variable   | Description                                                                                          |
    | ---------------------- | ---------------------------------------------------------------------------------------------------- |
    | DATABASE_HOST          | the postgres host url using on local, it might be `localhost` as above docker setup                  |
    | DATABASE_PORT          | the postgres port using on local, it might be `5432` as above docker setup                           |
    | DATABASE_USERNAME      | the postgres username using on local, it might be `postgres` as above docker setup                   |
    | DATABASE_PASSWORD      | the postgres password using on local, it might be `password` as above docker setup                   |
    | DATABASE_DEV_NAME      | the postgres database using on local, it might be `database` as above docker setup                   |
    | DATABASE_TEST_NAME     | the postgres database using on local, it might be `database_test` as above docker setup              |
    | APP_DOMAIN             | the local host domain, it might be `localhost`                                                       |
    | PORT                   | the local port domain, it might be `4000`                                                            |
    | NODE_ENV               | the current node env, it might be `dev`                                                              |
    | CLIENT_URL             | the current client side, it might be `http://localhost:3000`                                         |
    | ACCESS_TOKEN_SECRET    | random access token secret, it could be `yoursecretaccesstoken04062022`                              |
    | REFRESH_TOKEN_SECRET   | random refresh token secret, it could be `yoursecretrefreshtoken04062022`                            |
    | REDIS_HOST             | the local redis host url, it might be `localhost` as above docker setup                              |
    | REDIS_PORT             | the local redis port, it might be `6379` as above docker setup                                       |


- Install Server-side application dependencies:

  ```sh
  yarn install
  ```

- Run migration:

  Running app migration

  ```sh
  yarn m:run
  ```

  Testing environment migration

  ```sh
  yarn m-test:run
  ```

- Run all tests:

  ```sh
  yarn test 
  ```

- Run all lint:

  ```sh
  yarn lint
  ```

  Fix all lint
    ```sh
  yarn flint
  ```

- Run application:
  Dev mode: 
  ```sh
  yarn start:dev
  ```

  Debug mode:
  ```sh
  yarn start:debug
  ```

### Client side

- Node version should be set on v14.17.6

#### Development

- Create environment keys:
  ```sh
  cd clint
  cp .env.sample .env
  ```

    | Environment Variable   | Description                                                                                          |
    | ---------------------- | ---------------------------------------------------------------------------------------------------- |
    | NODE_ENV               | the node environment using on local, it might be `development`                                       |
    | REACT_APP_SERVER_URL   | the postgres port using on local, it might be `http://localhost:4000` as above server setup          |

- Install client-side application dependencies:

  ```sh
  yarn install
  ```

- Run all tests:

  ```sh
  yarn test 
  ```

- Run all lint:

  ```sh
  yarn lint
  ```

  Fix all lint
    ```sh
  yarn lint:fix
  ```

- Run application:
  Dev mode: 
  ```sh
  yarn start
  ```

### CI/CD
This project uses CircleCI as CI and Heroku as deployment method

#### CircleCI
- CircleCI config upon project link as [https://circleci.com/docs/2.0/concepts/#projects] this tutorial.
- Setup environment in the `Environment Variables` likely the above `server-side environment part` as [https://circleci.com/docs/2.0/env-vars/#setting-an-environment-variable-in-a-project] this tutorial

#### Heroku
- Create a new a app
- Add 2 prequisite add-ons: `Heroku Postgres` and `Heroku Redis`
- Getting into individual Add-On and add env into project as [https://devcenter.heroku.com/articles/config-vars] tutorial
- Getting into deploy section on Heroku Dashboard of your App, select `Github deployment method` and active for the `Automatic deploys` or `Manual Deploy` as the favor.
