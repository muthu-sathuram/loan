
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateContactInfo, ContactInfo } from '@/services/dataService';
import { toast } from 'sonner';
import { X, Save, Plus, Minus } from 'lucide-react';

interface ContactInfoEditorProps {
  info: ContactInfo | null;
  onClose: () => void;
}

const ContactInfoEditor: React.FC<ContactInfoEditorProps> = ({ info, onClose }) => {
  const queryClient = useQueryClient();
  
  const [formData, setFormData] = useState<ContactInfo>({
    address: info?.address || '',
    phone: info?.phone || '',
    email: info?.email || '',
    businessHours: info?.businessHours || ['Monday - Friday: 9am to 5pm'],
    mapEmbedUrl: info?.mapEmbedUrl || ''
  });
  
  const mutation = useMutation({
    mutationFn: updateContactInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contactInfo'] });
      toast.success('Contact information updated successfully');
      onClose();
    },
    onError: (error: any) => {
      toast.error(`Failed to update contact information: ${error.message}`);
    }
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleHourChange = (index: number, value: string) => {
    const updatedHours = [...formData.businessHours];
    updatedHours[index] = value;
    
    setFormData(prev => ({
      ...prev,
      businessHours: updatedHours
    }));
  };
  
  const addHour = () => {
    setFormData(prev => ({
      ...prev,
      businessHours: [...prev.businessHours, '']
    }));
  };
  
  const removeHour = (index: number) => {
    if (formData.businessHours.length <= 1) return;
    
    const updatedHours = formData.businessHours.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      businessHours: updatedHours
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.address || !formData.phone || !formData.email) {
      toast.error('Please fill all required fields');
      return;
    }
    
    mutation.mutate(formData);
  };
  
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Edit Contact Information</CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="address">Office Address*</Label>
            <Textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="123 Finance Street, Mortgage City, MC 12345"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number*</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="(123) 456-7890"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email*</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="info@homeloans.com"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>Business Hours</Label>
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={addHour}
              >
                <Plus className="h-4 w-4 mr-1" /> Add Hours
              </Button>
            </div>
            
            {formData.businessHours.map((hour, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={hour}
                  onChange={(e) => handleHourChange(index, e.target.value)}
                  placeholder="Monday - Friday: 9am to 5pm"
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  size="icon" 
                  onClick={() => removeHour(index)}
                  disabled={formData.businessHours.length <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="mapEmbedUrl">Google Maps Embed URL</Label>
            <Input
              id="mapEmbedUrl"
              name="mapEmbedUrl"
              value={formData.mapEmbedUrl}
              onChange={handleInputChange}
              placeholder="https://www.google.com/maps/embed?pb=..."
            />
            {formData.mapEmbedUrl && (
              <div className="mt-2 border rounded h-40 overflow-hidden">
                <iframe
                  src={formData.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  title="Office Location Preview"
                />
              </div>
            )}
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

export default ContactInfoEditor;
