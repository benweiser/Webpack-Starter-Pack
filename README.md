## Webpack Starter Kit

[![Greenkeeper badge](https://badges.greenkeeper.io/benweiser/Webpack-Starter-Pack.svg)](https://greenkeeper.io/)

This is a highly opinionated Webpack starter for modern front-end web development that utlizes sass, typescript, stylelint, tslint
and postcss. This project was created as an attempt to replace my current build system using gulp with a quicker
and easier to use build process.

## Getting Started
### Step 1. Clone the repository in your projects folder

```bash
git clone https://github.com/benweiser/Webpack-Starter-Pack
```

### Step 2. (Optional). Install Yarn

Alternatively you can use plain old NPM just skip this step and npm install, npm run dev/prod instead

**Mac Installation**

Get Homebrew

```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```
Get Yarn

```bash
brew install yarn
```
**Windows Installation**

Visit https://yarnpkg.com/lang/en/docs/install/#windows-tab to get the installer

**Install Packages**

```bash
yarn install
```
### Step 3. Build Assets

**Development Mode**

This will set up the webpack-dev-server which will hot-reload your project and build all your assets on every change

```
yarn run dev
```

**Production Mode**

Bundles up all your assets nice and minified ready to be shipped into a production environment

```
yarn run prod
```


**Test Mode**

Used for running tests

```
yarn run test
```


