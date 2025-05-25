export type CalendarDates = {
  service_id: string;
  date: string;
  exception_type: string;
};

export type Trips = {
  service_id: string;
  trip_id: string;
  trip_headsign: string;
};

export type Stops = {
  stop_id: string;
  stop_name: string;
  stop_lat: string;
  stop_lon: string;
};

export type StopTimes = {
  trip_id: string;
  arrival_time: string;
  departure_time: string;
  stop_id: string;
};