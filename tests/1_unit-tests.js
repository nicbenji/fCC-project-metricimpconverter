const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

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
      const input = '2/5';
      assert.deepEqual(convertHandler.getNum(input), 0.4);
    });

    test('should correctly read a fractional with decimals from inputs', () => {
      let input = '2.34/4';
      assert.deepEqual(convertHandler.getNum(input), 0.585);
      input = '31/7.82';
      assert.deepEqual(convertHandler.getNum(input), 3.9641943734015346);
    });

    test('should incorrectly return an error on a double-fraction', () => {
      const input = '3/2/3';
      assert.throw(() => convertHandler.getNum(input), 'invalid number');
    });

    test('should use a value of 1 if only unit is provided', () => {
      const input = 'gal';
      assert.deepEqual(convertHandler.getNum(input), 1);
    })

  });

});
