module.exports = {
  getComparison: getComparison,
};


function getComparison(req, res) {

    var distancePerYear= req.query.distancePerYear;

    //validation must be done properly
    if (distancePerYear.length <1) {
      res.status(400).send('you have to provide a distance');
      return;
    }

    //ToDo validation of query parameters

    var kwhConsumption  = req.query.kwhConsumption|| 15;
    var kwhPriceDc      = req.query.kwhPriceDc|| 30;
    var kwhPriceAc      = req.query.kwhPriceAc || 40;
    var fuelConsumption = req.query.fuelConsumption || 6;
    var fuelType        = req.query.fuelType || 1; // 0 = gasoline, 1 = diesel
    var gasolinePrice   = req.query.gasolinePrice || 151;
    var dieselPrice     = req.query.dieselPrice || 127;
    var dcRatio         = req.query.dcRatio || 50;
    var homeChargingRatio = req.query.homeChargingRatio || 50;
    var kwhPriceHome    = req.query.kwhPriceHome || 29;
    var solarChargingRatio = req.query.solarChargingRatio || 50;

    // calulation separately for alternative measurement
    var electricCostsAc = kwhPriceAc * kwhConsumption * distancePerYear / 100;
    var electricCostsDc = kwhPriceDc * kwhConsumption * distancePerYear / 100;

    // calulation of electricCosts by considering ratio Dc, ratio home chargin, and solar ratio
    var electricCosts = (electricCostsAc * (100-dcRatio)/100 + electricCostsDc * dcRatio/100)*(1-homeChargingRatio/100)+homeChargingRatio/100*kwhPriceHome*(1-solarChargingRatio/100);

    // calculation of combustion costs depending on fuel type
    if (fuelType==0){
      var combustionCosts = gasolinePrice * fuelConsumption * distancePerYear / 100;
    }
    if (fuelType==1){
      var combustionCosts = dieselPrice * fuelConsumption * distancePerYear / 100;
    }

    // savings per year
    var savings  = (combustionCosts - electricCosts)/100; //divided through 100 to achieve €
    var savingsSplit = savings.toString().split(".",1); //split cents from € to present round number

    var savingsRatio = (combustionCosts - electricCosts)/combustionCosts*100; // multiple by 100 to achieve percentage value
    var savingsRatioSplit = savingsRatio.toString().split(".",1); //split to achieve nice percentages

    res.send('You can save around '+savingsRatioSplit+"% of consumption costs per year which equals in "+savingsSplit+"€.");

};
