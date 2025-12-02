import { CaretLeft, CaretRight } from '@phosphor-icons/react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    loading?: boolean;
}

export const Pagination = ({ currentPage, totalPages, onPageChange, loading }: PaginationProps) => {
    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-center gap-4 mt-12">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1 || loading}
                className="p-3 rounded-full bg-surface border border-white/10 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
                aria-label="Previous page"
            >
                <CaretLeft size={20} />
            </button>

            <span className="text-sm font-medium text-secondary">
                Page <span className="text-white">{currentPage}</span> of {totalPages}
            </span>

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages || loading}
                className="p-3 rounded-full bg-surface border border-white/10 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
                aria-label="Next page"
            >
                <CaretRight size={20} />
            </button>
        </div>
    );
};
