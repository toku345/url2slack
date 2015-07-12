var Vue = require('vue');
var OptionsStorage = require('./OptionsStorage.js');

var optionsStorage = new OptionsStorage();

var options = new Vue({
  el: '#options',

  data: {
    teamName: null,
    channel:  null,
    token:    null
  },

  created() {
    this.fetchOptions();
  },

  methods: {
    fetchOptions() {
      var self = this;
      optionsStorage.fetchOptions((options) => {
        self.teamName = options.teamName;
        self.channel  = options.channel;
        self.token    = options.token;
      });
    },
    saveOptions() {
      var self = this;
      var options = {
        teamName: self.teamName,
        channel:  self.channel,
        token:    self.token
      };

      optionsStorage.saveOptions(options, (message)=> {
        document.getElementById('status').textContent = message;
      });
    }
  }
});
