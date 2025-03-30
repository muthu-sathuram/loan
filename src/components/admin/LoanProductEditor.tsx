
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { upsertLoanProduct, LoanProduct } from '@/services/dataService';
import { toast } from 'sonner';
import { X, Save, Plus, Minus } from 'lucide-react';

interface LoanProductEditorProps {
  product: LoanProduct | null;
  onClose: () => void;
}

const LoanProductEditor: React.FC<LoanProductEditorProps> = ({ product, onClose }) => {
  const isNewProduct = !product;
  const queryClient = useQueryClient();
  
  const [formData, setFormData] = useState<LoanProduct>({
    id: product?.id || crypto.randomUUID(),
    title: product?.title || '',
    description: product?.description || '',
    rate: product?.rate || '',
    features: product?.features || [''],
    imageUrl: product?.imageUrl || '',
    category: product?.category || 'home'
  });
  
  const mutation = useMutation({
    mutationFn: upsertLoanProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['loanProducts'] });
      toast.success(`Loan product ${isNewProduct ? 'created' : 'updated'} successfully`);
      onClose();
    },
    onError: (error: any) => {
      toast.error(`Failed to ${isNewProduct ? 'create' : 'update'} loan product: ${error.message}`);
    }
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleCategoryChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      category: value
    }));
  };
  
  const handleFeatureChange = (index: number, value: string) => {
    const updatedFeatures = [...formData.features];
    updatedFeatures[index] = value;
    
    setFormData(prev => ({
      ...prev,
      features: updatedFeatures
    }));
  };
  
  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };
  
  const removeFeature = (index: number) => {
    if (formData.features.length <= 1) return;
    
    const updatedFeatures = formData.features.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      features: updatedFeatures
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate
    if (!formData.title || !formData.description || !formData.rate || !formData.imageUrl) {
      toast.error('Please fill all required fields');
      return;
    }
    
    mutation.mutate(formData);
  };
  
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{isNewProduct ? 'Add New Loan Product' : 'Edit Loan Product'}</CardTitle>
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
              placeholder="Home Loan"
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
              placeholder="Perfect for first-time homebuyers or those looking to upgrade"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="rate">Interest Rate*</Label>
              <Input
                id="rate"
                name="rate"
                value={formData.rate}
                onChange={handleInputChange}
                placeholder="3.25%"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category*</Label>
              <Select 
                value={formData.category} 
                onValueChange={handleCategoryChange}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="home">Home</SelectItem>
                  <SelectItem value="refinance">Refinance</SelectItem>
                  <SelectItem value="investment">Investment</SelectItem>
                  <SelectItem value="construction">Construction</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="imageUrl">Image URL*</Label>
            <Input
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleInputChange}
              placeholder="https://example.com/image.jpg"
              required
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
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>Features</Label>
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={addFeature}
              >
                <Plus className="h-4 w-4 mr-1" /> Add Feature
              </Button>
            </div>
            
            {formData.features.map((feature, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={feature}
                  onChange={(e) => handleFeatureChange(index, e.target.value)}
                  placeholder={`Feature ${index + 1}`}
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  size="icon" 
                  onClick={() => removeFeature(index)}
                  disabled={formData.features.length <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
              </div>
            ))}
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

export default LoanProductEditor;
