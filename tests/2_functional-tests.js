const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  suite('/api/convert endpoint', () => {

    test('should convert a valid input', () => {
    });

    test('should return the correct error message on invalid unit', () => {
    });

    test('should return the correct error message on invalid number', () => {
    });

    test('should return the correct error message on invalid number and unit', () => {
    });

    test('should convert an input with just a correct unit', () => {
    });

  });

});
