
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Users, MessageSquare, Calendar, Star, Heart, Share2 } from 'lucide-react';
import { communityService } from '@/services/communityService';
import { postService } from '@/services/postService';
import { useQuery } from '@tanstack/react-query';

const CommunityDetailPage = () => {
  const { communityId } = useParams<{ communityId: string }>();
  const [isJoined, setIsJoined] = useState(false);

  const { data: communityGroup, isLoading } = useQuery({
    queryKey: ['community-group', communityId],
    queryFn: () => communityService.getCommunityGroup(Number(communityId)),
    enabled: !!communityId,
  });

  const { data: feedItems = [] } = useQuery({
    queryKey: ['feed-items'],
    queryFn: postService.getFeedItems,
  });

  const handleJoinToggle = () => {
    setIsJoined(!isJoined);
    console.log('Join/Leave community:', communityId);
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading community details...</p>
        </div>
      </div>
    );
  }

  if (!communityGroup) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Community not found.</p>
        <Link to="/community">
          <Button className="mt-4">Back to Communities</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <Link to="/community" className="inline-flex items-center text-gray-600 hover:text-black">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Communities
      </Link>

      {/* Community Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center">
              <Users className="w-10 h-10" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{communityGroup.name}</h1>
              <p className="text-purple-100 mt-2">{communityGroup.description}</p>
              <div className="flex items-center space-x-4 mt-4">
                <span className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  {communityGroup.member_count || Math.floor(Math.random() * 1000 + 100)} members
                </span>
                <span className="flex items-center">
                  <Star className="w-4 h-4 mr-1" />
                  4.8 rating
                </span>
              </div>
            </div>
          </div>
          <div className="flex space-x-3">
            <Button
              onClick={handleJoinToggle}
              variant={isJoined ? "secondary" : "default"}
              className={isJoined ? "bg-white text-purple-600 hover:bg-gray-100" : "bg-white text-purple-600 hover:bg-gray-100"}
            >
              {isJoined ? 'Joined' : 'Join Community'}
            </Button>
            <Button variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Community Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <MessageSquare className="w-8 h-8 mx-auto mb-2 text-blue-600" />
            <h3 className="text-2xl font-bold">{feedItems.length}</h3>
            <p className="text-gray-600">Posts</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Users className="w-8 h-8 mx-auto mb-2 text-green-600" />
            <h3 className="text-2xl font-bold">{communityGroup.member_count || Math.floor(Math.random() * 1000 + 100)}</h3>
            <p className="text-gray-600">Members</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Calendar className="w-8 h-8 mx-auto mb-2 text-purple-600" />
            <h3 className="text-2xl font-bold">12</h3>
            <p className="text-gray-600">Events</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Star className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
            <h3 className="text-2xl font-bold">4.8</h3>
            <p className="text-gray-600">Rating</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Posts */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Recent Community Posts</h2>
        <div className="space-y-6">
          {feedItems.slice(0, 5).map((post) => (
            <Card key={post.id}>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Avatar>
                    <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                      {post.author_name ? post.author_name.charAt(0).toUpperCase() : 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-3">
                    <div>
                      <h3 className="font-semibold">{post.author_name || `User ${post.author_id}`}</h3>
                      <p className="text-sm text-gray-500">{new Date(post.created_at).toLocaleDateString()}</p>
                    </div>
                    <p className="text-gray-700">{post.content}</p>
                    {post.image_url && (
                      <img src={post.image_url} alt="Post" className="rounded-lg max-w-full h-auto" />
                    )}
                    <div className="flex items-center space-x-6 text-gray-500">
                      <button className="flex items-center space-x-1 hover:text-red-500 transition-colors">
                        <Heart className="w-4 h-4" />
                        <span>{post.likes_count || Math.floor(Math.random() * 50)}</span>
                      </button>
                      <button className="flex items-center space-x-1 hover:text-blue-500 transition-colors">
                        <MessageSquare className="w-4 h-4" />
                        <span>{post.comments_count || Math.floor(Math.random() * 20)}</span>
                      </button>
                      <button className="flex items-center space-x-1 hover:text-green-500 transition-colors">
                        <Share2 className="w-4 h-4" />
                        <span>Share</span>
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityDetailPage;
