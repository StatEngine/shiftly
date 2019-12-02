import moment from 'moment-timezone';

function reverse(s) {
  const o = [];
  for (let i = 0, len = s.length; i <= len; i += 1) {
    o.push(s.charAt(len - i));
  }
  return o.join('');
}

class ShiftInformation {
  /**
   * Individual shift information and pattern for ShiftConfiguration
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

  afterShiftStartDate(date) {
    const incomingDate = this.normalize(date);
    return (this.daysFromPatternStart(incomingDate) >= 0);
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

export class ShiftConfiguration { // eslint-disable-line import/prefer-default-export
  /**
   * Create a ShiftConfiguration.
   * @param shifts
   */
  constructor(shifts = { timeZone: 'US/Eastern', shiftStart: '0800', firstDay: '2016-10-30' }) {
    if (Array.isArray(shifts)) {
      this.shifts = shifts.map(shiftInfo => new ShiftInformation(shiftInfo));
    } else {
      this.shifts = [new ShiftInformation(shifts)];
    }
    this.shifts = this.shifts.sort((a, b) => a.daysFromPatternStart(b.patternStart));
  }

  determineShiftPattern(date) {
    let i;
    for (i = 0; i < this.shifts.length; i += 1) {
      if (this.shifts[i].afterShiftStartDate(date)) {
        return this.shifts[i];
      }
    }
    // Return newest known shift if none found for date
    return this.shifts[0];
  }

  normalize(incomingDate) {
    const shiftPattern = this.determineShiftPattern(incomingDate);
    return shiftPattern.normalize(incomingDate);
  }

  calculateShift(date, { dateOnly = false } = {}) {
    const shiftPattern = this.determineShiftPattern(date);
    return shiftPattern.calculateShift(date, { dateOnly });
  }

  shiftTimeFrame(date) {
    const shiftPattern = this.determineShiftPattern(date);
    return shiftPattern.shiftTimeFrame(date);
  }

  beforeShiftChange(date) {
    const shiftPattern = this.determineShiftPattern(date);
    return shiftPattern.beforeShiftChange(date);
  }

  reversePattern(shiftIndex = 0) {
    return this.shifts[shiftIndex].reversePattern();
  }
}

export function washingtonDC() {
  return new ShiftConfiguration({
    firstDay: '2017-09-01',
    pattern: '1234',
    shiftStart: '0700',
    timeZone: 'US/Eastern',
  });
}

export function richmondVA() {
  return new ShiftConfiguration({
    firstDay: '2016-10-18',
    pattern: 'acababacbcacacbabcbcb',
    shiftStart: '0800',
    timeZone: 'US/Eastern',
  });
}

export function fairfaxVA() {
  return new ShiftConfiguration({
    firstDay: '2016-10-14',
    pattern: 'acababcbc',
    shiftStart: '0700',
    timeZone: 'US/Eastern',
  });
}

export function PrinceWilliamVA() {
  return new ShiftConfiguration({
    firstDay: '2017-07-10',
    pattern: 'abc',
    shiftStart: '0600',
    timeZone: 'US/Eastern',
  });
}

export function OxnardCA() {
  return new ShiftConfiguration({
    firstDay: '2017-01-04',
    pattern: 'acacababcbcbcacabababcbc',
    shiftStart: '0800',
    timeZone: 'US/Pacific',
  });
}

export function TucsonAZ() {
  return new ShiftConfiguration({
    firstDay: '2017-01-01',
    pattern: 'acbcbcbababacac',
    shiftStart: '0800',
    timeZone: 'US/Arizona',
  });
}

export function ClarkCountyNV() {
  return new ShiftConfiguration({
    firstDay: '2017-01-06',
    pattern: 'cbcbcacacababab',
    shiftStart: '0800',
    timeZone: 'US/Pacific',
  });
}

export function RogersAR() {
  return new ShiftConfiguration({
    firstDay: '2018-01-17',
    pattern: 'aabbcc',
    shiftStart: '0700',
    timeZone: 'US/Central',
  });
}

export function BostonMA() {
  return new ShiftConfiguration({
    firstDay: '2018-01-01',
    pattern: '13243142',
    shiftStart: '0800',
    timeZone: 'US/Eastern',
  });
}

export function FairmountCO() {
  return new ShiftConfiguration({
    firstDay: '2018-01-01',
    pattern: 'BBAACC',
    shiftStart: '0700',
    timeZone: 'US/Mountain',
  });
}

