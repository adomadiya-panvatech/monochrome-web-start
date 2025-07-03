
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Clock, Check, Calendar as CalendarIcon } from 'lucide-react';
import CreatePlanModal from '@/components/CreatePlanModal';

const PlanPage = () => {
  const [tasks, setTasks] = useState([
    { id: 1, task: 'Drink water', time: '8:00', completed: false },
    { id: 2, task: 'Drink water', time: '8:00', completed: false },
    { id: 3, task: 'Have breakfast', time: '8:00', completed: false },
    { id: 4, task: 'Go for a walk', time: '12:00', completed: false },
    { id: 5, task: 'Stretch', time: '18:00', completed: false },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const addNewTasks = (newTasks: any[]) => {
    const formattedTasks = newTasks.map((task, index) => ({
      id: tasks.length + index + 1,
      task: task.task,
      time: task.time,
      completed: false
    }));
    setTasks([...tasks, ...formattedTasks]);
  };

  const createNewPlan = () => {
    setTasks([]);
    setShowCreateModal(true);
  };

  const completedCount = tasks.filter(task => task.completed).length;

  return (
    <div>
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-teal-400 to-cyan-400 rounded-3xl p-8 mb-8 text-white relative overflow-hidden">
        <div className="absolute top-4 right-8">
          <CalendarIcon className="w-12 h-12 opacity-20" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Plan</h1>
        <p className="text-teal-100">Organize your day for better wellness</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* My Daily Plan */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>My Daily Plan</CardTitle>
                <Button size="sm" variant="outline" onClick={() => setShowCreateModal(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Task
                </Button>
              </div>
              <div className="bg-purple-600 text-white p-4 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Check className="w-5 h-5" />
                  <span className="font-medium">{completedCount} of {tasks.length} today</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {tasks.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p className="mb-4">No tasks in your plan yet</p>
                  <Button onClick={() => setShowCreateModal(true)}>
                    Create Your First Plan
                  </Button>
                </div>
              ) : (
                tasks.map((task) => (
                  <div key={task.id} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <button
                      onClick={() => toggleTask(task.id)}
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                        task.completed 
                          ? 'bg-black border-black' 
                          : 'border-gray-300 hover:border-black'
                      }`}
                    >
                      {task.completed && <Check className="w-4 h-4 text-white" />}
                    </button>
                    <div className="flex-1">
                      <p className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-black'}`}>
                        {task.task}
                      </p>
                      <p className="text-sm text-gray-500 flex items-center mt-1">
                        <Clock className="w-3 h-3 mr-1" />
                        {task.time}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        {/* Add a Plan Card */}
        <div>
          <Card className="h-fit">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-purple-600">Add a Plan</h3>
              <p className="text-gray-600 text-sm mb-4">
                Take your day to the next level by organizing your activities around your goals.
              </p>
              <p className="text-gray-600 text-sm mb-6">
                Share your Plan with a friend to work on your goals together!
              </p>
              <Button 
                className="w-full bg-purple-600 hover:bg-purple-700 mb-3"
                onClick={createNewPlan}
              >
                Create New Plan
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setShowCreateModal(true)}
              >
                Add Tasks to Current Plan
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <CreatePlanModal 
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSave={addNewTasks}
      />
    </div>
  );
};

export default PlanPage;
