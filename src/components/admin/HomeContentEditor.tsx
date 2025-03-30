
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateHomeContent, HomeContent } from '@/services/dataService';
import { toast } from 'sonner';
import { X, Save } from 'lucide-react';

interface HomeContentEditorProps {
  content: HomeContent | null;
  onClose: () => void;
}

const HomeContentEditor: React.FC<HomeContentEditorProps> = ({ content, onClose }) => {
  const queryClient = useQueryClient();
  
  const [formData, setFormData] = useState<HomeContent>({
    heroTitle: content?.heroTitle || '',
    heroSubtitle: content?.heroSubtitle || '',
    heroImageUrl: content?.heroImageUrl || '',
    featuredTitle: content?.featuredTitle || '',
    featuredDescription: content?.featuredDescription || '',
    whyChooseUsTitle: content?.whyChooseUsTitle || '',
    whyChooseUsDescription: content?.whyChooseUsDescription || '',
    ctaTitle: content?.ctaTitle || '',
    ctaDescription: content?.ctaDescription || ''
  });
  
  const mutation = useMutation({
    mutationFn: updateHomeContent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['homeContent'] });
      toast.success('Home content updated successfully');
      onClose();
    },
    onError: (error: any) => {
      toast.error(`Failed to update home content: ${error.message}`);
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
    const requiredFields = ['heroTitle', 'heroSubtitle', 'featuredTitle', 'whyChooseUsTitle', 'ctaTitle'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof HomeContent]);
    
    if (missingFields.length > 0) {
      toast.error(`Please fill all required fields`);
      return;
    }
    
    mutation.mutate(formData);
  };
  
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Edit Home Page Content</CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Hero Section</h3>
            
            <div className="space-y-2">
              <Label htmlFor="heroTitle">Hero Title*</Label>
              <Input
                id="heroTitle"
                name="heroTitle"
                value={formData.heroTitle}
                onChange={handleInputChange}
                placeholder="Your Journey to Home Ownership Starts Here"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="heroSubtitle">Hero Subtitle*</Label>
              <Textarea
                id="heroSubtitle"
                name="heroSubtitle"
                value={formData.heroSubtitle}
                onChange={handleInputChange}
                placeholder="Expert mortgage solutions tailored to your needs"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="heroImageUrl">Hero Image URL</Label>
              <Input
                id="heroImageUrl"
                name="heroImageUrl"
                value={formData.heroImageUrl}
                onChange={handleInputChange}
                placeholder="https://example.com/hero-image.jpg"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Featured Loans Section</h3>
            
            <div className="space-y-2">
              <Label htmlFor="featuredTitle">Featured Title*</Label>
              <Input
                id="featuredTitle"
                name="featuredTitle"
                value={formData.featuredTitle}
                onChange={handleInputChange}
                placeholder="Popular Loan Products"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="featuredDescription">Featured Description</Label>
              <Textarea
                id="featuredDescription"
                name="featuredDescription"
                value={formData.featuredDescription}
                onChange={handleInputChange}
                placeholder="Explore our most popular loan options designed to meet your financial needs"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Why Choose Us Section</h3>
            
            <div className="space-y-2">
              <Label htmlFor="whyChooseUsTitle">Why Choose Us Title*</Label>
              <Input
                id="whyChooseUsTitle"
                name="whyChooseUsTitle"
                value={formData.whyChooseUsTitle}
                onChange={handleInputChange}
                placeholder="Why Choose Srinivasan Associates"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="whyChooseUsDescription">Why Choose Us Description</Label>
              <Textarea
                id="whyChooseUsDescription"
                name="whyChooseUsDescription"
                value={formData.whyChooseUsDescription}
                onChange={handleInputChange}
                placeholder="We're committed to making your home loan experience as smooth and efficient as possible"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Call to Action Section</h3>
            
            <div className="space-y-2">
              <Label htmlFor="ctaTitle">CTA Title*</Label>
              <Input
                id="ctaTitle"
                name="ctaTitle"
                value={formData.ctaTitle}
                onChange={handleInputChange}
                placeholder="Ready to Get Started?"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="ctaDescription">CTA Description</Label>
              <Textarea
                id="ctaDescription"
                name="ctaDescription"
                value={formData.ctaDescription}
                onChange={handleInputChange}
                placeholder="Let us help you find the perfect loan solution for your needs"
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

export default HomeContentEditor;
