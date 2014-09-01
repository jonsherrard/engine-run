#!/usr/bin/env node

// Load the global config
var config = require('../config.json');

var fs = require('fs');
var connect = require('connect');
var livereload = require('livereload');
var Promise = require('es6-promise').Promise;
var watchGlob = require('watch-glob');


// Define the site-wide distribution directory
var distDir = './site-dist/';

console.log('Starting engine...');

// Rejected promise logger

var errorLog = function(errData) {
  console.log('Error: ', errData);
};

// Get list of blog posts
var getBlogPostList = require('./modules/getposts.js');

// Get post meta data
var getBlogPostMetaData = require('./modules/blogpost-metadata.js');

// Function which accepts jadeLocals and returns HTML string
var homePageHTMLCompiler= require('./modules/homepage-html.js');

var jadeLocals = {
  global: config.jadeLocals.global
}


// Accepts JSON metadata from YAML, and passes into Jade Locals
// Then comiles jade.

var compileHomePageHTML = function(metaData) {
  jadeLocals.metaData = metaData;
  return new Promise(function(reject, resolve) {
    var htmlString = homePageHTMLCompiler(jadeLocals);
    if (htmlString.length > 0) {
      resolve(htmlString);
    } else {
      reject(new Error('No home html'));
    }
  });
};

// Takes html string and writes to index.html
var writeHomePageHTML = require('./modules/write-homepage-html.js');

var compileBlogPosts = require('./modules/compile-blog-posts.js');

var buildSite = function() {
  getBlogPostList
    .then(errorLog, getBlogPostMetaData)
    .then(errorLog, compileHomePageHTML)
    .then(errorLog, writeHomePageHTML)
    .then(errorLog, function(done) {
      console.log('Homepage built');
    });
  getBlogPostList
    .then(errorLog, compileBlogPosts)
    .then(errorLog, function(done) {
      console.log('Posts built');
    });
};

buildSite();
// Connect & Livereload

server = livereload.createServer();
try {
  server.watch(distDir);
  console.log('live-reload running');
} catch (e) {
  console.warn(e);
}

watchGlob('site-src/**/*.*', {cwd: './'}, function(filePath) {
  console.log('rebuilding due to file change in: ', filePath);
  buildSite();
});

