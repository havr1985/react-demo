import { FC } from 'react';

type PropsType = {
  value: string;
  onSearch: (query: string) => void;
  placeholder?: string;
  onReset: () => void;
};

export const SearchBar: FC<PropsType> = ({
  value,
  onSearch,
  placeholder,
  onReset,
}) => {
  return (
    <div className="flex justify-end gap-5">
      <button
        onClick={onReset}
        className="bg-yellow-300 px-4 py-2 rounded-lg text-black hover:bg-yellow-600"
      >
        Reset
      </button>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onSearch(e.target.value)}
        className="w-1/2 h-10 rounded-lg px-2 text-black focus:outline-yellow-300"
      />
    </div>
  );
};
