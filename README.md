# Henry Wood House Menu

[Henry Wood House](http://www.theofficegroup.co.uk/locations/henrywoodhouse/)
is an office building in London, run by [The Office Group](http://www.theofficegroup.co.uk/).

The lunch menu for the café is available online. This utility uses a scraper to
retrieve the menu and return it, as a string.

# Installation

```
npm install --save hwh-lunch
```

# Usage

```
var HwhLunch = require('hwh-lunch');

/*
  Takes a number from 1-5, indicating
  which day of the week you want the menu
  for. Monday = 1, Friday = 5.
*/

// Use Monday for this example.
var dayOfWeek = 1;

HwhLunch(dayOfWeek).then(function(menu) {

  // Do whatever you wish with this information.
  console.log(menu);
});
```