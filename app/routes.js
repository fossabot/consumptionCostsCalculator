// create a new express router
const express      = require('express'),
  router           = express.Router(),
  viewController   = require('./controllers/view.controller'),
  apiController    = require('./controllers/api.controller');

// export router
module.exports = router;

// show swagger spec
router.get('/swagger.json', viewController.swagger);


/*
define api routes
--------------------------------------------------------
 */
// swagger defintions
/**
// get coordinates
/**
 * @swagger
 * /api/v1/getComparison:
 *   get:
 *     tags:
 *       - calculation
 *     description: Returns comparison of costs for e-vehicle vs. combustion vehicle
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: distancePerYear
 *         description: provide distance per year in km
 *         in: "query"
 *         required: true
 *         type: integer
 *         example: 15000
 *       - name: kwhConsumption
 *         description: consumption value for e-vehicle in kwh per 100km, default 15 kwh
 *         in: "query"
 *         required: false
 *         type: integer
 *         example: 15
 *       - name: kwhPriceAc
 *         description: price per kwh for AC in cent, default 30 cent
 *         in: "query"
 *         required: false
 *         type: integer
 *         example: 30
 *       - name: kwhPriceDc
 *         description: price per kwh for DC in cent, default 40 cent
 *         in: "query"
 *         required: false
 *         type: integer
 *         example: 40
 *       - name: kwhPriceHome
 *         description: price per kwh at home in cent, default 29 cent
 *         in: "query"
 *         required: false
 *         type: integer
 *         example: 29
 *       - name: dcRatio
 *         description: ratio in percentage of dc charing in comparison to ac charging
 *         in: "query"
 *         required: false
 *         type: integer
 *         example: 50
 *       - name: homeChargingRatio
 *         description: ratio in percentage of charing at home
 *         in: "query"
 *         required: false
 *         type: integer
 *         example: 50
 *       - name: solarChargingRatio
 *         description: ratio in percentage of home charging done via free solar power
 *         in: "query"
 *         required: false
 *         type: integer
 *         example: 0
 *       - name: fuelConsumption
 *         description: consumption value for cobustion vehicle in l per 100km, default 6l
 *         in: "query"
 *         required: false
 *         type: integer
 *         example: 6
 *       - name: fuelType
 *         description: fuel type either diesel=1 or gasoline=0, default gasoline
 *         in: "query"
 *         required: false
 *         type: string
 *         example: 0
 *       - name: dieselPrice
 *         description: price per l diesel in cent, default
 *         in: "query"
 *         required: false
 *         type: integer
 *         example: 127
 *       - name: gasolinePrice
 *         description: price per l gasoline in cent, default
 *         in: "query"
 *         required: false
 *         type: integer
 *         example: 151
 *     responses:
 *       200:
 *         description: coordinates and other details about the adress
 */
router.get('/api/v1/getComparison', apiController.getComparison);
