# Shiftly
Utility for calculating common public safety shift schedules.

## Installation

Using npm:
```
npm install StatEngine/shiftly
```

In Node.js:
```javascript
var shiftly = require('shiftly');

// http://www.fairfaxcounty.gov/fr/schedule/
var fairfaxFire = {
  firstDay: '2016-10-14',
  pattern: 'acababcbc'
}

var fairfax = new shiftly.ShiftConfiguration(fairfaxFire);
fairfax.calculateShift('2017-01-18T09:00:30-0400')
// returns 'C'
```

## Tests
To run the test suite, first install the dependencies, then run `npm test`:

```bash
npm install
npm test
```
