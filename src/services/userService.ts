
import { api } from './api';

export interface User {
  id: number;
  name: string;
  email: string;
  avatar_url?: string;
  created_at: string;
}

export interface TrackingEntry {
  id: number;
  user_id: number;
  activity_id: number;
  value: number;
  date: string;
}

export const userService = {
  // Users
  getUsers: () => api.get<User[]>('/users'),
  getUser: (id: number) => api.get<User>(`/users/${id}`),
  
  // Tracking
  getTrackingEntries: () => api.get<TrackingEntry[]>('/tracking-entries'),
  
  // User habits
  getUserHabits: (userId: number) => api.get<any[]>(`/user-habits/user/${userId}`),
};
