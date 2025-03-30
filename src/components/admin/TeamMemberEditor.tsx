
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { upsertTeamMember, TeamMember } from '@/services/dataService';
import { toast } from 'sonner';
import { X, Save } from 'lucide-react';

interface TeamMemberEditorProps {
  member: TeamMember | null;
  onClose: () => void;
}

const TeamMemberEditor: React.FC<TeamMemberEditorProps> = ({ member, onClose }) => {
  const isNewMember = !member;
  const queryClient = useQueryClient();
  
  const [formData, setFormData] = useState<TeamMember>({
    id: member?.id || crypto.randomUUID(),
    name: member?.name || '',
    position: member?.position || '',
    bio: member?.bio || '',
    imageUrl: member?.imageUrl || ''
  });
  
  const mutation = useMutation({
    mutationFn: upsertTeamMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teamMembers'] });
      toast.success(`Team member ${isNewMember ? 'created' : 'updated'} successfully`);
      onClose();
    },
    onError: (error: any) => {
      toast.error(`Failed to ${isNewMember ? 'create' : 'update'} team member: ${error.message}`);
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
    
    // Validate
    if (!formData.name || !formData.position || !formData.bio) {
      toast.error('Please fill all required fields');
      return;
    }
    
    mutation.mutate(formData);
  };
  
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{isNewMember ? 'Add New Team Member' : 'Edit Team Member'}</CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name*</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="John Smith"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="position">Position*</Label>
            <Input
              id="position"
              name="position"
              value={formData.position}
              onChange={handleInputChange}
              placeholder="Mortgage Specialist"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="bio">Bio*</Label>
            <Textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              placeholder="John has over 10 years of experience in the mortgage industry..."
              rows={4}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="imageUrl">Profile Image URL</Label>
            <Input
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleInputChange}
              placeholder="https://example.com/team-member.jpg"
            />
            {formData.imageUrl && (
              <div className="mt-2 h-20 w-20 overflow-hidden rounded-full">
                <img 
                  src={formData.imageUrl} 
                  alt="Preview" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200?text=?';
                  }}
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

export default TeamMemberEditor;
