module.exports = {
  getConsumptionCostComparison: getConsumptionCostComparison,
  consumptionCostComparisonHook: consumptionCostComparisonHook,
};

// general function for calculation purposes
function consumptionCostComparison(req, callback) {

    var distancePerYear= req.distancePerYear;

    //validation must be done properly
    if (distancePerYear.length <1) {
      res.status(400).send('you have to provide a distance');
      return;
    }

    //ToDo validation of query parameters

    var kwhConsumption      = req.kwhConsumption|| 15;
    var kwhPriceDc          = req.kwhPriceDc|| 30;
    var kwhPriceAc          = req.kwhPriceAc || 40;
    var fuelConsumption     = req.fuelConsumption || 6;
    var fuelType            = req.fuelType || "gasoline";
    var gasolinePrice       = req.gasolinePrice || 151;
    var dieselPrice         = req.dieselPrice || 127;
    var lpgPrice            = req.lpgPrice || 59;
    var cngPriceKg          = req.cngPriceKg || 118;
    var dcRatio             = req.dcRatio || 50;
    var homeChargingRatio   = req.homeChargingRatio || 50;
    var kwhPriceHome        = req.kwhPriceHome || 29;
    var solarChargingRatio  = req.solarChargingRatio || 50;
    var vehicleLifetime     = req.vehicleLifetime|| 12;

    // calulation separately for alternative measurement
    var electricCostsAc = kwhPriceAc * kwhConsumption * distancePerYear / 100;
    var electricCostsDc = kwhPriceDc * kwhConsumption * distancePerYear / 100;

    // calulation of electricCosts by considering ratio Dc, ratio home chargin, and solar ratio
    var electricCosts = (electricCostsAc * (100-dcRatio)/100 + electricCostsDc * dcRatio/100)*(1-homeChargingRatio/100)+homeChargingRatio/100*kwhPriceHome*(1-solarChargingRatio/100);

    // calculation of combustion costs depending on fuel type
    if (fuelType=="gasoline"){
      var combustionCosts = gasolinePrice * fuelConsumption * distancePerYear / 100;
    }
    if (fuelType=="diesel"){
      var combustionCosts = dieselPrice * fuelConsumption * distancePerYear / 100;
    }
    if (fuelType=="lpg"){
      var combustionCosts = lpgPrice * fuelConsumption * distancePerYear / 100;
    }
    if (fuelType=="cng"){
      var combustionCosts = cngPriceKg * fuelConsumption * distancePerYear / 100;
    }
    // savings per year
    var savingsEuro  = (combustionCosts - electricCosts)/100; //divided through 100 to achieve €
    var savingsEuroRounded = Math.round(savingsEuro);

    var savingsRatio = (combustionCosts - electricCosts)/combustionCosts*100; // multiple by 100 to achieve percentage value
    var savingsRatioRounded =  Math.round(savingsRatio);

    // consumption costs savings over lifetime
    var savingsLifetimeEuroRounded = Math.round(savingsEuro*vehicleLifetime);

    //create comparison result as an object
    var comparison = {
      message: "You can save around "+savingsRatioRounded+"% of consumption costs per year which equals in "+savingsEuroRounded+"€.",
      electricCosts: electricCosts,
      combustionCosts: combustionCosts,
      savingsEuro: savingsEuro,
      savingsEuroRounded: savingsEuroRounded,
      savingsRatio: savingsRatio,
      savingsRatioRounded: savingsRatioRounded,
      savingsLifetimeEuroRounded: savingsLifetimeEuroRounded,
    }
    console.log("calcs done");
    callback(comparison);
};


// getter function
function getConsumptionCostComparison(req, res) {
      console.log(req.query);

      // call request function with provided input with nameless callback function to send results back
      consumptionCostComparison(req.query, function(comparison){
        console.log("callback done");
        res.send(comparison);
        console.log(comparison);
      });
};


//hook function which produces specially required output
function consumptionCostComparisonHook(req, res) {
    console.log(req.body);

    // call request function with provided input with nameless callback function to send results back
    consumptionCostComparison(req.body, function(comparison){
      console.log("callback done");

      res.set('content-type', 'text/json');
      res.send({
        status: "success",
        raw_output: [
          {
            output_variable: "savingsEuroRounded",
            output_value: comparison.savingsEuroRounded,
          },
          {
            output_variable: "savingsRatioRounded",
            output_value: comparison.savingsRatioRounded,
          },
          {
            output_variable: "savingsLifetimeEuroRounded",
            output_value: comparison.savingsLifetimeEuroRounded,
          }
        ],
       chatbot_response: ""
      });
      console.log(comparison);
    });
};
