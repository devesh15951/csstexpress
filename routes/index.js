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

/* Event Routes */

router.get('/events', function(req, res, next) {
  res.render('events', {
    pageTitle: 'Sponsored Events',
    pageID: 'events'
  });
});

router.get('/event/:eventID', function(req, res, next) {
  res.render('single-event', {
    pageTitle: 'Sponsored Events',
    pageID: 'page-' + req.params.eventID
  });
});

/* People Routes */

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

/* Zotero Feeds */

router.get('/library', function(req, res) {

  url = 'http://api.zotero.org/groups/271377/collections/7VXM4ZGP/items/top?start=0&limit=10&format=json'
  request(url, function(error, response, data) {
    console.log('error:', error);
    console.log('statusCode:', response && response.statusCode);
    myData = JSON.parse(data)
  });

  res.render('library', {
    pageTitle: 'Recommended Sociotechnical Readings',
    pageID: 'recreading',
    myData: myData
  });
});

/* --------------------- */

module.exports = router;
