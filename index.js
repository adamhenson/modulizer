'use strict';

const FS = require('fs');
const INFO = require('./package');
const PACKAGE_NAME = INFO.name;

class Modulizer {

  /**
   * @param {string} directory - String path to module directory. Required.
   * @param {object} options - Object for options. Optional.
   */
  constructor(directory, options) {
    if(!directory){
      throw new Error(`${PACKAGE_NAME}: constructor(): "directory" argument is undefined.`);
    }
    this._directory = directory;
    // default function arguments still unsupported :(
    // so we can't do this constructor(directory, options = {})
    this._options = options || {};
  }

  initialize() {
    let self = this;
    FS.readdirSync(self._directory).forEach((file) => {
      if(file.indexOf('.js') !== -1) {
        require(self._directory + '/' + file)(self._options);
      }
    });
  }

}

module.exports = Modulizer;
