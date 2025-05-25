import { useAtomValue, useSetAtom } from "jotai";
import {
  startAtom,
  goalAtom,
  changedStartValueAtom,
  changedGoalValueAtom,
} from "../../Atoms";

const SwapSelectBoxes = () => {
  const start = useAtomValue(startAtom);
  const setStart = useSetAtom(changedStartValueAtom);

  const goal = useAtomValue(goalAtom);
  const setGoal = useSetAtom(changedGoalValueAtom);
  const swapValues = () => {
    const temp = start;
    setStart(goal);
    setGoal(temp);
  };

  return (
    <button
      onClick={swapValues}
      className="w-10 h-14 border border-white rounded-lg font-bold bg-orange-400"
    >
      ↑↓
    </button>
  );
};

export default SwapSelectBoxes;