export function KingstonON() {
  return new ShiftConfiguration({
    firstDay: '2018-01-01',
    pattern: 'DBCDACABCABDADCADCBDBADBACBC',
    shiftStart: '0800',
    timeZone: 'US/Eastern',
  });
}

export function GreenvilleNC() {
  return new ShiftConfiguration({
    firstDay: '2018-04-30',
    pattern: '123',
    shiftStart: '0800',
    timeZone: 'US/Eastern',
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
    timeZone: 'US/Eastern',
  });
}

export function PolkCountyFL() {
  return new ShiftConfiguration({
    firstDay: '2018-05-08',
    pattern: 'ABC',
    shiftStart: '0800',
    timeZone: 'US/Eastern',
  });
}

export function FtMyersFL() {
  return new ShiftConfiguration({
    firstDay: '2018-01-02',
    pattern: 'ABC',
    shiftStart: '0700',
    timeZone: 'US/Eastern',
  });
}

export function OrangeCountyFL() {
  return new ShiftConfiguration({
    firstDay: '2018-05-01',
    pattern: 'ABC',
    shiftStart: '0730',
    timeZone: 'US/Eastern',
  });
}

export function StPaulMN() {
  return new ShiftConfiguration({
    firstDay: '2018-01-01',
    pattern: 'BABCBCBCACABABABCBCACACA',
    shiftStart: '0800',
    timeZone: 'US/Central',
  });
}

export function WestMetroCO() {
  return new ShiftConfiguration({
    firstDay: '2018-01-01',
    pattern: 'BBAACC',
    shiftStart: '0700',
    timeZone: 'US/Mountain',
  });
}

export function BellevueWA() {
  return new ShiftConfiguration({
    firstDay: '2018-01-01',
    pattern: 'BABACACBC',
    shiftStart: '0800',
    timeZone: 'US/Pacific',
  });
}

export function DelrayBeachFL() {
  return new ShiftConfiguration({
    firstDay: '2018-01-01',
    pattern: 'CABCAB',
    shiftStart: '0800',
    timeZone: 'US/Eastern',
  });
}

export function NewRochelleNY() {
  return new ShiftConfiguration({
    firstDay: '2018-09-03',
    pattern: '12341234',
    shiftStart: '0800',
    timeZone: 'US/Eastern',
  });
}

export function MiamiDadeFL() {
  return new ShiftConfiguration({
    firstDay: '2017-12-03',
    pattern: 'abcabc',
    shiftStart: '0700',
    timeZone: 'US/Eastern',
  });
}

export function SouthernPlatteMO() {
  return new ShiftConfiguration({
    firstDay: '2018-01-01',
    pattern: 'BABCBCACABABCBCACA',
    shiftStart: '0800',
    timeZone: 'US/Central',
  });
}

export function AdamsCountyCO() {
  return new ShiftConfiguration({
    firstDay: '2019-01-02',
    pattern: 'BBAACCBBAACC',
    shiftStart: '0700',
    timeZone: 'US/Mountain',
  });
}

export function FishersIN() {
  return new ShiftConfiguration({
    firstDay: '2018-12-01',
    pattern: 'CAB',
    shiftStart: '0700',
    timeZone: 'US/Eastern',
  });
}

export function WestfieldIN() {
  return new ShiftConfiguration({
    firstDay: '2019-01-01',
    pattern: 'ABC',
    shiftStart: '0800',
    timeZone: 'US/Eastern',
  });
}
export function CiceroIN() {
  return new ShiftConfiguration({
    firstDay: '2019-01-01',
    pattern: 'acababcbc',
    shiftStart: '0700',
    timeZone: 'US/Eastern',
  });
}
export function SheridanIN() {
  return new ShiftConfiguration({
    firstDay: '2019-01-01',
    pattern: 'acababcbc',
    shiftStart: '0700',
    timeZone: 'US/Eastern',
  });
}
export function CarmelIN() {
  return new ShiftConfiguration([{
    firstDay: '2019-01-01',
    pattern: 'acababcbc',
    shiftStart: '0700',
    timeZone: 'US/Eastern',
  }, {
    firstDay: '2018-01-01',
    pattern: 'abcbcacab',
    shiftStart: '0700',
    timeZone: 'US/Eastern',
  }]);
}

export function NoblesvilleIN() {
  return new ShiftConfiguration({
    firstDay: '2019-01-02',
    pattern: 'BABCBCACA',
    shiftStart: '0730',
    timeZone: 'US/Eastern',
  });
}

export function MesaAZ() {
  return new ShiftConfiguration({
    firstDay: '2018-01-07',
    pattern: 'ABCBCACAB',
    shiftStart: '0700',
    timeZone: 'US/Arizona',
  });
}

