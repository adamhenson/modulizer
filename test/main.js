'use strict';

const ASSERT = require('assert');
const MODULIZER = require('../');
let modulizer = new MODULIZER(__dirname + '/files');
 
describe('Modulizer.initialize()', function() {
  it('returns 1 when initilized on a directory of 2 JavaScript files in which 1 doesn\'t include an export statement.', function() {
    ASSERT.equal(modulizer.initialize(), 1);
  });
});