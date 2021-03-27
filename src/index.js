import moment from 'moment-timezone';

class ShiftInformation {
  /**
   * Individual shift information and pattern for ShiftConfiguration
   * @param {string} pattern - The department's shift pattern.
   * @param {string} timeZone - The department's timezone.
   * @param {string} shiftStart - The start time of the department's shift.
   * @param {string} firstDay - The first day of the pattern (assumed to be in local tz).
   * @param {number} shiftDuration - Number of hours per shift.
   */
  constructor({
    pattern, timeZone = 'US/Eastern', shiftStart = '0800', firstDay = '2016-10-30', shiftDuration = 24,
  } = {}) {
    this.pattern = pattern;
    this.timeZone = timeZone;
    this.shiftStart = shiftStart;
    this.firstDay = firstDay;
    this.shiftDuration = shiftDuration;
    this.shiftStartDate = moment.tz(this.shiftStart, 'hmm', this.timeZone);
    this.patternStart = moment.tz(`${this.firstDay} ${this.shiftStart.slice(0, 2)}:${this.shiftStart.slice(2)}`, this.timeZone).startOf('hour');
  }

  normalize(incomingDate) {
    return moment.tz(incomingDate, this.timeZone);
  }

  reversePattern() {
    const isPatternString = typeof this.pattern === 'string';

    // create shallow copy of the array
    let pattern = Array.from(isPatternString ? this.pattern.split('') : this.pattern);
    pattern = pattern.reverse();

    return isPatternString ? pattern.join('') : pattern;
  }

  afterShiftStartDate(date) {
    const incomingDate = this.normalize(date);
    return (this.hoursFromPatternStart(incomingDate) >= 0);
  }

  beforeShiftChange(date) {
    const startDate = this.shiftStartDate;
    return date.hours() < startDate.hours() || (date.hours() === startDate.hours()
        && date.minutes() < startDate.minutes());
  }

  hoursFromPatternStart(start) {
    return start.diff(this.patternStart, 'hours');
  }

  calculateShift(date, { dateOnly = false } = {}) {
    const momentDate = this.normalize(date);

    if (dateOnly) {
      momentDate.add(this.shiftStartDate.hour(), 'hours');
    }

    let hoursFromStart = this.hoursFromPatternStart(momentDate);

    // Adjust for time spans covering DST transition :(
    if (this.patternStart.isDST() !== momentDate.isDST()) {
      hoursFromStart += momentDate.isDST() ? 1 : -1;
    }

    if (this.beforeShiftChange(momentDate)) {
      hoursFromStart -= 1;
    }

    const pattern = hoursFromStart < 0 ? this.reversePattern() : this.pattern;
    const index = Math.floor(Math.abs(hoursFromStart) / this.shiftDuration) % pattern.length;
    const shift = pattern[index].toUpperCase();

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
    return { start: start.format(), end: start.add(this.shiftDuration, 'hours').format() };
  }
}

