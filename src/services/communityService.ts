
import { api } from './api';

export interface CommunityGroup {
  id: number;
  name: string;
  description: string;
  member_count?: number;
  image_url?: string;
}

export interface Community {
  id: number;
  name: string;
  description: string;
}

export const communityService = {
  // Get all community groups
  getCommunityGroups: () => api.get<CommunityGroup[]>('/community-groups'),
  
  // Get specific community group
  getCommunityGroup: (id: number) => api.get<CommunityGroup>(`/community-groups/${id}`),
  
  // Get communities
  getCommunities: () => api.get<Community[]>('/community'),
  
  // Get user relationships (for checking if user joined)
  getUserRelationships: () => api.get<any[]>('/user-relationships'),
};
