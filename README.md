# consumptionCostsCalculator
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FJROEBKE%2FconsumptionCostsCalculator.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2FJROEBKE%2FconsumptionCostsCalculator?ref=badge_shield)

A small application to calculate e-vehicle consumption costs versus combustion engine vehicles. You will receive a percentage and absolute savings of consumption costs. All parameters are changeable via query parameters.

Steps:

1. Create a .env file like this and add your properties

DOMAIN="localhost"
PORT="8081"
USER="" // for basic auth
PASSWORD="" // for basic auth

2. npm init

3. node server.js

4. enjoy

Please be aware:
- no input validation so far, you can easily break it
- no test
- no security

use @ your own risk


## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FJROEBKE%2FconsumptionCostsCalculator.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2FJROEBKE%2FconsumptionCostsCalculator?ref=badge_large)