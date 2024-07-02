// src/wines/interfaces/wine.interface.ts
import { Document } from 'mongoose';
import { User } from '../interfaces/user.interface';

export interface Review {
  user: User | string; // Puede ser un objeto User o simplemente el ID del usuario
  rating: number;
  comment: string;
  date: Date;
}

export interface Wine extends Document {
  name: string;
  description?: string;
  reviews: Review[];
}
