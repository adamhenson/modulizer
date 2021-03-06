#Modulizer

[![npm](https://img.shields.io/npm/v/modulizer.svg)]()
[![Build Status](https://api.travis-ci.org/adamhenson/modulizer.svg?branch=master)](https://travis-ci.org/adamhenson/modulizer)
[![Coverage Status](https://coveralls.io/repos/github/adamhenson/modulizer/badge.svg?branch=master)](https://coveralls.io/github/adamhenson/modulizer?branch=master)
[![npm](https://img.shields.io/npm/dm/modulizer.svg)]()
[![npm](https://img.shields.io/npm/dt/modulizer.svg)]()

> A Node.js package used to bundle a group of files into a module object.
>
> **Modulizer is used to specify a directory of files to be executed (iteratively) in one batch via `Modulizer.executeAll()`, or to be used individually via `Modulizer.execute('myFileName')`.** Each file represents a module or group of modules. Originally this was created for a routing architecture under frameworks like [Express](http://expressjs.com/), so that each route or set of routes would have their own file. Data can be passed into a wrapping function within each file via an options object.
>
> Modulizer accepts two arguments - the directory path, and an options object. Calling `Modulizer.executeAll()` will loop through code from all files, passing in the options object. This is best for modules that execute code without returning values. `Modulizer.execute('myFileName')` will execute code from only `myFileName.js`, and `Modulizer.execute('myFileName', moreOptions)` will extend the options Modulizer was instantiated with uniquely. See below for a more elaborate example.

## Installation

```bash
$ npm install modulizer --save
```

## Example Usage

In this case, our modules are routes. For each file in our routes directory we have routing logic.

######/server.js

```javascript
const express = require('express');
const app = express();
const Modulizer = require('modulizer');
const CONFIG = require('./config/main');

let routes = new Modulizer(__dirname + '/routes', {
  'app' : app,
  'CONFIG' : CONFIG
});

routes.executeAll();
```

Otherwise, if we only wanted to execute the code within `index.js`, we could do this:

```javascript
routes.execute('index');
```

To take that even further, we could extend the `options` object uniquely for this module like so:

```javascript
let moreOptions = {
  'foo' : 'bar',
  'hello' : 'world'
}
routes.execute('index', moreOptions);
```

######/routes/index.js

```javascript
module.exports = function(options){
  const app = options.app;
  const CONFIG = options.CONFIG;

  app.get('/', function(req, res) {
    res.send('Hello, ' + CONFIG.name);
  });
}
```

## Important Usage Notes

- This package uses [ES2015](https://nodejs.org/en/docs/es6/), so Node.js v4.4.1+ is required.
- Files within the specified directory need to have '.js' extensions. Other file types will be ignored.
- Files within the specified directory need to export a function, otherwise they will be ignored.

## Methods

#### constructor(directory [,options])

Called upon instantiation. This represents the [class constructor method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/constructor).

* @param {string} directory - String path to module directory. Required.
* @param {object} options - Object for options to be used for all modules. Optional.

#### execute(moduleName [,options])

Execute a specific module identified by the file name (without ".js")... the `moduleName` argument.

* @param {string} moduleName - Name of module to be executed. The file name from where the code originated. Optional.
* @param {object} options - Object to extend object for all modules uniquely. Optional.

#### executeAll()

Execute all modules.

## Properties

#### methodObject
An object containing all module functions with keys of the pertaining file name (without ".js").

#### methodArray
An array containing all module functions.