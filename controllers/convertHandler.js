
function ConvertHandler() {

  this.getNum = function(input) {
    const number = input.match(/(\d*\.?\d+)/g);
    console.log(number);
    if (number === null) {
      return 1;
    }
    if (number.length > 2) {
      throw new Error('invalid number');
    }

    // Handle fractionals
    if (input.includes('/')) {
      const numerator = number[0];
      const denominator = number[1];
      return numerator / denominator;
    }

    // Throw error if non-fractional number has more than one match e.g. 3.2.3
    if (number.length > 1) {
      throw new Error('invalid number');
    }
    return Number(number[0]);
  };


  this.getUnit = function(input) {
    let result;

    return result;
  };

  this.getReturnUnit = function(initUnit) {
    let result;

    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;

    return result;
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    return result;
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;

    return result;
  };

}

module.exports = ConvertHandler;
