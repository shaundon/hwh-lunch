var Xray = require('x-ray');
var xray = Xray();

var HWH_MENU_ADDRESS = 'http://www.theofficegroup.co.uk/locations/henrywoodhouse/together-menu/?day=';

var CONTENT_TO_SPLIT_ON = {
  START: 'Today\’s Main:',
  END: 'Afternoon :'
}

var DAYS_OF_WEEK = {
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5
};


var constructTodaysUrl = function(dayOfWeek) {
  var url = HWH_MENU_ADDRESS;
  switch (dayOfWeek) {
    case DAYS_OF_WEEK.MONDAY:
      url += 'Monday';
      break;
    case DAYS_OF_WEEK.TUESDAY:
      url += 'Tuesday';
      break;
    case DAYS_OF_WEEK.WEDNESDAY:
      url += 'Wednesday';
      break;
    case DAYS_OF_WEEK.THURSDAY:
      url += 'Thursday';
      break;
    case DAYS_OF_WEEK.FRIDAY:
      url += 'Friday';
      break;

    // No food on weekends!
    default:
      return false;
  }
  return url;
}

var retrieveLunchContent = function(content) {
  // Split the content to just grab the lunch bit.

  // First cut off everything before lunch.
  content = content.split(CONTENT_TO_SPLIT_ON.START)[1];

  // Then cut off everything after lunch.
  content = content.split(CONTENT_TO_SPLIT_ON.END)[0];

  // Now re-add the beginning part that was cut off before.
  content = CONTENT_TO_SPLIT_ON.START + content;

  return content;
};

var getMenu = function(dayOfWeek) {
  var promise = new Promise(function(fulfill, reject) {

    // Get the correct URL.
    var url = constructTodaysUrl(dayOfWeek);

    // No food on weekends.
    if (!url) {
      fulfill('It\'s the weekend, no lunch today!');
    }
    else {
      xray(url, '.food-menu')(function(err, content) {
        fulfill(retrieveLunchContent(content));
      });
    }
  });
  return promise;
}

module.exports = getMenu;
