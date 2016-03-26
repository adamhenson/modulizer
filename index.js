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
    let fileLength = 0;

    FS.readdirSync(self._directory).forEach((file) => {
      if(file.indexOf('.js') !== -1) {
        let moduleFunction = require(self._directory + '/' + file);

        if(typeof moduleFunction !== 'function') {
          console.log(`WARNING: ${PACKAGE_NAME}: initialize(): "${self._directory}/${file}" does not export a function. Execution of it has been skipped.`);
        } else {
          require(self._directory + '/' + file)(self._options);
          fileLength++;
        }
      }
    });

    return fileLength;
  }

}

module.exports = Modulizer;
