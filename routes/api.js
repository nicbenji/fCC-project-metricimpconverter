'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function(app) {

  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get((req, res) => {
    const input = req.query.input;
    try {
      const { initNum, initUnit } = handleBadRequest(input);
      const returnNum = convertHandler.convert(initNum, initUnit);
      const returnUnit = convertHandler.getReturnUnit(initUnit);
      const resString = convertHandler
        .getString(initNum, initUnit, returnNum, returnUnit);
      res.json({ initNum, initUnit, returnNum, returnUnit, string: resString });
    } catch (error) {
      console.error(error.message);
      res.send(error.message);
    }
  });

  function handleBadRequest(input) {

    let numError, unitError;
    let initNum, initUnit;

    try {
      initNum = convertHandler.getNum(input);
    } catch (error) {
      numError = error.message;
    }

    try {
      initUnit = convertHandler.getUnit(input);
    } catch (error) {
      unitError = error.message;
    }

    if (numError && unitError) {
      throw new Error('invalid number and unit');
    }
    if (numError) {
      throw new Error(numError);
    }
    if (unitError) {
      throw new Error(unitError);
    }

    return { initNum, initUnit };

  }
};


