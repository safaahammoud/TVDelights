# Project Framework

TV shows app demo built using [Vue 3](https://github.com/vuejs/core), [PrimeVue](https://primevue.org/),[API](https://www.tvmaze.com/api) and [TypeScript](https://github.com/microsoft/TypeScript).
<br>

**🍿 Live preview:** https://main--tv-delights.netlify.app/

# Project Structure
The project main directories are: views and components,and store.

All views are lazy loaded modules on router level.
The following folders are found:

Components: contains reusable sections to be added to the pages.

Store: contains all the views logic of state, including state and actions.

## Practical Extra Features

- Error Handling on a Global Scale: Send a toast message to the user in the event of an API Error.
- A horizontal loader shows at the bottom of the application's main toolbar if there is a pending request.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```