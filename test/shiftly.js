/* eslint-env node, mocha */

import 'chai/register-should';

import { ShiftConfiguration,
  washingtonDC,
  richmondVA,
  fairfaxVA,
  PrinceWilliamVA,
  OxnardCA,
  BostonMA,
  TucsonAZ,
  ClarkCountyNV,
  RogersAR,
  FairmountCO,
  KingstonON,
  GreenvilleNC,
  CosumnesCA,
  StLouisPark,
  HiltonHeadSC,
  PolkCountyFL,
  FirecaresLookup,
  FtMyersFL,
  OrangeCountyFL,
  StPaulMN,
  WestMetroCO,
  BellevueWA,
  DelrayBeachFL,
  NewRochelleNY,
  MiamiDadeFL,
  SouthernPlatteMO,
  AdamsCountyCO,
  FishersIN,
  WestfieldIN,
  CiceroIN,
  SheridanIN,
  CarmelIN,
  NoblesvilleIN,
  MesaAZ,
  RivieraBeachFL,
  WayneTownshipIN,
  WestPalmBeachFL,
  SacramentoCA,
  JacksonTownshipIN,
} from '../src';

const richmond = richmondVA();
const fairfax = fairfaxVA();
const pwc = PrinceWilliamVA();
const oxnard = OxnardCA();
const tucson = TucsonAZ();
const clarkCounty = ClarkCountyNV();
const rogers = RogersAR();
const bostonMA = BostonMA();
const fairmountCO = FairmountCO();
const kingstonON = KingstonON();
const greenville = GreenvilleNC();
const cosumnes = CosumnesCA();
const stlpark = StLouisPark();
const hiltonHead = HiltonHeadSC();
const polkCounty = PolkCountyFL();
const ftMyers = FtMyersFL();
const orangeCounty = OrangeCountyFL();
const stPaulMN = StPaulMN();
const westMetroCO = WestMetroCO();
const bellevueWA = BellevueWA();
const delrayBeachFL = DelrayBeachFL();
const newRochelleNY = NewRochelleNY();
const miamiDadeFL = MiamiDadeFL();
const southernPlatteMO = SouthernPlatteMO();
const adamsCountyCO = AdamsCountyCO();
const fishersIN = FishersIN();
const westfieldIN = WestfieldIN();
const ciceroIN = CiceroIN();
const sheridanIN = SheridanIN();
const carmelIN = CarmelIN();
const noblesvilleIN = NoblesvilleIN();
const mesa = MesaAZ();
const riviera = RivieraBeachFL();
const wayne = WayneTownshipIN();
const wpb = WestPalmBeachFL();
const sacramentoCA = SacramentoCA();
const jacksonTownshipIN = JacksonTownshipIN();


