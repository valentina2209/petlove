import { Notice } from "@/entities/notice/model/types"; // правильний спільний тип
import { Pet } from "@/entities/pet/model/types";
export interface RegisterRequest {
  name: string
  email: string
  password: string
}

export interface AuthResponse {
  token: string
  user: {
    name: string
    email: string
  }
}

// export interface Notice {
//   _id: string;
//   species: string;
//   category: 'sell' | 'free' | 'lost' | 'found';
//   title: string;
//   name: string;
//   birthday: string; 
//   sex: 'male' | 'female' | 'unknown' | 'multiple';
//   comment: string;
//   imgURL: string;
//   popularity: number;
//   location: string; 
//   price?: number;  
//   updatedAt?: string; 
//   user?: string;      
//   createdAt?: string;
// }

export interface UserResponse {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  token: string;
  noticesFavorites: Notice[]; 
  noticesViewed: Notice[];
  pets: Pet[];
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  phone?: string;
  avatar?: string;
}

