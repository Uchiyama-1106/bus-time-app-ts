import { useAtomValue } from "jotai";
import { busTime } from "../../Atoms";
import BusTimeBox from "./BusTimeBox";
import type { StopTime, Trip } from "../../Types";

const BusTime = () => {
  const busTimes: Array<[Trip, StopTime, StopTime]> =
    useAtomValue(busTime);
  const CreateBusTime = () => {
    return busTimes.map((value, index) => (
      <BusTimeBox key={index} TripAndTimes={value} />
    ));
  };

  return <div className="pt-0.5">{CreateBusTime()}</div>;
};
export default BusTime;
