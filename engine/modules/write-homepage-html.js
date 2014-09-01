var fs = require('fs');
var Promise = require('es6-promise').Promise;
var distDir = 'site-dist/' ;

module.exports = function(htmlString) {
  return new Promise(function(reject, resolve) {
    fs.writeFile(distDir + 'index.html', htmlString, {}, function(err) {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
};
