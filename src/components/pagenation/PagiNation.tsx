// PageNation.tsx
import { useState } from 'react';

import AngleBrackets from '../icons/AngleBrackets';
import usePageToast from '../toast/pagetoast/usePageToast';

type PagiNationProps = {
  page: number;
  totalPages: number;
  onPageChange: (next: number) => void;
  className?: string;
};

export default function PagiNation({ page, totalPages, onPageChange }: PagiNationProps) {
  // const isPrevDisabled = page <= 1;
  // const isNextDisabled = page >= totalPages;

  const { showToast, Toast } = usePageToast();

  const [prevPage, setPrevPage] = useState(page);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');

  if (page !== prevPage) {
    setDirection(page > prevPage ? 'next' : 'prev');
    setPrevPage(page);
  }

  const goPrev = () => {
    if (page <= 1) {
      showToast('첫번째 페이지입니다!');
      return;
    }
    onPageChange(page - 1);
  };

  const goNext = () => {
    if (page >= totalPages) {
      showToast('마지막 페이지입니다!');
      return;
    }
    onPageChange(page + 1);
  };

  return (
    <>
      <div className="flex w-22 h-9 rounded-xl border border-gray-300 overflow-hidden mt-5">
        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous page"
          className="flex-1 flex items-center justify-center border-r border-gray-300 disabled:opacity-60"
        >
          <AngleBrackets direction="left" />
        </button>

        <div className="flex-1 flex items-center justify-center border-r border-gray-300 text-sm font-medium overflow-hidden h-full">
          <span
            key={page}
            className={direction === 'next' ? 'animate-page-next' : 'animate-page-prev'}
          >
            {page}
          </span>
        </div>

        <button
          type="button"
          onClick={goNext}
          aria-label="Next Page"
          className="flex-1 flex items-center justify-center disabled:opacity-60"
        >
          <AngleBrackets direction="right" />
        </button>
      </div>

      {Toast}
    </>
  );
}

// TODO: showToast에서 setTimeout이 계속 누적될 수 있어서, 빠르게 여러번 누르면 에러 발생 timeout 관리하기
