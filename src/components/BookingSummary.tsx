import { format } from "date-fns";
import { Calendar, Clock, DollarSign } from "lucide-react";

const BookingSummary = ({
  date,
  time,
  onConfirm,
}: {
  date: Date;
  time: string | null;
  onConfirm: () => void;
}) => {
  return (
    <div className="booking-summary">
      <h3 className="booking-summary__title">Booking Summary</h3>
      <div className="booking-summary__card">
        <div className="booking-summary__row">
          <Calendar />
          <span className="booking-summary__label">Date:</span>
          <span className="booking-summary__value">
            {format(date, "EEEE, MMMM d, yyyy")}
          </span>
        </div>
        <div className="booking-summary__row">
          <Clock />
          <span className="booking-summary__label">Time:</span>
          <span className="booking-summary__value">
            {time || "Not selected"}
          </span>
        </div>
        <div className="booking-summary__row">
          <DollarSign />
          <span className="booking-summary__label">Total:</span>
          <span className="booking-summary__value booking-summary__value--bold">
            $200.00
          </span>
        </div>
      </div>
      <button
        onClick={onConfirm}
        disabled={!time}
        className="booking-summary__confirm"
      >
        Confirm Booking
      </button>
    </div>
  );
};

export default BookingSummary;
