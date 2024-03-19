export interface IBus {
  id: number;
  name: string;
  number: string;
  operatorId: number;
  boardingCityId: number;
  droppingCityId: number;
  createdAt: string;
}

interface ICity {
  id: number;
  name: string;
}

export interface IBusCity {
  id: number;
  operatorId: number;
  city: ICity;
  cityId: number;
  createdAt: Date;
}

export interface IBusPoint {
  id: number;
  cityId: number;
  time: string;
  location: string;
  address: string;
  latitude: number;
  longitude: number;
  createdAt: Date;
}

export interface IBusSchedule {
  id: number;
  busId: number;
  date: string;
  time: string;
}

export interface IPassenger {
  id: number;
  name: string;
  email: string;
  contact: string;
  seat: string;
  date: string;
  paidAmount: number;
  boardingPointId: number;
  busScheduleId: number;
  createdAt: string;
}
