import { sortedBusSpotList } from "../../Atoms";

interface SelectBoxProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
const SelectBox: React.FC<SelectBoxProps> = ({ value, onChange }) => {
  const List: string[] = sortedBusSpotList;
  return (
    <div className="w-full border border-black">
      <select
        value={value}
        onChange={onChange}
        className="w-full pl-0.5 font-semibold bg-white"
      >
        {List.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectBox;
