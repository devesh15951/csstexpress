var express = require('express');
var router = express.Router();
var request = require('request');

var discourseLatest = [];
var libData = [];
var csstEvents = [];

/* Route: GET home page. */

router.get('/', function(req, res, next) {

  /* Get latest posts (all) from Discourse */

  var url = 'http://community.sociotech.net/latest.json'
    request(url, function(error, response, data) {
      if (error != null) {
        console.log('error:', error)
      }
      console.log('statusCode:', response && response.statusCode)
      discourseLatest = JSON.parse(data)
    }),
    next()
  }, function(req, res, next) {

    /* Get CSST events and reports from Discourse */

    request({
      method: 'GET',
      uri: 'http://community.sociotech.net/c/csst.json?api_key=' + discourse_api_key + '&api_username=' + discourse_api_username
    }, function(error, response, body) {
      csstEvents = JSON.parse(body)
    })
    next()
  }, function(req, res, next) {

    res.render('index', {
      pageTitle: 'Home',
      pageID: 'home',
      discourseLatest: discourseLatest.topic_list.topics,
      csstEvents: csstEvents.topic_list.topics
    })
  })

  /* Zotero Feeds */

  router.get('/library', function(req, res, next) {
    request({
      method: 'GET',
      uri: 'http://api.zotero.org/groups/271377/collections/7VXM4ZGP/items/top?start=0&limit=10&format=json'
    }, function(error, response, body) {
      libData = JSON.parse(body)
    })

    res.render('library', {
      pageTitle: 'Recommended Sociotechnical Readings',
      pageID: 'recreading',
      libData: libData
    })
  })

  /* Devesh's Temporary Route */

  router.get('/devesh', function(req, res, next) {
    res.render('devesh', {
      pageTitle: 'Devesh',
      pageID: 'devesh'
    })
  })

  /* --------------------- */

  module.exports = router;
