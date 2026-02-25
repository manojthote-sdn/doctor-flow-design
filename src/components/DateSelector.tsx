import { useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { format, addDays, startOfWeek, isSameDay } from "date-fns";

const DateSelector = ({
  selectedDate,
  onSelect,
}: {
  selectedDate: Date;
  onSelect: (date: Date) => void;
}) => {
  const [weekStart, setWeekStart] = useState(() => startOfWeek(new Date(), { weekStartsOn: 1 }));

  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Select Date</h3>
        <CalendarDays className="h-5 w-5 text-primary" />
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={() => setWeekStart(addDays(weekStart, -7))}
          className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="text-sm font-medium text-foreground">
          {format(weekStart, "MMMM yyyy")}
        </span>
        <button
          onClick={() => setWeekStart(addDays(weekStart, 7))}
          className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary transition-colors"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days.map((day) => {
          const isSelected = isSameDay(day, selectedDate);
          return (
            <button
              key={day.toISOString()}
              onClick={() => onSelect(day)}
              className={`flex flex-col items-center gap-1 rounded-xl py-2.5 px-1 text-center transition-all duration-200 ${
                isSelected
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-card text-foreground hover:bg-secondary border border-border"
              }`}
            >
              <span className="text-base font-semibold">{format(day, "d")}</span>
              <span className="text-[10px] uppercase tracking-wide opacity-80">
                {format(day, "EEE")}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DateSelector;
