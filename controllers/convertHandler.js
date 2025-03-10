function splitInput(input) {
  const number = input.match(/^[\d.\/]+/g);
  const unit = input.match(/[^0-9.\/]+$/g);
  console.log(number, unit);
  return {
    number,
    unit
  }
}

function ConvertHandler() {

  this.getNum = function(input) {
    const INVALID_NUMBER = 'invalid number'

    const numberMatch = splitInput(input).number;
    if (/^[\D]+$/.test(input)) {
      return 1;
    }
    if (!numberMatch) {
      throw new Error(INVALID_NUMBER);
    }

    const numberString = numberMatch[0]
    // Handle fractions
    if (numberString.includes('/')) {
      const fraction = numberString.split('/');
      const [numerator, denominator] = fraction;

      if (fraction.length > 2) {
        throw new Error(INVALID_NUMBER);
      }

      console.log(numerator, denominator);
      return numerator / denominator;
    }

    const number = Number(numberString);
    if (Number.isNaN(number)) {
      throw new Error(INVALID_NUMBER);
    }

    return number;
  };

  Object.defineProperty(this, 'units', {
    value: {
      km: {
        spelledOut: 'kilometers',
        returnUnit: 'mi',
        conversion: 0.6213712
      },
      mi: {
        spelledOut: 'miles',
        returnUnit: 'km',
        conversion: 1.60934
      },
      kg: {
        spelledOut: 'kilograms',
        returnUnit: 'lbs',
        conversion: 2.204623
      },
      lbs: {
        spelledOut: 'pounds',
        returnUnit: 'kg',
        conversion: 0.453592
      },
      l: {
        spelledOut: 'liters',
        returnUnit: 'gal',
        conversion: 0.264172,
        capitalized: true
      },
      gal: {
        spelledOut: 'gallons',
        returnUnit: 'L',
        conversion: 3.78541
      }
    },
    writable: false,
    configurable: false,
    enumerable: true
  });

  this.getUnit = function(input) {
    const INVALID_UNIT = 'invalid unit';

    const unit = splitInput(input).unit[0];
    if (!unit) {
      throw new Error(INVALID_UNIT);
    }

    const key = unit.toLowerCase();
    const isCapitalized = this.units[key]?.['capitalized'];
    if (!this.units.hasOwnProperty(key)) {
      throw new Error(INVALID_UNIT);
    }
    return isCapitalized ? unit.toUpperCase() : key;
  };

  this.getReturnUnit = function(initUnit) {
    const returnUnit = this.units[initUnit.toLowerCase()]?.returnUnit;

    if (!returnUnit) {
      throw new Error(`Unsupported unit: ${initUnit}`);
    }

    return returnUnit;
  };

  this.spellOutUnit = function(unit) {
    const spelledOutUnit = this.units[unit.toLowerCase()]?.spelledOut;

    if (!spelledOutUnit) {
      throw new Error(`Unsupported unit: ${unit}`);
    }

    return spelledOutUnit;
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    if (typeof initNum !== 'number' || Number.isNaN(initNum)) {
      throw new TypeError(`Expected number, got ${typeof initNum}`);
    }

    const conversionRate = this.units[initUnit.toLowerCase()]?.conversion;
    if (!conversionRate) {
      throw new Error(`Unsupported unit: ${initUnit}`)
    }

    return Number((initNum * conversionRate).toFixed(5));
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };

}

module.exports = ConvertHandler;
