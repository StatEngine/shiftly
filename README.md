# Shiftly [![Build Status](https://travis-ci.org/StatEngine/shiftly.svg?branch=master)](https://travis-ci.org/StatEngine/shiftly)
Utility for calculating common public safety shift schedules.

## Installation

Using npm:
```
npm install @statengine/shiftly
```

In Node.js:
```javascript
const shiftly = require('@statengine/shiftly');

const fairfax = shiftly.fairfaxVA();
fairfax.calculateShift('2017-01-18T09:00:30-0400')
// returns 'C'
```

## Tests
To run the test suite, first install the dependencies, then run `npm test`:

```bash
npm install
npm test
```

## Classes

### `ShiftInformation`
Responsible for calculating individual shift information. The constructor takes an object with the following properties:

`pattern`: A string where each character represents a distinct shift in the pattern. The pattern repeats indefinitely. For example, `ABC`
would indicate shift A, followed by B, followed by C, and repeat. The pattern is set individually by each department and varies widely
in terms of complexity. For example, Los Angeles County FD uses the pattern `BABCACABCBCABABCACABCBCA`. `pattern` may also be a
comma-delimited string with characters indicating shifts where each collection of characters represents a distinct shift pattern.

`firstDay`: String represenation of `YYYY-MM-DD` for the first day corresponding to the provided `pattern`.

`shiftStart`: String representation of `HHMM` for the commencement time of the provided `pattern`.

`timeZone`: String indicating the [`tz database`](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) timezone name.

`shiftDuration`: Number of hours for each shift in the `pattern`. Default is 24 hour shifts, but may be different under special circumstances such as a Leap Day.
