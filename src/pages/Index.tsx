import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import DoctorCard from "@/components/DoctorCard";
import DateSelector from "@/components/DateSelector";
import TimeSlots from "@/components/TimeSlots";
import BookingSummary from "@/components/BookingSummary";

const Index = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const { toast } = useToast();

  const handleConfirm = () => {
    toast({
      title: "Appointment Booked! ✅",
      description: `Your appointment has been confirmed for ${selectedTime}.`,
    });
  };

  return (
    <div className="page-wrapper gradient-teal">
      <div className="page-container">
        {/* Header */}
        <div className="header">
          <button className="header__back-btn">
            <ChevronLeft />
          </button>
          <h1 className="header__title">Appointment</h1>
        </div>

        {/* Content */}
        <div className="content">
          <div className="content__grid">
            <div className="content__left">
              <DoctorCard />
              <DateSelector selectedDate={selectedDate} onSelect={setSelectedDate} />
              <TimeSlots selectedTime={selectedTime} onSelect={setSelectedTime} />
            </div>

            <div className="content__right">
              <BookingSummary
                date={selectedDate}
                time={selectedTime}
                onConfirm={handleConfirm}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
