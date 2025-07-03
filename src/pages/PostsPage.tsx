import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Heart, MessageCircle, Share2, Plus, Image, Send } from 'lucide-react';

interface Comment {
  id: number;
  author: string;
  avatar: string;
  content: string;
  time: string;
}

interface Post {
  id: number;
  author: string;
  avatar: string;
  time: string;
  content: string;
  image?: string;
  likes: number;
  comments: Comment[];
  isLiked: boolean;
}

const PostsPage = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: 'Sarah Johnson',
      avatar: 'SJ',
      time: '2 hours ago',
      content: 'Just completed my morning yoga session! 🧘‍♀️ Starting the day with mindfulness makes such a difference. Who else loves morning workouts?',
      image: '/lovable-uploads/e3fa7127-e6a6-4676-bfbb-2ae5cb1b4d22.png',
      likes: 42,
      comments: [
        { id: 1, author: 'Mike Chen', avatar: 'MC', content: 'Love your consistency! Yoga is amazing.', time: '1 hour ago' },
        { id: 2, author: 'Emma Wilson', avatar: 'EW', content: 'This inspires me to start my own morning routine!', time: '30 minutes ago' }
      ],
      isLiked: false
    },
    {
      id: 2,
      author: 'Mike Chen',
      avatar: 'MC',
      time: '4 hours ago',
      content: 'Meal prep Sunday is done! 🥗 Prepared healthy lunches for the entire week. Consistency is key to maintaining a healthy lifestyle.',
      likes: 28,
      comments: [
        { id: 3, author: 'Sarah Johnson', avatar: 'SJ', content: 'Those meals look so colorful and healthy!', time: '3 hours ago' }
      ],
      isLiked: true
    },
    {
      id: 3,
      author: 'Emma Wilson',
      avatar: 'EW',
      time: '6 hours ago',
      content: 'Finally hit my 10,000 steps goal today! 🚶‍♀️ Small victories matter. Every step counts towards our wellness journey.',
      likes: 35,
      comments: [],
      isLiked: false
    }
  ]);

  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPost, setNewPost] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [commentInputs, setCommentInputs] = useState<{[key: number]: string}>({});

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1
          }
        : post
    ));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreatePost = () => {
    if (newPost.trim()) {
      const newPostObj: Post = {
        id: posts.length + 1,
        author: 'You',
        avatar: 'Y',
        time: 'Just now',
        content: newPost,
        image: selectedImage || undefined,
        likes: 0,
        comments: [],
        isLiked: false
      };
      setPosts([newPostObj, ...posts]);
      setNewPost('');
      setSelectedImage(null);
      setShowCreatePost(false);
    }
  };

  const handleAddComment = (postId: number) => {
    const commentText = commentInputs[postId];
    if (commentText?.trim()) {
      const newComment: Comment = {
        id: Date.now(),
        author: 'You',
        avatar: 'Y',
        content: commentText,
        time: 'Just now'
      };

      setPosts(posts.map(post => 
        post.id === postId 
          ? { ...post, comments: [...post.comments, newComment] }
          : post
      ));

      setCommentInputs(prev => ({
        ...prev,
        [postId]: ''
      }));
    }
  };

  const updateCommentInput = (postId: number, value: string) => {
    setCommentInputs(prev => ({
      ...prev,
      [postId]: value
    }));
  };

  return (
    <div>
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-pink-400 to-purple-500 rounded-3xl p-8 mb-8 text-white relative overflow-hidden">
        <div className="absolute top-4 right-8">
          <Heart className="w-12 h-12 opacity-20" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Posts</h1>
        <p className="text-pink-100">Share your wellness journey with the community</p>
      </div>

      {/* Create Post Button */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarFallback className="bg-black text-white">Y</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Button 
                variant="outline" 
                className="w-full justify-start text-gray-500"
                onClick={() => setShowCreatePost(true)}
              >
                What's on your mind?
              </Button>
            </div>
          </div>
          {showCreatePost && (
            <div className="mt-4 space-y-4">
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="Share your wellness journey..."
                className="w-full p-4 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-black"
                rows={4}
              />
              {selectedImage && (
                <div className="relative">
                  <img src={selectedImage} alt="Selected" className="w-full h-64 object-cover rounded-lg" />
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="absolute top-2 right-2 bg-white"
                    onClick={() => setSelectedImage(null)}
                  >
                    ×
                  </Button>
                </div>
              )}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <label className="cursor-pointer">
                    <Button variant="ghost" size="sm" asChild>
                      <span>
                        <Image className="w-4 h-4 mr-2" />
                        Photo
                      </span>
                    </Button>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" onClick={() => setShowCreatePost(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreatePost} disabled={!newPost.trim()}>
                    <Send className="w-4 h-4 mr-2" />
                    Post
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Posts Feed */}
      <div className="space-y-6">
        {posts.map((post) => (
          <Card key={post.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              {/* Post Header */}
              <div className="flex items-center space-x-4 mb-4">
                <Avatar>
                  <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                    {post.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{post.author}</h3>
                  <p className="text-gray-500 text-sm">{post.time}</p>
                </div>
              </div>

              {/* Post Content */}
              <p className="text-gray-700 mb-4 leading-relaxed">{post.content}</p>

              {/* Post Image (if exists) */}
              {post.image && (
                <div className="mb-4">
                  <img 
                    src={post.image} 
                    alt="Post content" 
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
              )}

              {/* Post Actions */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center space-x-6">
                  <button 
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center space-x-2 transition-colors ${
                      post.isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
                    <span>{post.likes}</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors">
                    <MessageCircle className="w-5 h-5" />
                    <span>{post.comments.length}</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors">
                    <Share2 className="w-5 h-5" />
                    <span>Share</span>
                  </button>
                </div>
              </div>

              {/* Comments Section */}
              <div className="mt-4 pt-4 border-t space-y-4">
                {/* Existing Comments */}
                {post.comments.map((comment) => (
                  <div key={comment.id} className="flex space-x-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-gray-300 text-gray-600 text-xs">
                        {comment.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="bg-gray-100 rounded-lg p-3">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-semibold text-sm">{comment.author}</span>
                          <span className="text-xs text-gray-500">{comment.time}</span>
                        </div>
                        <p className="text-sm text-gray-700">{comment.content}</p>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Add Comment */}
                <div className="flex space-x-3">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-gray-300 text-gray-600 text-xs">Y</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 flex space-x-2">
                    <input
                      type="text"
                      placeholder="Write a comment..."
                      value={commentInputs[post.id] || ''}
                      onChange={(e) => updateCommentInput(post.id, e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                      className="flex-1 p-2 bg-gray-100 rounded-full px-4 focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    <Button 
                      size="sm" 
                      onClick={() => handleAddComment(post.id)}
                      disabled={!commentInputs[post.id]?.trim()}
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PostsPage;
