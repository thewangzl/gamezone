'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}

export default function Pagination({ currentPage, totalPages, baseUrl }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${baseUrl}?${params.toString()}`;
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const maxVisiblePages = 5;
  let visiblePages = pages;

  if (totalPages > maxVisiblePages) {
    const halfMax = Math.floor(maxVisiblePages / 2);
    let start = Math.max(1, currentPage - halfMax);
    let end = Math.min(totalPages, start + maxVisiblePages - 1);

    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    visiblePages = pages.slice(start - 1, end);
  }

  return (
    <div className="flex justify-center items-center space-x-2 mt-8">
      {/* Previous Page */}
      {currentPage > 1 ? (
        <Link
          href={createPageURL(currentPage - 1)}
          className="px-3 py-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
          aria-label="Previous page"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </Link>
      ) : (
        <span className="px-3 py-2 rounded-lg bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </span>
      )}

      {/* Page Numbers */}
      {visiblePages.map((page) => (
        <Link
          key={page}
          href={createPageURL(page)}
          className={`px-4 py-2 rounded-lg ${
            page === currentPage
              ? 'bg-blue-500 text-white'
              : 'bg-white border border-gray-300 hover:bg-gray-50'
          } transition-colors`}
        >
          {page}
        </Link>
      ))}

      {/* Next Page */}
      {currentPage < totalPages ? (
        <Link
          href={createPageURL(currentPage + 1)}
          className="px-3 py-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
          aria-label="Next page"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      ) : (
        <span className="px-3 py-2 rounded-lg bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </span>
      )}
    </div>
  );
} 