export class ShiftConfiguration { // eslint-disable-line import/prefer-default-export
  /**
   * Create a ShiftConfiguration.
   * @param shifts
   */
  constructor(shifts = { timeZone: 'US/Eastern', shiftStart: '0800', firstDay: '2016-10-30' }) {
    if (Array.isArray(shifts)) {
      this.shifts = shifts.map((shiftInfo) => new ShiftInformation(shiftInfo));
    } else {
      this.shifts = [new ShiftInformation(shifts)];
    }
    this.shifts = this.shifts.sort((a, b) => a.hoursFromPatternStart(b.patternStart));
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
  return new ShiftConfiguration([{
    firstDay: '2017-01-01',
    pattern: 'acbcbcbababacac',
    shiftStart: '0800',
    timeZone: 'US/Arizona',
  },

  // transition to new schedule starts
  {
    firstDay: '2021-03-31',
    pattern: 'AC',
    shiftDuration: 12,
    shiftStart: '0800',
    timeZone: 'US/Arizona',
  },
  {
    firstDay: '2021-04-01',
    pattern: 'BACACAC',
    shiftStart: '0800',
    timeZone: 'US/Arizona',
  },
  // transition to new schedule completes on 04/08/2021
  {
    firstDay: '2021-04-08',
    pattern: 'BABCBCACA',
    shiftStart: '0800',
    timeZone: 'US/Arizona',
  },
  ]);
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

export function JerseyCityNJ() {
  return new ShiftConfiguration({
    firstDay: '2020-01-04',
    pattern: 'ABCD',
    shiftStart: '0800',
    timeZone: 'US/Eastern',
  });
}

export function DelawareOH() {
  return new ShiftConfiguration([{
    firstDay: '2019-03-21',
    pattern: 'abcabc',
    shiftStart: '0800',
    timeZone: 'US/Eastern',
  }, {
    firstDay: '2020-02-29',
    pattern: 'cba',
    shiftDuration: 8,
    shiftStart: '0800',
    timeZone: 'US/Eastern',
  }, {
    firstDay: '2020-03-01',
    pattern: 'abcabc',
    shiftStart: '0800',
    timeZone: 'US/Eastern',
  },
  ]);
}

export function AnneArundelMD() {
  return new ShiftConfiguration({
    firstDay: '2019-05-02',
    pattern: 'ABCD',
    shiftStart: '0700',
  });
}

export function ColumbusOH() {
  return new ShiftConfiguration([{
    firstDay: '2019-05-02',
    pattern: '123',
    shiftStart: '0800',
  }, {
    firstDay: '2020-03-01',
    pattern: '123',
    shiftStart: '0800',
  }]);
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

export function ManchesterCT() {
  return new ShiftConfiguration({
    firstDay: '2019-01-08',
    pattern: '13243142',
    shiftStart: '0800',
    timeZone: 'US/Eastern',
  });
}

export function PalmBeachCountyFL() {
  return new ShiftConfiguration({
    firstDay: '2019-12-02',
    pattern: 'ABC',
    shiftStart: '0730',
    timeZone: 'US/Eastern',
  });
}

export function CedarRapidsIA() {
  return new ShiftConfiguration({
    firstDay: '2020-01-01',
    pattern: 'ABC',
    shiftStart: '0700',
    timeZone: 'US/Central',
  });
}

export function AlexandriaVA() {
  return new ShiftConfiguration({
    firstDay: '2020-01-08',
    pattern: 'ABABCBCAC',
    shiftStart: '0700',
    timeZone: 'US/Eastern',
  });
}

export function PascoWA() {
  return new ShiftConfiguration({
    firstDay: '2020-01-06',
    pattern: 'AABBCC',
    shiftStart: '0800',
    timeZone: 'US/Pacific',
  });
}

export function RichlandWA() {
  return new ShiftConfiguration({
    firstDay: '2020-01-06',
    pattern: 'AABBCC',
    shiftStart: '0800',
    timeZone: 'US/Pacific',
  });
}
export function RinconValleyAZ() {
  return new ShiftConfiguration({
    firstDay: '2017-01-01',
    pattern: 'acbcbcbababacac',
    shiftStart: '0700',
    timeZone: 'US/Arizona',
  });
}

export function EastPierceWA() {
  return new ShiftConfiguration({
    firstDay: '2020-01-02',
    pattern: 'ACABABCBC',
    shiftStart: '0800',
    timeZone: 'US/Pacific',
  });
}

export function CapeCoralFL() {
  return new ShiftConfiguration({
    firstDay: '2020-01-01',
    pattern: 'BCA',
    shiftStart: '0800',
    timeZone: 'US/Eastern',
  });
}

export function NorthwestAZ() {
  return new ShiftConfiguration({
    firstDay: '2020-01-02',
    pattern: 'ACABABCBC',
    shiftStart: '0800',
    timeZone: 'US/Arizona',
  });
}

export function GolderRanchAZ() {
  return new ShiftConfiguration({
    firstDay: '2020-04-01',
    pattern: 'ACABABCBC',
    shiftStart: '0800',
    timeZone: 'US/Arizona',
  });
}

export function TheVillagesFL() {
  return new ShiftConfiguration({
    firstDay: '2020-05-01',
    pattern: 'ABC',
    shiftStart: '0800',
    timeZone: 'US/Eastern',
  });
}

export function MadisonWI() {
  return new ShiftConfiguration({
    firstDay: '2020-01-05',
    pattern: 'ababcbcac',
    shiftStart: '0700',
    timeZone: 'US/Central',
  });
}

export function HallCountyGA() {
  return new ShiftConfiguration({
    firstDay: '2020-06-01',
    pattern: 'ABC',
    shiftStart: '0800',
    timeZone: 'US/Eastern',
  });
}

export function CoralGablesFL() {
  return new ShiftConfiguration({
    firstDay: '2020-06-11',
    pattern: 'ABC',
    shiftStart: '0700',
    timeZone: 'US/Eastern',
  });
}

export function OntarioCA() {
  return new ShiftConfiguration({
    firstDay: '2020-01-01',
    pattern: 'cabababcbcacacababcbcbca',
    shiftStart: '0700',
    timeZone: 'US/Pacific',
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
export function CasaGrandeAZ() {
  return new ShiftConfiguration({
    firstDay: '2020-08-12',
    pattern: 'AABBCC',
    shiftStart: '0800',
    timeZone: 'US/Arizona',
  });
}
export function PhoenixAZ() {
  return new ShiftConfiguration({
    firstDay: '2020-02-10',
    pattern: 'ABC',
    shiftStart: '0800',
    timeZone: 'US/Arizona',
  });
}

export function GoodyearAZ() {
  return new ShiftConfiguration({
    firstDay: '2020-10-15',
    pattern: 'CCBBAA',
    shiftStart: '0700',
    timeZone: 'US/Arizona',
  });
}

export function LACountyCA() {
  return new ShiftConfiguration({
    firstDay: '2020-01-23',
    pattern: 'BABCACABCBCABABCACABCBCA',
    shiftStart: '0800',
    timeZone: 'US/Pacific',
  });
}

export function OrlandoFL() {
  return new ShiftConfiguration({
    firstDay: '2019-11-13',
    pattern: 'abc',
    shiftStart: '0800',
    timeZone: 'US/Eastern',
  });
}

export function SaintLucieFL() {
  return new ShiftConfiguration({
    firstDay: '2016-10-18',
    pattern: 'abc',
    shiftStart: '0730',
    timeZone: 'US/Eastern',
  });
}
export function SomertonCocopahAZ() {
  return new ShiftConfiguration({
    firstDay: '2020-01-05',
    pattern: 'ababcbcac',
    shiftStart: '0800',
    timeZone: 'US/Arizona',
  });
}
export function UpperProvidencePA() {
  return new ShiftConfiguration({
    firstDay: '2020-09-28',
    pattern: 'AE,ADE,ADE,ABCD,BCD,C,C,BE,ABE,ABE,ACDE,ACD,D,D,BC,BCE,BCE,ABDE,ADE,A,A,CD,BCD,BCD,ABCE,ABE,E,E,AD,ACD,ACD,BCDE,BCE,B,B'.split(','),
    shiftStart: '0600',
    timeZone: 'US/Eastern',
  });
}

export function OlatheKS() {
  return new ShiftConfiguration({
    firstDay: '2020-01-01',
    pattern: 'CBCBABACA',
    shiftStart: '0800',
    timeZone: 'US/Central',
  });
}

export function IonaMcGregorFL() {
  return new ShiftConfiguration({
    firstDay: '2020-11-20',
    pattern: 'ABC',
    shiftStart: '0700',
    timeZone: 'US/Eastern',
  });
}

export function AshevilleNC() {
  return new ShiftConfiguration({
    firstDay: '2020-01-01',
    pattern: 'CABABCACABCBCABABCACABCBA',
    shiftStart: '0800',
    timeZone: 'US/Eastern',
  });
}

export function LoudounVA() {
  return new ShiftConfiguration({
    firstDay: '2021-01-04',
    pattern: 'ABC',
    shiftStart: '0600',
    timeZone: 'US/Eastern',
  });
}

export function BrowardFL() {
  return new ShiftConfiguration({
    firstDay: '2021-03-04',
    pattern: 'ABC',
    shiftStart: '0800',
  });
}

export function AlbuquerqueNM() {
  return new ShiftConfiguration({
    firstDay: '2020-08-17',
    pattern: 'AACCBB',
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
  97175: ManchesterCT,
  91407: PalmBeachCountyFL,
  76927: CedarRapidsIA,
  73375: AlexandriaVA,
  91576: PascoWA,
  85300: JerseyCityNJ,
  93429: RinconValleyAZ,
  80336: EastPierceWA,
  76590: CapeCoralFL,
  82670: GolderRanchAZ,
  90649: NorthwestAZ,
  98151: TheVillagesFL,
  87545: MadisonWI,
  83412: HallCountyGA,
  78725: CoralGablesFL,
  91073: OntarioCA,
  77594: CasaGrandeAZ,
  91934: PhoenixAZ,
  82740: GoodyearAZ,
  87255: LACountyCA,
  91165: OrlandoFL,
  95982: SaintLucieFL,
  93317: RichlandWA,
  95377: SomertonCocopahAZ,
  100278: UpperProvidencePA,
  90962: OlatheKS,
  84946: IonaMcGregorFL,
  73930: AshevilleNC,
  87281: LoudounVA,
  75928: BrowardFL,
  73343: AlbuquerqueNM,
};
