const DEFAULT_VALUES = {
  teamName: '',
  channel:  'general',
  token:    ''
};

class OptionsStorage {
  fetchOptions(callback) {
    chrome.storage.sync.get( {
      teamName: DEFAULT_VALUES.teamName,
      channel:  DEFAULT_VALUES.channel,
      token:    DEFAULT_VALUES.token
    }, (options) => {
      callback(options);
    });
  }

  saveOptions(options, callback) {
    chrome.storage.sync.set(options, (message) => {
      callback('Options successfully updated!');
    });
  }
}

module.exports = OptionsStorage;
