
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from "sonner";
import { Check, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getContactInfo } from '@/services/dataService';
import { Skeleton } from '@/components/ui/skeleton';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Fetch contact information from Supabase
  const { data: contactInfo, isLoading } = useQuery({
    queryKey: ['contactInfo'],
    queryFn: getContactInfo
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      inquiryType: value,
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      toast.success("Thank you for your message! We'll be in touch soon.", {
        description: "A loan specialist will contact you within 24 hours.",
        icon: <Check className="h-4 w-4" />,
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        inquiryType: '',
        message: '',
      });
      setIsSubmitting(false);
    }, 1500);
  };
  
  // Loading skeleton for contact info
  const ContactInfoSkeleton = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start space-x-3">
            <Skeleton className="h-5 w-5 rounded-full mt-1" />
            <div className="space-y-2 w-full">
              <Skeleton className="h-5 w-1/4" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Skeleton className="h-5 w-5 rounded-full mt-1" />
            <div className="space-y-2 w-full">
              <Skeleton className="h-5 w-1/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Skeleton className="h-5 w-5 rounded-full mt-1" />
            <div className="space-y-2 w-full">
              <Skeleton className="h-5 w-1/4" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Skeleton className="h-5 w-5 rounded-full mt-1" />
            <div className="space-y-2 w-full">
              <Skeleton className="h-5 w-1/4" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-1/2" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-4" />
          <Skeleton className="h-10 w-full" />
        </CardContent>
      </Card>
      
      <div className="rounded-lg overflow-hidden h-64 shadow-md">
        <Skeleton className="h-full w-full" />
      </div>
    </div>
  );
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-loan-primary mb-4">Contact Us</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions about our loan products or need assistance? Our team of loan specialists is here to help you every step of the way.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Get in Touch</CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you as soon as possible
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="John Smith"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="(123) 456-7890"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="inquiryType">Inquiry Type</Label>
                  <Select 
                    onValueChange={handleSelectChange}
                    value={formData.inquiryType}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select inquiry type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="homeLoan">Home Loan</SelectItem>
                      <SelectItem value="refinance">Refinance</SelectItem>
                      <SelectItem value="investment">Investment Loan</SelectItem>
                      <SelectItem value="firstHomeBuyer">First Home Buyer</SelectItem>
                      <SelectItem value="construction">Construction Loan</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us more about your inquiry..."
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-loan-primary hover:bg-opacity-90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </CardContent>
          </Card>
          
          {isLoading ? (
            <ContactInfoSkeleton />
          ) : (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>
                    Reach out to us directly
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-loan-primary mt-1" />
                    <div>
                      <h3 className="font-medium">Office Address</h3>
                      <p className="text-gray-600">{contactInfo?.address || '123 Finance Street, Mortgage City, MC 12345'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Phone className="h-5 w-5 text-loan-primary mt-1" />
                    <div>
                      <h3 className="font-medium">Phone Number</h3>
                      <p className="text-gray-600">{contactInfo?.phone || '(123) 456-7890'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 text-loan-primary mt-1" />
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <p className="text-gray-600">{contactInfo?.email || 'info@homeloans.com'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-loan-primary mt-1" />
                    <div>
                      <h3 className="font-medium">Business Hours</h3>
                      {contactInfo?.businessHours ? (
                        contactInfo.businessHours.map((hour, i) => (
                          <p key={i} className="text-gray-600">{hour}</p>
                        ))
                      ) : (
                        <>
                          <p className="text-gray-600">Monday - Friday: 9am to 5pm</p>
                          <p className="text-gray-600">Saturday: 10am to 2pm</p>
                          <p className="text-gray-600">Sunday: Closed</p>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Need Urgent Assistance?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Our loan specialists are available to take your call during business hours. For urgent inquiries, please call us directly.
                  </p>
                  <Button className="w-full bg-loan-secondary text-loan-primary hover:bg-opacity-90">
                    <Phone className="h-4 w-4 mr-2" />
                    Call {contactInfo?.phone || '(123) 456-7890'}
                  </Button>
                </CardContent>
              </Card>
              
              <div className="rounded-lg overflow-hidden h-64 shadow-md">
                <iframe
                  src={contactInfo?.mapEmbedUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509573!2d144.9616594153429!3d-37.81068397975172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642b8c21cb29b%3A0x1c045678462e3510!2sMelbourne%20VIC%20Australia!5e0!3m2!1sen!2sus!4v1652911082391!5m2!1sen!2sus"}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Office Location"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
