export enum Weekday {
  MON = 2.0,
  TUE = 3.0,
  WED = 4.0,
  THU = 5.0,
  FRI = 6.0,
  SAT = 'S',
  SUN = 'D',
}

enum OperationType {
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
  Seg: Weekday.MON | null;
  Ter: Weekday.TUE | null;
  Qua: Weekday.WED | null;
  Qui: Weekday.THU | null;
  Sex: Weekday.FRI | null;
  Sáb: Weekday.SAT | null;
  Dom: Weekday.SUN | null;
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

interface Weekdays {
  monday: number;
  tuesday: number;
  wednesday: number;
  thursday: number;
  friday: number;
  saturday: number;
  sunday: number;
}

export interface Flight {
  id: string;
  companyCode: string;
  company: string;
  number: number;
  planeModel: string;
  weekdays: Weekdays;
  numberOfSeats: number;
  schedulePlan: SchedulePlan;
  operationType: OperationType.INTERNATIONAL;
  step: number;
  departure: Event;
  arrival: Event;
  codeshare?: string;
  alternativePlane?: string;
}
