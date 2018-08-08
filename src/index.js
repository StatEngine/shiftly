import moment from 'moment-timezone';

function reverse(s) {
  const o = [];
  for (let i = 0, len = s.length; i <= len; i += 1) {
    o.push(s.charAt(len - i));
  }
  return o.join('');
}

export class ShiftConfiguration { // eslint-disable-line import/prefer-default-export
   /**
   * Create a ShiftConfiguration.
   * @param {string} pattern - The department's shift pattern.
   * @param {string} timeZone - The department's timezone.
   * @param {string} shiftStart - The start time of the department's shift.
   * @param {string} firstDay - The first day of the pattern (assumed to be in local tz).
   */
  constructor({ pattern, timeZone = 'US/Eastern', shiftStart = '0800', firstDay = '2016-10-30' } = {}) {
    this.pattern = pattern;
    this.timeZone = timeZone;
    this.shiftStart = shiftStart;
    this.firstDay = firstDay;
    this.shiftStartDate = moment.tz(this.shiftStart, 'hmm', this.timeZone);
    this.patternStart = moment.tz(this.firstDay, this.timeZone).startOf('day');
  }

  normalize(incomingDate) {
    return moment.tz(incomingDate, this.timeZone);
  }

  reversePattern() {
    return `${this.pattern.charAt(0)}${reverse(this.pattern.substring(1, this.pattern.length))}`;
  }

  beforeShiftChange(date) {
    const startDate = this.shiftStartDate;
    return date.hours() < startDate.hours() || (date.hours() === startDate.hours()
      && date.minutes() < startDate.minutes());
  }

  daysFromPatternStart(start) {
    return start.startOf('day').diff(this.patternStart.startOf('day'), 'days');
  }

  calculateShift(date, { dateOnly = false } = {}) {
    const momentDate = this.normalize(date);
    const checkDate = (!dateOnly && this.beforeShiftChange(momentDate)) ? momentDate.subtract(1, 'days') : momentDate;

    let pattern = this.pattern;
    const daysFromStart = this.daysFromPatternStart(checkDate);

    if (daysFromStart < 0) {
      pattern = this.reversePattern();
    }

    const patternLength = this.pattern.length;

    const mod = Math.abs(daysFromStart) % patternLength;
    let shift = null;

    for (let i = 0, len = patternLength; i < len; i += 1) {
      if (i === mod) {
        shift = pattern[i].toUpperCase();
        break;
      }
    }

    return shift;
  }

  shiftTimeFrame(date) {
    /**
    * Returns the start and end time of the shift for the day.
    * @param {string} date - The date of the shift as an ISO-8601 compliant string (ie YYYY-MM-DD).
    */
    let momentDate = this.normalize(date);

    if (this.beforeShiftChange(momentDate)) {
      momentDate = momentDate.subtract(1, 'days');
    }

    const start = momentDate.hours(this.shiftStartDate.hours())
                            .minutes(this.shiftStartDate.minutes())
                            .startOf('minute');
    return { start: start.format(), end: start.add(24, 'hours').format() };
  }
}

export function washingtonDC() {
  return new ShiftConfiguration({
    firstDay: '2017-09-01',
    pattern: '1234',
    shiftStart: '0700',
  });
}

export function richmondVA() {
  return new ShiftConfiguration({
    firstDay: '2016-10-18',
    pattern: 'acababacbcacacbabcbcb',
  });
}

export function fairfaxVA() {
  return new ShiftConfiguration({
    firstDay: '2016-10-14',
    pattern: 'acababcbc',
    shiftStart: '0700',
  });
}

export function PrinceWilliamVA() {
  return new ShiftConfiguration({
    firstDay: '2017-07-10',
    pattern: 'abc',
    shiftStart: '0600',
  });
}

export function OxnardCA() {
  return new ShiftConfiguration({
    firstDay: '2017-01-04',
    timeZone: 'US/Pacific',
    pattern: 'acacababcbcbcacabababcbc',
  });
}

export function TucsonAZ() {
  return new ShiftConfiguration({
    firstDay: '2017-01-01',
    timeZone: 'US/Arizona',
    pattern: 'acbcbcbababacac',
    shiftStart: '0800',
  });
}

export function ClarkCountyNV() {
  return new ShiftConfiguration({
    firstDay: '2017-01-06',
    timeZone: 'US/Pacific',
    pattern: 'cbcbcacacababab',
  });
}

export function RogersAR() {
  return new ShiftConfiguration({
    firstDay: '2018-01-17',
    timeZone: 'US/Central',
    pattern: 'aabbcc',
    shiftStart: '0700',
  });
}

export function BostonMA() {
  return new ShiftConfiguration({
    firstDay: '2018-01-01',
    shiftStart: '0800',
    pattern: '13243142',
  });
}

export function FairmountCO() {
  return new ShiftConfiguration({
    firstDay: '2018-01-01',
    shiftStart: '0700',
    pattern: 'BBAACC',
    timeZone: 'US/Mountain',
  });
}

export function KingstonON() {
  return new ShiftConfiguration({
    firstDay: '2018-01-01',
    shiftStart: '0800',
    pattern: 'DBCDACABCABDADCADCBDBADBACBC',
  });
}

export function GreenvilleNC() {
  return new ShiftConfiguration({
    firstDay: '2018-04-30',
    pattern: '123',
  });
}

export function CosumnesCA() {
  return new ShiftConfiguration({
    firstDay: '2018-01-05',
    pattern: 'AABBCC',
    shiftStart: '0700',
    timeZone: 'US/Pacific',
  });
}

export function StLouisPark() {
  return new ShiftConfiguration({
    firstDay: '2018-01-01',
    pattern: 'ACABCBCBABCACACBCABAB',
    shiftStart: '0730',
    timeZone: 'US/Central',
  });
}

export function HiltonHeadSC() {
  return new ShiftConfiguration({
    firstDay: '2018-01-01',
    pattern: 'ABC',
    shiftStart: '0800',
  });
}

export function PolkCountyFL() {
  return new ShiftConfiguration({
    firstDay: '2018-05-08',
    pattern: 'ABC',
    shiftStart: '0800',
  });
}

export function FtMyersFL() {
  return new ShiftConfiguration({
    firstDay: '2018-01-02',
    pattern: 'ABC',
    shiftStart: '0700',
  });
}

export function OrangeCountyFL() {
  return new ShiftConfiguration({
    firstDay: '2018-05-01',
    pattern: 'ABC',
    shiftStart: '0730',
  });
}

export function StPaulMN() {
  return new ShiftConfiguration({
    firstDay: '2018-01-01',
    pattern: 'BABCBCBCACABABABCBCACACA',
    shiftStart: '0800',
  });
}

export const FirecaresLookup = {
  98606: washingtonDC,
  93345: richmondVA,
  81147: fairfaxVA,
  81154: fairfaxVA,
  92724: PrinceWilliamVA,
  77818: OxnardCA,
  97477: TucsonAZ,
  77989: ClarkCountyNV,
  93717: RogersAR,
  75500: BostonMA,
  81205: FairmountCO,
  100262: KingstonON,
  83175: GreenvilleNC,
  78827: CosumnesCA,
  95940: StLouisPark,
  96833: HiltonHeadSC,
  '05102': PolkCountyFL,
  77656: FtMyersFL,
  91106: OrangeCountyFL,
  77863: StPaulMN,
};
