# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="1.0.0"></a>
# 1.0.0 (2018-06-03)


### Bug Fixes

* **lint:** added missing lint job ([025cc98](https://github.com/AlexanderCannon/tax-calculator/commit/025cc98))
* **linting job:** fixed linting script ([301c89a](https://github.com/AlexanderCannon/tax-calculator/commit/301c89a))
* **national insurance:** improved national insurance accuracy ([35dab95](https://github.com/AlexanderCannon/tax-calculator/commit/35dab95))


### Features

* **fastify:** upgraded express to fastify ([3a0ece9](https://github.com/AlexanderCannon/tax-calculator/commit/3a0ece9))
* **national insurance:** added accurate national insurance calculation ([aa7c727](https://github.com/AlexanderCannon/tax-calculator/commit/aa7c727))
* **net income:** added net income to return value ([98b1c30](https://github.com/AlexanderCannon/tax-calculator/commit/98b1c30))
* **pennies!:** converted the service to use pennies rather than pounds ([514e24a](https://github.com/AlexanderCannon/tax-calculator/commit/514e24a))
* **ramda:** used ramda to make code safer and more elegant ([5690fc4](https://github.com/AlexanderCannon/tax-calculator/commit/5690fc4))
* **student loan:** added student loan calculation ([f612af1](https://github.com/AlexanderCannon/tax-calculator/commit/f612af1))


### BREAKING CHANGES

* **national insurance:** API now takes DoB instead of age int

Before:
```
{
  "grossIncome": "18500",
  "age": "28",
  "pensionContributions": "0.0",
  "studentLoanPlan": "plan1"
}
```

Now:
```
{
  "grossIncome": "18500",
  "dateOfBirth": "1989/7/17",
  "pensionContributions": "0.0",
  "studentLoanPlan": "plan1"
}
```



<a name="0.2.0"></a>
# [0.2.0](https://github.com/AlexanderCannon/tax-calculator/compare/v0.1.1...v0.2.0) (2018-05-28)


### Features

* **pennies!:** converted the service to use pennies rather than pounds ([514e24a](https://github.com/AlexanderCannon/tax-calculator/commit/514e24a))
* **ramda:** used ramda to make code safer and more elegant ([5690fc4](https://github.com/AlexanderCannon/tax-calculator/commit/5690fc4))



<a name="0.1.1"></a>
## 0.1.1 (2018-05-27)


### Bug Fixes

* **lint:** added missing lint job ([025cc98](https://github.com/AlexanderCannon/tax-calculator/commit/025cc98))
