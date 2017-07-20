/* eslint-env node, mocha */

import 'chai/register-should';
import { ShiftConfiguration } from '../src';
import departments from '../src/data/departments.json';

const richmond = departments['93345'];
const fairfax = departments['81147'];
const oxnard = departments['77818'];

describe('ShiftConfiguration', () => {
  it('should correctly parse shiftStart', () => {
    const config = new ShiftConfiguration(richmond);
    (config.shiftStart).should.equal(richmond.shiftStart);
    (config.firstDay).should.equal(richmond.firstDay);
    (config.shiftStartDate.hours()).should.equal(8);
  });

  it('should work for historic dates', () => {
    const rva = new ShiftConfiguration(richmond);
    (rva.reversePattern()).should.equal('abcbcbabcacacbcababac');
    (rva.calculateShift('2016-10-17T11:00:30-0400').should.equal('B'));
  });

  it('should work for utc times', () => {
    const rva = new ShiftConfiguration(richmond);
    (rva.reversePattern()).should.equal('abcbcbabcacacbcababac');
    (rva.calculateShift('2016-10-17T11:00:30Z').should.equal('C'));
  });

  it('should match Richmond, VA known shifts', () => {
    const rva = new ShiftConfiguration(richmond);

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
      (rva.calculateShift(test[0])).should.equal(test[1]);
      (rva.beforeShiftChange(rva.normalize(test[0]))).should.equal(test[2]);
    });
  });

  it('should match Fairfax, VA known shifts', () => {
    const ffx = new ShiftConfiguration(fairfax);

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
      (ffx.calculateShift(test[0])).should.equal(test[1]);
      (ffx.beforeShiftChange(ffx.normalize(test[0]))).should.equal(test[2]);
    });
  });

  it('should match Oxnard, CA known shifts', () => {
    const ox = new ShiftConfiguration(oxnard);
    (ox.firstDay).should.equal('2017-01-04');
    (ox.calculateShift('2017-01-04T08:10:30-0800').should.equal('A'));
    (ox.calculateShift('2017-01-06T08:10:30-0800').should.equal('A'));
    (ox.calculateShift('2017-01-08T08:10:30-0800').should.equal('A'));
    (ox.calculateShift('2017-01-10T08:10:30-0800').should.equal('A'));
    (ox.calculateShift('2017-01-17T08:10:30-0800').should.equal('A'));
    (ox.calculateShift('2017-01-19T08:10:30-0800').should.equal('A'));
    (ox.calculateShift('2017-01-21T08:10:30-0800').should.equal('A'));
    (ox.calculateShift('2017-01-23T08:10:30-0800').should.equal('A'));
    (ox.calculateShift('2017-01-28T08:10:30-0800').should.equal('A'));
    (ox.calculateShift('2017-01-30T08:10:30-0800').should.equal('A'));
    (ox.calculateShift('2017-02-01T08:10:30-0800').should.equal('A'));
    (ox.calculateShift('2017-02-03T08:10:30-0800').should.equal('A'));
    (ox.calculateShift('2017-02-10T08:10:30-0800').should.equal('A'));
    (ox.calculateShift('2017-02-12T08:10:30-0800').should.equal('A'));
    (ox.calculateShift('2017-02-14T08:10:30-0800').should.equal('A'));
    (ox.calculateShift('2017-02-16T08:10:30-0800').should.equal('A'));
    (ox.calculateShift('2017-02-21T08:10:30-0800').should.equal('A'));
    (ox.calculateShift('2017-02-23T08:10:30-0800').should.equal('A'));
    (ox.calculateShift('2017-02-25T08:10:30-0800').should.equal('A'));
    (ox.calculateShift('2017-02-27T08:10:30-0800').should.equal('A'));
    (ox.calculateShift('2017-01-12T08:10:30-0800').should.equal('C'));
    (ox.calculateShift('2017-07-12T08:10:30-0700').should.equal('C'));
    (ox.calculateShift('2017-07-13T08:10:30-0700').should.equal('B'));
    (ox.calculateShift('2017-07-14T08:10:30-0700').should.equal('C'));
  });

  it('should match Prince William, VA known shifts', () => {
    const pwc = new ShiftConfiguration(departments['92724']);

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
});
