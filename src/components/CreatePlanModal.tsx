
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { planService } from '@/services/planService';

interface CreatePlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (planData: any) => void;
}

const CreatePlanModal = ({ isOpen, onClose, onSave }: CreatePlanModalProps) => {
  const [planData, setPlanData] = useState({
    title: '',
    description: '',
    category: '',
    targetValue: '',
    duration: '',
  });

  const handleSave = async () => {
    try {
      await planService.createPlan(planData);
      onSave(planData);
      setPlanData({
        title: '',
        description: '',
        category: '',
        targetValue: '',
        duration: '',
      });
      onClose();
    } catch (error) {
      console.error('Error creating plan:', error);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setPlanData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Wellness Plan</DialogTitle>
          <DialogDescription>
            Set up a new goal or habit to track your wellness journey.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              value={planData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="col-span-3"
              placeholder="Enter plan title"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              id="description"
              value={planData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="col-span-3"
              placeholder="Describe your plan"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Category
            </Label>
            <Select value={planData.category} onValueChange={(value) => handleInputChange('category', value)}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fitness">Fitness</SelectItem>
                <SelectItem value="nutrition">Nutrition</SelectItem>
                <SelectItem value="mental-health">Mental Health</SelectItem>
                <SelectItem value="sleep">Sleep</SelectItem>
                <SelectItem value="mindfulness">Mindfulness</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="targetValue" className="text-right">
              Target
            </Label>
            <Input
              id="targetValue"
              value={planData.targetValue}
              onChange={(e) => handleInputChange('targetValue', e.target.value)}
              className="col-span-3"
              placeholder="Target value (e.g., 10000 steps)"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="duration" className="text-right">
              Duration
            </Label>
            <Select value={planData.duration} onValueChange={(value) => handleInputChange('duration', value)}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            disabled={!planData.title || !planData.category}
          >
            Create Plan
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePlanModal;
