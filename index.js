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

    let self = this;
    self._directory = directory;
    self._options = options || {};
    this._methodArray = [];
    this._methodObject = {};

    FS.readdirSync(self._directory).forEach((file) => {
      if(file.indexOf('.js') !== -1) {
        let moduleFunction = require(self._directory + '/' + file);

        if(typeof moduleFunction !== 'function') {
          console.log(`WARNING: ${PACKAGE_NAME}: constructor(): "${self._directory}/${file}" does not export a function. Execution of it has been skipped.`);
        } else {
          let filePathFragments = file.split('/');
          let filePathFragmentsLength = filePathFragments.length;
          let _id = (filePathFragments[filePathFragmentsLength - 1]).replace('.js', '');

          this._methodObject[_id] = moduleFunction;
          this._methodArray.push(moduleFunction);
        }
      }
    });
  }

  /**
   * Returns all methods as an object.
   */
  get methodObject() {
    return this._methodObject;
  }

  /**
   * Returns all methods as an array.
   */
  get methodArray() {
    return this._methodArray;
  }

  /**
   * Execute a specific module identified by the file name (without ".js").
   * @param {string} moduleName - Name of module to be executed. The file name from where
   *    the code originated. Optional.
   * @param {object} options - Object for options. Optional.
   */
  execute(moduleName, options) {
    let self = this;
    let extendedOptions = Object.assign(self._options, options);

    if(!this._methodObject[moduleName]) {
      throw new Error(`${PACKAGE_NAME}: execute(): "${moduleName}" is undefined. Try logging "Modulizer.methodObject" to see all methods.`);
    } else {
      this._methodObject[moduleName](options);
    }
  }

  /**
   * Executes all modules.
   */
  executeAll() {
    let self = this;
    this._methodArray.forEach((moduleFunction) => {
      moduleFunction(self._options);
    });
  }

}

module.exports = Modulizer;
