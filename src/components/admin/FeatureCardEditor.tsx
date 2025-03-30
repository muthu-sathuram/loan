
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { upsertFeatureCard, FeatureCard } from '@/services/dataService';
import { toast } from 'sonner';
import { X, Save } from 'lucide-react';

interface FeatureCardEditorProps {
  card: FeatureCard | null;
  onClose: () => void;
}

const FeatureCardEditor: React.FC<FeatureCardEditorProps> = ({ card, onClose }) => {
  const isNewCard = !card;
  const queryClient = useQueryClient();
  
  const [formData, setFormData] = useState<FeatureCard>({
    id: card?.id || crypto.randomUUID(),
    title: card?.title || '',
    description: card?.description || '',
    icon: card?.icon || 'Clock'
  });
  
  const mutation = useMutation({
    mutationFn: upsertFeatureCard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['featureCards'] });
      toast.success(`Feature card ${isNewCard ? 'created' : 'updated'} successfully`);
      onClose();
    },
    onError: (error: any) => {
      toast.error(`Failed to ${isNewCard ? 'create' : 'update'} feature card: ${error.message}`);
    }
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleIconChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      icon: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate
    if (!formData.title || !formData.description) {
      toast.error('Please fill all required fields');
      return;
    }
    
    mutation.mutate(formData);
  };
  
  // Available icons for feature cards
  const availableIcons = [
    'Clock', 'Award', 'Percent', 'Shield', 'Lightbulb', 'Phone', 
    'Check', 'Star', 'Heart', 'Zap', 'FileText', 'Briefcase'
  ];
  
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{isNewCard ? 'Add New Feature Card' : 'Edit Feature Card'}</CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title*</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Fast Approvals"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description*</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Get pre-approved in as little as 24 hours so you can shop with confidence."
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="icon">Icon</Label>
            <Select 
              value={formData.icon} 
              onValueChange={handleIconChange}
            >
              <SelectTrigger id="icon">
                <SelectValue placeholder="Select icon" />
              </SelectTrigger>
              <SelectContent>
                {availableIcons.map(icon => (
                  <SelectItem key={icon} value={icon}>{icon}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? 'Saving...' : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default FeatureCardEditor;
