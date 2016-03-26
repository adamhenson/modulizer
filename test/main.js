'use strict';

const ASSERT = require('assert');
const MODULIZER = require('../');

describe('new Modulizer()', function() {

  it('should instantiate without errors.', function() {
    ASSERT.doesNotThrow(() => {
      let modulizer = new MODULIZER(__dirname + '/files');
    });
  });

});
 
describe('Modulizer.initialize()', function() {

  let modulizer = new MODULIZER(__dirname + '/files');

  it('should return 1 when initilized on a directory of 2 JavaScript files in which 1 doesn\'t include an export statement.', function() {
    ASSERT.equal(modulizer.initialize(), 1);
  });

});