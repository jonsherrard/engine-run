var path = require('path');
var jade = require('jade');
var homePageDir = 'site-src/jade/pages/home/';
var distDir = 'site-dist/'
var Promise = require('es6-promise').Promise;

var jadeOptions = {
  pretty:true
};
var filePath = path.resolve(homePageDir, 'index.jade');
var compileFunction = jade.compileFile(filePath, jadeOptions);

module.exports = compileFunction;

