
import { cn } from "@/lib/utils";

interface PasswordStrengthProps {
  strength: number;
}

const PasswordStrength = ({ strength }: PasswordStrengthProps) => {
  const getStrengthClass = (index: number) => {
    if (index >= strength) return "bg-[#293145]";
    
    if (strength === 1) return "bg-[#ea384c]"; // Fraca - Vermelho
    if (strength === 2) return "bg-[#ffc107]"; // Média - Amarelo
    if (strength === 3) return "bg-[#2dc27d]"; // Forte - Verde
    if (strength === 4) return "bg-[#0FA0CE]"; // Muito forte - Azul
    
    return "bg-[#293145]";
  };
  
  return (
    <div className="flex gap-2 w-full h-2">
      <div className={cn("h-full flex-1 rounded-sm transition-colors duration-300", getStrengthClass(0))} />
      <div className={cn("h-full flex-1 rounded-sm transition-colors duration-300", getStrengthClass(1))} />
      <div className={cn("h-full flex-1 rounded-sm transition-colors duration-300", getStrengthClass(2))} />
      <div className={cn("h-full flex-1 rounded-sm transition-colors duration-300", getStrengthClass(3))} />
    </div>
  );
};

export default PasswordStrength;
