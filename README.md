# Checkout System

# Questions and Assumptions

## When there are multiple pricing rules, what should happen?
- Should both be applied?
- Should we want to take the best deal?

Current implementation does not factor this in just yet, to enhance on refactor based on future requirements. 

# Architectural Decisions

Focused more on functional programming.

## How to run

If you have `docker` installed, you can run `./docker-run.sh`

```
$ npm install       # install the dependencies
$ npm run build     # build the application
$ npm run test      # test the application
$ npm run start     # start the application
```
