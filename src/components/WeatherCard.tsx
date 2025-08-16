import { Heart, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { WeatherIcon } from "./WeatherIcon";

interface WeatherData {
  name: string;
  country: string;
  temp: number;
  feels_like: number;
  humidity: number;
  visibility: number;
  wind_speed: number;
  sunrise: number;
  sunset: number;
  description: string;
  icon: string;
  timezone: number;
}

interface WeatherCardProps {
  weatherData: WeatherData;
  isCelsius: boolean;
  convertTemp: (temp: number) => number;
  formatTime: (timestamp: number, timezone: number) => string;
  getLocalTime: () => string;
  toggleFavorite: (cityName: string) => void;
  isFavorite: boolean;
}

export const WeatherCard = ({
  weatherData,
  isCelsius,
  convertTemp,
  formatTime,
  getLocalTime,
  toggleFavorite,
  isFavorite,
}: WeatherCardProps) => {
  return (
    <Card className="weather-card animate-scale-in">
      <div className="flex flex-col lg:flex-row items-center gap-6">
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            <h2 className="text-2xl font-bold">
              {weatherData.name}, {weatherData.country}
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleFavorite(weatherData.name)}
              className={`ml-auto ${isFavorite ? "text-red-500" : "text-gray-400"}`}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`} />
            </Button>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="text-center">
              <WeatherIcon iconCode={weatherData.icon} size={80} />
              <p className="text-lg font-medium capitalize mt-2">
                {weatherData.description}
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-6xl font-bold bg-weather-gradient bg-clip-text text-transparent">
                {convertTemp(weatherData.temp)}°
              </div>
              <div className="text-lg text-muted-foreground">
                {isCelsius ? "Celsius" : "Fahrenheit"}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="text-center p-3 rounded-lg bg-secondary/50">
              <p className="text-sm text-muted-foreground">Humidity</p>
              <p className="text-xl font-semibold">{weatherData.humidity}%</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-secondary/50">
              <p className="text-sm text-muted-foreground">Wind</p>
              <p className="text-xl font-semibold">{weatherData.wind_speed} m/s</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};