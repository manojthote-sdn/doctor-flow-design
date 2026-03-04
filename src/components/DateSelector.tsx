import { useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import {
  format,
  addDays,
  addMonths,
  startOfWeek,
  startOfMonth,
  endOfMonth,
  isSameDay,
  isSameMonth,
  getDay,
} from "date-fns";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type ViewMode = "day" | "week" | "month";

const DateSelector = ({
  selectedDate,
  onSelect,
}: {
  selectedDate: Date;
  onSelect: (date: Date) => void;
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>("week");
  const [weekStart, setWeekStart] = useState(() => startOfWeek(new Date(), { weekStartsOn: 1 }));
  const [currentDay, setCurrentDay] = useState(new Date());
  const [monthStart, setMonthStart] = useState(() => startOfMonth(new Date()));

  const handlePrev = () => {
    if (viewMode === "day") setCurrentDay(addDays(currentDay, -1));
    else if (viewMode === "week") setWeekStart(addDays(weekStart, -7));
    else setMonthStart(addMonths(monthStart, -1));
  };

  const handleNext = () => {
    if (viewMode === "day") setCurrentDay(addDays(currentDay, 1));
    else if (viewMode === "week") setWeekStart(addDays(weekStart, 7));
    else setMonthStart(addMonths(monthStart, 1));
  };

  const getHeaderLabel = () => {
    if (viewMode === "day") return format(currentDay, "EEEE, MMMM d, yyyy");
    if (viewMode === "week") return format(weekStart, "MMMM yyyy");
    return format(monthStart, "MMMM yyyy");
  };

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const getMonthDays = () => {
    const monthEnd = endOfMonth(monthStart);
    const startDay = getDay(monthStart);
    const adjustedStart = startDay === 0 ? 6 : startDay - 1; // Monday-based
    const totalDays = monthEnd.getDate();
    const cells: (Date | null)[] = [];

    for (let i = 0; i < adjustedStart; i++) cells.push(null);
    for (let i = 1; i <= totalDays; i++) {
      cells.push(new Date(monthStart.getFullYear(), monthStart.getMonth(), i));
    }
    return cells;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Select Date</h3>
        <CalendarDays className="h-5 w-5 text-primary" />
      </div>

      <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as ViewMode)}>
        <TabsList className="w-full">
          <TabsTrigger value="day" className="flex-1">Day</TabsTrigger>
          <TabsTrigger value="week" className="flex-1">Week</TabsTrigger>
          <TabsTrigger value="month" className="flex-1">Month</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex items-center justify-between">
        <button
          onClick={handlePrev}
          className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="text-sm font-medium text-foreground">{getHeaderLabel()}</span>
        <button
          onClick={handleNext}
          className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary transition-colors"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Day View */}
      {viewMode === "day" && (
        <div className="flex justify-center">
          <button
            onClick={() => onSelect(currentDay)}
            className={`flex flex-col items-center gap-2 rounded-xl py-6 px-10 text-center transition-all duration-200 ${
              isSameDay(currentDay, selectedDate)
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-card text-foreground hover:bg-secondary border border-border"
            }`}
          >
            <span className="text-3xl font-bold">{format(currentDay, "d")}</span>
            <span className="text-sm uppercase tracking-wide opacity-80">
              {format(currentDay, "EEEE")}
            </span>
          </button>
        </div>
      )}

      {/* Week View */}
      {viewMode === "week" && (
        <div className="grid grid-cols-7 gap-2">
          {weekDays.map((day) => {
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
      )}

      {/* Month View */}
      {viewMode === "month" && (
        <div>
          <div className="grid grid-cols-7 gap-1 mb-2">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
              <span key={d} className="text-[10px] text-center uppercase text-muted-foreground font-medium py-1">
                {d}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {getMonthDays().map((day, i) =>
              day ? (
                <button
                  key={day.toISOString()}
                  onClick={() => onSelect(day)}
                  className={`rounded-lg py-2 text-sm font-medium transition-all duration-200 ${
                    isSameDay(day, selectedDate)
                      ? "bg-primary text-primary-foreground shadow-md"
                      : !isSameMonth(day, monthStart)
                        ? "text-muted-foreground opacity-40"
                        : "text-foreground hover:bg-secondary"
                  }`}
                >
                  {format(day, "d")}
                </button>
              ) : (
                <div key={`empty-${i}`} />
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DateSelector;
