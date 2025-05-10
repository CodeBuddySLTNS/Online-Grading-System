import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NavigateBack = ({ onBackFn }) => {
  const navigate = useNavigate();
  const back = () => navigate(-1);
  return (
    <div
      className="w-full poppins flex justify-start mb-4 cursor-pointer"
      onClick={onBackFn || back}
    >
      <ChevronLeft />
      <p>Back</p>
    </div>
  );
};

export default NavigateBack;
