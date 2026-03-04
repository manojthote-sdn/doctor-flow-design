import doctorImage from "@/assets/doctor-nancy.jpg";

const DoctorCard = () => {
  return (
    <div className="doctor-card">
      <img
        src={doctorImage}
        alt="Dr. Nancy Becc"
        className="doctor-card__image"
      />
      <div className="doctor-card__info">
        <h2 className="doctor-card__name">Dr. Nancy Becc</h2>
        <p className="doctor-card__specialty">Neurologist</p>
      </div>
    </div>
  );
};

export default DoctorCard;
