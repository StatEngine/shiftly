/* eslint-env node, mocha */

import 'chai/register-should';

import {
  ShiftConfiguration,
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
  BothellWA,
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
  SacramentoMetroCA,
  WashoeCountyNV,
  JacksonTownshipIN,
  DelawareOH,
  AnneArundelMD,
  ColumbusOH,
  RosevilleCA,
  TorringtonCT,
  MemphisTN,
  JacksonCountyOR,
  LexingtonKy,
  PlainfieldIL,
  ManchesterCT,
  PalmBeachCountyFL,
  CedarRapidsIA,
  AlexandriaVA,
  PascoWA,
  RichlandWA,
  JerseyCityNJ,
  RinconValleyAZ,
  EastPierceWA,
  CapeCoralFL,
  NorthwestAZ,
  GolderRanchAZ,
  TheVillagesFL,
  MadisonWI,
  HallCountyGA,
  CoralGablesFL,
  OntarioCA,
  CasaGrandeAZ,
  PhoenixAZ,
  GoodyearAZ,
  LACountyCA,
  OrlandoFL,
  SaintLucieFL,
  SomertonCocopahAZ,
  UpperProvidencePA,
  OlatheKS,
  IonaMcGregorFL,
  AshevilleNC,
  LoudounVA,
  BrowardFL,
  AlbuquerqueNM,
  NewportNewsVA,
  SanLuisAZ,
  BeavercreekOH,
  SpokaneValleyWA,
  MilwaukeeWI,
  SeminoleCountyFL,
  SnoqualmieWA,
  LouisvilleKY,
  IndianapolisIN,
  SouthMetroCO,
  NorthPortFL,
  ArvadaCO,
  ChesapeakeVA,
  KansasCityMO,
  HarrisonburgVA,
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
const bothellWA = BothellWA();
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
const sacramentoCA = SacramentoMetroCA();
const washoeCountyNV = WashoeCountyNV();
const jacksonTownshipIN = JacksonTownshipIN();
const delawareOH = DelawareOH();
const anneArundelMD = AnneArundelMD();
const columbusOH = ColumbusOH();
const rosevilleCA = RosevilleCA();
const torringtonCT = TorringtonCT();
const memphisTN = MemphisTN();
const jacksonCountyOR = JacksonCountyOR();
const lexingtonKY = LexingtonKy();
const plainfieldIL = PlainfieldIL();
const manchesterCT = ManchesterCT();
const palmBeachCountyFL = PalmBeachCountyFL();
const cedarRapidsIA = CedarRapidsIA();
const alexandriaVA = AlexandriaVA();
const pascoWA = PascoWA();
const richlandWA = RichlandWA();
const jerseyCityNJ = JerseyCityNJ();
const rinconValleyAZ = RinconValleyAZ();
const eastPierceWA = EastPierceWA();
const capeCoralFL = CapeCoralFL();
const northwestAZ = NorthwestAZ();
const golderRanchAZ = GolderRanchAZ();
const theVillagesFL = TheVillagesFL();
const madisonWI = MadisonWI();
const hallCountyGA = HallCountyGA();
const coralGablesFL = CoralGablesFL();
const ontarioCA = OntarioCA();
const casaGrandeAZ = CasaGrandeAZ();
const phoenixAZ = PhoenixAZ();
const goodyearAZ = GoodyearAZ();
const laCountCA = LACountyCA();
const orlandoFL = OrlandoFL();
const saintLucieFL = SaintLucieFL();
const somertonCocopahAZ = SomertonCocopahAZ();
const upperProvidencePA = UpperProvidencePA();
const olatheKS = OlatheKS();
const ionaMcGregorFL = IonaMcGregorFL();
const ashevilleNC = AshevilleNC();
const loudounVA = LoudounVA();
const browardFL = BrowardFL();
const albuquerqueNM = AlbuquerqueNM();
const newportnewsVA = NewportNewsVA();
const sanluisAZ = SanLuisAZ();
const beavercreekOH = BeavercreekOH();
const spokaneValleyWA = SpokaneValleyWA();
const milwaukeeWI = MilwaukeeWI();
const seminoleCountyFL = SeminoleCountyFL();
const snoqualmieWA = SnoqualmieWA();
const louisvillleKY = LouisvilleKY();
const indianapolisIN = IndianapolisIN();
const southMetroCO = SouthMetroCO();
const northPortFL = NorthPortFL();
const arvadaCO = ArvadaCO();
const chesapeakeVA = ChesapeakeVA();
const kansasCityMO = KansasCityMO();
const harrisonburgVA = HarrisonburgVA();


describe('ShiftInformation', () => {
  it('should correctly parse shiftStart', () => {
    (richmond.shifts[0].shiftStartDate.hours()).should.equal(8);
  });

  it('should allow for different start times', () => {
    const sc = new ShiftConfiguration({ shiftStart: '0700' });
    sc.shifts[0].shiftStart.should.equal('0700');
  });

  it('should work for historic dates', () => {
    (richmond.reversePattern()).should.equal('bcbcbabcacacbcababaca');
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
    const onDate = '2016-10-18 08:00';
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
    FirecaresLookup['77571'].should.equal(BothellWA);
    FirecaresLookup['88539'].should.equal(MiamiDadeFL);
    FirecaresLookup['95671'].should.equal(SouthernPlatteMO);
    FirecaresLookup['90552'].should.equal(AdamsCountyCO);
    FirecaresLookup['81508'].should.equal(FishersIN);
    FirecaresLookup['77934'].should.equal(WestfieldIN);
    FirecaresLookup['77482'].should.equal(CiceroIN);
    FirecaresLookup['94967'].should.equal(SheridanIN);
    FirecaresLookup['76662'].should.equal(CarmelIN);
    FirecaresLookup['90227'].should.equal(NoblesvilleIN);
    FirecaresLookup['94043'].should.equal(SacramentoMetroCA);
    FirecaresLookup['97450'].should.equal(WashoeCountyNV);
    FirecaresLookup['85090'].should.equal(JacksonTownshipIN);
    FirecaresLookup['79555'].should.equal(DelawareOH);
    FirecaresLookup['73693'].should.equal(AnneArundelMD);
    FirecaresLookup['78503'].should.equal(ColumbusOH);
    FirecaresLookup['77855'].should.equal(RosevilleCA);
    FirecaresLookup['97104'].should.equal(TorringtonCT);
    FirecaresLookup['88403'].should.equal(MemphisTN);
    FirecaresLookup['85063'].should.equal(JacksonCountyOR);
    FirecaresLookup['86743'].should.equal(LexingtonKy);
    FirecaresLookup['92216'].should.equal(PlainfieldIL);
    FirecaresLookup['97175'].should.equal(ManchesterCT);
    FirecaresLookup['91407'].should.equal(PalmBeachCountyFL);
    FirecaresLookup['76927'].should.equal(CedarRapidsIA);
    FirecaresLookup['73375'].should.equal(AlexandriaVA);
    FirecaresLookup['91576'].should.equal(PascoWA);
    FirecaresLookup['93317'].should.equal(RichlandWA);
    FirecaresLookup['85300'].should.equal(JerseyCityNJ);
    FirecaresLookup['93429'].should.equal(RinconValleyAZ);
    FirecaresLookup['80336'].should.equal(EastPierceWA);
    FirecaresLookup['76590'].should.equal(CapeCoralFL);
    FirecaresLookup['90649'].should.equal(NorthwestAZ);
    FirecaresLookup['82670'].should.equal(GolderRanchAZ);
    FirecaresLookup['98151'].should.equal(TheVillagesFL);
    FirecaresLookup['87545'].should.equal(MadisonWI);
    FirecaresLookup['83412'].should.equal(HallCountyGA);
    FirecaresLookup['78725'].should.equal(CoralGablesFL);
    FirecaresLookup['91073'].should.equal(OntarioCA);
    FirecaresLookup['77594'].should.equal(CasaGrandeAZ);
    FirecaresLookup['87255'].should.equal(LACountyCA);
    FirecaresLookup['91165'].should.equal(OrlandoFL);
    FirecaresLookup['95377'].should.equal(SomertonCocopahAZ);
    FirecaresLookup['73930'].should.equal(AshevilleNC);
    FirecaresLookup['87281'].should.equal(LoudounVA);
    FirecaresLookup['75928'].should.equal(BrowardFL);
    FirecaresLookup['73343'].should.equal(AlbuquerqueNM);
    FirecaresLookup['90123'].should.equal(NewportNewsVA);
    FirecaresLookup['94279'].should.equal(SanLuisAZ);
    FirecaresLookup['74600'].should.equal(BeavercreekOH);
    FirecaresLookup['95805'].should.equal(SpokaneValleyWA);
    FirecaresLookup['88821'].should.equal(MilwaukeeWI);
    FirecaresLookup['94718'].should.equal(SeminoleCountyFL);
    FirecaresLookup['77883'].should.equal(SnoqualmieWA);
    FirecaresLookup['87291'].should.equal(LouisvilleKY);
    FirecaresLookup['84888'].should.equal(IndianapolisIN);
    FirecaresLookup['95528'].should.equal(SouthMetroCO);
    FirecaresLookup['90490'].should.equal(NorthPortFL);
    FirecaresLookup['73905'].should.equal(ArvadaCO);
    FirecaresLookup['77326'].should.equal(ChesapeakeVA);
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

describe('Broward, FL', () => {
  it('should match known Broward shifts', () => {
    const tests = [
      ['2014-03-24T07:04:28-0400', 'A', false],
    ];

    tests.forEach((test) => {
      (browardFL.calculateShift(test[0])).should.equal(test[1]);
    });
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
  it('selects correct shift config for new shift', () => {
    const { pattern } = tucson.determineShiftPattern('2021-03-31T08:10:30-0700');
    pattern.should.equal('AC');

    const testPattern = tucson
      .determineShiftPattern('2021-04-09T08:10:30-0700')
      .pattern;

    testPattern.should.equal('BABCBCACA');
  });

  it('should match Tucson, AZ known shifts', () => {
    const tests = [
      ['2017-12-01T05:10:30-0700', 'C', true],
      ['2017-12-01T08:10:30-0700', 'B', false],
      ['2017-12-02T08:10:30-0700', 'C', false],
      ['2017-12-19T08:10:30-0700', 'A', false],
      ['2017-12-22T08:10:30-0700', 'B', false],

      // new shift schedule starting 3/31
      ['2021-03-29T08:10:30-0700', 'C', false],
      ['2021-03-30T08:10:30-0700', 'B', false],

      // A shift works 0800 to 2000 (AM shift)and C shift works 2000 to 0800 (PM shift).
      ['2021-03-31T08:10:30-0700', 'A', false],
      ['2021-03-31T11:59:00-0700', 'A', false],
      ['2021-03-31T20:01:00-0700', 'C', false],
      ['2021-03-31T20:10:30-0700', 'C', false],

      ['2021-04-01T08:10:30-0700', 'B', false],
      ['2021-04-02T08:10:30-0700', 'A', false],
      ['2021-04-03T08:10:30-0700', 'C', false],
      ['2021-04-04T08:10:30-0700', 'A', false],
      ['2021-04-05T08:10:30-0700', 'C', false],
      ['2021-04-07T08:10:30-0700', 'C', false],

      ['2021-04-29T08:10:30-0700', 'C', false],
      ['2021-11-26T20:10:30-0700', 'C', false],
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

describe('Bothell, WA', () => {
  it('should match Bothell, WA known shifts', () => {
    const tests = [
      ['2022-04-16T07:10:00-0700', 'C', true],
      ['2022-04-16T08:30:00-0700', 'D', false],
      ['2022-04-17T08:30:00-0700', 'A', false],
      ['2022-04-18T08:30:00-0700', 'B', false],
      ['2022-04-19T08:30:00-0700', 'A', false],
      ['2022-04-20T08:30:00-0700', 'B', false],
      ['2022-04-21T08:30:00-0700', 'C', false],
    ];
    tests.forEach((test) => {
      (bothellWA.calculateShift(test[0])).should.equal(test[1]);
      (bothellWA.beforeShiftChange(bothellWA.normalize(test[0]))).should.equal(test[2]);
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
        southernPlatteMO.normalize(test[0]),
      )).should.equal(test[2]);
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

describe('Washoe County, NV', () => {
  it('should match Washoe County, NV known shifts', () => {
    const tests = [
      ['2019-01-01T08:40:00-0800', 'C', false],
      ['2019-01-02T08:40:00-0800', 'A', false],
      ['2019-01-02T07:40:00-0800', 'C', true],
      ['2019-01-28T08:40:00-0800', 'B', false],
    ];
    tests.forEach((test) => {
      (washoeCountyNV.calculateShift(test[0])).should.equal(test[1]);
      (washoeCountyNV.beforeShiftChange(washoeCountyNV.normalize(test[0]))).should.equal(test[2]);
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
      ['2019-01-02T05:10:30-0500', 'A', true],
    ];
    tests.forEach((test) => {
      (jacksonTownshipIN.calculateShift(test[0])).should.equal(test[1]);
      (jacksonTownshipIN.beforeShiftChange(
        jacksonTownshipIN.normalize(test[0]),
      )).should.equal(test[2]);
    });
  });
});

describe('Delaware, OH', () => {
  it('should match Delaware, OH known shifts', () => {
    const tests = [
      ['2019-03-21T08:10:30-0400', 'A', false],
      ['2019-03-22T08:10:30-0400', 'B', false],
      ['2019-03-23T08:10:30-0400', 'C', false],
      ['2019-03-24T08:10:30-0400', 'A', false],
      ['2019-03-25T08:10:30-0400', 'B', false],
      ['2019-03-26T08:10:30-0400', 'C', false],
      ['2019-03-22T07:10:30-0400', 'A', true],
      ['2020-02-29T10:10:30-0500', 'C', false],
      ['2020-02-29T18:10:30-0500', 'B', false],
      ['2020-03-01T04:10:30-0500', 'A', true],
      ['2020-03-01T10:10:30-0500', 'A', false],
      ['2020-08-05T10:10:30-0500', 'B', false],
      ['2020-08-19T10:10:30-0500', 'A', false],
    ];
    tests.forEach((test) => {
      (delawareOH.calculateShift(test[0])).should.equal(test[1]);
      (delawareOH.beforeShiftChange(
        delawareOH.normalize(test[0]),
      )).should.equal(test[2]);
    });
  });
});

describe('Anne Arundel, MD', () => {
  it('should match Anne Arundel, MD known shifts', () => {
    const tests = [
      ['2019-04-03T07:10:30-0400', 'D', false],
      ['2019-04-08T07:10:30-0400', 'A', false],
      ['2019-04-17T07:10:30-0400', 'B', false],
      ['2019-04-22T07:10:30-0400', 'C', false],
      ['2019-05-02T07:10:30-0400', 'A', false],
      ['2019-05-21T07:10:30-0400', 'D', false],
      ['2019-05-21T06:10:30-0400', 'C', true],
    ];
    tests.forEach((test) => {
      (anneArundelMD.calculateShift(test[0])).should.equal(test[1]);
      (anneArundelMD.beforeShiftChange(
        anneArundelMD.normalize(test[0]),
      )).should.equal(test[2]);
    });
  });
});

describe('Columbus, OH', () => {
  it('should match Columbus, OH known shifts', () => {
    const tests = [
      ['2019-05-02T08:10:30-0400', '1', false],
      ['2019-05-21T08:10:30-0400', '2', false],
      ['2019-05-21T07:10:30-0400', '1', true],
      ['2020-03-02T10:10:30-0400', '2', false],
    ];
    tests.forEach((test) => {
      (columbusOH.calculateShift(test[0])).should.equal(test[1]);
      (columbusOH.beforeShiftChange(
        columbusOH.normalize(test[0]),
      )).should.equal(test[2]);
    });
  });
});

describe('Roseville, CA', () => {
  it('should match Roseville, CA known shifts', () => {
    const tests = [
      ['2019-04-03T08:10:30-0700', 'B', false],
      ['2019-04-08T08:10:30-0700', 'B', false],
      ['2019-04-17T08:10:30-0700', 'C', false],
      ['2019-04-22T08:10:30-0700', 'C', false],
      ['2019-05-02T08:10:30-0700', 'B', false],
      ['2019-05-19T08:10:30-0700', 'A', false],
      ['2019-05-19T06:10:30-0700', 'A', true],
    ];
    tests.forEach((test) => {
      (rosevilleCA.calculateShift(test[0])).should.equal(test[1]);
      (rosevilleCA.beforeShiftChange(
        rosevilleCA.normalize(test[0]),
      )).should.equal(test[2]);
    });
  });
});

describe('Torrington, CT', () => {
  it('should match Torrington, CT known shifts', () => {
    const tests = [
      ['2019-06-25T08:10:30-0400', '1', false],
      ['2019-06-26T08:10:30-0400', '2', false],
      ['2019-06-27T08:10:30-0400', '3', false],
      ['2019-06-28T08:10:30-0400', '4', false],
      ['2019-06-30T08:10:30-0400', '2', false],
      ['2019-07-05T08:10:30-0400', '3', false],
      ['2019-07-10T08:10:30-0400', '4', false],
      ['2019-10-07T08:10:30-0400', '1', false],
      ['2019-11-11T08:10:30-0500', '4', false],
      ['2019-06-25T06:10:30-0400', '4', true],
    ];
    tests.forEach((test) => {
      (torringtonCT.calculateShift(test[0])).should.equal(test[1]);
      (torringtonCT.beforeShiftChange(
        torringtonCT.normalize(test[0]),
      )).should.equal(test[2]);
    });
  });
});

describe('Memphis, TN', () => {
  it('should match Memphis, TN known shifts', () => {
    const tests = [
      ['2019-07-01T08:10:30-0500', 'B', false],
      ['2019-07-02T08:10:30-0500', 'A', false],
      ['2019-07-03T08:10:30-0500', 'B', false],
      ['2019-07-04T06:10:30-0500', 'B', true],
      ['2019-07-04T09:10:30-0500', 'C', false],
    ];
    tests.forEach((test) => {
      (memphisTN.calculateShift(test[0])).should.equal(test[1]);
      (memphisTN.beforeShiftChange(
        memphisTN.normalize(test[0]),
      )).should.equal(test[2]);
    });
  });
});

describe('Jackson County, OR', () => {
  it('should match Jackson County, OR known shifts', () => {
    const tests = [
      ['2019-07-01T08:10:30-0700', 'B', false],
      ['2019-07-02T08:10:30-0700', 'B', false],
      ['2019-07-03T08:10:30-0700', 'C', false],
      ['2019-07-05T06:10:30-0700', 'C', true],
      ['2019-07-06T09:10:30-0700', 'A', false],
    ];
    tests.forEach((test) => {
      (jacksonCountyOR.calculateShift(test[0])).should.equal(test[1]);
      (jacksonCountyOR.beforeShiftChange(
        jacksonCountyOR.normalize(test[0]),
      )).should.equal(test[2]);
    });
  });
});

describe('Lexington, KY', () => {
  it('should match Lexington, KY known shifts', () => {
    const tests = [
      ['2019-07-01T08:10:30-0400', '2', false],
      ['2019-07-02T08:10:30-0400', '3', false],
      ['2019-07-03T08:10:30-0400', '1', false],
      ['2019-07-05T06:10:30-0400', '2', true],
      ['2019-07-06T09:10:30-0400', '1', false],
    ];
    tests.forEach((test) => {
      (lexingtonKY.calculateShift(test[0])).should.equal(test[1]);
      (lexingtonKY.beforeShiftChange(
        lexingtonKY.normalize(test[0]),
      )).should.equal(test[2]);
    });
  });
});

describe('Plainfield, IL', () => {
  it('should match Plainfield, IL known shifts', () => {
    const tests = [
      ['2019-07-01T07:10:30-0500', 'G', false],
      ['2019-07-02T07:10:30-0500', 'B', false],
      ['2019-07-03T07:10:30-0500', 'R', false],
      ['2019-07-05T06:10:30-0500', 'G', true],
      ['2019-07-06T08:10:30-0500', 'R', false],
    ];
    tests.forEach((test) => {
      (plainfieldIL.calculateShift(test[0])).should.equal(test[1]);
      (plainfieldIL.beforeShiftChange(
        plainfieldIL.normalize(test[0]),
      )).should.equal(test[2]);
    });
  });
});

describe('Manchester, CT', () => {
  it('should match Manchester, CT known shifts', () => {
    const tests = [
      ['2019-07-01T08:10:30-0400', '4', false],
      ['2019-07-02T08:10:30-0400', '2', false],
      ['2019-07-03T08:10:30-0400', '1', false],
      ['2019-07-05T07:10:30-0400', '3', true],
      ['2019-07-06T09:10:30-0400', '4', false],
    ];
    tests.forEach((test) => {
      (manchesterCT.calculateShift(test[0])).should.equal(test[1]);
      (manchesterCT.beforeShiftChange(
        manchesterCT.normalize(test[0]),
      )).should.equal(test[2]);
    });
  });
});

describe('Palm Beach County, FL', () => {
  it('should match Palm Beach County, FL known shifts', () => {
    const tests = [
      ['2019-12-01T08:10:30-0500', 'C', false],
      ['2019-12-02T08:10:30-0500', 'A', false],
      ['2019-12-03T08:10:30-0500', 'B', false],
      ['2019-12-05T07:10:30-0500', 'C', true],
      ['2019-12-06T09:10:30-0500', 'B', false],
    ];
    tests.forEach((test) => {
      (palmBeachCountyFL.calculateShift(test[0])).should.equal(test[1]);
      (palmBeachCountyFL.beforeShiftChange(
        palmBeachCountyFL.normalize(test[0]),
      )).should.equal(test[2]);
    });
  });
});

describe('Cedar Rapids, IA', () => {
  it('should match Cedar Rapids known shifts', () => {
    const tests = [
      ['2020-01-01T10:10:30-0500', 'A', false],
      ['2020-01-02T10:10:30-0500', 'B', false],
      ['2020-01-03T10:10:30-0500', 'C', false],
      ['2020-05-06T10:10:30-0500', 'A', false],
      ['2020-05-07T10:10:30-0500', 'B', false],
      ['2020-05-08T10:10:30-0500', 'C', false],
    ];
    tests.forEach((test) => {
      (cedarRapidsIA.calculateShift(test[0])).should.equal(test[1]);
      (cedarRapidsIA.beforeShiftChange(
        cedarRapidsIA.normalize(test[0]),
      )).should.equal(test[2]);
    });
  });
});

describe('Alexandria, VA', () => {
  it('should match Alexandria, VA known shifts', () => {
    const tests = [
      ['2020-01-01T07:10:30-0500', 'A', false],
      ['2020-01-02T07:10:30-0500', 'B', false],
      ['2020-01-03T07:10:30-0500', 'C', false],
      ['2020-01-05T06:10:30-0500', 'B', true],
      ['2020-01-06T08:10:30-0500', 'A', false],
    ];
    tests.forEach((test) => {
      (alexandriaVA.calculateShift(test[0])).should.equal(test[1]);
      (alexandriaVA.beforeShiftChange(
        alexandriaVA.normalize(test[0]),
      )).should.equal(test[2]);
    });
  });
});

describe('Pasco, WA', () => {
  it('should match Pasco, WA known shifts', () => {
    const tests = [
      ['2020-01-01T08:10:30-0800', 'A', false],
      ['2020-01-02T08:10:30-0800', 'B', false],
      ['2020-01-03T08:10:30-0800', 'B', false],
      ['2020-01-05T07:10:30-0800', 'C', true],
      ['2020-01-06T09:10:30-0800', 'A', false],
    ];
    tests.forEach((test) => {
      (pascoWA.calculateShift(test[0])).should.equal(test[1]);
      (pascoWA.beforeShiftChange(
        pascoWA.normalize(test[0]),
      )).should.equal(test[2]);
    });
  });
});

describe('Richland, WA', () => {
  it('should match Richland, WA known shifts', () => {
    const tests = [
      ['2020-01-01T08:10:30-0800', 'A', false],
      ['2020-01-02T08:10:30-0800', 'B', false],
      ['2020-01-03T08:10:30-0800', 'B', false],
      ['2020-01-05T07:10:30-0800', 'C', true],
      ['2020-01-06T09:10:30-0800', 'A', false],
    ];
    tests.forEach((test) => {
      (richlandWA.calculateShift(test[0])).should.equal(test[1]);
      (richlandWA.beforeShiftChange(
        richlandWA.normalize(test[0]),
      )).should.equal(test[2]);
    });
  });
});

describe('Jersey City, NJ', () => {
  it('should match Jersey City, NJ known shifts', () => {
    const tests = [
      ['2020-01-01T08:10:30-0500', 'B', false],
      ['2020-01-02T08:10:30-0500', 'C', false],
      ['2020-01-03T08:10:30-0500', 'D', false],
      ['2020-01-05T07:10:30-0500', 'A', true],
      ['2020-01-06T09:10:30-0500', 'C', false],
    ];
    tests.forEach((test) => {
      (jerseyCityNJ.calculateShift(test[0])).should.equal(test[1]);
      (jerseyCityNJ.beforeShiftChange(
        jerseyCityNJ.normalize(test[0]),
      )).should.equal(test[2]);
    });
  });
});

describe('Rincon Valley, AZ', () => {
  it('should match Rincon Valley, AZ known shifts', () => {
    const tests = [
      ['2017-12-01T06:10:30-0700', 'C', true],
      ['2017-12-01T07:10:30-0700', 'B', false],
      ['2017-12-02T07:10:30-0700', 'C', false],
      ['2017-12-19T07:10:30-0700', 'A', false],
      ['2017-12-22T07:10:30-0700', 'B', false],
      ['2023-07-10T10:10:30-0700', 'A', false],
      ['2023-07-11T07:10:30-0700', 'B', false],
      ['2023-07-12T07:10:30-0700', 'B', false],
      ['2023-07-14T07:10:30-0700', 'C', false],
      ['2023-07-14T06:10:30-0700', 'C', true],
    ];

    tests.forEach((test) => {
      (rinconValleyAZ.calculateShift(test[0])).should.equal(test[1]);
      (rinconValleyAZ.beforeShiftChange(rinconValleyAZ.normalize(test[0]))).should.equal(test[2]);
    });
  });
});

describe('East Pierce, WA', () => {
  it('should match East Pierce, WA known shifts', () => {
    const tests = [
      ['2020-01-01T08:10:30-0800', 'C', false],
      ['2020-01-02T08:10:30-0800', 'A', false],
      ['2020-01-03T08:10:30-0800', 'C', false],
      ['2020-01-05T07:10:30-0800', 'A', true],
      ['2020-01-06T09:10:30-0800', 'A', false],
    ];
    tests.forEach((test) => {
      (eastPierceWA.calculateShift(test[0])).should.equal(test[1]);
      (eastPierceWA.beforeShiftChange(
        eastPierceWA.normalize(test[0]),
      )).should.equal(test[2]);
    });
  });
});

describe('Cape Coral, FL', () => {
  it('should match Cape Coral, FL known shifts', () => {
    const tests = [
      ['2020-01-01T08:10:30-0500', 'B', false],
      ['2020-02-29T08:10:30-0500', 'A', false],
      ['2020-03-01T08:10:30-0500', 'B', false],
      ['2020-02-29T07:10:30-0500', 'C', true],
    ];
    tests.forEach((test) => {
      (capeCoralFL.calculateShift(test[0])).should.equal(test[1]);
      (capeCoralFL.beforeShiftChange(
        capeCoralFL.normalize(test[0]),
      )).should.equal(test[2]);
    });
  });
});

describe('Northwest, AZ', () => {
  it('should match Northwest, AZ known shifts', () => {
    const tests = [
      ['2020-01-01T08:10:30-0700', 'C', false],
      ['2020-01-02T08:10:30-0700', 'A', false],
      ['2020-01-03T08:10:30-0700', 'C', false],
      ['2020-01-05T07:10:30-0700', 'A', true],
      ['2020-01-06T09:10:30-0700', 'A', false],
    ];
    tests.forEach((test) => {
      (northwestAZ.calculateShift(test[0])).should.equal(test[1]);
      (northwestAZ.beforeShiftChange(
        northwestAZ.normalize(test[0]),
      )).should.equal(test[2]);
    });
  });
});

describe('Golder Ranch, AZ', () => {
  it('should match Golder Ranch, AZ known shifts', () => {
    const tests = [
      ['2020-04-01T08:10:30-0700', 'A', false],
      ['2020-04-02T08:10:30-0700', 'C', false],
      ['2020-04-03T08:10:30-0700', 'A', false],
      ['2020-04-05T07:10:30-0700', 'B', true],
      ['2020-04-06T09:10:30-0700', 'B', false],
    ];

    tests.forEach((test) => {
      (golderRanchAZ.calculateShift(test[0])).should.equal(test[1]);
      (golderRanchAZ.beforeShiftChange(golderRanchAZ.normalize(test[0]))).should.equal(test[2]);
    });
  });
});

describe('The Villages, FL', () => {
  it('should match The Villages, FL known shifts', () => {
    const tests = [
      ['2020-05-01T08:10:30-0400', 'A', false],
      ['2020-05-02T08:10:30-0400', 'B', false],
      ['2020-05-03T08:10:30-0400', 'C', false],
      ['2020-05-05T07:10:30-0400', 'A', true],
      ['2020-05-06T09:10:30-0400', 'C', false],
    ];

    tests.forEach((test) => {
      (theVillagesFL.calculateShift(test[0])).should.equal(test[1]);
      (theVillagesFL.beforeShiftChange(theVillagesFL.normalize(test[0]))).should.equal(test[2]);
    });
  });
});

describe('Madison, WI', () => {
  it('should match Madison, WI known shifts', () => {
    const tests = [
      ['2020-01-05T07:10:30-0600', 'A', false],
      ['2020-01-06T07:10:30-0600', 'B', false],
      ['2020-01-07T07:10:30-0600', 'A', false],
      ['2020-01-09T06:10:30-0600', 'B', true],
      ['2020-01-10T07:10:30-0600', 'B', false],
    ];

    tests.forEach((test) => {
      (madisonWI.calculateShift(test[0])).should.equal(test[1]);
      (madisonWI.beforeShiftChange(madisonWI.normalize(test[0]))).should.equal(test[2]);
    });
  });
});

describe('Hall County, GA', () => {
  it('should match Hall County, GA known shifts', () => {
    const tests = [
      ['2020-06-01T08:10:30-0400', 'A', false],
      ['2020-06-02T08:10:30-0400', 'B', false],
      ['2020-06-03T08:10:30-0400', 'C', false],
      ['2020-06-05T07:10:30-0400', 'A', true],
      ['2020-06-06T09:10:30-0400', 'C', false],
    ];

    tests.forEach((test) => {
      (hallCountyGA.calculateShift(test[0])).should.equal(test[1]);
      (hallCountyGA.beforeShiftChange(hallCountyGA.normalize(test[0]))).should.equal(test[2]);
    });
  });
});

describe('Coral Gables, FL', () => {
  it('should match Coral Gables, FL known shifts', () => {
    const tests = [
      ['2020-06-11T07:10:30-0400', 'A', false],
      ['2020-06-12T07:10:30-0400', 'B', false],
      ['2020-06-13T07:10:30-0400', 'C', false],
      ['2020-06-15T06:10:30-0400', 'A', true],
      ['2020-06-16T08:10:30-0400', 'C', false],
    ];

    tests.forEach((test) => {
      (coralGablesFL.calculateShift(test[0])).should.equal(test[1]);
      (coralGablesFL.beforeShiftChange(coralGablesFL.normalize(test[0]))).should.equal(test[2]);
    });
  });
});

describe('Ontario, CA', () => {
  it('should match Ontario, CA known shifts', () => {
    const tests = [
      ['2020-01-01T07:10:30-0800', 'C', false],
      ['2020-01-02T07:10:30-0800', 'A', false],
      ['2020-01-03T07:10:30-0800', 'B', false],
      ['2020-01-05T06:10:30-0800', 'A', true],
      ['2020-01-06T08:10:30-0800', 'A', false],
      ['2020-06-01T07:10:30-0700', 'B', false],
      ['2020-06-02T07:10:30-0700', 'C', false],
      ['2020-06-03T07:10:30-0700', 'A', false],
      ['2020-06-05T06:10:30-0700', 'C', true],
      ['2020-06-06T08:10:30-0700', 'C', false],
    ];

    tests.forEach((test) => {
      (ontarioCA.calculateShift(test[0])).should.equal(test[1]);
      (ontarioCA.beforeShiftChange(ontarioCA.normalize(test[0]))).should.equal(test[2]);
    });
  });
});

describe('Casa Grande, AZ', () => {
  it('should match Casa Grande, AZ known shifts', () => {
    const tests = [
      ['2020-07-30T12:00:00-0800', 'C', false],
      ['2020-07-31T12:00:00-0800', 'A', false],
      ['2020-08-01T00:10:00-0800', 'A', true],
      ['2020-08-02T12:10:00-0700', 'B', false],
      ['2020-08-03T00:10:00-0700', 'B', true],
      ['2020-08-04T12:10:00-0700', 'C', false],
      ['2020-08-05T12:10:00-0700', 'C', false],
      ['2020-08-06T12:10:00-0700', 'A', false],
      ['2020-08-07T12:10:00-0700', 'A', false],
      ['2020-08-08T12:10:00-0700', 'B', false],
      ['2020-08-09T12:10:00-0700', 'B', false],
      ['2020-08-10T12:10:00-0700', 'C', false],
      ['2020-08-11T12:10:00-0700', 'C', false],
      ['2020-08-12T12:10:00-0700', 'A', false],
    ];

    tests.forEach((test) => {
      (casaGrandeAZ.calculateShift(test[0])).should.equal(test[1]);
      (casaGrandeAZ.beforeShiftChange(casaGrandeAZ.normalize(test[0]))).should.equal(test[2]);
    });
  });
});

describe('Phoenix, AZ', () => {
  it('should match Phoenix, AZ known shifts', () => {
    const tests = [
      ['2020-02-08T12:00:00-0800', 'B', false],
      ['2020-02-09T12:00:00-0800', 'C', false],
      ['2020-02-10T00:10:00-0800', 'C', true],
      ['2020-02-11T12:10:00-0700', 'B', false],
      ['2020-02-12T00:10:00-0700', 'B', true],
      ['2020-02-13T12:10:00-0700', 'A', false],
      ['2020-02-14T12:10:00-0700', 'B', false],
      ['2020-02-15T12:10:00-0700', 'C', false],
      ['2020-02-16T12:10:00-0700', 'A', false],
    ];

    tests.forEach((test) => {
      (phoenixAZ.calculateShift(test[0])).should.equal(test[1]);
      (phoenixAZ.beforeShiftChange(phoenixAZ.normalize(test[0]))).should.equal(test[2]);
    });
  });
});

describe('Goodyear, AZ', () => {
  it('should match Goodyear, AZ known shifts', () => {
    const tests = [
      ['2020-10-14T04:00:00-0700', 'A', true],
      ['2020-10-13T07:00:00-0700', 'B', false],
      ['2020-10-15T08:00:00-0700', 'C', false],
      ['2020-10-17T06:00:00-0700', 'C', true],
    ];

    tests.forEach((test) => {
      (goodyearAZ.calculateShift(test[0])).should.equal(test[1]);
      (goodyearAZ.beforeShiftChange(goodyearAZ.normalize(test[0]))).should.equal(test[2]);
    });
  });
});

describe('LA County, CA', () => {
  it('should match LA County, CA known shifts', () => {
    const tests = [
      ['2020-01-23T08:10:30-0800', 'B', false],
      ['2020-01-24T08:10:30-0800', 'A', false],
      ['2020-01-25T08:10:30-0800', 'B', false],
      ['2020-01-26T08:10:30-0800', 'C', false],
      ['2020-01-27T09:10:30-0800', 'A', false],
      ['2020-01-28T09:10:30-0800', 'C', false],
      ['2020-01-29T09:10:30-0800', 'A', false],
      ['2020-01-30T09:10:30-0800', 'B', false],
      ['2020-01-31T09:10:30-0800', 'C', false],
      ['2020-02-01T09:10:30-0800', 'B', false],
      ['2020-02-02T09:10:30-0800', 'C', false],
      ['2020-02-03T09:10:30-0800', 'A', false],
      ['2020-02-04T08:10:30-0800', 'B', false],
      ['2020-02-05T08:10:30-0800', 'A', false],
      ['2020-02-06T08:10:30-0800', 'B', false],
      ['2020-02-07T08:10:30-0800', 'C', false],
      ['2020-02-08T09:10:30-0800', 'A', false],
      ['2020-02-09T09:10:30-0800', 'C', false],
      ['2020-02-10T09:10:30-0800', 'A', false],
      ['2020-02-11T09:10:30-0800', 'B', false],
      ['2020-02-12T09:10:30-0800', 'C', false],
      ['2020-02-13T09:10:30-0800', 'B', false],
      ['2020-02-14T09:10:30-0800', 'C', false],
      ['2020-02-15T10:10:30-0800', 'A', false],
      ['2020-02-17T07:10:30-0800', 'B', true],
    ];

    tests.forEach((test) => {
      (laCountCA.calculateShift(test[0])).should.equal(test[1]);
      (laCountCA.beforeShiftChange(laCountCA.normalize(test[0]))).should.equal(test[2]);
    });
  });
});

describe('Saint Lucie, FL', () => {
  it('should match Saint Lucie, FL known shifts', () => {
    const tests = [
      ['2016-10-18T08:10:00-0500', 'A', false],
      ['2016-10-19T08:10:00-0500', 'B', false],
      ['2016-10-20T08:10:00-0500', 'C', false],
      ['2016-10-21T08:10:00-0500', 'A', false],
      ['2016-10-22T08:10:00-0500', 'B', false],
      ['2016-10-23T08:10:00-0500', 'C', false],
      ['2016-10-24T08:10:00-0500', 'A', false],
      ['2016-10-25T05:10:00-0500', 'A', true],
    ];
    tests.forEach((test) => {
      (saintLucieFL.calculateShift(test[0])).should.equal(test[1]);
      (saintLucieFL.beforeShiftChange(saintLucieFL.normalize(test[0]))).should.equal(test[2]);
    });
  });
});

describe('Somerton Cocopah, AZ', () => {
  it('should match Somerton Cocopah, AZ known shifts', () => {
    const tests = [
      ['2020-01-05T08:10:00-0700', 'A', false],
      ['2020-01-06T08:10:00-0700', 'B', false],
      ['2020-01-08T07:10:00-0700', 'A', true],
      ['2020-01-09T08:10:00-0700', 'C', false],
    ];
    tests.forEach((test) => {
      (somertonCocopahAZ.calculateShift(test[0])).should.equal(test[1]);
      (somertonCocopahAZ.beforeShiftChange(somertonCocopahAZ
        .normalize(test[0]))).should.equal(test[2]);
    });
  });
});

describe('Upper Providence, PA', () => {
  it('should match Upper Providence, PA known shifts', () => {
    const tests = [
      ['2020-09-28T06:10:00-0400', 'AE', false],
      ['2020-10-27T06:10:00-0400', 'ACD', false],
      ['2020-10-08T05:10:00-0400', 'ABE', true],
      ['2020-09-27T06:10:00-0400', 'B', false],
    ];
    tests.forEach((test) => {
      (upperProvidencePA.calculateShift(test[0])).should.equal(test[1]);
      (upperProvidencePA.beforeShiftChange(upperProvidencePA
        .normalize(test[0]))).should.equal(test[2]);
    });
  });
});

describe('Olathe, KS', () => {
  it('should match Olathe, KS known shifts', () => {
    const tests = [
      ['2020-01-01T09:10:00-0500', 'C', false],
      ['2020-01-02T09:10:00-0500', 'B', false],
      ['2020-01-03T09:10:00-0500', 'C', false],
      ['2020-01-04T09:10:00-0500', 'B', false],
      ['2020-01-04T07:10:00-0500', 'C', true],
      ['2020-01-05T09:10:00-0500', 'A', false],
    ];
    tests.forEach((test) => {
      (olatheKS.calculateShift(test[0])).should.equal(test[1]);
      (olatheKS.beforeShiftChange(olatheKS
        .normalize(test[0]))).should.equal(test[2]);
    });
  });
});

describe('Iona McGregor, FL', () => {
  it('should match Iona McGregor, FL known shifts', () => {
    const tests = [
      // ['2020-11-20T09:10:00-0500', 'A', false],
      // ['2020-11-21T09:10:00-0500', 'B', false],
      // ['2020-11-22T09:10:00-0500', 'C', false],
      // ['2020-11-23T09:10:00-0500', 'A', false],
      // ['2020-11-24T09:10:00-0500', 'B', false],
      ['2021-05-21T09:10:00-0500', 'A', false],
      ['2021-05-22T09:10:00-0500', 'B', false],
      ['2021-05-23T09:10:00-0500', 'C', false],
    ];
    tests.forEach((test) => {
      (ionaMcGregorFL.calculateShift(test[0])).should.equal(test[1]);
      (ionaMcGregorFL.beforeShiftChange(ionaMcGregorFL
        .normalize(test[0]))).should.equal(test[2]);
    });
  });
});

describe('Asheville, NC', () => {
  it('should match Asheville, NC known shifts', () => {
    const tests = [
      ['2020-01-01T09:10:00-0500', 'C', false],
      ['2020-01-02T09:10:00-0500', 'A', false],
      ['2020-01-03T09:10:00-0500', 'B', false],
      ['2020-01-04T09:10:00-0500', 'A', false],
      ['2020-01-05T09:10:00-0500', 'B', false],
      ['2020-01-05T06:10:00-0500', 'A', true],
      ['2021-01-08T09:10:00-0500', 'A', false],
      ['2021-08-13T09:10:00-0500', 'B', false],
      ['2021-08-12T09:10:00-0500', 'A', false],
    ];
    tests.forEach((test) => {
      (ashevilleNC.calculateShift(test[0])).should.equal(test[1]);
      (ashevilleNC.beforeShiftChange(ashevilleNC
        .normalize(test[0]))).should.equal(test[2]);
    });
  });
});

describe('Loudoun, VA', () => {
  it('should match Loudoun, VA known shifts', () => {
    const tests = [
      ['2021-01-04T12:00:00-0500', 'A', false],
      ['2021-01-05T12:00:00-0600', 'B', false],
      ['2021-01-06T00:10:00-0800', 'B', true],
      ['2021-01-07T12:10:00-0700', 'A', false],
      ['2021-01-08T00:10:00-0700', 'A', true],
      ['2021-01-09T12:10:00-0700', 'C', false],
      ['2021-01-10T12:10:00-0700', 'A', false],
      ['2021-01-11T12:10:00-0700', 'B', false],
      ['2021-01-12T12:10:00-0700', 'C', false],
    ];

    tests.forEach((test) => {
      (loudounVA.calculateShift(test[0])).should.equal(test[1]);
      (loudounVA.beforeShiftChange(loudounVA.normalize(test[0]))).should.equal(test[2]);
    });
  });
});

describe('Orlando, FL', () => {
  it('should match Orlando, FL known shifts', () => {
    const tests = [
      ['2019-10-01T12:00:00-0500', 'C', false],
      ['2019-11-28T12:00:00-0500', 'A', false],
      ['2020-02-27T12:00:00-0500', 'B', false],
      ['2020-02-28T12:00:00-0500', 'C', false],
      ['2020-02-29T12:00:00-0500', 'A', false],
      ['2021-03-04T12:00:00-0500', 'A', false],
      ['2021-03-05T12:00:00-0500', 'B', false],
    ];

    tests.forEach((test) => {
      (orlandoFL.calculateShift(test[0])).should.equal(test[1]);
      (orlandoFL.beforeShiftChange(orlandoFL.normalize(test[0]))).should.equal(test[2]);
    });
  });
});

describe('Albuquerque, NM', () => {
  it('should match Albuquerque, NM known shifts', () => {
    const tests = [
      ['2021-03-17T12:00:00-0700', 'C', false],
      ['2021-03-18T12:00:00-0700', 'C', false],
      ['2021-03-19T12:00:00-0700', 'B', false],
      ['2021-03-20T12:00:00-0700', 'B', false],
      ['2021-03-21T12:00:00-0700', 'A', false],
      ['2021-03-22T12:00:00-0700', 'A', false],
      ['2021-03-19T00:00:00-0700', 'C', true],
      ['2021-03-21T00:00:00-0700', 'B', true],
    ];

    tests.forEach((test) => {
      (albuquerqueNM.calculateShift(test[0])).should.equal(test[1]);
      (albuquerqueNM.beforeShiftChange(albuquerqueNM.normalize(test[0]))).should.equal(test[2]);
    });
  });
});

describe('Newport News, VA', () => {
  it('should match Newport News, VA known shifts', () => {
    const tests = [
      ['2021-01-01T12:00:00-0400', 'A', false],
      ['2021-01-02T12:00:00-0400', 'B', false],
      ['2021-01-03T12:00:00-0400', 'A', false],
      ['2021-01-04T12:00:00-0400', 'B', false],
      ['2021-01-05T12:00:00-0400', 'C', false],
      ['2021-01-06T12:00:00-0400', 'B', false],
      ['2021-01-07T12:00:00-0400', 'C', false],
      ['2021-01-08T12:00:00-0400', 'A', false],
      ['2021-01-09T12:00:00-0400', 'C', false],
      ['2021-01-10T12:00:00-0400', 'A', false],
      ['2021-01-11T12:00:00-0400', 'B', false],
      ['2021-01-12T12:00:00-0400', 'A', false],
      ['2021-01-13T12:00:00-0400', 'B', false],
      ['2021-01-14T12:00:00-0400', 'C', false],
      ['2021-01-15T12:00:00-0400', 'B', false],
      ['2021-01-16T12:00:00-0400', 'C', false],
      ['2021-01-17T12:00:00-0400', 'A', false],
      ['2021-01-18T12:00:00-0400', 'C', false],
      ['2021-01-19T12:00:00-0400', 'A', false],
      ['2021-01-20T12:00:00-0400', 'B', false],
      ['2021-01-21T12:00:00-0400', 'A', false],
      ['2021-01-22T12:00:00-0400', 'B', false],
      ['2021-01-19T01:00:00-0400', 'C', true],
      ['2021-01-20T01:00:00-0400', 'A', true],
    ];

    tests.forEach((test) => {
      (newportnewsVA.calculateShift(test[0])).should.equal(test[1]);
      (newportnewsVA.beforeShiftChange(newportnewsVA.normalize(test[0]))).should.equal(test[2]);
    });
  });
});

describe('San Luis, AZ', () => {
  it('should match San Luis, AZ known shifts', () => {
    const tests = [
      ['2021-01-15T12:00:00-07:00', 'A', false],
      ['2021-01-16T12:00:00-07:00', 'C', false],
      ['2021-01-17T12:00:00-07:00', 'A', false],
      ['2021-01-18T12:00:00-07:00', 'B', false],
      ['2021-01-19T12:00:00-07:00', 'A', false],
      ['2021-01-20T12:00:00-07:00', 'B', false],
      ['2021-01-21T12:00:00-07:00', 'C', false],
      ['2021-01-22T12:00:00-07:00', 'B', false],
      ['2021-01-23T12:00:00-07:00', 'C', false],
      ['2021-01-24T12:00:00-07:00', 'A', false],
      ['2021-01-25T12:00:00-07:00', 'C', false],
      ['2021-01-26T12:00:00-07:00', 'A', false],
      ['2021-01-27T12:00:00-07:00', 'B', false],
      ['2021-01-28T12:00:00-07:00', 'A', false],
      ['2021-01-29T12:00:00-07:00', 'B', false],
      ['2021-01-30T12:00:00-07:00', 'C', false],
      ['2021-01-31T12:00:00-07:00', 'B', false],
      ['2021-02-01T12:00:00-07:00', 'C', false],
      ['2021-02-02T12:00:00-07:00', 'A', false],
      ['2021-02-03T12:00:00-07:00', 'C', false],
      ['2021-02-04T12:00:00-07:00', 'A', false],
      ['2021-02-05T12:00:00-07:00', 'B', false],
      ['2021-02-06T12:00:00-07:00', 'A', false],
      ['2021-02-07T12:00:00-07:00', 'B', false],
      ['2021-02-08T12:00:00-07:00', 'C', false],
      ['2021-02-09T12:00:00-07:00', 'B', false],
      ['2021-02-10T12:00:00-07:00', 'C', false],
      ['2021-02-11T12:00:00-07:00', 'A', false],
      ['2021-02-12T12:00:00-07:00', 'C', false],
    ];

    tests.forEach((test) => {
      (sanluisAZ.calculateShift(test[0])).should.equal(test[1]);
      (sanluisAZ.beforeShiftChange(sanluisAZ.normalize(test[0]))).should.equal(test[2]);
    });
  });
});

describe('Beavercreek, OH', () => {
  it('should match Beavercreek, OH known shifts', () => {
    const tests = [
      ['2021-10-24T12:00:00-0500', 'A', false],
      ['2021-10-25T12:00:00-0500', 'B', false],
      ['2021-10-26T12:00:00-0500', 'C', false],
      ['2021-10-27T12:00:00-0500', 'A', false],
      ['2021-10-28T04:00:00-0500', 'A', true],
      ['2021-10-29T12:00:00-0500', 'C', false],
      ['2021-10-30T12:00:00-0500', 'A', false],
      ['2020-03-01T12:00:00-0500', 'B', false],
      ['2020-03-01T05:00:00-0500', 'B', true],
      ['2020-02-29T09:00:00-0500', 'A', false],
      ['2020-02-29T18:00:00-0500', 'C', false],
      ['2020-02-28T12:00:00-0500', 'A', false],
    ];

    tests.forEach((test) => {
      (beavercreekOH.calculateShift(test[0])).should.equal(test[1]);
      (beavercreekOH.beforeShiftChange(orlandoFL.normalize(test[0]))).should.equal(test[2]);
    });
  });
});

describe('Spokane Valley, WA', () => {
  it('should match Spokane Valley, WA known shifts', () => {
    const tests = [
      ['2021-10-09T08:10:00-0700', 'A', false],
      ['2021-10-10T08:10:00-0700', 'B', false],
      ['2021-10-11T08:10:00-0700', 'C', false],
      ['2021-10-09T07:10:00-0700', 'C', true],
    ];
    tests.forEach((test) => {
      (spokaneValleyWA.calculateShift(test[0])).should.equal(test[1]);
      (spokaneValleyWA.beforeShiftChange(spokaneValleyWA
        .normalize(test[0]))).should.equal(test[2]);
    });
  });
});

describe('Milwaukee, WI', () => {
  it('should match Milwaukee, WI known shifts', () => {
    const tests = [
      ['2022-02-16T08:10:00-0600', 'R', false],
      ['2022-02-17T08:10:00-0600', 'G', false],
      ['2022-02-18T08:10:00-0600', 'B', false],
      ['2022-02-16T07:10:00-0600', 'B', true],
    ];
    tests.forEach((test) => {
      (milwaukeeWI.calculateShift(test[0])).should.equal(test[1]);
      (milwaukeeWI.beforeShiftChange(milwaukeeWI.normalize(test[0]))).should.equal(test[2]);
    });
  });
});

describe('Seminole County, FL', () => {
  it('should match Seminole County, FL known shifts', () => {
    const tests = [
      ['2021-09-23T08:10:00-0400', 'A', false],
      ['2021-09-24T08:10:00-0400', 'B', false],
      ['2021-09-25T08:10:00-0400', 'C', false],
      ['2021-09-26T07:10:00-0400', 'C', true],
    ];
    tests.forEach((test) => {
      (seminoleCountyFL.calculateShift(test[0])).should.equal(test[1]);
      (seminoleCountyFL.beforeShiftChange(seminoleCountyFL.normalize(test[0]))).should.equal(test[2]);
    });
  });
});

describe('Snoqualmie, WA', () => {
  it('should match Snoqualmie, WA known shifts', () => {
    const tests = [
      ['2022-04-15T07:10:00-0700', 'B', true],
      ['2022-04-15T08:30:00-0700', 'C', false],
      ['2022-04-16T08:30:00-0700', 'C', false],
      ['2022-04-17T08:30:00-0700', 'A', false],
      ['2022-04-18T08:30:00-0700', 'A', false],
      ['2022-04-19T08:30:00-0700', 'B', false],
      ['2022-04-20T08:30:00-0700', 'B', false],
    ];
    tests.forEach((test) => {
      (snoqualmieWA.calculateShift(test[0])).should.equal(test[1]);
      (snoqualmieWA.beforeShiftChange(snoqualmieWA.normalize(test[0]))).should.equal(test[2]);
    });
  });
});

describe('Louisville, KY', () => {
  it('should match Louisville, KY known shifts', () => {
    const tests = [
      ['2022-02-03T08:10:00-0500', '1', false],
      ['2022-02-04T08:10:00-0500', '2', false],
      ['2022-02-06T08:10:00-0500', '1', false],
    ];
    tests.forEach((test) => {
      (louisvillleKY.calculateShift(test[0])).should.equal(test[1]);
      (louisvillleKY.beforeShiftChange(louisvillleKY.normalize(test[0]))).should.equal(test[2]);
    });
  });
});

describe('Indianapolis, IN', () => {
  it('should match Indianapolis, IN known shifts', () => {
    const tests = [
      ['2022-03-01T08:10:00-0500', 'A', false],
      ['2022-03-02T08:10:00-0500', 'B', false],
      ['2022-03-03T08:10:00-0500', 'C', false],
      ['2022-03-04T06:10:00-0500', 'C', true],
    ];
    tests.forEach((test) => {
      (indianapolisIN.calculateShift(test[0])).should.equal(test[1]);
      (indianapolisIN.beforeShiftChange(indianapolisIN.normalize(test[0]))).should.equal(test[2]);
    });
  });
});

describe('South Metro, CO', () => {
  it('should match South Metro, CO known shifts', () => {
    const tests = [
      ['2022-01-02T08:10:00-0700', 'C', false],
      ['2022-01-04T08:10:00-0700', 'B', false],
      ['2022-01-06T08:10:00-0700', 'A', false],
      ['2022-01-08T06:10:00-0700', 'A', true],
    ];
    tests.forEach((test) => {
      (southMetroCO.calculateShift(test[0])).should.equal(test[1]);
      (southMetroCO.beforeShiftChange(southMetroCO.normalize(test[0]))).should.equal(test[2]);
    });
  });
});

describe('North Port, FL', () => {
  it('should match North Port FL, known shifts', () => {
    const tests = [
      ['2022-07-18T08:10:00-0400', 'A', false],
      ['2022-07-20T08:10:00-0400', 'C', false],
      ['2022-07-21T07:10:00-0400', 'C', true],
    ];
    tests.forEach((test) => {
      (northPortFL.calculateShift(test[0])).should.equal(test[1]);
      (northPortFL.beforeShiftChange(northPortFL.normalize(test[0]))).should.equal(test[2]);
    });
  });
});

describe('Arvada, CO', () => {
  it('should match Arvada CO, known shifts', () => {
    const tests = [
      ['2023-01-01T07:10:00-0700', 'A', false],
      ['2023-01-03T07:10:00-0700', 'C', false],
      ['2023-01-05T07:10:00-0700', 'B', false],
      ['2023-01-07T06:10:00-0700', 'B', true],
    ];
    tests.forEach((test) => {
      (arvadaCO.calculateShift(test[0])).should.equal(test[1]);
      (arvadaCO.beforeShiftChange(arvadaCO.normalize(test[0]))).should.equal(test[2]);
    });
  });
});

describe('Chesapeake, VA', () => {
  it('should match Chesapeake VA, known shifts', () => {
    const tests = [
      ['2023-01-01T08:10:00-0500', 'C', false],
      ['2023-01-03T08:10:00-0500', 'B', false],
      ['2023-01-05T08:10:00-0500', 'B', false],
      ['2023-01-07T07:10:00-0500', 'A', true],
    ];
    tests.forEach((test) => {
      (chesapeakeVA.calculateShift(test[0])).should.equal(test[1]);
      (chesapeakeVA.beforeShiftChange(chesapeakeVA.normalize(test[0]))).should.equal(test[2]);
    });
  });
});

describe('Kansas City, MO', () => {
  it('should match Kansas City MO, known shifts', () => {
    const tests = [
      ['2022-01-01T08:10:00-0500', 'B', false],
      ['2022-01-02T08:10:00-0500', 'C', false],
      ['2022-01-03T08:10:00-0500', 'A', false],
      ['2022-01-04T06:10:00-0500', 'A', true],
    ];
    tests.forEach((test) => {
      (kansasCityMO.calculateShift(test[0])).should.equal(test[1]);
      (kansasCityMO.beforeShiftChange(kansasCityMO.normalize(test[0]))).should.equal(test[2]);
    });
  });
});

describe('Harrisonburg, VA', () => {
  it('should match Harrisonburg VA, known shifts', () => {
    const tests = [
      ['2021-12-14T08:10:00-0500', 'A', false],
      ['2021-12-15T08:10:00-0500', 'B', false],
      ['2021-12-16T08:10:00-0500', 'C', false],
      ['2021-12-17T07:10:00-0500', 'C', true],
    ];
    tests.forEach((test) => {
      (harrisonburgVA.calculateShift(test[0])).should.equal(test[1]);
      (harrisonburgVA.beforeShiftChange(harrisonburgVA.normalize(test[0]))).should.equal(test[2]);
    });
  });
});

