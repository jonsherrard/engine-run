var Promise = require('es6-promise').Promise;
var md2json = require('markdown-to-json');

m2jOptions = {
  minify:true,
  width: 70,
  outfile: null,
  pretty:false
};

module.exports = function(files) {
  return new Promise(function(resolve, resolve) {
    try {
      resolve(JSON.parse(md2json.parse(files, m2jOptions)));
    } catch (e) {
      reject(e);
    }
  });
};
