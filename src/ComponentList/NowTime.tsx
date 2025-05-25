import { useAtom } from "jotai";
import { nowAtom } from "../Atoms.ts";
import { useEffect, useState } from "react";

interface SelectBoxProps {
  value: number;
  list: number[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
const DateSelectBox: React.FC<SelectBoxProps> = ({ value, list, onChange }) => {
  const List: number[] = list;
  return (
    <div className="w-12 py-1.5 text-center border border-black rounded-lg  font-semibold bg-white">
      <select
        value={value}
        onChange={onChange}
        className="w-11 text-center text-2xl bg-white"
      >
        {List.map((option, index) => (
          <option key={index} value={option} className="text-bold">
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

const NowTime = () => {
  const [now, setNow] = useAtom(nowAtom);
  const nowHandleClick = () => setNow(new Date());
  const [newYear, setNewYear] = useState(now.getFullYear());
  const [newMonth, setNewMonth] = useState(now.getMonth() + 1);
  const [newDate, setNewDate] = useState(now.getDate());
  const [newHour, setNewHour] = useState(now.getHours());
  const [newMinutes, setNewMinutes] = useState(now.getMinutes());

  const checkDateNum = () => {
    let Dates: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (newYear % 4 === 0 && (newYear % 100 !== 0 || newYear % 400 === 0)) {
      Dates = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    }
    return Dates[newMonth - 1];
  };

  const monthList = [...Array(12)].map((_, i) => i + 1);
  const [dateList, setDateList] = useState(
    [...Array(checkDateNum())].map((_, i) => i + 1),
  );
  const hourList = [...Array(24)].map((_, i) => i);
  const minutesList = [...Array(60)].map((_, i) => i);

  useEffect(() => {
    if (newMonth in [1, 2, 3]) {
      setNewYear(2025);
    }
    setDateList([...Array(checkDateNum())].map((_, i) => i + 1));
  }, [newMonth]);

  useEffect(() => {
    setNewMonth(now.getMonth() + 1);
    setNewDate(now.getDate());
    setNewHour(now.getHours());
    setNewMinutes(now.getMinutes());
  }, [now]);

  const setTimeHandleClick = () =>
    setNow(
      new Date(
        new Date().getFullYear(),
        newMonth - 1,
        newDate,
        newHour,
        newMinutes,
        0,
      ),
    );

  return (
    <div>
      <div className="flex ml-2 mb-2 items-end">
        <div className="mr-2">
          <div className="mr-1 font-semibold ">出発</div>
          <div className="mr-1 font-semibold ">時刻</div>
        </div>
        <DateSelectBox
          value={newMonth}
          list={monthList}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setNewMonth(parseInt(e.target.value))
          }
        />
        <div className="mx-1">月</div>
        <DateSelectBox
          value={newDate}
          list={dateList}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setNewDate(parseInt(e.target.value))
          }
        />
        <div className="mx-1">日</div>
        <DateSelectBox
          value={newHour}
          list={hourList}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setNewHour(parseInt(e.target.value))
          }
        />
        <div className="mx-1">時</div>
        <DateSelectBox
          value={newMinutes}
          list={minutesList}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setNewMinutes(parseInt(e.target.value))
          }
        />
        <div className="mx-1">分</div>
      </div>
      <div className="flex justify-center space-x-4 mb-2">
        <button
          onClick={nowHandleClick}
          className="w-40 border border-black rounded-lg font-semibold bg-white"
        >
          現在日時で検索
        </button>
        <button
          onClick={setTimeHandleClick}
          className=" w-40 border border-black rounded-lg font-semibold bg-white"
        >
          指定日時で検索
        </button>
      </div>
    </div>
  );
};

export default NowTime;
