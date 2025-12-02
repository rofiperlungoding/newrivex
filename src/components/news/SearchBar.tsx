import { MagnifyingGlass, X } from '@phosphor-icons/react';
import { useState, useEffect } from 'react';

interface SearchBarProps {
    onSearch: (query: string) => void;
    initialValue?: string;
}

export const SearchBar = ({ onSearch, initialValue = '' }: SearchBarProps) => {
    const [value, setValue] = useState(initialValue);

    // Debounce search input
    useEffect(() => {
        const timer = setTimeout(() => {
            onSearch(value);
        }, 500); // 500ms debounce

        return () => clearTimeout(timer);
    }, [value, onSearch]);

    return (
        <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-secondary">
                <MagnifyingGlass size={20} />
            </div>
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Search news..."
                className="w-full bg-surface border border-white/10 rounded-full py-3 pl-12 pr-12 text-white placeholder-secondary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
            />
            {value && (
                <button
                    onClick={() => setValue('')}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-secondary hover:text-white transition-colors"
                >
                    <X size={16} />
                </button>
            )}
        </div>
    );
};
