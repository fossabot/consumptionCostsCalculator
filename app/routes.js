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
// get ConsumptionCostComparison
/**
 * @swagger
 * /api/v1/getConsumptionCostComparison:
 *   get:
 *     tags:
 *       - ConsumptionCostComparison
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
 *         description: price per kwh for DC in cent (default 40 cent)
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
 *         description: ratio in percentage of dc charing in comparison to ac charging, default value 50%
 *         in: "query"
 *         required: false
 *         type: integer
 *         example: 50
 *       - name: homeChargingRatio
 *         description: ratio in percentage of charing at home, default 50%
 *         in: "query"
 *         required: false
 *         type: integer
 *         example: 50
 *       - name: solarChargingRatio
 *         description: ratio in percentage of home charging done via free solar power, default 0%
 *         in: "query"
 *         required: false
 *         type: integer
 *         example: 0
 *       - name: fuelConsumption
 *         description: consumption value for cobustion vehicle in l or kg per 100km, default 6l
 *         in: "query"
 *         required: false
 *         type: integer
 *         example: 6
 *       - name: fuelType
 *         description: fuel type either gasoline, diesel, lpg, cng, default gasoline
 *         in: "query"
 *         required: false
 *         type: string
 *         example: gasoline
 *       - name: gasolinePrice
 *         description: price per l gasoline in cent, default 151
 *         in: "query"
 *         required: false
 *         type: integer
 *         example: 151
 *       - name: dieselPrice
 *         description: price per l diesel in cent, default 127
 *         in: "query"
 *         required: false
 *         type: integer
 *         example: 127
 *       - name: lpgPrice
 *         description: price per l diesel in cent, default
 *         in: "query"
 *         required: false
 *         type: integer
 *         example: 127
 *       - name: cngPriceKg
 *         description: price per kg cng in cent, default 118
 *         in: "query"
 *         required: false
 *         type: integer
 *         example: 118
 *       - name: vehicleLifetime
 *         description: life time of vehicle in years which should be considered,
 *         in: "query"
 *         required: false
 *         type: integer
 *         example: 12
 *     responses:
 *       200:
 *         description: cost comparison results
 */
router.get('/api/v1/getConsumptionCostComparison', apiController.getConsumptionCostComparison);


// Cost comparison Hook

/**
 * @swagger
* /api/v1/consumptionCostComparisonHook:
*   post:
*     tags:
*      - costComparions
*     description: Returns comparison of costs for e-vehicle vs. combustion vehicle in a specific format.
*     produces:
*       - application/json
*     consumes:
*       - application/json
*     parameters:
*       - name: lang
*         in: query
*         required: true
*         description: provide language you want response either de or en
*         type: string
*         enum: [de, en]
*         example: de
*       - name: data
*         in: body
*         required: true
*         type: string
*         schema:
*           $ref: '#/definitions/DataCosts'
*     responses:
*       200:
*         description: Cost comparison results
*
*/

router.post('/api/v1/consumptionCostComparisonHook', apiController.consumptionCostComparisonHook);


/**
* @swagger
*  definitions:
*   DataCosts:
*     type: object
*     required:
*       - distancePerYear
*     properties:
*       distancePerYear:
*         description: provide distance per year in km
*         type: integer
*         example: 15000
*       kwhConsumption:
*         description: consumption value for e-vehicle in kwh per 100km, default 15 kwh
*         type: integer
*         example: 15
*       kwhPriceAc:
*         description: price per kwh for AC in cent, default 30 cent
*         in: "query"
*         required: false
*         type: integer
*         example: 30
*       kwhPriceDc:
*         description: price per kwh for DC in cent, default 40 cent
*         in: "query"
*         required: false
*         type: integer
*         example: 40
*       kwhPriceHome:
*         description: price per kwh at home in cent, default 29 cent
*         in: "query"
*         required: false
*         type: integer
*         example: 29
*       dcRatio:
*         description: ratio in percentage of dc charing in comparison to ac charging, default value 50%
*         in: "query"
*         required: false
*         type: integer
*         example: 50
*       homeChargingRatio:
*         description: ratio in percentage of charing at home, default 50%
*         in: "query"
*         required: false
*         type: integer
*         example: 50
*       solarChargingRatio:
*         description: ratio in percentage of home charging done via free solar power, default 0%
*         in: "query"
*         required: false
*         type: integer
*         example: 0
*       fuelConsumption:
*         description: consumption value for cobustion vehicle in l or kg per 100km, default 6l
*         in: "query"
*         required: false
*         type: integer
*         example: 6
*       fuelType:
*         description: fuel type either gasoline, diesel, lpg, cng, default gasoline
*         in: "query"
*         required: false
*         type: string
*         example: gasoline
*       gasolinePrice:
*         description: price per l gasoline in cent, default 151
*         in: "query"
*         required: false
*         type: integer
*         example: 151
*       dieselPrice:
*         description: price per l diesel in cent, default 127
*         in: "query"
*         required: false
*         type: integer
*         example: 127
*       lpgPrice:
*         description: price per l diesel in cent, default
*         in: "query"
*         required: false
*         type: integer
*         example: 127
*       cngPriceKg:
*         description: price per kg cng in cent, default 118
*         in: "query"
*         required: false
*         type: integer
*         example: 118
*       vehicleLifetime:
*         description: life time of vehicle in years which should be considered,
*         in: "query"
*         required: false
*         type: integer
*         example: 12
*/
