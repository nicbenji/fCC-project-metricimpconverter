const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');
const { test } = require('mocha');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function() {

  suite('getNum()', () => {

    test('should correctly read a whole number from input', () => {
      const input = '345km';
      assert.deepEqual(convertHandler.getNum(input), 345);
    });

    test('should correctly read a decimal number from input', () => {
      const input = '35.956lbs';
      assert.deepEqual(convertHandler.getNum(input), 35.956);
    });

    test('should correctly read a fractional from input', () => {
      const input = '2/5mi';
      assert.deepEqual(convertHandler.getNum(input), 0.4);
    });

    test('should correctly read a fractional with decimals from inputs', () => {
      let input = '2.34/4L';
      assert.deepEqual(convertHandler.getNum(input), 0.585);
      input = '31/7.82kg';
      assert.deepEqual(convertHandler.getNum(input), 3.9641943734015346);
    });

    test('should incorrectly return an error on a double-fraction', () => {
      let input = '3/2/3km';
      assert.throw(() => convertHandler.getNum(input), 'invalid number');
      input = '3.2.3lbs';
      assert.throw(() => convertHandler.getNum(input), 'invalid number');
      input = 'adhfjs35lbs';
      assert.throw(() => convertHandler.getNum(input), 'invalid number');
    });

    test('should use a value of 1 if only unit is provided', () => {
      const input = 'gal';
      assert.deepEqual(convertHandler.getNum(input), 1);
    });

  });

  suite('getUnit()', () => {

    test('should correctly read each valid input unit', () => {
      let input = '32km';
      assert.deepEqual(convertHandler.getUnit(input), 'km');
      input = '3.45mi';
      assert.deepEqual(convertHandler.getUnit(input), 'mi');

      input = '3/4gal';
      assert.deepEqual(convertHandler.getUnit(input), 'gal');
      input = '2.5l';
      assert.deepEqual(convertHandler.getUnit(input), 'L');

      input = '4.2/0.3lbs';
      assert.deepEqual(convertHandler.getUnit(input), 'lbs');
      input = '78kg';
      assert.deepEqual(convertHandler.getUnit(input), 'kg');
    });

    test('should correctly return an error for an invalid unit', () => {
      let input = '3.4gallbs';
      assert.throw(() => convertHandler.getUnit(input), 'invalid unit');
      input = 'kmm';
      assert.throw(() => convertHandler.getUnit(input), 'invalid unit');
    });

  });

  suite('getReturnUnit()', () => {

    test('should return the correct unit for each valid input unit', () => {
      let input = 'LBS';
      assert.deepEqual(convertHandler.getReturnUnit(input), 'kg');
      input = 'km';
      assert.deepEqual(convertHandler.getReturnUnit(input), 'mi');
      input = 'gal';
      assert.deepEqual(convertHandler.getReturnUnit(input), 'L');
    });

  });

  suite('spellOutUnit()', () => {

    test('should correctly return the spelled-out string unit for each valid input', () => {
      let input = 'LBS';
      assert.deepEqual(convertHandler.spellOutUnit(input), 'pounds');
      input = 'mi';
      assert.deepEqual(convertHandler.spellOutUnit(input), 'miles')
      input = 'l';
      assert.deepEqual(convertHandler.spellOutUnit(input), 'liters')
    });

  });

  suite('convert()', () => {

    test('should correctly convert gal to L', () => {
      const unit = 'gal';
      const num = 32;
      assert.deepEqual(convertHandler.convert(num, unit), 121.13312);
    });

    test('should correctly convert L to gal', () => {
      const unit = 'l';
      const num = 9.09218;
      assert.deepEqual(convertHandler.convert(num, unit), 2.40190);
    });

    test('should correctly convert mi to km', () => {
      const unit = 'mi';
      const num = 1;
      assert.deepEqual(convertHandler.convert(num, unit), 1.60934);
    });

    test('should correctly convert km to mi', () => {
      const unit = 'km';
      const num = 430;
      assert.deepEqual(convertHandler.convert(num, unit), 267.18962);
    });

    test('should correctly convert lbs to kg', () => {
      const unit = 'lbs';
      const num = 200;
      assert.deepEqual(convertHandler.convert(num, unit), 90.7184);
    });

    test('should correctly convert kg to lbs', () => {
      const unit = 'kg';
      const num = 2.678;
      assert.deepEqual(convertHandler.convert(num, unit), 5.90398);
    });

  });

});
