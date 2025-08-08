'use client';

import { Button } from '@/components/ui/button';
import { ChevronsLeft, ChevronsRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface StaticPaginationControlProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function StaticPaginationControl({ currentPage, totalPages, onPageChange }: StaticPaginationControlProps) {
  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    if (startPage > 1) {
        pageNumbers.push(<Button key="1" size="icon" variant='outline' onClick={() => handlePageClick(1)} className="pagination-button h-8 w-8 rounded-full transition-all duration-200">1</Button>);
        if (startPage > 2) {
            pageNumbers.push(<span key="start-ellipsis" className="px-2">...</span>);
        }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <Button
          key={i}
          size="icon"
          variant={i === currentPage ? 'default' : 'outline'}
          onClick={() => handlePageClick(i)}
          className="pagination-button h-8 w-8 rounded-full transition-all duration-200"
        >
          {i}
        </Button>
      );
    }

    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            pageNumbers.push(<span key="end-ellipsis" className="px-2">...</span>);
        }
        pageNumbers.push(<Button key={totalPages} size="icon" variant='outline' onClick={() => handlePageClick(totalPages)} className="pagination-button h-8 w-8 rounded-full transition-all duration-200">{totalPages}</Button>);
    }

    return pageNumbers;
  };
  
  return (
    <div className="mt-12 flex items-center justify-center">
       <div className="flex items-center gap-2">
         <Button onClick={() => handlePageClick(1)} size="icon" variant="outline" disabled={currentPage === 1} className="pagination-button h-8 w-8 rounded-full transition-all duration-200"><ChevronsLeft /></Button>
         <Button onClick={() => handlePageClick(currentPage - 1)} size="icon" variant="outline" disabled={currentPage === 1} className="pagination-button h-8 w-8 rounded-full transition-all duration-200"><ChevronLeft /></Button>
        {renderPageNumbers()}
         <Button onClick={() => handlePageClick(currentPage + 1)} size="icon" variant="outline" disabled={currentPage === totalPages} className="pagination-button h-8 w-8 rounded-full transition-all duration-200"><ChevronRight /></Button>
         <Button onClick={() => handlePageClick(totalPages)} size="icon" variant="outline" disabled={currentPage === totalPages} className="pagination-button h-8 w-8 rounded-full transition-all duration-200"><ChevronsRight /></Button>
      </div>
    </div>
  );
}
