import { useAtomValue } from "jotai";
import { stopInfo } from "../Atoms";

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

type stops = {
  stop_id: string;
  stop_name: string;
  stop_lat: string;
  stop_lon: string;
};

interface BusTimeBoxProps {
  TripAndTimes: [trips, stop_times, stop_times];
}
const BusTimeBox: React.FC<BusTimeBoxProps> = ({ TripAndTimes }) => {
  const Trips: trips = TripAndTimes[0];
  const Start: stop_times = TripAndTimes[1];
  const Goal: stop_times = TripAndTimes[2];
  const StopInfo: stops[] = useAtomValue(stopInfo);
  const IDChangeName = (id: string) => {
    const stop = StopInfo.find((value) => id === value.stop_id);
    return stop ? stop.stop_name : "";
  };

  return (
    <div className="mt-1.5 px-1 border-2 border-dashed border-orange-300 rounded-lg font-semibold">
      <div className="text-5xl">
        {Start.departure_time.slice(0, -3) +
          " ➡︎ " +
          Goal.arrival_time.slice(0, -3)}
      </div>
      <div className="flex ml-4 space-x-6">
        <div className="text-sm">
          <span>出発：</span>
          <span>{IDChangeName(Start.stop_id)}</span>
        </div>
        <div className="text-sm">
          <span>到着：</span>
          <span>{IDChangeName(Goal.stop_id)}</span>
        </div>
      </div>
      <div className="text-sm text-right">行先 {Trips.trip_headsign} </div>
    </div>
  );
};

export default BusTimeBox;
