var express = require('express');
var router = express.Router();
var request = require('request');

var discourse_api_key = '6495d477da68c50841ad02aa5ddb47fd78f8b87c5b69ed2ac7240d5427ae9436'
var discourse_api_username = 'sociotech'

/* @TODO These people routes are incomplete. */
/* @TODO @XXX Still having the problem where I have to refresh a page for the data to be sent to page */

/* @NOTE This is the URL for getting invidual user data >>
'http://community.sociotech.net/users/' + tempUserArr[i] + '.json?api_key=' + discourse_api_key + '&api_username=' + discourse_api_username
*/

var peopleData = {};

router.get('/', function(req, res) {
  request({
    method: 'GET',
    uri: 'http://community.sociotech.net/admin/users/list.json?api_key=' + discourse_api_key + '&api_username=' + discourse_api_username
  }, function(error, response, body) {
    peopleData = JSON.parse(body)
  })

  res.render('people', {
    pageTitle: 'List of People',
    pageID: 'peoplelist',
    peopleData: peopleData
  })
})

/* --------------------- */

module.exports = router;
