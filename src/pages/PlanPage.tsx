
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Plus, Target, Calendar, CheckCircle, Clock, TrendingUp, Star } from 'lucide-react';
import CreatePlanModal from '@/components/CreatePlanModal';
import { planService } from '@/services/planService';
import { useQuery } from '@tanstack/react-query';

const PlanPage = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const { data: goals = [], isLoading: goalsLoading } = useQuery({
    queryKey: ['goals'],
    queryFn: planService.getGoals,
  });

  const { data: goalTemplates = [] } = useQuery({
    queryKey: ['goal-templates'],
    queryFn: planService.getGoalTemplates,
  });

  const { data: habits = [] } = useQuery({
    queryKey: ['habits'],
    queryFn: planService.getHabits,
  });

  const { data: activityCategories = [] } = useQuery({
    queryKey: ['activity-categories'],
    queryFn: planService.getActivityCategories,
  });

  const handleCreatePlan = (planData: any) => {
    console.log('Creating plan:', planData);
    // This would typically be a POST request to create the plan
    setIsCreateModalOpen(false);
  };

  const completedGoals = goals.filter(goal => 
    goal.current_value && goal.target_value && goal.current_value >= goal.target_value
  ).length;

  if (goalsLoading) {
    return (
      <div className="space-y-8">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your wellness plan...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            My Wellness Plan
          </h1>
          <p className="text-xl text-gray-600 mt-2">Track your progress and achieve your goals</p>
        </div>
        <Button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create New Plan
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <Target className="w-8 h-8 mx-auto mb-2 text-blue-600" />
            <h3 className="text-2xl font-bold">{goals.length}</h3>
            <p className="text-gray-600">Active Goals</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-600" />
            <h3 className="text-2xl font-bold">{completedGoals}</h3>
            <p className="text-gray-600">Completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <TrendingUp className="w-8 h-8 mx-auto mb-2 text-purple-600" />
            <h3 className="text-2xl font-bold">{habits.length}</h3>
            <p className="text-gray-600">Active Habits</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Star className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
            <h3 className="text-2xl font-bold">85%</h3>
            <p className="text-gray-600">Success Rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Current Goals */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Current Goals</h2>
        {goals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {goals.map((goal) => {
              const progress = goal.target_value ? 
                Math.min(100, ((goal.current_value || 0) / goal.target_value) * 100) : 0;
              
              return (
                <Card key={goal.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{goal.title}</CardTitle>
                        <CardDescription className="mt-1">
                          {goal.description || 'Working towards this wellness goal'}
                        </CardDescription>
                      </div>
                      <Badge variant={progress >= 100 ? "default" : "secondary"}>
                        {progress >= 100 ? 'Completed' : 'In Progress'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span>{progress.toFixed(0)}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                    {goal.target_value && (
                      <div className="text-sm text-gray-600">
                        {goal.current_value || 0} / {goal.target_value} completed
                      </div>
                    )}
                    <div className="flex justify-between items-center">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button size="sm">
                        Update Progress
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <Target className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-semibold mb-2">No goals yet</h3>
              <p className="text-gray-600 mb-6">Create your first wellness goal to get started</p>
              <Button onClick={() => setIsCreateModalOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Goal
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Goal Templates */}
      {goalTemplates.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Popular Goal Templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {goalTemplates.slice(0, 6).map((template) => (
              <Card key={template.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <CardDescription>
                    {template.description || 'A popular wellness goal template'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">
                    Use Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Activity Categories */}
      {activityCategories.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Activity Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {activityCategories.slice(0, 8).map((category) => (
              <Card key={category.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold">{category.name}</h3>
                  {category.description && (
                    <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      <CreatePlanModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleCreatePlan}
      />
    </div>
  );
};

export default PlanPage;
