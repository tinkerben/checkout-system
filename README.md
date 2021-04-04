# Checkout System

# Questions and Assumptions

## When there are multiple pricing rules, what should happen?
- Should both be applied?
- Should we want to take the best deal?

The current implementation does not factor this just yet. In a real life scenario, more questions
would have been asked to determine the actual requirements (but sometimes to move things along a 
decision needs to be made).

For the purpose of this test, it will take the latest (assume desc. chronological order) deal for 
the customer.

## How to run

If you have `docker` installed, you can run `./docker-run.sh`

```
$ npm install       # install the dependencies
$ npm run build     # build the application
$ npm run test      # test the application
$ npm run start     # start the application
```
