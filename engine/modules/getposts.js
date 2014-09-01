var Promise = require('es6-promise').Promise;
var glob = require('glob');
var md2json = require('markdown-to-json');

module.exports = new Promise(function(resolve, resolve) {
  glob('./site-src/post-markdown/*.md', {}, function(err, files) {
    if (err) {
      reject(err);
    } else {
      resolve(files);
    }
  });
});
