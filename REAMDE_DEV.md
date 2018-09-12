# Spark – developer edition

here are some of the commands to run the project locally

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [requirements](#requirements)
- [dev stack](#dev-stack)
- [commands](#commands)
  - [building dependencies](#building-dependencies)
  - [simulate a prod locally](#simulate-a-prod-locally)
    - [build only](#build-only)
    - [serve only](#serve-only)
  - [development environment](#development-environment)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## requirements

- [node](http://nodejs.org/download/) >= 8.12.0
- [yarn](https://yarnpkg.com/lang/en/) >= 1.9.4

## dev stack

- framework: [Vue.js](https://vuejs.org/)
- build tools:
  - [Vue CLI 3](https://cli.vuejs.org/)
  - [Gulp](https://gulpjs.com/)
- progressive web application: [workbox](https://developers.google.com/web/tools/workbox/)

## commands

### building dependencies

```sh
yarn install
```

### simulate a prod locally

```sh
yarn start
```

application will be running on https://localhost:8080

#### build only

```sh
yarn build
```

#### serve only

```sh
yarn serve
```

### development environment

```sh
yarn dev
```

application will be running on http://localhost:8080/
