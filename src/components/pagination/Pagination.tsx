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
    <div>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      <span>
        Page {currentPage} of {totalPage}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPage}
      >
        Next
      </button>
    </div>
  );
};
