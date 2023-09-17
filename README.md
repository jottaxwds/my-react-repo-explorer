# Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

- `npm start`: Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
- `npm test`: Launches the test runner in the interactive watch mode.
- `npm run build`: Builds the app for production to the `build` folder.
- `npm run eject`: it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them.
- `npm run ts-codegen`: To graphql codegen types generation from graphql files
- `npm run prettier`: Runs code linter
## 3rd party libraries highlights

- **Material-UI** as the main 3rd party library for the main components such as `Search` and `ResultsTable`.
- `emotion` as the main lib to style things here.
- `react-testing-library` to run react unit tests.
- `apollo-client` to consume GraphQL from client.

## How its made?

`components` folder holds individual components used within the `page` shown in the app. This `page` (`ReactRepos`) consumes a custom `hook` that holds the `state` and all the logic to retrieve results based on given `searchValue`, and `sort` params (`sortBy` & `sortOrder`). Also holds `loadMore` logic for pagination and exposes part of the `state` needed to be consumed by the page and components inside and show results on the `ResultsTable`.

`ResultsTable` is a generic table component approach that supports a generic `items` data shape `prop` and a `columns` config `prop` that is used to manage which columns should be visible based on the properties provided on each `item` from given `items`. Also it holds configuration for each column to be shown in terms of how data should be displayed (`displayValue` prop from column config) and some custom column configuration (like the `minColSize` that defines the minimum width of the current column) -> Check [columnsConfig](https://github.com/jottaxwds/my-react-repo-explorer/blob/master/src/components/ResultsTable/columnsConfig.tsx).

`services` folder holds the ApolloProvider configuration to be used in the app that `wraps` it in order to let inner pages to consume its content.

Unit tests were made to cover business logic & corner cases

It includes docker configuration files to easily 'dockerize' it.