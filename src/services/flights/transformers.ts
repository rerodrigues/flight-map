import { FlightRaw, Flight } from './types';

const generateUniqueIdFrom = ({ number, companyCode, departure, arrival, codeshare }: Omit<Flight, 'id'>): string => {
  return `${number}-${companyCode}-${departure.airportCode}-${arrival.airportCode}-${codeshare || Math.random()}`;
};

export const toFlight = (rawFlight: FlightRaw): Flight => {
  const flight = {
    companyCode: rawFlight['Cód.  Empresa'],
    company: rawFlight.Empresa,
    number: rawFlight['Nº VOO'],
    planeModel: rawFlight['Equip.'],
    monday: rawFlight.Seg,
    tuesday: rawFlight.Ter,
    wednesday: rawFlight.Qua,
    thursday: rawFlight.Qui,
    friday: rawFlight.Sex,
    saturday: rawFlight.Sáb,
    sunday: rawFlight.Dom,
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
  Seg: flight.monday,
  Ter: flight.tuesday,
  Qua: flight.wednesday,
  Qui: flight.thursday,
  Sex: flight.friday,
  Sáb: flight.saturday,
  Dom: flight.sunday,
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
