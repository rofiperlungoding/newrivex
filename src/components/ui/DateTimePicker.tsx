import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, CaretLeft, CaretRight, X } from '@phosphor-icons/react';
import { cn } from '../../lib/utils';

interface DateTimePickerProps {
    value: string; // ISO string
    onChange: (value: string) => void;
}

export const DateTimePicker = ({ value, onChange }: DateTimePickerProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [viewDate, setViewDate] = useState(new Date()); // For calendar navigation
    const [selectedDate, setSelectedDate] = useState<Date | null>(value ? new Date(value) : null);
    const [time, setTime] = useState(value ? new Date(value).toTimeString().slice(0, 5) : '12:00');

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (value) {
            const date = new Date(value);
            setSelectedDate(date);
            setTime(date.toTimeString().slice(0, 5));
        } else {
            setSelectedDate(null);
        }
    }, [value]);

    const handleDateSelect = (date: Date) => {
        const newDate = new Date(date);
        const [hours, minutes] = time.split(':').map(Number);
        newDate.setHours(hours, minutes);
        setSelectedDate(newDate);
        onChange(newDate.toISOString());
    };

    const handleTimeChange = (newTime: string) => {
        setTime(newTime);
        if (selectedDate) {
            const newDate = new Date(selectedDate);
            const [hours, minutes] = newTime.split(':').map(Number);
            newDate.setHours(hours, minutes);
            onChange(newDate.toISOString());
        }
    };

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const days = new Date(year, month + 1, 0).getDate();
        const firstDay = new Date(year, month, 1).getDay();
        return { days, firstDay };
    };

    const { days, firstDay } = getDaysInMonth(viewDate);
    const daysArray = Array.from({ length: days }, (_, i) => i + 1);
    const blanksArray = Array.from({ length: firstDay }, (_, i) => i);

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const quickTimes = ["09:00", "12:00", "15:00", "18:00", "20:00"];

    const formatDateDisplay = (date: Date | null) => {
        if (!date) return "Set Due Date";
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="relative" ref={containerRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all text-xs font-medium",
                    selectedDate
                        ? "bg-mint/10 border-mint/20 text-mint"
                        : "bg-black/20 border-white/5 text-secondary hover:text-primary hover:bg-white/5"
                )}
            >
                <CalendarIcon size={14} weight={selectedDate ? "fill" : "regular"} />
                <span>{formatDateDisplay(selectedDate)}</span>
                {selectedDate && (
                    <div
                        onClick={(e) => {
                            e.stopPropagation();
                            onChange('');
                            setSelectedDate(null);
                        }}
                        className="hover:bg-mint/20 rounded-full p-0.5 ml-1"
                    >
                        <X size={10} />
                    </div>
                )}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute bottom-full left-0 mb-2 w-[300px] h-[520px] bg-[#1A1A1A] border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-3 border-b border-white/5 bg-white/5">
                            <button
                                type="button"
                                onClick={() => setViewDate(new Date(viewDate.setMonth(viewDate.getMonth() - 1)))}
                                className="p-1 hover:bg-white/10 rounded-lg text-secondary hover:text-white transition-colors"
                            >
                                <CaretLeft size={16} />
                            </button>
                            <span className="text-sm font-medium">
                                {monthNames[viewDate.getMonth()]} {viewDate.getFullYear()}
                            </span>
                            <button
                                type="button"
                                onClick={() => setViewDate(new Date(viewDate.setMonth(viewDate.getMonth() + 1)))}
                                className="p-1 hover:bg-white/10 rounded-lg text-secondary hover:text-white transition-colors"
                            >
                                <CaretRight size={16} />
                            </button>
                        </div>

                        <div className="p-3">
                            {/* Calendar Grid */}
                            <div className="grid grid-cols-7 gap-1 mb-4 text-center min-h-[212px]">
                                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                                    <span key={d} className="text-[10px] text-secondary font-medium uppercase">{d}</span>
                                ))}

                                {/* Fill empty slots for previous month */}
                                {blanksArray.map(i => (
                                    <div key={`blank-${i}`} />
                                ))}

                                {/* Days of current month */}
                                {daysArray.map(day => {
                                    const date = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
                                    const isSelected = selectedDate &&
                                        date.getDate() === selectedDate.getDate() &&
                                        date.getMonth() === selectedDate.getMonth() &&
                                        date.getFullYear() === selectedDate.getFullYear();
                                    const isToday = new Date().toDateString() === date.toDateString();

                                    return (
                                        <button
                                            key={day}
                                            type="button"
                                            onClick={() => handleDateSelect(date)}
                                            className={cn(
                                                "h-8 w-8 rounded-lg text-xs flex items-center justify-center transition-all",
                                                isSelected
                                                    ? "bg-mint text-black font-bold shadow-lg shadow-mint/20"
                                                    : isToday
                                                        ? "bg-white/10 text-white font-medium"
                                                        : "text-secondary hover:bg-white/5 hover:text-white"
                                            )}
                                        >
                                            {day}
                                        </button>
                                    );
                                })}

                                {/* Fill remaining slots to ensure 6 rows (42 cells total) */}
                                {Array.from({ length: 42 - (days + firstDay) }).map((_, i) => (
                                    <div key={`end-blank-${i}`} className="h-8 w-8" />
                                ))}
                            </div>

                            {/* Time Selection */}
                            <div className="border-t border-white/5 pt-3">
                                <div className="flex items-center gap-2 mb-2">
                                    <Clock size={14} className="text-secondary" />
                                    <span className="text-xs font-medium text-secondary">Time</span>
                                </div>
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {quickTimes.map(t => (
                                        <button
                                            key={t}
                                            type="button"
                                            onClick={() => handleTimeChange(t)}
                                            className={cn(
                                                "px-2 py-1 rounded-md text-xs border transition-colors",
                                                time === t
                                                    ? "bg-white/10 border-white/20 text-white"
                                                    : "border-transparent bg-black/20 text-secondary hover:text-white"
                                            )}
                                        >
                                            {t}
                                        </button>
                                    ))}
                                </div>
                                <div className="flex gap-2 h-32 mt-2">
                                    {/* Hours */}
                                    <div className="flex-1 flex flex-col gap-1 overflow-y-auto scrollbar-hide pr-1">
                                        {Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0')).map(h => (
                                            <button
                                                key={h}
                                                type="button"
                                                onClick={() => handleTimeChange(`${h}:${time.split(':')[1]}`)}
                                                className={cn(
                                                    "py-1.5 px-2 rounded-lg text-xs transition-colors shrink-0 text-center",
                                                    time.split(':')[0] === h
                                                        ? "bg-mint text-black font-bold shadow-lg shadow-mint/20"
                                                        : "text-secondary hover:bg-white/5 hover:text-white"
                                                )}
                                            >
                                                {h}
                                            </button>
                                        ))}
                                    </div>

                                    <div className="flex items-center text-white/20 font-bold">:</div>

                                    {/* Minutes */}
                                    <div className="flex-1 flex flex-col gap-1 overflow-y-auto scrollbar-hide pl-1">
                                        {Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0')).map(m => (
                                            <button
                                                key={m}
                                                type="button"
                                                onClick={() => handleTimeChange(`${time.split(':')[0]}:${m}`)}
                                                className={cn(
                                                    "py-1.5 px-2 rounded-lg text-xs transition-colors shrink-0 text-center",
                                                    time.split(':')[1] === m
                                                        ? "bg-mint text-black font-bold shadow-lg shadow-mint/20"
                                                        : "text-secondary hover:bg-white/5 hover:text-white"
                                                )}
                                            >
                                                {m}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