describe('ShiftInformation', () => {
  it('should correctly parse shiftStart', () => {
    (richmond.shifts[0].shiftStartDate.hours()).should.equal(8);
  });

  it('should allow for different start times', () => {
    const sc = new ShiftConfiguration({ shiftStart: '0700' });
    sc.shifts[0].shiftStart.should.equal('0700');
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

  it('should return correct shift at turnover time', () => {
    (richmond.calculateShift('2017-07-07T08:00:00-0400').should.equal('A'));
  });

  it('should return true for dates and times after shift start date', () => {
    const testDateAfter = '2016-10-22';
    const testDateBefore = '2016-10-10';
    const onDate = '2016-10-18';
    (richmond.shifts[0].afterShiftStartDate(testDateAfter).should.equal(true));
    (richmond.shifts[0].afterShiftStartDate(testDateBefore).should.equal(false));
    (richmond.shifts[0].afterShiftStartDate(onDate).should.equal(true));
  });

  it('should order shifts from latest to oldest configuration', () => {
    const earlyShiftConfig = {
      firstDay: '2016-10-18',
      pattern: 'bac',
      shiftStart: '0800',
      timeZone: 'US/Eastern',
    };
    const midShiftConfig = {
      firstDay: '2017-10-20',
      pattern: 'abc',
      shiftStart: '0800',
      timeZone: 'US/Eastern',
    };
    const latestShiftConfig = {
      firstDay: '2018-10-18',
      pattern: 'acb',
      shiftStart: '0800',
      timeZone: 'US/Eastern',
    };
    const testDate = '2017-10-21T09:53:00';
    const sc = new ShiftConfiguration([earlyShiftConfig, latestShiftConfig, midShiftConfig]);
    sc.shifts[0].firstDay.should.equal(latestShiftConfig.firstDay);
    sc.shifts[1].firstDay.should.equal(midShiftConfig.firstDay);
    sc.shifts[2].firstDay.should.equal(earlyShiftConfig.firstDay);

    sc.calculateShift(testDate).should.equal('B');
  });

  it('should determine the correct ShiftInformation to use', () => {
    const firstConfig = {
      firstDay: '2016-10-18',
      pattern: 'bac',
      shiftStart: '0800',
      timeZone: 'US/Eastern',
    };
    const secondConfig = {
      firstDay: '2017-10-20',
      pattern: 'abc',
      shiftStart: '0800',
      timeZone: 'US/Eastern',
    };
    const tests = [
      ['2017-07-11T05:10:30-0400', firstConfig],
      ['2017-11-11T08:10:30-0400', secondConfig],
      ['2016-07-04T08:10:30-0400', secondConfig],
      ['2016-10-18T08:10:30-0400', firstConfig],
      ['2017-10-20T08:10:30-0400', secondConfig],
    ];
    const single = new ShiftConfiguration(firstConfig);
    (single.determineShiftPattern(tests[0][0]).firstDay.should.equal(firstConfig.firstDay));
    const sc = new ShiftConfiguration([firstConfig, secondConfig]);
    tests.forEach((test) => {
      (sc.determineShiftPattern(test[0]).firstDay.should.equal(test[1].firstDay));
    });
  });
});

describe('Firecares Lookup', () => {
  it('should export a lookup based on firecares id', () => {
    FirecaresLookup['98606'].should.equal(washingtonDC);
    FirecaresLookup['93345'].should.equal(richmondVA);
    FirecaresLookup['81147'].should.equal(fairfaxVA);
    FirecaresLookup['81154'].should.equal(fairfaxVA);
    FirecaresLookup['92724'].should.equal(PrinceWilliamVA);
    FirecaresLookup['77818'].should.equal(OxnardCA);
    FirecaresLookup['97477'].should.equal(TucsonAZ);
    FirecaresLookup['77989'].should.equal(ClarkCountyNV);
    FirecaresLookup['93717'].should.equal(RogersAR);
    FirecaresLookup['75500'].should.equal(BostonMA);
    FirecaresLookup['81205'].should.equal(FairmountCO);
    FirecaresLookup['100262'].should.equal(KingstonON);
    FirecaresLookup['83175'].should.equal(GreenvilleNC);
    FirecaresLookup['78827'].should.equal(CosumnesCA);
    FirecaresLookup['95940'].should.equal(StLouisPark);
    FirecaresLookup['96833'].should.equal(HiltonHeadSC);
    FirecaresLookup['05102'].should.equal(PolkCountyFL);
    FirecaresLookup['77656'].should.equal(FtMyersFL);
    FirecaresLookup['91106'].should.equal(OrangeCountyFL);
    FirecaresLookup['77863'].should.equal(StPaulMN);
    FirecaresLookup['74731'].should.equal(BellevueWA);
    FirecaresLookup['88539'].should.equal(MiamiDadeFL);
    FirecaresLookup['95671'].should.equal(SouthernPlatteMO);
    FirecaresLookup['90552'].should.equal(AdamsCountyCO);
    FirecaresLookup['81508'].should.equal(FishersIN);
    FirecaresLookup['77934'].should.equal(WestfieldIN);
    FirecaresLookup['77482'].should.equal(CiceroIN);
    FirecaresLookup['94967'].should.equal(SheridanIN);
    FirecaresLookup['76662'].should.equal(CarmelIN);
    FirecaresLookup['90227'].should.equal(NoblesvilleIN);
    FirecaresLookup['94042'].should.equal(SacramentoCA);
    FirecaresLookup['85090'].should.equal(JacksonTownshipIN);
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
  it('should calculate shift for day when dateOnly is true', () => {
    (richmond.calculateShift('2017-12-29', { dateOnly: true })).should.equal('C');
  });

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


describe('Tucson, AZ', () => {
  it('should match Tucson, AZ known shifts', () => {
    const tests = [
      ['2017-12-01T05:10:30-0700', 'C', true],
      ['2017-12-01T08:10:30-0700', 'B', false],
      ['2017-12-02T08:10:30-0700', 'C', false],
      ['2017-12-19T08:10:30-0700', 'A', false],
      ['2017-12-22T08:10:30-0700', 'B', false],
    ];

    tests.forEach((test) => {
      (tucson.calculateShift(test[0])).should.equal(test[1]);
      (tucson.beforeShiftChange(tucson.normalize(test[0]))).should.equal(test[2]);
    });
  });

  it('should calculate shift time frame', () => {
    const timeFrame = tucson.shiftTimeFrame('2017-07-07');
    (timeFrame.start.should.equal('2017-07-06T08:00:00-07:00'));
    (timeFrame.end.should.equal('2017-07-07T08:00:00-07:00'));
  });
});

describe('Clark County, NV', () => {
  it('should match Clark County, NV known shifts', () => {
    const tests = [
      ['2017-12-01T05:10:30-0800', 'A', true],
      ['2017-12-01T08:10:30-0800', 'B', false],
      ['2017-12-02T08:10:30-0800', 'C', false],
      ['2017-12-19T08:10:30-0800', 'C', false],
      ['2017-12-22T08:10:30-0800', 'A', false],
    ];

    tests.forEach((test) => {
      (clarkCounty.calculateShift(test[0])).should.equal(test[1]);
      (clarkCounty.beforeShiftChange(clarkCounty.normalize(test[0]))).should.equal(test[2]);
    });
  });

  it('should calculate shift time frame', () => {
    const timeFrame = clarkCounty.shiftTimeFrame('2017-07-07');
    (timeFrame.start.should.equal('2017-07-06T08:00:00-07:00'));
    (timeFrame.end.should.equal('2017-07-07T08:00:00-07:00'));
  });
});

describe('Rogers, AR', () => {
  it('should match Rogers, AR known shifts', () => {
    const tests = [
      ['2018-01-17T05:10:30-0600', 'C', true],
      ['2018-01-17T08:10:30-0600', 'A', false],
      ['2018-01-18T08:10:30-0600', 'A', false],
      ['2018-01-19T08:10:30-0600', 'B', false],
      ['2018-01-20T08:10:30-0600', 'B', false],
      ['2018-01-21T08:10:30-0600', 'C', false],
      ['2018-01-22T08:10:30-0600', 'C', false],
      ['2018-07-23T08:10:30-0500', 'A', false],
      ['2018-08-12T08:10:30-0500', 'B', false],
      ['2018-11-23T08:10:30-0600', 'C', false],
    ];

    tests.forEach((test) => {
      (rogers.calculateShift(test[0])).should.equal(test[1]);
      (rogers.beforeShiftChange(rogers.normalize(test[0]))).should.equal(test[2]);
    });
  });

  it('should calculate shift time frame', () => {
    const timeFrame = rogers.shiftTimeFrame('2017-07-07');
    (timeFrame.start.should.equal('2017-07-06T07:00:00-05:00'));
    (timeFrame.end.should.equal('2017-07-07T07:00:00-05:00'));
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

describe('Fairmount, CO', () => {
  it('should match Fairmount, CO known shifts', () => {
    const tests = [
      ['2018-01-01T07:10:30-0700', 'B', false],
      ['2018-01-02T07:10:30-0700', 'B', false],
      ['2018-01-03T07:10:30-0700', 'A', false],
      ['2018-01-04T07:10:30-0700', 'A', false],
      ['2018-01-05T07:10:30-0700', 'C', false],
      ['2018-01-06T07:10:30-0700', 'C', false],
      ['2018-01-07T07:10:30-0700', 'B', false],
      ['2018-01-08T07:10:30-0700', 'B', false],
      ['2018-01-09T07:10:30-0700', 'A', false],
    ];
    tests.forEach((test) => {
      (fairmountCO.calculateShift(test[0])).should.equal(test[1]);
      (fairmountCO.beforeShiftChange(fairmountCO.normalize(test[0]))).should.equal(test[2]);
    });
  });
});

describe('Kingston, ON', () => {
  it('should match Kingston, ON known shifts', () => {
    const tests = [
      ['2018-08-01T08:10:30-0400', 'D', false],
      ['2018-08-02T08:10:30-0400', 'C', false],
      ['2018-08-03T08:10:30-0400', 'B', false],
      ['2018-08-04T08:10:30-0400', 'D', false],
      ['2018-08-05T08:10:30-0400', 'B', false],
      ['2018-08-06T08:10:30-0400', 'A', false],
      ['2018-08-07T08:10:30-0400', 'D', false],
      ['2018-08-08T08:10:30-0400', 'B', false],
      ['2018-08-09T08:10:30-0400', 'A', false],
    ];
    tests.forEach((test) => {
      (kingstonON.calculateShift(test[0])).should.equal(test[1]);
      (kingstonON.beforeShiftChange(kingstonON.normalize(test[0]))).should.equal(test[2]);
    });
  });
});

describe('Greenville, NC', () => {
  it('should match Greenville, NC known shifts', () => {
    const tests = [
      ['2018-05-01T08:10:30-0400', '2', false],
      ['2018-05-02T08:10:30-0400', '3', false],
      ['2018-05-03T08:10:30-0400', '1', false],
      ['2018-05-04T08:10:30-0400', '2', false],
    ];
    tests.forEach((test) => {
      (greenville.calculateShift(test[0])).should.equal(test[1]);
      (greenville.beforeShiftChange(greenville.normalize(test[0]))).should.equal(test[2]);
    });
  });
});

describe('Cosumnes, CA', () => {
  it('should match Cosumnes, CA known shifts', () => {
    const tests = [
      ['2018-04-04T07:10:30-0700', 'C', false],
      ['2018-04-05T07:10:30-0700', 'A', false],
      ['2018-04-06T07:10:30-0700', 'A', false],
      ['2018-04-07T07:10:30-0700', 'B', false],
    ];
    tests.forEach((test) => {
      (cosumnes.calculateShift(test[0])).should.equal(test[1]);
      (cosumnes.beforeShiftChange(cosumnes.normalize(test[0]))).should.equal(test[2]);
    });
  });
});

describe('St Louis Park, MN', () => {
  it('should match St Louis Park, MN known shifts', () => {
    const tests = [
      ['2018-04-04T07:10:30-0500', 'A', true],
      ['2018-04-05T07:31:30-0500', 'C', false],
      ['2018-04-06T07:31:30-0500', 'A', false],
      ['2018-04-07T07:31:30-0500', 'C', false],
    ];
    tests.forEach((test) => {
      (stlpark.calculateShift(test[0])).should.equal(test[1]);
      (stlpark.beforeShiftChange(stlpark.normalize(test[0]))).should.equal(test[2]);
    });
  });
});

describe('Hilton Head, SC', () => {
  it('should match Hilton Head, SC known shifts', () => {
    const tests = [
      ['2018-04-04T07:10:30-0400', 'C', true],
      ['2018-04-04T08:31:30-0400', 'A', false],
      ['2018-04-05T08:31:30-0400', 'B', false],
      ['2018-04-06T08:31:30-0400', 'C', false],
    ];
    tests.forEach((test) => {
      (hiltonHead.calculateShift(test[0])).should.equal(test[1]);
      (hiltonHead.beforeShiftChange(hiltonHead.normalize(test[0]))).should.equal(test[2]);
    });
  });
});

describe('Polk County, FL', () => {
  it('should match Polk County, FL known shifts', () => {
    const tests = [
      ['2018-05-23T07:10:30-0400', 'C', true],
      ['2018-05-23T08:30:00-0400', 'A', false],
      ['2018-05-24T08:00:00-0400', 'B', false],
      ['2018-05-25T08:00:00-0400', 'C', false],
    ];
    tests.forEach((test) => {
      (polkCounty.calculateShift(test[0])).should.equal(test[1]);
      (polkCounty.beforeShiftChange(polkCounty.normalize(test[0]))).should.equal(test[2]);
    });
  });
});

describe('Fort Myers, FL', () => {
  it('should match Fort Myers, FL known shifts', () => {
    const tests = [
      ['2018-05-17T06:10:30-0400', 'C', true],
      ['2018-05-17T08:30:00-0400', 'A', false],
      ['2018-05-18T08:00:00-0400', 'B', false],
      ['2018-05-19T08:00:00-0400', 'C', false],
    ];
    tests.forEach((test) => {
      (ftMyers.calculateShift(test[0])).should.equal(test[1]);
      (ftMyers.beforeShiftChange(ftMyers.normalize(test[0]))).should.equal(test[2]);
    });
  });
});

describe('Orange County, FL', () => {
  it('should match Orange County, FL known shifts', () => {
    const tests = [
      ['2018-05-16T07:10:30-0400', 'C', true],
      ['2018-05-16T08:30:00-0400', 'A', false],
      ['2018-05-17T08:00:00-0400', 'B', false],
      ['2018-05-18T08:00:00-0400', 'C', false],
    ];
    tests.forEach((test) => {
      (orangeCounty.calculateShift(test[0])).should.equal(test[1]);
      (orangeCounty.beforeShiftChange(orangeCounty.normalize(test[0]))).should.equal(test[2]);
    });
  });
});

describe('St Paul, MN', () => {
  it('should match St Paul, MN known shifts', () => {
    const tests = [
      ['2018-05-16T07:10:30-0500', 'A', true],
      ['2018-05-16T08:30:00-0500', 'B', false],
      ['2018-05-17T08:00:00-0500', 'C', false],
      ['2018-05-18T08:00:00-0500', 'B', false],
      ['2018-08-01T08:00:00-0500', 'C', false],
      ['2018-08-02T08:00:00-0500', 'A', false],
      ['2018-08-03T08:00:00-0500', 'C', false],
    ];
    tests.forEach((test) => {
      (stPaulMN.calculateShift(test[0])).should.equal(test[1]);
      (stPaulMN.beforeShiftChange(stPaulMN.normalize(test[0]))).should.equal(test[2]);
    });
  });
});


describe('West Metro, CO', () => {
  it('should match West Metro, CO known shifts', () => {
    const tests = [
      ['2018-01-02T06:10:30-0700', 'B', true],
      ['2018-01-02T08:10:30-0700', 'B', false],
      ['2018-01-03T08:10:30-0700', 'A', false],
      ['2018-01-04T08:10:30-0700', 'A', false],
      ['2018-01-05T08:10:30-0700', 'C', false],
      ['2018-01-06T08:10:30-0700', 'C', false],
      ['2018-08-23T08:10:30-0600', 'B', false],
      ['2018-08-24T08:10:30-0600', 'B', false],
      ['2018-08-25T08:10:30-0600', 'A', false],

    ];
    tests.forEach((test) => {
      (westMetroCO.calculateShift(test[0])).should.equal(test[1]);
      (westMetroCO.beforeShiftChange(westMetroCO.normalize(test[0]))).should.equal(test[2]);
    });
  });
});

describe('Bellevue, WA', () => {
  it('should match Bellevue, WA known shifts', () => {
    const tests = [
      ['2018-05-16T07:10:00-0700', 'C', true],
      ['2018-05-16T08:30:00-0700', 'B', false],
      ['2018-05-17T08:00:00-0700', 'A', false],
      ['2018-05-18T08:00:00-0700', 'B', false],
      ['2018-07-20T08:00:00-0700', 'B', false],
      ['2018-07-21T22:00:00-0700', 'A', false],
      ['2018-07-22T14:00:00-0700', 'C', false],
    ];
    tests.forEach((test) => {
      (bellevueWA.calculateShift(test[0])).should.equal(test[1]);
      (bellevueWA.beforeShiftChange(bellevueWA.normalize(test[0]))).should.equal(test[2]);
    });
  });
});

describe('Delray Beach, FL', () => {
  it('should match Delray Beach, FL known shifts', () => {
    const tests = [
      ['2018-01-01T09:10:00-0400', 'C', false],
      ['2018-01-02T07:10:00-0400', 'C', true],
      ['2018-01-02T09:10:00-0400', 'A', false],
      ['2018-01-03T09:10:00-0400', 'B', false],
    ];
    tests.forEach((test) => {
      (delrayBeachFL.calculateShift(test[0])).should.equal(test[1]);
      (delrayBeachFL.beforeShiftChange(delrayBeachFL.normalize(test[0]))).should.equal(test[2]);
    });
  });
});

describe('New Rochelle, NY', () => {
  it('should match New Rochelle, NY known shifts', () => {
    const tests = [
      ['2019-01-01T09:10:00-0400', '1', false],
      ['2019-01-02T07:10:00-0400', '1', true],
      ['2019-01-02T09:10:00-0400', '2', false],
      ['2019-01-03T09:10:00-0400', '3', false],
      ['2019-01-04T09:10:00-0400', '4', false],
    ];
    tests.forEach((test) => {
      (newRochelleNY.calculateShift(test[0])).should.equal(test[1]);
      (newRochelleNY.beforeShiftChange(newRochelleNY.normalize(test[0]))).should.equal(test[2]);
    });
  });
});


describe('Miami Dade, FL', () => {
  it('should match Miami Dade, FL known shifts', () => {
    const tests = [
      ['2018-12-01T08:10:00-0400', 'A', false],
      ['2018-12-01T06:10:00-0400', 'C', true],
      ['2018-12-02T08:10:00-0400', 'B', false],
    ];
    tests.forEach((test) => {
      (miamiDadeFL.calculateShift(test[0])).should.equal(test[1]);
      (miamiDadeFL.beforeShiftChange(miamiDadeFL.normalize(test[0]))).should.equal(test[2]);
    });
  });
});

describe('Southern Platte, MO', () => {
  it('should match Southern Platte, MO known shifts', () => {
    const tests = [
      ['2018-01-01T08:10:00-0600', 'B', false],
      ['2018-01-02T07:10:00-0600', 'B', true],
      ['2018-01-02T08:10:00-0600', 'A', false],
      ['2018-01-03T08:10:00-0600', 'B', false],
      ['2018-01-04T08:10:00-0600', 'C', false],
      ['2018-01-05T08:10:00-0600', 'B', false],
      ['2018-01-06T08:10:00-0600', 'C', false],
    ];
    tests.forEach((test) => {
      (southernPlatteMO.calculateShift(test[0])).should.equal(test[1]);
      (southernPlatteMO.beforeShiftChange(
        southernPlatteMO.normalize(test[0]))).should.equal(test[2]);
    });
  });
});

describe('Adams County, CO', () => {
  it('should match Adams County, CO known shifts', () => {
    const tests = [
      ['2019-01-02T08:10:00-0700', 'B', false],
      ['2019-01-03T08:10:00-0700', 'B', false],
      ['2019-01-04T08:10:00-0700', 'A', false],
      ['2019-01-05T08:10:00-0700', 'A', false],
      ['2019-01-06T08:10:00-0700', 'C', false],
      ['2019-01-07T08:10:00-0700', 'C', false],
      ['2019-01-08T08:10:00-0700', 'B', false],
      ['2019-01-08T06:10:00-0700', 'C', true],
    ];
    tests.forEach((test) => {
      (adamsCountyCO.calculateShift(test[0])).should.equal(test[1]);
      (adamsCountyCO.beforeShiftChange(adamsCountyCO.normalize(test[0]))).should.equal(test[2]);
    });
  });
});

describe('Fishers, IN', () => {
  it('should match Fishers, IN known shifts', () => {
    const tests = [
      ['2019-01-02T08:10:00-0500', 'B', false],
      ['2019-01-03T08:10:00-0500', 'C', false],
      ['2019-01-04T08:10:00-0500', 'A', false],
      ['2019-01-05T08:10:00-0500', 'B', false],
      ['2019-01-06T08:10:00-0500', 'C', false],
      ['2019-01-07T08:10:00-0500', 'A', false],
      ['2019-01-16T08:10:00-0500', 'A', false],
      ['2019-01-08T05:10:00-0500', 'A', true],
    ];
    tests.forEach((test) => {
      (fishersIN.calculateShift(test[0])).should.equal(test[1]);
      (fishersIN.beforeShiftChange(fishersIN.normalize(test[0]))).should.equal(test[2]);
    });
  });
});

describe('Westfield, IN', () => {
  it('should match Westfield, IN known shifts', () => {
    const tests = [
      ['2019-01-02T08:10:00-0500', 'B', false],
      ['2019-01-03T08:10:00-0500', 'C', false],
      ['2019-01-04T08:10:00-0500', 'A', false],
      ['2019-01-05T08:10:00-0500', 'B', false],
      ['2019-01-06T08:10:00-0500', 'C', false],
      ['2019-01-07T08:10:00-0500', 'A', false],
      ['2019-01-16T08:10:00-0500', 'A', false],
      ['2019-01-08T05:10:00-0500', 'A', true],
    ];
    tests.forEach((test) => {
      (westfieldIN.calculateShift(test[0])).should.equal(test[1]);
      (westfieldIN.beforeShiftChange(westfieldIN.normalize(test[0]))).should.equal(test[2]);
    });
  });
});

describe('Cicero, IN', () => {
  it('should match Cicero, IN known shifts', () => {
    const tests = [
      ['2019-01-02T08:10:00-0500', 'C', false],
      ['2019-01-03T08:10:00-0500', 'A', false],
      ['2019-01-04T08:10:00-0500', 'B', false],
      ['2019-01-05T08:10:00-0500', 'A', false],
      ['2019-01-06T08:10:00-0500', 'B', false],
      ['2019-01-07T08:10:00-0500', 'C', false],
      ['2019-01-16T08:10:00-0500', 'C', false],
      ['2019-01-08T05:10:00-0500', 'C', true],
    ];
    tests.forEach((test) => {
      (ciceroIN.calculateShift(test[0])).should.equal(test[1]);
      (ciceroIN.beforeShiftChange(ciceroIN.normalize(test[0]))).should.equal(test[2]);
    });
  });
});

describe('Sheridan, IN', () => {
  it('should match Sheridan, IN known shifts', () => {
    const tests = [
      ['2019-01-02T08:10:00-0500', 'C', false],
      ['2019-01-03T08:10:00-0500', 'A', false],
      ['2019-01-04T08:10:00-0500', 'B', false],
      ['2019-01-05T08:10:00-0500', 'A', false],
      ['2019-01-06T08:10:00-0500', 'B', false],
      ['2019-01-07T08:10:00-0500', 'C', false],
      ['2019-01-16T08:10:00-0500', 'C', false],
      ['2019-01-08T05:10:00-0500', 'C', true],
    ];
    tests.forEach((test) => {
      (sheridanIN.calculateShift(test[0])).should.equal(test[1]);
      (sheridanIN.beforeShiftChange(sheridanIN.normalize(test[0]))).should.equal(test[2]);
    });
  });
});

describe('Carmel, IN', () => {
  it('should match Carmel, IN known shifts', () => {
    const tests = [
      ['2019-01-02T08:40:00-0500', 'C', false],
      ['2019-01-03T08:40:00-0500', 'A', false],
      ['2019-01-04T08:40:00-0500', 'B', false],
      ['2019-02-01T08:40:00-0500', 'A', false],
      ['2019-02-25T08:40:00-0500', 'C', false],
      ['2018-02-07T08:40:00-0500', 'B', false],
      ['2018-02-16T08:40:00-0500', 'B', false],
      ['2018-01-08T06:20:00-0500', 'C', true],
    ];
    tests.forEach((test) => {
      (carmelIN.calculateShift(test[0])).should.equal(test[1]);
      (carmelIN.beforeShiftChange(carmelIN.normalize(test[0]))).should.equal(test[2]);
      return null;
    });
  });
});

describe('Noblesville, IN', () => {
  it('should match Noblesville, IN known shifts', () => {
    const tests = [
      ['2019-01-02T07:40:00-0500', 'B', false],
      ['2019-01-03T07:40:00-0500', 'A', false],
      ['2019-01-04T07:40:00-0500', 'B', false],
      ['2019-02-01T07:40:00-0500', 'C', false],
      ['2019-02-06T07:40:00-0500', 'A', false],
      ['2019-02-07T07:40:00-0500', 'B', false],
      ['2019-02-16T07:40:00-0500', 'B', false],
      ['2019-01-08T07:20:00-0500', 'C', true],
    ];
    tests.forEach((test) => {
      (noblesvilleIN.calculateShift(test[0])).should.equal(test[1]);
      (noblesvilleIN.beforeShiftChange(noblesvilleIN.normalize(test[0]))).should.equal(test[2]);
    });
  });
});

describe('Mesa, AZ', () => {
  it('should match Mesa, AZ known shifts', () => {
    const tests = [
      ['2018-01-02T07:40:00-0700', 'C', false],
      ['2018-02-02T07:40:00-0700', 'B', false],
      ['2018-02-02T04:40:00-0700', 'A', true],
      ['2018-02-23T07:40:00-0700', 'C', false],
    ];
    tests.forEach((test) => {
      (mesa.calculateShift(test[0])).should.equal(test[1]);
      (mesa.beforeShiftChange(mesa.normalize(test[0]))).should.equal(test[2]);
    });
  });
});

describe('Riviera Beach, FL', () => {
  it('should match Rivieria Beach, FL known shifts', () => {
    const tests = [
      ['2019-01-01T08:40:00-0500', 'B', false],
      ['2019-01-02T08:40:00-0500', 'C', false],
      ['2019-01-02T07:40:00-0500', 'B', true],
      ['2019-02-23T08:40:00-0500', 'A', false],
    ];
    tests.forEach((test) => {
      (riviera.calculateShift(test[0])).should.equal(test[1]);
      (riviera.beforeShiftChange(riviera.normalize(test[0]))).should.equal(test[2]);
    });
  });
});

describe('Wayne Township, IN', () => {
  it('should match Wayne Township, IN known shifts', () => {
    const tests = [
      ['2019-02-01T08:40:00-0700', 'C', false],
      ['2019-02-02T08:40:00-0700', 'A', false],
      ['2019-02-03T08:40:00-0700', 'B', false],
    ];
    tests.forEach((test) => {
      (wayne.calculateShift(test[0])).should.equal(test[1]);
      (wayne.beforeShiftChange(mesa.normalize(test[0]))).should.equal(test[2]);
    });
  });
});

describe('West Palm Beach, FL', () => {
  it('should match West Palm Beach, FL known shifts', () => {
    const tests = [
      ['2019-01-01T08:40:00-0500', '1', false],
      ['2019-01-02T08:40:00-0500', '2', false],
      ['2019-01-02T07:40:00-0500', '1', true],
      ['2019-02-23T08:40:00-0500', '3', false],
    ];
    tests.forEach((test) => {
      (wpb.calculateShift(test[0])).should.equal(test[1]);
      (wpb.beforeShiftChange(wpb.normalize(test[0]))).should.equal(test[2]);
    });
  });
});

describe('Sacramento, CA', () => {
  it('should match Sacramento, CA known shifts', () => {
    const tests = [
      ['2019-01-01T08:10:30-0800', 'A', false],
      ['2019-01-02T08:10:30-0800', 'B', false],
      ['2019-01-04T08:10:30-0800', 'C', false],
      ['2019-05-13T08:10:30-0800', 'A', false],
      ['2019-06-04T08:10:30-0800', 'C', false],
      ['2019-09-12T08:10:30-0800', 'B', false],
      ['2019-01-02T07:10:30-0800', 'A', true],
    ];
    tests.forEach((test) => {
      (sacramentoCA.calculateShift(test[0])).should.equal(test[1]);
      (sacramentoCA.beforeShiftChange(sacramentoCA.normalize(test[0]))).should.equal(test[2]);
    });
  });
});

describe('Jackson Township, IN', () => {
  it('should match Jackson Township, IN known shifts', () => {
    const tests = [
      ['2019-01-01T08:10:30-0500', 'A', false],
      ['2019-01-02T08:10:30-0500', 'C', false],
      ['2019-01-04T08:10:30-0500', 'B', false],
      ['2019-05-13T08:10:30-0500', 'C', false],
      ['2019-06-04T08:10:30-0500', 'C', false],
      ['2019-09-12T08:10:30-0500', 'A', false],
      ['2019-01-02T07:10:30-0500', 'A', true],
    ];
    tests.forEach((test) => {
      (jacksonTownshipIN.calculateShift(test[0])).should.equal(test[1]);
      (jacksonTownshipIN.beforeShiftChange(
        jacksonTownshipIN.normalize(test[0]))).should.equal(test[2]);
    });
  });
});
