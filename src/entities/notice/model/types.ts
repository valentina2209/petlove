export interface Notice {
  _id: string;
  species: string;
  category: 'sell' | 'free' | 'lost' | 'found';
  title: string;
  name: string;
  birthday: string; 
  sex: 'male' | 'female' | 'unknown' | 'multiple';
  comment: string;
  imgURL: string;
  popularity: number;
  location: string; 
  price?: number;  
  updatedAt?: string; 
  user?: {
    _id: string;
    phone: string;
    email: string;
  };     
  createdAt?: string;
}

export interface NoticesResponse {
  page: number;
  perPage: number;
  totalPages: number;
  results: Notice[];
}

// Додаємо City для ендпоїнту /cities
export interface City {
  _id: string;
  useCounty: string;
  stateEn: string;
  cityEn: string;
  countyEn: string;
}

export interface GetNoticesParams {
  page?: number;
  limit?: number;
  keyword?: string;
  category?: string;
  species?: string; // У ТЗ та документації це species
  sex?: string;
  locationId?: string; // Бекенд очікує ID локації
  // Параметри сортування з ТЗ
  byDate?: boolean;
  byPrice?: boolean;
  byPopularity?: boolean;
}