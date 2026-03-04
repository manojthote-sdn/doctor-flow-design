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
import * as TabsPrimitive from "@radix-ui/react-tabs";

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
    const adjustedStart = startDay === 0 ? 6 : startDay - 1;
    const totalDays = monthEnd.getDate();
    const cells: (Date | null)[] = [];

    for (let i = 0; i < adjustedStart; i++) cells.push(null);
    for (let i = 1; i <= totalDays; i++) {
      cells.push(new Date(monthStart.getFullYear(), monthStart.getMonth(), i));
    }
    return cells;
  };

  return (
    <div className="date-selector">
      <div className="date-selector__header">
        <h3 className="date-selector__title">Select Date</h3>
        <CalendarDays className="date-selector__icon" />
      </div>

      <TabsPrimitive.Root value={viewMode} onValueChange={(v) => setViewMode(v as ViewMode)}>
        <TabsPrimitive.List className="tabs-list">
          <TabsPrimitive.Trigger value="day" className="tab-trigger">Day</TabsPrimitive.Trigger>
          <TabsPrimitive.Trigger value="week" className="tab-trigger">Week</TabsPrimitive.Trigger>
          <TabsPrimitive.Trigger value="month" className="tab-trigger">Month</TabsPrimitive.Trigger>
        </TabsPrimitive.List>
      </TabsPrimitive.Root>

      <div className="date-nav">
        <button onClick={handlePrev} className="date-nav__btn">
          <ChevronLeft />
        </button>
        <span className="date-nav__label">{getHeaderLabel()}</span>
        <button onClick={handleNext} className="date-nav__btn">
          <ChevronRight />
        </button>
      </div>

      {/* Day View */}
      {viewMode === "day" && (
        <div className="day-view">
          <button
            onClick={() => onSelect(currentDay)}
            className={`day-card ${isSameDay(currentDay, selectedDate) ? "day-card--selected" : ""}`}
          >
            <span className="day-card__number">{format(currentDay, "d")}</span>
            <span className="day-card__name">{format(currentDay, "EEEE")}</span>
          </button>
        </div>
      )}

      {/* Week View */}
      {viewMode === "week" && (
        <div className="week-grid">
          {weekDays.map((day) => (
            <button
              key={day.toISOString()}
              onClick={() => onSelect(day)}
              className={`week-day ${isSameDay(day, selectedDate) ? "week-day--selected" : ""}`}
            >
              <span className="week-day__number">{format(day, "d")}</span>
              <span className="week-day__name">{format(day, "EEE")}</span>
            </button>
          ))}
        </div>
      )}

      {/* Month View */}
      {viewMode === "month" && (
        <div>
          <div className="month-header">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
              <span key={d} className="month-header__day">{d}</span>
            ))}
          </div>
          <div className="month-grid">
            {getMonthDays().map((day, i) =>
              day ? (
                <button
                  key={day.toISOString()}
                  onClick={() => onSelect(day)}
                  className={`month-day ${
                    isSameDay(day, selectedDate)
                      ? "month-day--selected"
                      : !isSameMonth(day, monthStart)
                        ? "month-day--other-month"
                        : ""
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
