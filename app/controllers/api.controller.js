module.exports = {
  getConsumptionCostComparison: getConsumptionCostComparison,
};


function getConsumptionCostComparison(req, res) {

    var distancePerYear= req.query.distancePerYear;

    //validation must be done properly
    if (distancePerYear.length <1) {
      res.status(400).send('you have to provide a distance');
      return;
    }

    //ToDo validation of query parameters

    var kwhConsumption      = req.query.kwhConsumption|| 15;
    var kwhPriceDc          = req.query.kwhPriceDc|| 30;
    var kwhPriceAc          = req.query.kwhPriceAc || 40;
    var fuelConsumption     = req.query.fuelConsumption || 6;
    var fuelType            = req.query.fuelType || gasoline;
    var gasolinePrice       = req.query.gasolinePrice || 151;
    var dieselPrice         = req.query.dieselPrice || 127;
    var lpgPrice            = req.query.lpgPrice || 59;
    var cngPriceKg          = req.query.cngPriceKg || 118;
    var dcRatio             = req.query.dcRatio || 50;
    var homeChargingRatio   = req.query.homeChargingRatio || 50;
    var kwhPriceHome        = req.query.kwhPriceHome || 29;
    var solarChargingRatio  = req.query.solarChargingRatio || 50;

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

    res.send({
      message: 'You can save around '+savingsRatioRounded+"% of consumption costs per year which equals in "+savingsEuroRounded+"€.",
      electricCosts: electricCosts,
      combustionCosts: combustionCosts,
      savingsEuro: savingsEuro,
      savingsEuroRounded: savingsEuroRounded,
      savingsRatio: savingsRatio,
      savingsRatioRounded: savingsRatioRounded,
      query: req.query
    });

};
