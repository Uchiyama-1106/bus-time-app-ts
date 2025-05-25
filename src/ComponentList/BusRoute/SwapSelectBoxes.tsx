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
      className="w-10 h-14 rounded-lg font-bold bg-orange-400 shadow-md
    active:scale-95 active:shadow
    transition transform
    cursor-pointer"
    >
      ↑↓
    </button>
  );
};

export default SwapSelectBoxes;
