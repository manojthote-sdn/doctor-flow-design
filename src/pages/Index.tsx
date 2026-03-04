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
    <div className="min-h-screen gradient-teal">
      <div className="mx-auto max-w-lg lg:max-w-4xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center gap-3 bg-background/80 backdrop-blur-md px-4 py-4 lg:px-6">
          <button className="rounded-lg p-2 hover:bg-secondary transition-colors">
            <ChevronLeft className="h-5 w-5 text-foreground" />
          </button>
          <h1 className="text-xl font-bold text-foreground">Appointment</h1>
        </div>

        {/* Content */}
        <div className="px-4 pb-8 lg:px-6">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8">
            {/* Left column */}
            <div className="space-y-6">
              <DoctorCard />
              <DateSelector
                selectedDate={selectedDate}
                onSelect={setSelectedDate}
                selectedTime={selectedTime}
                onSelectTime={(time) => setSelectedTime(time)}
              />
              <TimeSlots selectedTime={selectedTime} onSelect={setSelectedTime} />
            </div>

            {/* Right column */}
            <div className="mt-6 lg:mt-0 space-y-6">
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
