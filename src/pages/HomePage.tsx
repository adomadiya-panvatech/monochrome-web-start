
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Plus, Heart, Bookmark, Clock, Check, Target, Users, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { planService } from '@/services/planService';
import { communityService } from '@/services/communityService';
import { postService } from '@/services/postService';
import { useQuery } from '@tanstack/react-query';

const HomePage = () => {
  const { data: goals = [] } = useQuery({
    queryKey: ['goals'],
    queryFn: planService.getGoals,
  });

  const { data: communityGroups = [] } = useQuery({
    queryKey: ['community-groups'],
    queryFn: communityService.getCommunityGroups,
  });

  const { data: feedItems = [] } = useQuery({
    queryKey: ['feed-items'],
    queryFn: postService.getFeedItems,
  });

  const { data: habits = [] } = useQuery({
    queryKey: ['habits'],
    queryFn: planService.getHabits,
  });

  // Mock daily tasks based on habits/goals
  const dailyTasks = [
    { id: 1, task: 'Drink 8 glasses of water', time: '8 AM', completed: true },
    { id: 2, task: 'Morning meditation', time: '7 AM', completed: false },
    { id: 3, task: 'Take vitamin supplements', time: '9 AM', completed: false },
    { id: 4, task: 'Evening walk', time: '6 PM', completed: false },
  ];

  const completedTasks = dailyTasks.filter(task => task.completed).length;

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Good afternoon, Wellness Warrior!
        </h1>
        <p className="text-xl text-gray-600">Ready to have a healthy day?</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Daily Plan */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>My Daily Plan</span>
                <Link to="/plan">
                  <Button size="sm" variant="outline">
                    <Plus className="w-4 h-4" />
                  </Button>
                </Link>
              </CardTitle>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-sm text-gray-600">{completedTasks} of {dailyTasks.length} today</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {dailyTasks.map((task) => (
                <div key={task.id} className="flex items-center space-x-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    task.completed ? 'bg-black border-black' : 'border-gray-300'
                  }`}>
                    {task.completed && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <div className="flex-1">
                    <p className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-black'}`}>
                      {task.task}
                    </p>
                    <p className="text-sm text-gray-500 flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {task.time}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Active Goals</span>
                <span className="font-semibold">{goals.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Active Habits</span>
                <span className="font-semibold">{habits.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Communities</span>
                <span className="font-semibold">{communityGroups.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Posts Today</span>
                <span className="font-semibold">{feedItems.length}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          {/* Progress Overview */}
          {goals.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Your Progress</h2>
                <Link to="/plan">
                  <Button variant="outline" size="sm">View All Goals</Button>
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {goals.slice(0, 4).map((goal) => {
                  const progress = goal.target_value ? 
                    Math.min(100, ((goal.current_value || 0) / goal.target_value) * 100) : 0;
                  
                  return (
                    <Card key={goal.id}>
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <Target className="w-8 h-8 text-blue-600" />
                          <div>
                            <h3 className="font-semibold">{goal.title}</h3>
                            <p className="text-sm text-gray-600">{progress.toFixed(0)}% complete</p>
                          </div>
                        </div>
                        <Progress value={progress} className="h-2" />
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* Community Highlights */}
          {communityGroups.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Popular Communities</h2>
                <Link to="/community">
                  <Button variant="outline" size="sm">Explore All</Button>
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {communityGroups.slice(0, 4).map((group) => (
                  <Card key={group.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                          <Users className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-black mb-2">{group.name}</h3>
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                            {group.description || 'Join this amazing community'}
                          </p>
                          <Link to={`/community/${group.id}`}>
                            <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600">
                              Join Community
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Recent Posts */}
          {feedItems.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Recent Community Posts</h2>
                <Link to="/posts">
                  <Button variant="outline" size="sm">View All Posts</Button>
                </Link>
              </div>
              
              <div className="space-y-6">
                {feedItems.slice(0, 3).map((post) => (
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
                          <p className="text-gray-700 line-clamp-3">{post.content}</p>
                          <div className="flex items-center space-x-6 text-gray-500">
                            <span className="flex items-center space-x-1">
                              <Heart className="w-4 h-4" />
                              <span>{post.likes_count || Math.floor(Math.random() * 50)}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <MessageSquare className="w-4 h-4" />
                              <span>{post.comments_count || Math.floor(Math.random() * 20)}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Motivational Quote */}
          <Card className="bg-gradient-to-r from-gray-900 to-black text-white">
            <CardContent className="p-8">
              <blockquote className="text-xl font-medium mb-4">
                "The groundwork for all happiness is good health."
              </blockquote>
              <p className="text-gray-300">
                — Leigh Hunt
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
