module.exports = {
  getConsumptionCostComparison: getConsumptionCostComparison,
  consumptionCostComparisonHook: consumptionCostComparisonHook,
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
    var vehicleLifetime     = req.query.vehicleLifetime|| 12;

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

    res.send({
      message: "You can save around "+savingsRatioRounded+"% of consumption costs per year which equals in "+savingsEuroRounded+"€.",
      electricCosts: electricCosts,
      combustionCosts: combustionCosts,
      savingsEuro: savingsEuro,
      savingsEuroRounded: savingsEuroRounded,
      savingsRatio: savingsRatio,
      savingsRatioRounded: savingsRatioRounded,
      savingsLifetimeEuroRounded: savingsLifetimeEuroRounded,
      query: req.query
    });

};

// quick an dirty just copy and paste to create different output. Functions should be modularized and used by different requests


function consumptionCostComparisonHook(req, res) {
    console.log(req.query);
    console.log(req.body);

    //creating var for input and use default values
    var lang                = req.query.lang || "de";
    var distancePerYear     = req.body.distancePerYear;

    //validation must be done properly
    if (distancePerYear.length <1) {
      res.status(400).send('you have to provide a distance');
      return;
    }

    //ToDo validation of query parameters

    var kwhConsumption      = req.body.kwhConsumption|| 15;
    var kwhPriceDc          = req.body.kwhPriceDc|| 30;
    var kwhPriceAc          = req.body.kwhPriceAc || 40;
    var fuelConsumption     = req.body.fuelConsumption || 6;
    var fuelType            = req.body.fuelType || gasoline;
    var gasolinePrice       = req.body.gasolinePrice || 151;
    var dieselPrice         = req.body.dieselPrice || 127;
    var lpgPrice            = req.body.lpgPrice || 59;
    var cngPriceKg          = req.body.cngPriceKg || 118;
    var dcRatio             = req.body.dcRatio || 50;
    var homeChargingRatio   = req.body.homeChargingRatio || 50;
    var kwhPriceHome        = req.body.kwhPriceHome || 29;
    var solarChargingRatio  = req.body.solarChargingRatio || 50;
    var vehicleLifetime     = req.body.vehicleLifetime|| 12;

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


    if (lang=="de") {
      if (fuelType=="gasoline"){
        var fuel = "Super"
      }
      if (fuelType=="diesel"){
        var fuel = "Diesel"
      }
      if (fuelType=="lpg"){
        var fuel = "Flüssiggas"
      }
      if (fuelType=="cng"){
        var fuel = "Erdgas"
      }
      var response ="Mit dem Neo sparst du "+savingsRatioRounded+"% Deiner jährlich Verbrauchskosten gegenüber einem "+fuel+" Verbrenner mit "+fuelConsumption+"l/100km. Das entspricht "+savingsEuroRounded+"€ pro Jahr. Über einen Nutzungszeitraum von "+vehicleLifetime+" Jahren ergibt das eine Summe von "+savingsLifetimeEuroRounded+"€.";

    }
    else {
      var response ="You can save around "+savingsRatioRounded+"% of consumption costs per year which equals "+savingsEuroRounded+"€. Considering a usage time of "+vehicleLifetime+" years it sums up to "+savingsLifetimeEuroRounded+"€.";
    }
    console.log(response);

    //to be checked if json is returned properly
    res.send({
      status: "success",
      raw_output: [
        {
          output_variable: "savingsEuroRounded",
          output_value: savingsEuroRounded,
        },
        {
          output_variable: "savingsRatioRounded",
          output_value: savingsRatioRounded,
        },
        {
          output_variable: "savingsLifetimeEuroRounded",
          output_value: savingsLifetimeEuroRounded,
        }
      ],
     chatbot_response: response
    });
  };
