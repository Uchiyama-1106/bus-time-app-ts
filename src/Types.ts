export type CalendarDate = {
  service_id: string;
  date: string;
  exception_type: string;
};

export type Trip = {
  service_id: string;
  trip_id: string;
  trip_headsign: string;
};

export type Stop = {
  stop_id: string;
  stop_name: string;
  stop_lat: string;
  stop_lon: string;
};

export type StopTime = {
  trip_id: string;
  arrival_time: string;
  departure_time: string;
  stop_id: string;
};
