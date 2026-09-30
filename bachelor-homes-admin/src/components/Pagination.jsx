import React from 'react';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];

  const showLeftDots = currentPage > 4;
  const showRightDots = currentPage < totalPages - 3;

  // First few pages
  if (showLeftDots) {
    pageNumbers.push(1, '...');
  } else {
    for (let i = 1; i <= Math.min(4, totalPages); i++) {
      pageNumbers.push(i);
    }
  }

  // Middle pages
  if (showLeftDots && showRightDots) {
    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
      pageNumbers.push(i);
    }
  }

  // Last few pages
  if (showRightDots) {
    pageNumbers.push('...', totalPages);
  } else {
    for (
      let i = Math.max(totalPages - 3, 5);
      i <= totalPages;
      i++
    ) {
      if (!pageNumbers.includes(i)) pageNumbers.push(i);
    }
  }

  return (
    <div className="flex justify-center gap-2 py-4 flex-wrap">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 border border-[#6C3483] rounded disabled:opacity-50 cursor-pointer"
      >
        <IoIosArrowBack className='text-[#6C3483]' />
      </button>

      {pageNumbers.map((page, index) => (
        <button
          key={index}
          disabled={page === '...'}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          className={`px-3 py-1 rounded border border-[#6C3483] cursor-pointer ${page === currentPage
              ? 'bg-[#6C3483] text-white'
              : 'text-[#6C3483]'
            }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 border border-[#6C3483] rounded disabled:opacity-50 cursor-pointer"
      >
        <IoIosArrowForward className='text-[#6C3483]' />
      </button>
    </div>
  );
};

export default Pagination;
