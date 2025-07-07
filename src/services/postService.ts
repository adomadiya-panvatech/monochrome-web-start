
import { api } from './api';

export interface Post {
  id: number;
  content: string;
  author_id: number;
  author_name?: string;
  created_at: string;
  likes_count?: number;
  comments_count?: number;
  image_url?: string;
}

export interface Comment {
  id: number;
  content: string;
  author_id: number;
  author_name?: string;
  post_id: number;
  created_at: string;
}

export interface UserReaction {
  id: number;
  user_id: number;
  target_id: number;
  target_type: string;
  reaction_type: string;
}

export const postService = {
  // Posts
  getFeedItems: () => api.get<Post[]>('/feed-items'),
  getFeedItem: (id: number) => api.get<Post>(`/feed-items/${id}`),
  
  // Comments
  getComments: () => api.get<Comment[]>('/comments'),
  getCommentsForReaction: (id: number) => api.get<Comment[]>(`/comments/${id}/for_reaction`),
  
  // Reactions/Likes
  getUserReactions: () => api.get<UserReaction[]>('/user-reactions'),
  
  // Create post (this would be a POST request to your backend)
  createPost: (data: { content: string; image_url?: string }) => 
    api.post<Post>('/feed-items', data),
    
  // Create comment
  createComment: (data: { content: string; post_id: number }) => 
    api.post<Comment>('/comments', data),
};
