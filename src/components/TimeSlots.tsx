const TIME_SLOTS = [
  "09:00", "10:00", "11:00", "12:00", "13:00",
  "14:00", "15:00", "16:00", "17:00", "18:00",
  "19:00", "20:00", "21:00",
];

const TimeSlots = ({
  selectedTime,
  onSelect,
}: {
  selectedTime: string | null;
  onSelect: (time: string) => void;
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Select Time</h3>
      <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
        {TIME_SLOTS.map((time) => {
          const isSelected = time === selectedTime;
          return (
            <button
              key={time}
              onClick={() => onSelect(time)}
              className={`rounded-xl py-2.5 text-sm font-medium transition-all duration-200 ${
                isSelected
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-card text-foreground hover:bg-secondary border border-border"
              }`}
            >
              {time}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TimeSlots;
