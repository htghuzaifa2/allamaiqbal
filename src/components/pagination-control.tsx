
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useWindowSize } from '@/hooks/use-window-size';
import {
  MoreHorizontal,
  X,
  ChevronsLeft,
  ChevronsRight,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaginationControlProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function PaginationControl({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationControlProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { width } = useWindowSize();
  const isMobile = width < 640;

  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
      setIsOpen(false);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = isMobile ? 3 : 5;
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
          className="pagination-button h-8 w-8 rounded-full transition-all duration-200 hover:bg-primary/80 hover:text-primary-foreground"
        >
          {i}
        </Button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="pagination-control-container fixed bottom-24 right-20 z-50">
      <div
        className={cn(
          'flex items-center gap-2 transition-all duration-300 ease-in-out sm:flex-row flex-col-reverse',
          isOpen
            ? 'translate-y-0 opacity-100'
            : 'translate-y-10 opacity-0 pointer-events-none'
        )}
      >
        <div className="flex items-center gap-1">
          <Button
            onClick={() => handlePageClick(1)}
            size="icon"
            variant="outline"
            disabled={currentPage === 1}
            className="pagination-button h-8 w-8 rounded-full transition-all duration-200 hover:bg-primary/80 hover:text-primary-foreground"
          >
            <ChevronsLeft />
          </Button>
          <Button
            onClick={() => handlePageClick(currentPage - 1)}
            size="icon"
            variant="outline"
            disabled={currentPage === 1}
            className="pagination-button h-8 w-8 rounded-full transition-all duration-200 hover:bg-primary/80 hover:text-primary-foreground"
          >
            <ChevronLeft />
          </Button>
        </div>
        <div className="flex items-center gap-1 sm:flex-row flex-col">
          {renderPageNumbers()}
        </div>
        <div className="flex items-center gap-1">
          <Button
            onClick={() => handlePageClick(currentPage + 1)}
            size="icon"
            variant="outline"
            disabled={currentPage === totalPages}
            className="pagination-button h-8 w-8 rounded-full transition-all duration-200 hover:bg-primary/80 hover:text-primary-foreground"
          >
            <ChevronRight />
          </Button>
          <Button
            onClick={() => handlePageClick(totalPages)}
            size="icon"
            variant="outline"
            disabled={currentPage === totalPages}
            className="pagination-button h-8 w-8 rounded-full transition-all duration-200 hover:bg-primary/80 hover:text-primary-foreground"
          >
            <ChevronsRight />
          </Button>
        </div>
      </div>

      <Button
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="absolute bottom-0 right-0 z-10 h-12 w-12 rounded-full shadow-lg transition-transform duration-300 hover:scale-110"
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MoreHorizontal className="h-6 w-6" />
        )}
        <span className="sr-only">Toggle Pagination</span>
      </Button>
    </div>
  );
}

