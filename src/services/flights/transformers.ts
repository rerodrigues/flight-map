import { FlightRaw, Flight, Weekday } from './types';

export const getCodeShares = (codeshares?: string): string[] =>
  codeshares ? codeshares.split(' - ').map(codeshare => codeshare.replace('/', '')) : [];

const generateUniqueIdFrom = (flight: Omit<Flight, 'id'>): string => {
  const { number, companyCode, departure, arrival, codeshare, weekdays } = flight;
  const { monday, tuesday, wednesday, thursday, friday, saturday, sunday } = weekdays;
  const days = [monday, tuesday, wednesday, thursday, friday, saturday, sunday].reduce((sum, day) => sum + day, 0);
  const codeshares = getCodeShares(codeshare);
  return [number, companyCode, departure.airportCode, arrival.airportCode, codeshares.join('_'), days].join('-');
};

export const toFlight = (rawFlight: FlightRaw): Flight => {
  const flight = {
    companyCode: rawFlight['Cód.  Empresa'],
    company: rawFlight.Empresa,
    number: rawFlight['Nº VOO'],
    planeModel: rawFlight['Equip.'],
    weekdays: {
      monday: rawFlight.Seg ? 1 : 0,
      tuesday: rawFlight.Ter ? 2 : 0,
      wednesday: rawFlight.Qua ? 4 : 0,
      thursday: rawFlight.Qui ? 8 : 0,
      friday: rawFlight.Sex ? 16 : 0,
      saturday: rawFlight.Sáb ? 32 : 0,
      sunday: rawFlight.Dom ? 64 : 0,
    },
    numberOfSeats: rawFlight['Qtde Assentos'],
    schedulePlan: {
      code: rawFlight['Número Hotran'],
      dateRequested: rawFlight['Data Solicitação'],
      dateApproved: rawFlight['Data Aprovação'],
      dateEffective: rawFlight['Data Vigência'],
    },
    operationType: rawFlight['Natureza Operação'],
    step: rawFlight['Nº Etapa'],
    departure: {
      airportCode: rawFlight['COD. Origem'],
      airportName: rawFlight['ARPT Origem'],
      time: rawFlight['Horário Partida'],
    },
    arrival: {
      airportCode: rawFlight['COD. Destino'],
      airportName: rawFlight['ARPT Destino'],
      time: rawFlight['Horário Chegada'],
    },
    codeshare: rawFlight.CODESHARE,
    alternativePlane: rawFlight['Equip. Alt?'],
  };

  return {
    id: generateUniqueIdFrom(flight),
    ...flight,
  };
};

export const toFlightRaw = (flight: Flight): FlightRaw => ({
  'Cód.  Empresa': flight.companyCode,
  Empresa: flight.company,
  'Nº VOO': flight.number,
  'Equip.': flight.planeModel,
  Seg: flight.weekdays.monday ? Weekday.MON : null,
  Ter: flight.weekdays.tuesday ? Weekday.TUE : null,
  Qua: flight.weekdays.wednesday ? Weekday.WED : null,
  Qui: flight.weekdays.thursday ? Weekday.THU : null,
  Sex: flight.weekdays.friday ? Weekday.FRI : null,
  Sáb: flight.weekdays.saturday ? Weekday.SAT : null,
  Dom: flight.weekdays.sunday ? Weekday.SUN : null,
  'Qtde Assentos': flight.numberOfSeats,
  'Número Hotran': flight.schedulePlan.code,
  'Data Solicitação': flight.schedulePlan.dateRequested,
  'Data Aprovação': flight.schedulePlan.dateApproved,
  'Data Vigência': flight.schedulePlan.dateEffective,
  'Natureza Operação': flight.operationType,
  'Nº Etapa': flight.step,
  'COD. Origem': flight.departure.airportCode,
  'ARPT Origem': flight.departure.airportName,
  'Horário Partida': flight.departure.time,
  'COD. Destino': flight.arrival.time,
  'ARPT Destino': flight.arrival.airportName,
  'Horário Chegada': flight.arrival.time,
  CODESHARE: flight.codeshare,
  'Equip. Alt?': flight.alternativePlane,
});