export function RivieraBeachFL() {
  return new ShiftConfiguration({
    firstDay: '2019-01-03',
    pattern: 'ABC',
    shiftStart: '0800',
    timeZone: 'US/Eastern',
  });
}

export function WayneTownshipIN() {
  return new ShiftConfiguration({
    firstDay: '2019-02-01',
    pattern: 'cab',
    shiftStart: '0800',
    timeZone: 'US/Eastern',
  });
}

export function WestPalmBeachFL() {
  return new ShiftConfiguration({
    firstDay: '2019-01-01',
    pattern: '123',
    shiftStart: '0800',
    timeZone: 'US/Eastern',
  });
}

export function SacramentoMetroCA() {
  return new ShiftConfiguration({
    firstDay: '2019-01-01',
    pattern: 'abbcca',
    shiftStart: '0800',
    timeZone: 'US/Pacific',
  });
}

export function WashoeCountyNV() {
  return new ShiftConfiguration({
    firstDay: '2019-01-01',
    pattern: 'caabbc',
    shiftStart: '0800',
    timeZone: 'US/Pacific',
  });
}

export function JacksonTownshipIN() {
  return new ShiftConfiguration({
    firstDay: '2019-01-01',
    pattern: 'acababcbc',
    shiftStart: '0700',
    timeZone: 'US/Eastern',
  });
}

export function DelawareOH() {
  return new ShiftConfiguration({
    firstDay: '2019-03-21',
    pattern: 'abcabc',
    shiftStart: '0800',
    timeZone: 'US/Eastern',
  });
}

export function AnneArundelMD() {
  return new ShiftConfiguration({
    firstDay: '2019-05-02',
    pattern: 'ABCD',
    shiftStart: '0700',
  });
}

export function ColumbusOH() {
  return new ShiftConfiguration({
    firstDay: '2019-05-02',
    pattern: '123',
    shiftStart: '0800',
  });
}

export function RosevilleCA() {
  return new ShiftConfiguration({
    firstDay: '2019-01-06',
    pattern: 'aabbcc',
    shiftStart: '0700',
    timeZone: 'US/Pacific',
  });
}

export function TorringtonCT() {
  return new ShiftConfiguration({
    firstDay: '2019-06-25',
    pattern: '1234',
    shiftStart: '0800',
    timeZone: 'US/Eastern',
  });
}

export function MemphisTN() {
  return new ShiftConfiguration({
    firstDay: '2019-01-01',
    pattern: 'ababcbcac',
    shiftStart: '0700',
    timeZone: 'US/Central',
  });
}

export function JacksonCountyOR() {
  return new ShiftConfiguration({
    firstDay: '2019-07-05',
    pattern: 'aabbcc',
    shiftStart: '0800',
    timeZone: 'US/Pacific',
  });
}

export function LexingtonKy() {
  return new ShiftConfiguration({
    firstDay: '2019-07-12',
    pattern: '123',
    shiftStart: '0700',
    timeZone: 'US/Eastern',
  });
}

export function PlainfieldIL() {
  return new ShiftConfiguration({
    firstDay: '2019-01-01',
    pattern: 'RGB',
    shiftStart: '0700',
    timeZone: 'US/Central',
  });
}

// Demo SF Data
export function SanFranciscoCA() {
  return new ShiftConfiguration({
    firstDay: '2016-10-18',
    pattern: 'acababacbcacacbabcbcb',
    shiftStart: '0800',
    timeZone: 'US/Eastern',
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
  99082: WestMetroCO,
  74731: BellevueWA,
  79592: DelrayBeachFL,
  88539: MiamiDadeFL,
  95671: SouthernPlatteMO,
  90552: AdamsCountyCO,
  95402: AdamsCountyCO,
  81508: FishersIN,
  77934: WestfieldIN,
  77482: CiceroIN,
  94967: SheridanIN,
  76662: CarmelIN,
  90227: NoblesvilleIN,
  88490: MesaAZ,
  93535: RivieraBeachFL,
  98751: WayneTownshipIN,
  99102: WestPalmBeachFL,
  94264: SanFranciscoCA,
  90011: NewRochelleNY,
  94043: SacramentoMetroCA,
  97450: WashoeCountyNV,
  85090: JacksonTownshipIN,
  79555: DelawareOH,
  73693: AnneArundelMD,
  78503: ColumbusOH,
  77855: RosevilleCA,
  97104: TorringtonCT,
  88403: MemphisTN,
  85063: JacksonCountyOR,
  86743: LexingtonKy,
  92216: PlainfieldIL,
};
