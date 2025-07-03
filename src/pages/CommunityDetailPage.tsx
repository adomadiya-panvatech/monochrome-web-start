
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ArrowLeft, Users, MessageCircle, Heart, Share2 } from 'lucide-react';

const CommunityDetailPage = () => {
  const { communityId } = useParams();
  const [isJoined, setIsJoined] = useState(false);

  const communityData = {
    'sleep-seekers': {
      name: 'Sleep Seekers',
      description: 'Struggling to get good sleep? Connect and get advice from other members and TOVI\'s experts.',
      image: '🛌',
      members: '2.1k members',
      color: 'from-blue-400 to-purple-500',
      posts: [
        {
          id: 1,
          author: 'Sarah M.',
          time: '2 hours ago',
          content: 'Finally got 8 hours of sleep last night! Here are the tips that worked for me...',
          likes: 24,
          comments: 8
        },
        {
          id: 2,
          author: 'Mike R.',
          time: '5 hours ago',
          content: 'Anyone else struggling with staying asleep? I wake up multiple times each night.',
          likes: 12,
          comments: 15
        }
      ]
    },
    'healthy-eaters': {
      name: 'Aspiring Healthy Eaters',
      description: 'Share your healthy meal and snack ideas and get advice from TOVI\'s nutrition experts.',
      image: '🥗',
      members: '5.3k members',
      color: 'from-green-400 to-blue-500',
      posts: [
        {
          id: 1,
          author: 'Emma K.',
          time: '1 hour ago',
          content: 'Made this amazing quinoa bowl for lunch! Recipe in comments 👇',
          likes: 45,
          comments: 12
        }
      ]
    }
  };

  const community = communityData[communityId as keyof typeof communityData];

  if (!community) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Community not found</h2>
        <Link to="/community">
          <Button>Back to Communities</Button>
        </Link>
      </div>
    );
  }

  const handleJoin = () => {
    setIsJoined(!isJoined);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center mb-6">
        <Link to="/community">
          <Button variant="ghost" size="sm" className="mr-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>
      </div>

      {/* Community Header */}
      <Card className="mb-8">
        <div className={`h-48 bg-gradient-to-br ${community.color} relative flex items-center justify-center`}>
          <div className="text-6xl">{community.image}</div>
        </div>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl mb-2">{community.name}</CardTitle>
              <p className="text-gray-600 mb-2">{community.description}</p>
              <div className="flex items-center text-gray-500">
                <Users className="w-4 h-4 mr-2" />
                <span>{community.members}</span>
              </div>
            </div>
            <Button 
              onClick={handleJoin}
              className={isJoined ? "bg-gray-600 hover:bg-gray-700" : "bg-black hover:bg-gray-800"}
            >
              {isJoined ? 'Joined' : 'Join Community'}
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Community Posts */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Recent Posts</h3>
        {community.posts.map((post) => (
          <Card key={post.id}>
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <Avatar>
                  <AvatarFallback>{post.author[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-semibold">{post.author}</span>
                    <span className="text-gray-500 text-sm">{post.time}</span>
                  </div>
                  <p className="text-gray-700 mb-4">{post.content}</p>
                  <div className="flex items-center space-x-6">
                    <button className="flex items-center space-x-2 text-gray-500 hover:text-red-500">
                      <Heart className="w-4 h-4" />
                      <span>{post.likes}</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500">
                      <MessageCircle className="w-4 h-4" />
                      <span>{post.comments}</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500">
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
  );
};

export default CommunityDetailPage;
