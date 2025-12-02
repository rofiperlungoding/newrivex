import { motion } from 'framer-motion';

interface CategoryFilterProps {
    selected: string;
    onSelect: (category: string) => void;
}

const CATEGORIES = [
    { id: 'tech', label: 'Technology' },
    { id: 'business', label: 'Business' },
    { id: 'science', label: 'Science' },
    { id: 'health', label: 'Health' },
    { id: 'entertainment', label: 'Entertainment' },
    { id: 'sports', label: 'Sports' },
    { id: 'general', label: 'General' },
    { id: 'all', label: 'All News' },
];

export const CategoryFilter = ({ selected, onSelect }: CategoryFilterProps) => {
    return (
        <div className="flex overflow-x-auto pb-4 gap-2 scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0">
            {CATEGORIES.map((category) => (
                <button
                    key={category.id}
                    onClick={() => onSelect(category.id)}
                    className={`
            relative px-6 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors
            ${selected === category.id ? 'text-black' : 'text-secondary hover:text-white bg-surface border border-white/10 hover:bg-white/5'}
          `}
                >
                    {selected === category.id && (
                        <motion.div
                            layoutId="activeCategory"
                            className="absolute inset-0 bg-white rounded-full"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                    )}
                    <span className="relative z-10">{category.label}</span>
                </button>
            ))}
        </div>
    );
};
