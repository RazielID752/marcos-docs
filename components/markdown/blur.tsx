import { useState, ReactNode } from "react";
import { Eye, EyeOff } from 'lucide-react';

interface BlurTextProps {
  children: ReactNode; // Conteúdo flexível, pode ser texto, JSX ou componentes.
}

const BlurText: React.FC<BlurTextProps> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <div className="relative flex items-center">
      {/* Conteúdo com efeito de blur */}
      <div
        className={`text-gray-800 text-lg ${
          isVisible ? "blur-none" : "blur-md"
        } transition-all duration-300`}
      >
        {children}
      </div>

      {/* Botão do olho */}
      <button
        type="button"
        onClick={toggleVisibility}
        className="ml-2 p-1 text-gray-600 hover:text-gray-900 transition-all"
        aria-label={isVisible ? "Ocultar conteúdo" : "Mostrar conteúdo"}
      >
        {isVisible ? (
          <EyeOff className="w-6 h-6" />
        ) : (
          <Eye className="w-6 h-6" />
        )}
      </button>
    </div>
  );
};

export default BlurText;
