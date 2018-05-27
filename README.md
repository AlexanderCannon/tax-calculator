# Functional-programming based Gross to net salary calculator API

An API written in node.js using functional techniques & Express that calculates your net take-home pay!

## Configuration
The config is currently hard coded in taxRules.js. 🙃

I am trying to think of a clever way to make this deployable as config. 👍

## Running

This project uses NVM to allow you to keep things consistent, I'm using node 10 because this is a personal project trying the new features is a worthwhile trade off for stability. 🤷‍

Select the correct node version using ☑️
```
$ nvm use
```
Or, if you don't have the specified version install and use with 💪
```
$ nvm install 10.2.0

$ nvm use
```
Install 🔧
```
$ yarn
```
Then start 🎮
```
$ yarn start
```

It's as easy as that! 😎


## Contributing

Read my [contributing guide](/CONTRIBUTING.md) to learn how to get started.

## Technical design considerations

The model currently is based on the real UK tax rules as per [gov.uk](https://www.gov.uk/browse/tax/income-tax) as interpreted by myself; I am not an accountant! 🤓

# Disclaimer!
## I am not an accountant!
I have spent the bulk of my time thinking about how to make this project functional, and node 10 rather than how tax should work, so please don't base any real estimations off my assumptions. 😱
