# Flight Maps BR

> An interactive map of all flights from/to every Brazilian airport

<p align="center">
  <a href="http://flight-map-br.herokuapp.com" target="_blank" alt="Live Demo" title="Live Demo">
    <img width="300" height="300" src="public/logo512.png">
  </a>
</p>

[Live demo](http://flight-map-br.herokuapp.com)

## Usage

Create a file in the root of the project called `.env.local` with the the paths of the datafiles

The following config should work, however I recommend hosting the datafiles yourself. _(thx @hugosenari for the datafiles)_

```
REACT_APP_AIRPORTS_URL=https://raw.githubusercontent.com/hugosenari/voos/master/data/airports.json
REACT_APP_FLIGHTS_URL=https://raw.githubusercontent.com/hugosenari/voos/master/data/voos.json
```

Then, in the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

<details>
  <summary>All available additional scripts</summary>

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

</details>

## Motivation and Goals

Despite being fully functional and the data displayed being real, this project was conceived to be a playground to test new technologies, especially the new versions/replacements of the technologies that I and my team use on our daily projects.
It was never intended to be a finished product, serving as a more flexible and less critic environment to test new libs, patterns and paradigms while still fully functional.
The main goal here is to validate the viability of implementing these discoveries into our projects, while learning from them.

## Technologies used

* [React](https://reactjs.org/)
* [Typescript](https://www.typescriptlang.org/)
* [Create React App](https://github.com/facebook/create-react-app)
* [Redux](https://redux.js.org/)
* [Redux Saga](https://redux-saga.js.org/)
* [Reselect](https://github.com/reduxjs/reselect)
* [Connected React Router](https://github.com/supasate/connected-react-router)
* [React Hooks](https://reactjs.org/docs/hooks-intro.html)
* [Axios](https://github.com/axios/axios)
* [Leaflet](https://leafletjs.com/)
* [React Leaflet](https://react-leaflet.js.org/)
* [Material-UI](https://material-ui.com/)
* [Material-UI Icons](https://material-ui.com/components/material-icons/)
* [JSS](https://material-ui.com/styles/basics/)
* [ESLint](https://eslint.org/)
* [ESLint Config Airbnb](https://www.npmjs.com/package/eslint-config-airbnb)
* [Prettier](https://prettier.io/)
* [Husky](https://github.com/typicode/husky)
* [Lint Staged](https://github.com/okonet/lint-staged)
* [Yarn](https://yarnpkg.com/)
* [Jest](https://jestjs.io/)
* [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)

---

_2020 - Renato Rodrigues - No rigths reserved_
