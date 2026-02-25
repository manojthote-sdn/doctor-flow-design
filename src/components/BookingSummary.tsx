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
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Booking Summary</h3>
      <div className="rounded-xl bg-card border border-border p-4 space-y-3">
        <div className="flex items-center gap-3 text-sm">
          <Calendar className="h-4 w-4 text-primary" />
          <span className="text-muted-foreground">Date:</span>
          <span className="ml-auto font-medium text-foreground">
            {format(date, "EEEE, MMMM d, yyyy")}
          </span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Clock className="h-4 w-4 text-primary" />
          <span className="text-muted-foreground">Time:</span>
          <span className="ml-auto font-medium text-foreground">
            {time || "Not selected"}
          </span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <DollarSign className="h-4 w-4 text-primary" />
          <span className="text-muted-foreground">Total:</span>
          <span className="ml-auto font-semibold text-foreground">$200.00</span>
        </div>
      </div>
      <button
        onClick={onConfirm}
        disabled={!time}
        className="w-full rounded-xl bg-primary py-4 text-base font-semibold text-primary-foreground shadow-lg transition-all duration-200 hover:opacity-90 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Confirm Booking
      </button>
    </div>
  );
};

export default BookingSummary;
