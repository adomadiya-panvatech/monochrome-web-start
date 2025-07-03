
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Plus, Clock } from 'lucide-react';

interface CreatePlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (tasks: any[]) => void;
}

const CreatePlanModal = ({ isOpen, onClose, onSave }: CreatePlanModalProps) => {
  const [tasks, setTasks] = useState([
    { id: 1, task: '', time: '' }
  ]);

  if (!isOpen) return null;

  const addTask = () => {
    setTasks([...tasks, { id: tasks.length + 1, task: '', time: '' }]);
  };

  const updateTask = (id: number, field: string, value: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, [field]: value } : task
    ));
  };

  const removeTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleSave = () => {
    const validTasks = tasks.filter(task => task.task.trim() && task.time.trim());
    onSave(validTasks);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md mx-4 max-h-[80vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Create Daily Plan</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {tasks.map((task, index) => (
            <div key={task.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Task {index + 1}</h4>
                {tasks.length > 1 && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => removeTask(task.id)}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                )}
              </div>
              <input
                type="text"
                placeholder="Enter task (e.g., Drink water)"
                value={task.task}
                onChange={(e) => updateTask(task.id, 'task', e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <input
                  type="time"
                  value={task.time}
                  onChange={(e) => updateTask(task.id, 'time', e.target.value)}
                  className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>
          ))}
          
          <Button 
            variant="outline" 
            onClick={addTask}
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Another Task
          </Button>
          
          <div className="flex space-x-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex-1">
              Save Plan
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreatePlanModal;
