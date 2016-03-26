'use strict';

const FS = require('fs');
const INFO = require('./package');
const MODULE_NAME = INFO.name;

class ExpressRouteDirectory {

	constructor(directory, options) {
		if(!directory){
			throw new Error(`${MODULE_NAME}: constructor(): "directory" argument is undefined.`);
		}
		this._directory = directory;
		// default function arguments still unsupported :(
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

module.exports = ExpressRouteDirectory;
