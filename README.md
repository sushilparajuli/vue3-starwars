# vue3-startwars

Star Wars is a Vue3 App that’s consumes an external Star Wars’ API.
___
<br>

### 👉 [Live Preview] 
____
## .env Variables

VITE_API_URL=https://swapi.dev/api/
____
## 🛠 Technologies

This project was developed with the following technologies:

- VueJS3 (Composition API )
- Typescript
- Vue-Router
- SCSS
- PrimeVue 
- ESLint/Prettier
- Vitest (for unit tests)
- Cypress (for E2E tests)
________________________________________________________      
## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

____
## 🚀 How to run project ?

Clone the project.

```bash
$ git clone
$ cd
```

# install the dependencies
```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
