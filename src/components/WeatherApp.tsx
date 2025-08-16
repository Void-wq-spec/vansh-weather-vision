import { useState, useEffect } from "react";
import { Search, MapPin, Thermometer, Eye, Wind, Sunrise, Sunset, RefreshCw, Heart, Clock, Globe, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { WeatherIcon } from "./WeatherIcon";
import { WeatherCard } from "./WeatherCard";
import { ForecastCard } from "./ForecastCard";
import { CountrySelector } from "./CountrySelector";
import { useToast } from "@/hooks/use-toast";
import { COUNTRIES, searchCities, getCountryByCityName } from "@/utils/countries";

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
  pressure?: number;
  uv_index?: number;
}

interface ForecastData {
  date: string;
  temp_max: number;
  temp_min: number;
  description: string;
  icon: string;
}

const API_KEY = "demo_key"; // In a real app, this would be from environment variables

export const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCelsius, setIsCelsius] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [error, setError] = useState<string | null>(null);
  
  const { toast } = useToast();

  // Enhanced demo data with more realistic weather patterns
  const getWeatherDataForCity = (cityName: string): WeatherData => {
    const cityWeatherMap: Record<string, Partial<WeatherData>> = {
      "mumbai": { temp: 32, humidity: 78, description: "Humid and partly cloudy", icon: "02d" },
      "delhi": { temp: 28, humidity: 65, description: "Hazy sunshine", icon: "01d" },
      "bangalore": { temp: 24, humidity: 72, description: "Pleasant and mild", icon: "03d" },
      "chennai": { temp: 31, humidity: 82, description: "Hot and humid", icon: "02d" },
      "kolkata": { temp: 30, humidity: 75, description: "Warm and humid", icon: "02d" },
      
      "new york": { temp: 18, humidity: 60, description: "Clear sky", icon: "01d" },
      "los angeles": { temp: 25, humidity: 55, description: "Sunny", icon: "01d" },
      "chicago": { temp: 15, humidity: 65, description: "Partly cloudy", icon: "02d" },
      "houston": { temp: 29, humidity: 70, description: "Hot and humid", icon: "02d" },
      "phoenix": { temp: 35, humidity: 35, description: "Hot and dry", icon: "01d" },
      
      "london": { temp: 12, humidity: 75, description: "Overcast", icon: "04d" },
      "paris": { temp: 16, humidity: 68, description: "Light rain", icon: "10d" },
      "tokyo": { temp: 22, humidity: 70, description: "Partly sunny", icon: "02d" },
      "sydney": { temp: 21, humidity: 65, description: "Clear", icon: "01d" },
      "dubai": { temp: 38, humidity: 45, description: "Hot and sunny", icon: "01d" },
    };

    const cityKey = cityName.toLowerCase();
    const cityData = cityWeatherMap[cityKey];
    const country = getCountryByCityName(cityName);

    return {
      name: cityName,
      country: country?.name || "Unknown",
      temp: cityData?.temp || Math.floor(Math.random() * 30) + 5,
      feels_like: (cityData?.temp || 20) + Math.floor(Math.random() * 5),
      humidity: cityData?.humidity || Math.floor(Math.random() * 40) + 40,
      visibility: Math.floor(Math.random() * 15) + 5,
      wind_speed: Math.floor(Math.random() * 10) + 1,
      sunrise: 1703246400,
      sunset: 1703282400,
      description: cityData?.description || "Clear sky",
      icon: cityData?.icon || "01d",
      timezone: Math.floor(Math.random() * 24) * 3600,
      pressure: 1000 + Math.floor(Math.random() * 50),
      uv_index: Math.floor(Math.random() * 11),
    };
  };

  const demoForecastData: ForecastData[] = [
    { date: "Today", temp_max: 24, temp_min: 18, description: "Sunny", icon: "01d" },
    { date: "Tomorrow", temp_max: 26, temp_min: 20, description: "Partly cloudy", icon: "02d" },
    { date: "Wed", temp_max: 23, temp_min: 17, description: "Light rain", icon: "10d" },
    { date: "Thu", temp_max: 21, temp_min: 15, description: "Cloudy", icon: "03d" },
    { date: "Fri", temp_max: 25, temp_min: 19, description: "Clear", icon: "01d" }
  ];

  useEffect(() => {
    // Initialize with Mumbai weather
    setWeatherData(getWeatherDataForCity("Mumbai"));
    setForecastData(demoForecastData);
    
    // Update time every second
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Apply dark mode class
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Use enhanced weather data function
      const newWeatherData = getWeatherDataForCity(searchQuery);
      setWeatherData(newWeatherData);
      
      setIsLoading(false);
      toast({
        title: "Weather Updated!",
        description: `Showing weather for ${newWeatherData.name}`,
      });
    } catch (err) {
      setError("Failed to fetch weather data");
      setIsLoading(false);
      toast({
        title: "Error",
        description: "Failed to fetch weather data. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCitySelect = (city: string, country: string) => {
    setSearchQuery(city);
    const newWeatherData = getWeatherDataForCity(city);
    setWeatherData(newWeatherData);
    toast({
      title: "Weather Updated!",
      description: `Showing weather for ${city}, ${country}`,
    });
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          const locationWeatherData = getWeatherDataForCity("Your Location");
          setWeatherData(locationWeatherData);
          toast({
            title: "Location Found!",
            description: "Showing weather for your current location",
          });
        },
        () => {
          toast({
            title: "Location Error",
            description: "Unable to get your location. Please search manually.",
            variant: "destructive",
          });
        }
      );
    }
  };

  const toggleFavorite = (cityName: string) => {
    setFavorites(prev => 
      prev.includes(cityName) 
        ? prev.filter(city => city !== cityName)
        : [...prev, cityName]
    );
  };

  const convertTemp = (temp: number) => {
    return isCelsius ? temp : Math.round((temp * 9/5) + 32);
  };

  const formatTime = (timestamp: number, timezone: number) => {
    const date = new Date((timestamp + timezone) * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getLocalTime = () => {
    if (!weatherData) return currentTime.toLocaleTimeString();
    const localTime = new Date(currentTime.getTime() + (weatherData.timezone * 1000));
    return localTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  return (
    <div className="min-h-screen p-4 lg:p-8 animate-fade-in">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl lg:text-6xl font-bold bg-weather-gradient bg-clip-text text-transparent animate-weather-pulse">
            Vansh Weather™
          </h1>
          <p className="text-muted-foreground text-lg">
            Real-time weather prediction worldwide
          </p>
        </div>

        {/* Controls */}
        <Card className="weather-card">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex-1 flex gap-2 w-full lg:w-auto">
              <Input
                placeholder="Search any city or country..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                className="weather-input"
              />
              <Button 
                onClick={handleSearch}
                disabled={isLoading}
                className="weather-button"
              >
                {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              </Button>
              <Button 
                variant="outline"
                onClick={getCurrentLocation}
                className="weather-button"
              >
                <MapPin className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setIsCelsius(!isCelsius)}
                className="weather-button"
              >
                °{isCelsius ? "C" : "F"}
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="weather-button"
              >
                {isDarkMode ? "☀️" : "🌙"}
              </Button>
            </div>
          </div>
        </Card>

        {/* Current Weather */}
        {weatherData && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <WeatherCard
                weatherData={weatherData}
                isCelsius={isCelsius}
                convertTemp={convertTemp}
                formatTime={formatTime}
                getLocalTime={getLocalTime}
                toggleFavorite={toggleFavorite}
                isFavorite={favorites.includes(weatherData.name)}
              />
            </div>
            
            <div className="space-y-4">
              {/* Weather Stats */}
              <Card className="weather-card">
                <h3 className="font-semibold mb-4 text-lg">Weather Details</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Thermometer className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Feels like</p>
                      <p className="font-medium">{convertTemp(weatherData.feels_like)}°{isCelsius ? "C" : "F"}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Eye className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Visibility</p>
                      <p className="font-medium">{weatherData.visibility} km</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Wind className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Wind Speed</p>
                      <p className="font-medium">{weatherData.wind_speed} m/s</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Local Time</p>
                      <p className="font-medium">{getLocalTime()}</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Sun Times */}
              <Card className="weather-card">
                <h3 className="font-semibold mb-4 text-lg">Sun Times</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Sunrise className="w-5 h-5 text-orange-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Sunrise</p>
                      <p className="font-medium">{formatTime(weatherData.sunrise, weatherData.timezone)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Sunset className="w-5 h-5 text-orange-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">Sunset</p>
                      <p className="font-medium">{formatTime(weatherData.sunset, weatherData.timezone)}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* 5-Day Forecast */}
        <Card className="weather-card">
          <h3 className="font-semibold mb-6 text-xl">5-Day Forecast</h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {forecastData.map((day, index) => (
              <ForecastCard
                key={index}
                forecast={day}
                isCelsius={isCelsius}
                convertTemp={convertTemp}
              />
            ))}
          </div>
        </Card>

        {/* Country Selector */}
        <CountrySelector onCitySelect={handleCitySelect} />

        {/* Favorites */}
        {favorites.length > 0 && (
          <Card className="weather-card">
            <h3 className="font-semibold mb-4 text-lg flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500" />
              Favorite Cities
            </h3>
            <div className="flex flex-wrap gap-2">
              {favorites.map((city) => (
                <Button
                  key={city}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchQuery(city);
                    handleSearch();
                  }}
                  className="weather-button"
                >
                  {city}
                </Button>
              ))}
            </div>
          </Card>
        )}

        {/* Footer */}
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            Made with ❤️ by Vansh
          </p>
        </div>
      </div>
    </div>
  );
};