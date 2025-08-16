export const COUNTRIES = [
  // Major Countries
  { name: "United States", code: "US", cities: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"] },
  { name: "India", code: "IN", cities: ["Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata"] },
  { name: "China", code: "CN", cities: ["Beijing", "Shanghai", "Guangzhou", "Shenzhen", "Chengdu"] },
  { name: "United Kingdom", code: "GB", cities: ["London", "Manchester", "Birmingham", "Liverpool", "Leeds"] },
  { name: "Germany", code: "DE", cities: ["Berlin", "Munich", "Hamburg", "Cologne", "Frankfurt"] },
  { name: "France", code: "FR", cities: ["Paris", "Lyon", "Marseille", "Toulouse", "Nice"] },
  { name: "Japan", code: "JP", cities: ["Tokyo", "Osaka", "Kyoto", "Yokohama", "Nagoya"] },
  { name: "Australia", code: "AU", cities: ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide"] },
  { name: "Canada", code: "CA", cities: ["Toronto", "Vancouver", "Montreal", "Calgary", "Ottawa"] },
  { name: "Brazil", code: "BR", cities: ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador", "Fortaleza"] },
  
  // European Countries
  { name: "Italy", code: "IT", cities: ["Rome", "Milan", "Naples", "Turin", "Florence"] },
  { name: "Spain", code: "ES", cities: ["Madrid", "Barcelona", "Valencia", "Seville", "Bilbao"] },
  { name: "Netherlands", code: "NL", cities: ["Amsterdam", "Rotterdam", "The Hague", "Utrecht", "Eindhoven"] },
  { name: "Switzerland", code: "CH", cities: ["Zurich", "Geneva", "Basel", "Bern", "Lausanne"] },
  { name: "Sweden", code: "SE", cities: ["Stockholm", "Gothenburg", "Malmö", "Uppsala", "Västerås"] },
  { name: "Norway", code: "NO", cities: ["Oslo", "Bergen", "Stavanger", "Trondheim", "Drammen"] },
  { name: "Denmark", code: "DK", cities: ["Copenhagen", "Aarhus", "Odense", "Aalborg", "Esbjerg"] },
  { name: "Finland", code: "FI", cities: ["Helsinki", "Espoo", "Tampere", "Vantaa", "Oulu"] },
  { name: "Russia", code: "RU", cities: ["Moscow", "Saint Petersburg", "Novosibirsk", "Yekaterinburg", "Nizhny Novgorod"] },
  { name: "Poland", code: "PL", cities: ["Warsaw", "Kraków", "Łódź", "Wrocław", "Poznań"] },
  
  // Asian Countries
  { name: "South Korea", code: "KR", cities: ["Seoul", "Busan", "Incheon", "Daegu", "Daejeon"] },
  { name: "Thailand", code: "TH", cities: ["Bangkok", "Chiang Mai", "Phuket", "Pattaya", "Hat Yai"] },
  { name: "Singapore", code: "SG", cities: ["Singapore"] },
  { name: "Malaysia", code: "MY", cities: ["Kuala Lumpur", "George Town", "Ipoh", "Johor Bahru", "Malacca"] },
  { name: "Indonesia", code: "ID", cities: ["Jakarta", "Surabaya", "Bandung", "Medan", "Semarang"] },
  { name: "Philippines", code: "PH", cities: ["Manila", "Quezon City", "Davao", "Cebu", "Zamboanga"] },
  { name: "Vietnam", code: "VN", cities: ["Ho Chi Minh City", "Hanoi", "Da Nang", "Hai Phong", "Can Tho"] },
  { name: "Turkey", code: "TR", cities: ["Istanbul", "Ankara", "Izmir", "Bursa", "Antalya"] },
  
  // Middle Eastern Countries
  { name: "United Arab Emirates", code: "AE", cities: ["Dubai", "Abu Dhabi", "Sharjah", "Al Ain", "Ajman"] },
  { name: "Saudi Arabia", code: "SA", cities: ["Riyadh", "Jeddah", "Mecca", "Medina", "Dammam"] },
  { name: "Israel", code: "IL", cities: ["Tel Aviv", "Jerusalem", "Haifa", "Rishon LeZion", "Petah Tikva"] },
  { name: "Iran", code: "IR", cities: ["Tehran", "Mashhad", "Isfahan", "Karaj", "Shiraz"] },
  
  // African Countries
  { name: "South Africa", code: "ZA", cities: ["Cape Town", "Johannesburg", "Durban", "Pretoria", "Port Elizabeth"] },
  { name: "Egypt", code: "EG", cities: ["Cairo", "Alexandria", "Giza", "Luxor", "Aswan"] },
  { name: "Nigeria", code: "NG", cities: ["Lagos", "Abuja", "Kano", "Ibadan", "Port Harcourt"] },
  { name: "Kenya", code: "KE", cities: ["Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret"] },
  { name: "Morocco", code: "MA", cities: ["Casablanca", "Rabat", "Marrakech", "Fez", "Tangier"] },
  
  // South American Countries
  { name: "Argentina", code: "AR", cities: ["Buenos Aires", "Córdoba", "Rosario", "Mendoza", "La Plata"] },
  { name: "Chile", code: "CL", cities: ["Santiago", "Valparaíso", "Concepción", "La Serena", "Antofagasta"] },
  { name: "Colombia", code: "CO", cities: ["Bogotá", "Medellín", "Cali", "Barranquilla", "Cartagena"] },
  { name: "Peru", code: "PE", cities: ["Lima", "Arequipa", "Trujillo", "Chiclayo", "Piura"] },
  { name: "Mexico", code: "MX", cities: ["Mexico City", "Guadalajara", "Monterrey", "Puebla", "Tijuana"] },
];

export const getCountryByCityName = (cityName: string) => {
  for (const country of COUNTRIES) {
    if (country.cities.some(city => city.toLowerCase().includes(cityName.toLowerCase()))) {
      return country;
    }
  }
  return null;
};

export const getAllCities = () => {
  return COUNTRIES.flatMap(country => 
    country.cities.map(city => ({
      city,
      country: country.name,
      code: country.code
    }))
  );
};

export const searchCities = (query: string, limit: number = 10) => {
  const allCities = getAllCities();
  return allCities
    .filter(item => 
      item.city.toLowerCase().includes(query.toLowerCase()) ||
      item.country.toLowerCase().includes(query.toLowerCase())
    )
    .slice(0, limit);
};