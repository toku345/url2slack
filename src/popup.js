var request = require('superagent');
var OptionsStorage = require('./OptionsStorage.js');

var optionsStorage = new OptionsStorage();

var sendUrlToSlack = (callback) => {
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  // Most methods of the Chrome extension APIs are asynchronous. This means that
  // you CANNOT do something like this:
  //
  // var url;
  // chrome.tabs.query(queryInfo, function(tabs) {
  //   url = tabs[0].url;
  // });
  // alert(url); // Shows "undefined", because chrome.tabs.query is async.

  chrome.tabs.query(queryInfo, (tabs) => {
    var tab = tabs[0];
    var url = tab.url;

    console.assert(typeof url == 'string', 'tab.url should be a string');

    callback(url);
  });
};

var postUrl = (url, callback, errorCallback) => {
  optionsStorage.fetchOptions((options) => {
    const POST_URL =
      `https://${options.teamName}.slack.com/services/hooks/slackbot?token=${options.token}&channel=%23${options.channel}`;

    request
      .post(POST_URL)
      .send(url)
      .end((err, res) => {
        if (res.status === 200) {
          callback('Post successfully!');
        } else if (err === null) {
          // TODO: implement error handling!
          errorCallback(res.text);
        } else {
          // TODO: implement error handling!
          errorCallback(err);
        }
      });
  });
};

var callback = (message) => {
  document.getElementById('status').textContent = message;
};

var errorCallback = (errorMessage) => {
  document.getElementById('status').textContent = errorMessage;
};

/* --- entry point --- */
document.addEventListener('DOMContentLoaded', function() {
  sendUrlToSlack((url) =>{
    postUrl(url, callback, errorCallback);
  });
});
