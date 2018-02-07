/* eslint-env node, mocha */

import 'chai/register-should';
import { ShiftConfiguration,
  washingtonDC,
  richmondVA,
  fairfaxVA,
  PrinceWilliamVA,
  OxnardCA,
  BostonMA } from '../src';

const richmond = richmondVA();
const fairfax = fairfaxVA();
const pwc = PrinceWilliamVA();
const oxnard = OxnardCA();
const bostonMA = BostonMA();

describe('ShiftConfiguration', () => {
  it('should correctly parse shiftStart', () => {
    (richmond.shiftStartDate.hours()).should.equal(8);
  });

  it('should allow for different start times', () => {
    const sc = new ShiftConfiguration({ shiftStart: '0700' });
    sc.shiftStart.should.equal('0700');
  });

  it('should work for historic dates', () => {
    (richmond.reversePattern()).should.equal('abcbcbabcacacbcababac');
    (richmond.calculateShift('2016-10-17T11:00:30-0400').should.equal('B'));
  });

  it('should work for utc times', () => {
    (richmond.calculateShift('2016-10-17T11:00:30Z').should.equal('C'));
  });

  it('should calculate shift time frame that occurs befor shift change', () => {
    const timeFrame = richmond.shiftTimeFrame('2017-07-07T00:01:00-04:00');
    (timeFrame.start.should.equal('2017-07-06T08:00:00-04:00'));
    (timeFrame.end.should.equal('2017-07-07T08:00:00-04:00'));
  });

  it('should calculate shift time frame that occurs after shift change', () => {
    // current day
    const timeFrame = richmond.shiftTimeFrame('2017-07-07T08:01:00-04:00');
    (timeFrame.start.should.equal('2017-07-07T08:00:00-04:00'));
    (timeFrame.end.should.equal('2017-07-08T08:00:00-04:00'));
  });
});

describe('Washington, DC', () => {
  it('should match known Washington DC shifts', () => {
    const tests = [
      ['2017-07-11T05:10:30-0400', '4', true],
      ['2017-07-11T08:10:30-0400', '1', false],
      ['2017-07-04T08:10:30-0400', '2', false],
      ['2017-07-17T08:10:30-0400', '3', false],
      ['2017-07-30T08:10:30-0400', '4', false],
    ];

    tests.forEach((test) => {
      (washingtonDC().calculateShift(test[0])).should.equal(test[1]);
    });
  });

  it('should calculate shift time frame', () => {
    const timeFrame = washingtonDC().shiftTimeFrame('2017-07-07');
    (timeFrame.start.should.equal('2017-07-06T07:00:00-04:00'));
    (timeFrame.end.should.equal('2017-07-07T07:00:00-04:00'));
  });
});

describe('Richmond, VA', () => {
  it('should match Richmond, VA known shifts', () => {
    const tests = [
      ['2017-07-11T07:10:30-0400', 'C', true],
      ['2017-07-11T08:10:30-0400', 'B', false],
      ['2017-07-06T08:10:30-0400', 'C', false],
      ['2017-07-06T07:10:30-0400', 'B', true],
      ['2016-10-30T09:00:30-0400', 'A', false],
      ['2016-10-29T11:00:30-0400', 'C', false],
      ['2016-11-16T11:00:30-0500', 'B', false],
    ];

    tests.forEach((test) => {
      (richmond.calculateShift(test[0])).should.equal(test[1]);
      (richmond.beforeShiftChange(richmond.normalize(test[0]))).should.equal(test[2]);
    });
  });
});

describe('Fairfax, VA', () => {
  it('should match Fairfax, VA known shifts', () => {
    const tests = [
      ['2016-10-18T09:00:30-0400', 'A', false],
      ['2016-10-19T09:10:30-0400', 'B', false],
      ['2016-10-20T08:10:30-0400', 'C', false],
      ['2016-10-21T08:10:30-0400', 'B', false],
      ['2016-10-22T08:10:30-0400', 'C', false],
      ['2016-10-23T08:10:30-0400', 'A', false],
      ['2016-10-24T08:10:30-0400', 'C', false],
      ['2016-10-25T08:10:30-0400', 'A', false],
      ['2016-10-26T08:10:30-0400', 'B', false],
      ['2016-10-26T06:10:30-0400', 'A', true],
    ];

    tests.forEach((test) => {
      (fairfax.calculateShift(test[0])).should.equal(test[1]);
      (fairfax.beforeShiftChange(fairfax.normalize(test[0]))).should.equal(test[2]);
    });
  });
});

describe('Prince William, VA', () => {
  it('should match Prince William, VA known shifts', () => {
    const tests = [
      ['2017-07-11T05:10:30-0400', 'A', true],
      ['2017-07-11T06:10:30-0400', 'B', false],
      ['2017-07-06T08:10:30-0400', 'C', false],
      ['2017-07-26T06:10:30-0400', 'B', false],
      ['2017-05-30T06:10:30-0400', 'B', false],
      ['2017-01-31T06:10:30-0500', 'C', false],
    ];

    tests.forEach((test) => {
      (pwc.calculateShift(test[0])).should.equal(test[1]);
      (pwc.beforeShiftChange(pwc.normalize(test[0]))).should.equal(test[2]);
    });
  });

  it('should calculate shift time frame', () => {
    const timeFrame = pwc.shiftTimeFrame('2017-07-07');
    (timeFrame.start.should.equal('2017-07-06T06:00:00-04:00'));
    (timeFrame.end.should.equal('2017-07-07T06:00:00-04:00'));
  });
});

describe('Oxnard, CA', () => {
  it('should match Oxnard, CA known shifts', () => {
    const tests = [
      ['2017-01-04T08:10:30-0800', 'A', false],
      ['2017-01-06T08:10:30-0800', 'A', false],
      ['2017-01-08T08:10:30-0800', 'A', false],
      ['2017-01-12T08:10:30-0800', 'C', false],
      ['2017-07-13T08:10:30-0700', 'B', false],
      ['2017-07-12T08:10:30-0700', 'C', false],
    ];

    tests.forEach((test) => {
      (oxnard.calculateShift(test[0])).should.equal(test[1]);
      (oxnard.beforeShiftChange(oxnard.normalize(test[0]))).should.equal(test[2]);
    });
  });
});

describe('Boston, MA', () => {
  it('should match Boston, MA known shifts', () => {
    const tests = [
      ['2018-01-01T08:10:30-0800', '1', false],
      ['2018-01-02T08:10:30-0800', '3', false],
      ['2018-01-03T08:10:30-0800', '2', false],
      ['2018-01-04T08:10:30-0800', '4', false],
      ['2018-01-05T08:10:30-0800', '3', false],
      ['2018-01-06T08:10:30-0800', '1', false],
      ['2018-01-07T08:10:30-0800', '4', false],
      ['2018-01-08T08:10:30-0800', '2', false],
      ['2018-01-09T08:10:30-0800', '1', false],
    ];
    tests.forEach((test) => {
      (bostonMA.calculateShift(test[0])).should.equal(test[1]);
      (bostonMA.beforeShiftChange(bostonMA.normalize(test[0]))).should.equal(test[2]);
    });
  });
});
