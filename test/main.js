'use strict';

const ASSERT = require('assert');
const MODULIZER = require('../');

describe('new Modulizer()', function() {

  it('should instantiate without errors, but with a logged warning.', function() {
    ASSERT.doesNotThrow(() => {
      let modulizer = new MODULIZER(__dirname + '/files');
    });
  });

});

describe('Modulizer.execute("test1")', function() {

  let modulizer = new MODULIZER(__dirname + '/files');

  it('should run without errors.', function() {
    ASSERT.doesNotThrow(() => {
      modulizer.execute('test1');
    });
  });

});
 
describe('Modulizer.executeAll()', function() {

  let modulizer = new MODULIZER(__dirname + '/files');

  it('should run without errors.', function() {
    ASSERT.doesNotThrow(() => {
      modulizer.executeAll();
    });
  });

});

describe('Modulizer.methodArray', function() {

  let modulizer = new MODULIZER(__dirname + '/files');

  it('should equal 1 since only one JavaScript file with a function export exists.', function() {
    ASSERT.equal(modulizer.methodArray.length, 1);
  });

});

describe('Modulizer.methodObject', function() {

  let modulizer = new MODULIZER(__dirname + '/files');

  it('should exsist with "test1" as a property.', function() {
    ASSERT.ok(!!modulizer.methodObject['test1']);
  });

});
