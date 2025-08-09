'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, X, ChevronsLeft, ChevronsRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaginationControlProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function PaginationControl({ currentPage, totalPages, onPageChange }: PaginationControlProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
      setIsOpen(false);
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
    return pageNumbers;
  };
  
  return (
    <div className="pagination-control-container fixed bottom-4 right-4 z-50 hidden md:block">
       <div className={cn("flex items-center gap-1 transition-all duration-300 ease-in-out", isOpen ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0 pointer-events-none")}>
         <Button onClick={() => handlePageClick(1)} size="icon" variant="outline" disabled={currentPage === 1} className="pagination-button h-8 w-8 rounded-full transition-all duration-200"><ChevronsLeft /></Button>
         <Button onClick={() => handlePageClick(currentPage - 1)} size="icon" variant="outline" disabled={currentPage === 1} className="pagination-button h-8 w-8 rounded-full transition-all duration-200"><ChevronLeft /></Button>
        {renderPageNumbers()}
         <Button onClick={() => handlePageClick(currentPage + 1)} size="icon" variant="outline" disabled={currentPage === totalPages} className="pagination-button h-8 w-8 rounded-full transition-all duration-200"><ChevronRight /></Button>
         <Button onClick={() => handlePageClick(totalPages)} size="icon" variant="outline" disabled={currentPage === totalPages} className="pagination-button h-8 w-8 rounded-full transition-all duration-200"><ChevronsRight /></Button>
      </div>

      <Button
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full shadow-lg absolute bottom-0 right-0 transition-transform duration-300 hover:scale-110"
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="h-5 w-5" /> : <MoreHorizontal className="h-5 w-5" />}
        <span className="sr-only">Toggle Pagination</span>
      </Button>
    </div>
  );
}
