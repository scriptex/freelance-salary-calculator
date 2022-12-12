# Freelance Salary Calculator

> Based on the labour law in Bulgaria and the [National Revenue Agency regulations](https://nra.bg/wps/portal/nra/taxes/godishen-danak-varhu-dohdite/svobodni-profesii).

## Tech stack

This is a web application built with NextJS, MongoDB, React, Material UI, TypeScript, NodeJS.

## Running locally

First clone this repostory or download it from Github.

Then, when extracted, install the dependencies:

```sh
yarn
```

Then, configure the local environment by copying the `.env.local.example` file to `.env.local` file. 

In the `.env.local` file add the following variables:

```
# API key from https://currencyapi.com/
CURRENCY_API_ENPOINT_TOKEN='<YOUR_TOKEN_FROM_CURRECNY_API>'

# Mongo DB URI
MONGODB_URI=mongodb+srv://<USERNAME>:<PASSWORD>@cluster0.xc0hboq.mongodb.net/<DBNAME>?retryWrites=true&w=majority
```

Then, to run the local development server, run

```sh
yarn dev
```

To lint the code using ESLint, run

```sh
yarn lint
```

To prettify the codebase using Prettier, run

```sh
yarn prettier
```

To build the code for production deployment, run

```sh
yarn build
```

## Deploying to Vercel

Simply link your cloned Github repository with your Vercel account. When this is done, Vercel will automatically pick up the configuration and scripts which it needs. If you're linking a local repository, you can use the Vercel CLI.

Don't forget to set up the environmental variables from above in your Vercel project's dashboard.

## License

MIT
