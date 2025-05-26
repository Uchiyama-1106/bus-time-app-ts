import SelectBox from './SelectBox';
import SwapSelectBoxes from './SwapSelectBoxes';
import { useAtomValue, useSetAtom } from 'jotai';
import {
  startAtom,
  goalAtom,
  changedStartValueAtom,
  changedGoalValueAtom,
} from '../../Atoms';

const BusRoute = () => {
  const start = useAtomValue(startAtom);
  const setStart = useSetAtom(changedStartValueAtom);
  const startChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStart(e.target.value);
  };

  const goal = useAtomValue(goalAtom);
  const setGoal = useSetAtom(changedGoalValueAtom);
  const goalChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setGoal(e.target.value);

  return (
    <div>
      <div className="flex w-full pr-1 align-items-center">
        <div className="ml-2">
          <SwapSelectBoxes />
        </div>
        <div className="ml-1.5 w-full">
          <div className="flex">
            <div className="font-semibold mr-2 whitespace-nowrap">出発</div>
            <SelectBox value={start} onChange={startChange} />
          </div>
          <div className="flex">
            <div className="font-semibold mr-2 whitespace-nowrap">到着</div>
            <SelectBox value={goal} onChange={goalChange} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusRoute;
