import { useState } from "react";
import { Globe, Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { COUNTRIES, searchCities } from "@/utils/countries";

interface CountrySelectorProps {
  onCitySelect: (city: string, country: string) => void;
}

export const CountrySelector = ({ onCitySelect }: CountrySelectorProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const filteredResults = searchQuery ? searchCities(searchQuery, 8) : [];

  const popularCities = [
    { city: "New York", country: "United States", code: "US" },
    { city: "London", country: "United Kingdom", code: "GB" },
    { city: "Tokyo", country: "Japan", code: "JP" },
    { city: "Paris", country: "France", code: "FR" },
    { city: "Mumbai", country: "India", code: "IN" },
    { city: "Sydney", country: "Australia", code: "AU" },
    { city: "Dubai", country: "United Arab Emirates", code: "AE" },
    { city: "Singapore", country: "Singapore", code: "SG" },
  ];

  return (
    <Card className="weather-card">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Explore Weather Worldwide</h3>
        </div>
        
        {!isExpanded ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {popularCities.map((item) => (
              <Button
                key={`${item.city}-${item.code}`}
                variant="outline"
                size="sm"
                onClick={() => onCitySelect(item.city, item.country)}
                className="justify-start h-auto p-3 text-left"
              >
                <div>
                  <div className="font-medium text-sm">{item.city}</div>
                  <div className="text-xs text-muted-foreground">{item.country}</div>
                </div>
              </Button>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search cities and countries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {filteredResults.length > 0 && (
              <div className="grid gap-2 max-h-60 overflow-y-auto">
                {filteredResults.map((item, index) => (
                  <Button
                    key={`${item.city}-${item.code}-${index}`}
                    variant="outline"
                    onClick={() => {
                      onCitySelect(item.city, item.country);
                      setIsExpanded(false);
                      setSearchQuery("");
                    }}
                    className="justify-start h-auto p-3 text-left"
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      <div>
                        <div className="font-medium text-sm">{item.city}</div>
                        <div className="text-xs text-muted-foreground">{item.country}</div>
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            )}
          </div>
        )}
        
        <Button
          variant="outline"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full"
        >
          {isExpanded ? "Show Popular Cities" : "Search All Countries"}
        </Button>
      </div>
    </Card>
  );
};