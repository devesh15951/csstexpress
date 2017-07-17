var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    pageTitle: 'Home',
    pageID: 'home'
  });
});

/* Devesh's Temporary Route */

router.get('/devesh', function(req, res, next) {
  res.render('devesh', {
    pageTitle: 'Devesh',
    pageID: 'devesh'
  });
});

router.get('/people', function(req, res) {

  url = 'http://localhost:8529/_db/csstdev/csstdev/people'
  request(url, function(error, response, data) {
    console.log('error:', error);
    console.log('statusCode:', response && response.statusCode);
    myData = JSON.parse(data)
  });

  res.render('people', {
    pageTitle: 'People',
    pageID: 'people',
    myData: myData
  });
});

/* Get Zotero Feeds */

router.get('/recreading', function(req, res) {

  url = 'http://api.zotero.org/groups/271377/collections/7VXM4ZGP/items/top?start=0&limit=25&format=json'
  request(url, function(error, response, data) {
    console.log('error:', error);
    console.log('statusCode:', response && response.statusCode);
    myData = JSON.parse(data)
  });

  res.render('reading', {
    pageTitle: 'Core Sociotechnical Readings',
    pageID: 'recreading',
    myData: myData
  });
});

/* --------------------- */

module.exports = router;
