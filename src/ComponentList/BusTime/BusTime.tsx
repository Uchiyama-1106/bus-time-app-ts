import { useAtomValue } from "jotai";
import { busTime } from "../../Atoms";
import BusTimeBox from "./BusTimeBox";

type trips = {
  service_id: string;
  trip_id: string;
  trip_headsign: string;
};
type stop_times = {
  trip_id: string;
  arrival_time: string;
  departure_time: string;
  stop_id: string;
};

const BusTime = () => {
  const busTimes: Array<[trips, stop_times, stop_times]> =
    useAtomValue(busTime);
  const CreateBusTime = () => {
    return busTimes.map((value, index) => (
      <BusTimeBox key={index} TripAndTimes={value} />
    ));
  };

  return <div className="pt-0.5">{CreateBusTime()}</div>;
};
export default BusTime;
