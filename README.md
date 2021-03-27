# Bristol Tech Fair - Backend

This project is built on [Express](http://expressjs.com/) and [Mongoose](https://mongoosejs.com/docs/guide.html).

## Getting started

To run this project you will need Node.js and Yarn v1 installed.

1. Install node - [https://nodejs.org/en/](https://nodejs.org/en/)

2. Install Yarn v1 - [https://classic.yarnpkg.com/en/docs/install/](https://classic.yarnpkg.com/en/docs/install/#mac-stable)

Node handles our build tools, yarn is our package manager and used to run scripts.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the server locally in development mode.
You can test out the API by connecting to the server using a REST client such as [Insomnia](https://support.insomnia.rest/article/157-getting-started-with-insomnia) or [Postman](https://learning.postman.com/docs/getting-started/introduction/).

You need to have a local instance of MongoDB running.\
See the [MongoDB Community Edition Install page](https://docs.mongodb.com/manual/administration/install-community/) for a walkthrough, and reach out in the Slack channel if you get stuck.

You also need to have a `.env` file in your root directory.\
To do this, create a file named `.env` with the following line in it:

```
DB_CONNECTION = mongodb://localhost/btf
```

The server will reload if you make edits.

### `yarn build`

Builds the app for production to the `dist` folder.\
This transpiles the src code using [Babel](https://babeljs.io/docs/en/), which allows us to use ES6+ syntax such as `import`/`export`.

Your app is ready to be deployed!

Any questions please start on discussion with the [lead team](https://github.com/orgs/bristol-tech-fair/teams/lead-team).
