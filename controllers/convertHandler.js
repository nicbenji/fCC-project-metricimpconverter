function ConvertHandler() {

  this.getNum = function(input) {
    const number = input.match(/^(?!.*\d+\.\d+\.\d*[\D]+$)(\d*\.?\d+)\/?(\d*\.?\d+)[\D]+$/);
    if (/^[\D]+$/.test(input)) {
      return 1;
    }
    if (!number) {
      throw new Error('invalid number');
    }

    // Handle fractions
    if (input.includes('/')) {
      const numerator = number[1];
      const denominator = number[2];
      return numerator / denominator;
    }

    //Concatenate match groups if not fraction
    return Number(number[1] + number[2]);
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
    const letters = input.match(/[A-Za-z]+$/)[0];
    console.log(letters);
    if (!letters) {
      throw new Error('invalid unit');
    }

    const key = letters.toLowerCase();
    const isCapitalized = this.units[key]?.['capitalized'];
    if (!this.units.hasOwnProperty(key)) {
      throw new Error('invalid unit');
    }
    return isCapitalized ? letters.toUpperCase() : key;
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
