
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateAboutContent, AboutContent } from '@/services/dataService';
import { toast } from 'sonner';
import { X, Save } from 'lucide-react';

interface AboutContentEditorProps {
  content: AboutContent | null;
  onClose: () => void;
}

const AboutContentEditor: React.FC<AboutContentEditorProps> = ({ content, onClose }) => {
  const queryClient = useQueryClient();
  
  const [formData, setFormData] = useState<AboutContent>({
    title: content?.title || '',
    subtitle: content?.subtitle || '',
    description: content?.description || '',
    imageUrl: content?.imageUrl || '',
    missionTitle: content?.missionTitle || '',
    missionDescription: content?.missionDescription || '',
    visionTitle: content?.visionTitle || '',
    visionDescription: content?.visionDescription || '',
    teamMembers: content?.teamMembers || []
  });
  
  const mutation = useMutation({
    mutationFn: updateAboutContent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['aboutContent'] });
      toast.success('About content updated successfully');
      onClose();
    },
    onError: (error: any) => {
      toast.error(`Failed to update about content: ${error.message}`);
    }
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    const requiredFields = ['title', 'description', 'missionTitle', 'missionDescription'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof AboutContent]);
    
    if (missingFields.length > 0) {
      toast.error(`Please fill all required fields`);
      return;
    }
    
    mutation.mutate(formData);
  };
  
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Edit About Page Content</CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Main Content</h3>
            
            <div className="space-y-2">
              <Label htmlFor="title">Title*</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="About Srinivasan Associates"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="subtitle">Subtitle</Label>
              <Input
                id="subtitle"
                name="subtitle"
                value={formData.subtitle}
                onChange={handleInputChange}
                placeholder="Your Trusted Mortgage Partner"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description*</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="We are a team of dedicated mortgage professionals..."
                rows={4}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleInputChange}
                placeholder="https://example.com/about-image.jpg"
              />
              {formData.imageUrl && (
                <div className="mt-2 h-20 w-40 overflow-hidden rounded">
                  <img 
                    src={formData.imageUrl} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x200?text=Invalid+Image+URL';
                    }}
                  />
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Mission & Vision</h3>
            
            <div className="space-y-2">
              <Label htmlFor="missionTitle">Mission Title*</Label>
              <Input
                id="missionTitle"
                name="missionTitle"
                value={formData.missionTitle}
                onChange={handleInputChange}
                placeholder="Our Mission"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="missionDescription">Mission Description*</Label>
              <Textarea
                id="missionDescription"
                name="missionDescription"
                value={formData.missionDescription}
                onChange={handleInputChange}
                placeholder="To simplify the home loan process and make homeownership accessible to all"
                rows={3}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="visionTitle">Vision Title</Label>
              <Input
                id="visionTitle"
                name="visionTitle"
                value={formData.visionTitle}
                onChange={handleInputChange}
                placeholder="Our Vision"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="visionDescription">Vision Description</Label>
              <Textarea
                id="visionDescription"
                name="visionDescription"
                value={formData.visionDescription}
                onChange={handleInputChange}
                placeholder="To be the most trusted mortgage provider in the industry"
                rows={3}
              />
            </div>
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

export default AboutContentEditor;
