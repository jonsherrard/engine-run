var fs = require('fs');
var path = require('path');
var Promise = require('es6-promise').Promise;
var frontMatter = require('yaml-front-matter');
var marked = require('marked');
var config = require('../../config.json');

var jade = require('jade');
var jadeOptions = {pretty:true};
var jadeLocals = {global: config.jadeLocals.global};
var postTemplate = 'site-src/jade/pages/post/post.jade';
var compileFunction = jade.compileFile(postTemplate, jadeOptions);

module.exports =  function(fileList) {
  var l = fileList.length, i;
  return new Promise(function(reject, resolve) {
    for (i=0;i<l; i++) {
      var postObject = frontMatter
        .loadFront(fileList[i], 'markdownString');
      postObject.markdownString = marked(postObject.markdownString);
      postObject.basename = path.basename(fileList[i], '.md');
      jadeLocals.post = postObject;
      var htmlString = compileFunction(jadeLocals);
      fs.writeFile(
        'site-dist/' + postObject.basename + '.html',
        htmlString,
        {},
        function(err) {
          if (err) {
            console.log(err);
          }
      });
    }
    resolve(true);

  });
};
