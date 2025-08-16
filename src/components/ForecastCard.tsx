import { Card } from "@/components/ui/card";
import { WeatherIcon } from "./WeatherIcon";

interface ForecastData {
  date: string;
  temp_max: number;
  temp_min: number;
  description: string;
  icon: string;
}

interface ForecastCardProps {
  forecast: ForecastData;
  isCelsius: boolean;
  convertTemp: (temp: number) => number;
}

export const ForecastCard = ({ forecast, isCelsius, convertTemp }: ForecastCardProps) => {
  return (
    <Card className="weather-card text-center p-4 hover:scale-105 transition-transform">
      <div className="space-y-3">
        <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
          {forecast.date}
        </h4>
        
        <WeatherIcon iconCode={forecast.icon} size={32} />
        
        <div className="space-y-1">
          <p className="text-lg font-bold">
            {convertTemp(forecast.temp_max)}°
          </p>
          <p className="text-sm text-muted-foreground">
            {convertTemp(forecast.temp_min)}°
          </p>
        </div>
        
        <p className="text-xs text-muted-foreground capitalize">
          {forecast.description}
        </p>
      </div>
    </Card>
  );
};