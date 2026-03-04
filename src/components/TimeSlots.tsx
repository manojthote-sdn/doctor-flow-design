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
    <div className="time-slots">
      <h3 className="time-slots__title">Select Time</h3>
      <div className="time-slots__grid">
        {TIME_SLOTS.map((time) => (
          <button
            key={time}
            onClick={() => onSelect(time)}
            className={`time-slot ${time === selectedTime ? "time-slot--selected" : ""}`}
          >
            {time}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimeSlots;
