import doctorImage from "@/assets/doctor-nancy.jpg";
import { Badge } from "@/components/ui/badge";
import { Clock, DollarSign } from "lucide-react";

const DoctorCard = () => {
  return (
    <div className="flex items-center gap-4 rounded-xl bg-card p-4 shadow-sm border border-border">
      <img
        src={doctorImage}
        alt="Dr. Nancy Becc"
        className="h-16 w-16 rounded-xl object-cover"
      />
      <div className="flex flex-col gap-1.5">
        <h2 className="text-lg font-semibold text-foreground">Dr. Nancy Becc</h2>
        <p className="text-sm text-muted-foreground">Neurologist</p>
        <div className="flex gap-2">
          <Badge variant="secondary" className="gap-1 text-xs font-normal">
            <Clock className="h-3 w-3" /> 6 years
          </Badge>
          <Badge variant="secondary" className="gap-1 text-xs font-normal">
            <DollarSign className="h-3 w-3" /> 200 / hr
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
