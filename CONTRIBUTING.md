# Contributing

## Contact

Get in touch with me at _a.m.t.cannon@gmail.com_. You can follow me on [Twitter](https://twitter.com/alexmcan) or visit my [GitHub](https://github.com/AlexanderCannon) and give me lots of stars. 🤩✨

## Issues
If you want to make any non-trivial changes to the app please raise an issue so we can come to an agreement on a solution or improvement before any development work is done. 🛠

### Fixes

Feel free to report any bugs via issues, ideally with test cases and evidence. 🛰

If you fix a bug and don't think it is necessary to raise an issue then just raise a pull request directly. 🛩

### Pull requests
Make sure your pull requests describe what your change is for and where possible provide evidence of improvements. Where necessary please add tests. ⏲

### Commit messages
Please use the [Angular Commit Message Conventions](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines) for your commit messages. 🛡

### Tests

All changes should have comprehensive test coverage. 🏆

Before you commit ensure `yarn test` and `yarn lint` pass. 🥇

## Developing Locally

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

See the scripts fields in `package.json` for all available scripts. 🎁

### Tests

Run the full suite with 🌡
```
$ yarn test
```

See [package.json](package.json) for test scripts. Please remember to check all tests are passing before you raise a pull request.

### Linting

I am using [eslint](https://eslint.org/) with the airbnb config. 🔬

See the [eslintrc](.eslintrc.js) for more details of our rules, and remember to check all your code conforms to the repository's standards before you raise a pull request. 🤖

Run the linting standalone with 🙌
```
$ yarn lint
```


## Deploying

I will eventually add docker, watch this space! 👀
