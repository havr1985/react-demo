import { FC } from 'react';

type PropsType = {
  currentPage: number;
  totalPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: FC<PropsType> = ({
  currentPage,
  totalPage,
  onPageChange,
}) => {
  return (
    <div className="flex gap-10 justify-center text-2xl text-yellow-600">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`disabled:text-gray-500`}
      >
        Prev
      </button>
      <span className="text-gray-300">
        Page {currentPage} of {totalPage}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPage}
        className={`disabled:text-gray-500`}
      >
        Next
      </button>
    </div>
  );
};
