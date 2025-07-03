
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const CommunityPage = () => {
  const communityGroups = [
    { 
      id: 'sleep-seekers',
      name: 'Sleep Seekers', 
      description: 'Struggling to get good sleep? Connect and get advice from other members and TOVI\'s experts.',
      image: '🛌',
      members: '2.1k members'
    },
    { 
      id: 'healthy-eaters',
      name: 'Aspiring Healthy Eaters', 
      description: 'Share your healthy meal and snack ideas and get advice from TOVI\'s nutrition experts.',
      image: '🥗',
      members: '5.3k members'
    },
    { 
      id: 'movement-buddies',
      name: 'Movement Buddies', 
      description: 'A place for accountability and support as we work towards becoming more physically active together.',
      image: '🏃‍♀️',
      members: '3.7k members'
    },
    { 
      id: 'finding-calm',
      name: 'Finding Our Calm', 
      description: 'Feeling stressed? Let\'s talk through it and explore ways to find our calm.',
      image: '🧘‍♀️',
      members: '1.9k members'
    },
    { 
      id: 'bright-side',
      name: 'Looking on the Bright Side', 
      description: 'Feeling blah lately? You\'re not alone! Let\'s lift each other up and inspire positivity.',
      image: '☀️',
      members: '4.2k members'
    },
  ];

  return (
    <div>
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-orange-400 to-red-400 rounded-3xl p-8 mb-8 text-white relative overflow-hidden">
        <div className="absolute top-4 right-8">
          <Heart className="w-12 h-12 opacity-20" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Community</h1>
        <p className="text-orange-100">Connect with others on their wellness journey</p>
      </div>

      {/* Community Groups Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {communityGroups.slice(0, 2).map((group, index) => (
          <Link key={group.id} to={`/community/${group.id}`}>
            <Card className="overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className={`h-40 bg-gradient-to-br ${
                index === 0 ? 'from-blue-400 to-purple-500' : 'from-green-400 to-blue-500'
              } relative flex items-center justify-center`}>
                <div className="text-4xl">{group.image}</div>
                <div className="absolute bottom-4 left-4 text-white font-semibold">
                  {group.name}
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {/* All Groups Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">All Groups</h2>
        </div>
        
        <div className="space-y-4">
          {communityGroups.map((group, index) => (
            <Card key={group.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-xl">
                    {group.image}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-black text-lg">{group.name}</h3>
                      <Link to={`/community/${group.id}`}>
                        <Button 
                          size="sm" 
                          className="bg-gray-800 hover:bg-black text-white"
                        >
                          View
                        </Button>
                      </Link>
                    </div>
                    <p className="text-gray-600 mb-2">{group.description}</p>
                    <p className="text-sm text-gray-500">{group.members}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Motivational Quote */}
      <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Be kind and compassionate.</h3>
          <p className="text-purple-100 max-w-2xl mx-auto">
            When we share our questions, thoughts, and experiences with each other, 
            let's always come from a place of respect and understanding.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommunityPage;
