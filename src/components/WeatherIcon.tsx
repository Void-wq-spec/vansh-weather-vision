import { Sun, Cloud, CloudRain, CloudSnow, Zap, CloudDrizzle, Haze } from "lucide-react";

interface WeatherIconProps {
  iconCode: string;
  size?: number;
  className?: string;
}

export const WeatherIcon = ({ iconCode, size = 48, className = "" }: WeatherIconProps) => {
  const getIcon = () => {
    const iconProps = {
      size,
      className: `weather-icon ${className}`,
    };

    switch (iconCode) {
      case "01d":
      case "01n":
        return <Sun {...iconProps} className={`${iconProps.className} text-yellow-500`} />;
      
      case "02d":
      case "02n":
      case "03d":
      case "03n":
        return <Cloud {...iconProps} className={`${iconProps.className} text-gray-400`} />;
      
      case "04d":
      case "04n":
        return <Cloud {...iconProps} className={`${iconProps.className} text-gray-600`} />;
      
      case "09d":
      case "09n":
        return <CloudDrizzle {...iconProps} className={`${iconProps.className} text-blue-400`} />;
      
      case "10d":
      case "10n":
        return <CloudRain {...iconProps} className={`${iconProps.className} text-blue-500`} />;
      
      case "11d":
      case "11n":
        return <Zap {...iconProps} className={`${iconProps.className} text-yellow-600`} />;
      
      case "13d":
      case "13n":
        return <CloudSnow {...iconProps} className={`${iconProps.className} text-gray-300`} />;
      
      case "50d":
      case "50n":
        return <Haze {...iconProps} className={`${iconProps.className} text-gray-400`} />;
      
      default:
        return <Sun {...iconProps} className={`${iconProps.className} text-yellow-500`} />;
    }
  };

  return (
    <div className="flex items-center justify-center animate-weather-float">
      {getIcon()}
    </div>
  );
};