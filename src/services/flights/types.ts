export enum WeekDay {
  MON = 2.0,
  TUE = 3.0,
  WED = 4.0,
  THU = 5.0,
  FRI = 6.0,
  SAT = 'S',
  SUN = 'D',
}

export enum OperationType {
  'NATIONAL' = 'Nacional',
  'INTERNATIONAL' = 'Internacional',
  'REGIONAL' = 'Regional',
  'ESPECIAL' = 'Especial',
  'SUB_REGIONAL' = 'Sub-Regional',
  'CARGO' = '(Cargueiro Doméstico)',
}

export interface FlightRaw {
  'Cód.  Empresa': string; // ENUM
  Empresa: string;
  'Nº VOO': number;
  'Equip.': string;
  Seg: WeekDay.MON;
  Ter: WeekDay.TUE;
  Qua: WeekDay.WED;
  Qui: WeekDay.THU;
  Sex: WeekDay.FRI;
  Sáb: WeekDay.SAT;
  Dom: WeekDay.SUN;
  'Qtde Assentos': number;
  'Número Hotran': string;
  'Data Solicitação': string; // DATE
  'Data Aprovação': string; // DATE
  'Data Vigência': string; // DATE
  'Natureza Operação': OperationType.INTERNATIONAL;
  'Nº Etapa': number;
  'COD. Origem': string;
  'ARPT Origem': string;
  'COD. Destino': string;
  'ARPT Destino': string;
  'Horário Partida': string; // HOUR
  'Horário Chegada': string; // HOUR
  CODESHARE?: string;
  'Equip. Alt?'?: string;
}

interface SchedulePlan {
  code: string;
  dateRequested: string;
  dateApproved: string;
  dateEffective: string;
}

interface Event {
  airportCode: string;
  airportName: string;
  time: string; // HOUR
}

export interface Flight {
  companyCode: string;
  company: string;
  number: number;
  planeModel: string;
  monday: WeekDay.MON;
  tuesday: WeekDay.TUE;
  wednesday: WeekDay.WED;
  thursday: WeekDay.THU;
  friday: WeekDay.FRI;
  saturday: WeekDay.SAT;
  sunday: WeekDay.SUN;
  numberOfSeats: number;
  schedulePlan: SchedulePlan;
  operationType: OperationType.INTERNATIONAL;
  step: number;
  departure: Event;
  arrival: Event;
  codeshare?: string;
  alternativePlane?: string;
}
