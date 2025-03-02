function ConvertHandler() {

  this.getNum = function(input) {
    const number = input.match(/(\d*\.?\d+)/g);
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

  Object.defineProperty(this, 'units', {
    value: {
      km: {
        returnUnit: 'mi',
        conversion: ''
      },
      mi: {
        returnUnit: 'km',
        conversion: ''
      },
      kg: {
        returnUnit: 'lbs',
        conversion: ''
      },
      lbs: {
        returnUnit: 'kg',
        conversion: ''
      },
      l: {
        returnUnit: 'gal',
        conversion: ''
      },
      gal: {
        returnUnit: 'l',
        conversion: ''
      }
    },
    writable: false,
    configurable: false,
    enumerable: true
  });

  this.getUnit = function(input) {
    const units = Object.keys(this.units);
    const regex = new RegExp('[\\d.]+\\s*(' + units.join('|') + ')$', 'i');
    const unitMatch = regex.exec(input);

    if (unitMatch === null) {
      throw new Error('invalid unit');
    }
    const unit = unitMatch[1];

    return unit;
  };

  this.getReturnUnit = function(initUnit) {
    const returnUnit = this.units[initUnit]?.returnUnit;
    if (!returnUnit) {
      throw new Error(`Unsupported unit: ${initUnit}`);
    }
    return returnUnit;
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
