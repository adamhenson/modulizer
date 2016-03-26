#Modulizer

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coveralls Status][coveralls-image]][coveralls-url] [![Downloads][downloads-image]][npm-url]

> A Node.js package used to execute a group of modular code at once from files within a specified directory.

Allows a develepor to specify a directory in which each file represents a module or group of modules to be executed. Originally this was created to dynamically generate routes under frameworks with routing mechanisms like [Express](http://expressjs.com/). In this example use case - every route or set of routes can be encapsulated within its respective file. Option properties can be passed (such as `app`...or anything really) for use within modules.

Modulizer accepts two arguments - the directory path, and an options object. It loops through the files which are each wrapped in a function, passing in the options object for use within each file. This is best for modules that simply execute code without returning values.

## Installation

```bash
$ npm i modulizer --save
```

## Example Usage

In this case, our modules are routes. For each file in our routes directory we have routing logic.

######/server.js

```javascript
const EXPRESS = require('EXPRESS');
const APP = EXPRESS();
const MODULIZER = require('modulizer');
const CONFIG = require('./config/main');

let routes = new MODULIZER(__dirname + '/routes', {
  'APP' : APP,
  'CONFIG' : CONFIG
});

routes.initialize();
```
`initialize()` will also return the number of files executed. So, if there were only one file - the following would log `1`. This would also exucute the same way as called above.

```javascript
let routeLength = routes.initialize();
console.log(routeLength);
```

######/routes/index.js

```javascript
module.exports = function(options){
  let app = options.app;
  let config = options.config;

  app.get('/', function(req, res) {
    res.send('Hello, ' + config.name);
  });
}
```

## Important Usage Notes

- This package uses [ES2015](https://nodejs.org/en/docs/es6/), so Node.js v4.4.1+ is required.
- Files within the specified directory need to have '.js' extensions. Other file types will be ignored.
- Files within the specified directory need to export a function, otherwise it will be ignored.

## Methods

#### constructor(directory, [options])

Called upon instantiation. This represents the [class constructor method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/constructor).

* @param {string} directory - String path to module directory. Required.
* @param {object} options - Object for options. Optional.

#### initialize()

Called to initialize execution of the modules. Will also return number of files executed.
