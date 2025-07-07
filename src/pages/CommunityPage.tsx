
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Users, Star, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { communityService, CommunityGroup } from '@/services/communityService';
import { useQuery } from '@tanstack/react-query';

const CommunityPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const { data: communityGroups = [], isLoading, error } = useQuery({
    queryKey: ['community-groups'],
    queryFn: communityService.getCommunityGroups,
  });

  const { data: userRelationships = [] } = useQuery({
    queryKey: ['user-relationships'],
    queryFn: communityService.getUserRelationships,
  });

  const filteredGroups = communityGroups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (group.description && group.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleJoinGroup = async (groupId: number) => {
    console.log('Joining group:', groupId);
    // This would typically be a POST request to join the group
    // api.post('/user-relationships', { group_id: groupId, relationship_type: 'member' })
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading communities...</p>
        </div>
      </div>
    );
  }

  if (error) {
    console.error('Error loading communities:', error);
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Error loading communities. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Wellness Community
        </h1>
        <p className="text-xl text-gray-600">Connect, share, and grow together on your wellness journey</p>
      </div>

      {/* Search */}
      <div className="max-w-md mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search communities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <Users className="w-8 h-8 mx-auto mb-2 text-blue-600" />
            <h3 className="text-2xl font-bold">{communityGroups.length}</h3>
            <p className="text-gray-600">Active Communities</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Star className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
            <h3 className="text-2xl font-bold">4.8</h3>
            <p className="text-gray-600">Average Rating</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-600" />
            <h3 className="text-2xl font-bold">92%</h3>
            <p className="text-gray-600">Success Rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Community Groups */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Join Our Communities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups.map((group) => (
            <Card key={group.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm text-gray-500">{group.member_count || Math.floor(Math.random() * 1000 + 100)} members</span>
                </div>
                <CardTitle className="group-hover:text-purple-600 transition-colors">
                  {group.name}
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  {group.description || 'Join this amazing community to connect with like-minded wellness enthusiasts.'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Link to={`/community/${group.id}`} className="flex-1">
                    <Button variant="outline" className="w-full">
                      View Details
                    </Button>
                  </Link>
                  <Button 
                    onClick={() => handleJoinGroup(group.id)}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    Join
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {filteredGroups.length === 0 && searchTerm && (
        <div className="text-center py-12">
          <p className="text-gray-600">No communities found matching "{searchTerm}"</p>
        </div>
      )}
    </div>
  );
};

export default CommunityPage;
