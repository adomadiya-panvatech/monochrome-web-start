
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
  
  // Mock functions for UI interactions (no actual API calls)
  createPost: async (data: { content: string; image_url?: string }) => {
    console.log('Mock create post:', data);
    return Promise.resolve({ id: Date.now(), ...data, author_id: 1, created_at: new Date().toISOString() } as Post);
  },
    
  createComment: async (data: { content: string; post_id: number }) => {
    console.log('Mock create comment:', data);
    return Promise.resolve({ id: Date.now(), ...data, author_id: 1, created_at: new Date().toISOString() } as Comment);
  },
};
