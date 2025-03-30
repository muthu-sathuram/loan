import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, Home, FileText, Settings, BarChart, 
  Phone, Mail, AlertTriangle, CheckCircle, Clock, Edit, Plus, Trash2
} from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getLoanProducts, 
  getHomeContent, 
  getFeatureCards, 
  getContactInfo, 
  getAboutContent,
  getTeamMembers,
  upsertLoanProduct,
  deleteLoanProduct,
  LoanProduct
} from '@/services/dataService';
import LoanProductEditor from '@/components/admin/LoanProductEditor';
import HomeContentEditor from '@/components/admin/HomeContentEditor';
import FeatureCardEditor from '@/components/admin/FeatureCardEditor';
import ContactInfoEditor from '@/components/admin/ContactInfoEditor';
import AboutContentEditor from '@/components/admin/AboutContentEditor';
import TeamMemberEditor from '@/components/admin/TeamMemberEditor';
import { toast } from 'sonner';

const AdminDashboard = () => {
  const { currentUser, isAdmin } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [activeEditor, setActiveEditor] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<any | null>(null);

  const { data: loanProducts = [] } = useQuery({
    queryKey: ['loanProducts'],
    queryFn: getLoanProducts
  });

  const { data: homeContent } = useQuery({
    queryKey: ['homeContent'],
    queryFn: getHomeContent
  });

  const { data: featureCards = [] } = useQuery({
    queryKey: ['featureCards'],
    queryFn: getFeatureCards
  });

  const { data: contactInfo } = useQuery({
    queryKey: ['contactInfo'],
    queryFn: getContactInfo
  });

  const { data: aboutContent } = useQuery({
    queryKey: ['aboutContent'],
    queryFn: getAboutContent
  });

  const { data: teamMembers = [] } = useQuery({
    queryKey: ['teamMembers'],
    queryFn: getTeamMembers
  });

  const deleteLoanMutation = useMutation({
    mutationFn: deleteLoanProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['loanProducts'] });
      toast.success('Loan product deleted successfully');
    },
    onError: (error: any) => {
      toast.error(`Failed to delete loan product: ${error.message}`);
    }
  });

  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin-login');
    }
  }, [isAdmin, navigate]);

  if (!isAdmin) {
    return null;
  }

  const handleEdit = (item: any, editorType: string) => {
    setEditingItem(item);
    setActiveEditor(editorType);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      await deleteLoanMutation.mutateAsync(id);
    }
  };

  const handleEditorClose = () => {
    setActiveEditor(null);
    setEditingItem(null);
  };

  const renderEditor = () => {
    switch (activeEditor) {
      case 'loan':
        return (
          <LoanProductEditor 
            product={editingItem} 
            onClose={handleEditorClose} 
          />
        );
      case 'home':
        return (
          <HomeContentEditor 
            content={editingItem || homeContent} 
            onClose={handleEditorClose} 
          />
        );
      case 'feature':
        return (
          <FeatureCardEditor 
            card={editingItem} 
            onClose={handleEditorClose} 
          />
        );
      case 'contact':
        return (
          <ContactInfoEditor 
            info={editingItem || contactInfo} 
            onClose={handleEditorClose} 
          />
        );
      case 'about':
        return (
          <AboutContentEditor 
            content={editingItem || aboutContent} 
            onClose={handleEditorClose} 
          />
        );
      case 'team':
        return (
          <TeamMemberEditor 
            member={editingItem} 
            onClose={handleEditorClose} 
          />
        );
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-loan-primary mb-2">Admin Dashboard</h1>
        <p className="text-gray-600 mb-6">Welcome back, {currentUser?.email}</p>

        {activeEditor ? (
          renderEditor()
        ) : (
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="grid grid-cols-3 lg:grid-cols-6 h-auto">
              <TabsTrigger value="overview" className="py-2">Overview</TabsTrigger>
              <TabsTrigger value="loans" className="py-2">Loans</TabsTrigger>
              <TabsTrigger value="home" className="py-2">Home Page</TabsTrigger>
              <TabsTrigger value="contact" className="py-2">Contact</TabsTrigger>
              <TabsTrigger value="about" className="py-2">About</TabsTrigger>
              <TabsTrigger value="settings" className="py-2">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">124</div>
                    <p className="text-xs text-muted-foreground">+14% from last month</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Loans</CardTitle>
                    <Home className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">45</div>
                    <p className="text-xs text-muted-foreground">+5% from last month</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                    <BarChart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">24.3%</div>
                    <p className="text-xs text-muted-foreground">+2.1% from last month</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Inquiries</CardTitle>
                    <Phone className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">78</div>
                    <p className="text-xs text-muted-foreground">+12% from last month</p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card className="col-span-1">
                  <CardHeader>
                    <CardTitle>Recent Leads</CardTitle>
                    <CardDescription>Recent customer inquiries</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {[
                        { name: 'John Davis', email: 'john@example.com', date: '2 hours ago', status: 'new' },
                        { name: 'Sarah Miller', email: 'sarah@example.com', date: '4 hours ago', status: 'contacted' },
                        { name: 'Robert Johnson', email: 'robert@example.com', date: '1 day ago', status: 'qualified' },
                        { name: 'Emma Wilson', email: 'emma@example.com', date: '2 days ago', status: 'disqualified' }
                      ].map((lead, i) => (
                        <li key={i} className="flex items-center justify-between border-b border-gray-100 pb-2">
                          <div className="flex flex-col">
                            <span className="font-medium">{lead.name}</span>
                            <span className="text-sm text-gray-500">{lead.email}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-500">{lead.date}</span>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              lead.status === 'new' ? 'bg-blue-100 text-blue-800' : 
                              lead.status === 'contacted' ? 'bg-yellow-100 text-yellow-800' : 
                              lead.status === 'qualified' ? 'bg-green-100 text-green-800' : 
                              'bg-red-100 text-red-800'
                            }`}>
                              {lead.status}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <Button variant="ghost" className="w-full mt-4 text-loan-primary">
                      View All Leads
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="col-span-1">
                  <CardHeader>
                    <CardTitle>Task List</CardTitle>
                    <CardDescription>Your upcoming tasks</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {[
                        { task: 'Call back John Davis about refinancing options', priority: 'high', due: 'Today' },
                        { task: 'Send investment loan documents to Sarah Miller', priority: 'medium', due: 'Tomorrow' },
                        { task: 'Update rate information on website', priority: 'low', due: 'Next week' },
                        { task: 'Follow up with Robert Johnson on pre-approval', priority: 'medium', due: 'Today' }
                      ].map((task, i) => (
                        <li key={i} className="flex items-start space-x-3 border-b border-gray-100 pb-2">
                          {task.priority === 'high' ? (
                            <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                          ) : task.priority === 'medium' ? (
                            <Clock className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
                          ) : (
                            <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                          )}
                          <div className="flex-1">
                            <div className="font-medium text-sm">{task.task}</div>
                            <div className="text-xs text-gray-500">Due: {task.due}</div>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <Button variant="ghost" className="w-full mt-4 text-loan-primary">
                      View All Tasks
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="loans" className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Loan Products</h2>
                <Button 
                  onClick={() => handleEdit(null, 'loan')}
                  className="bg-loan-primary"
                >
                  <Plus className="mr-2 h-4 w-4" /> Add New Loan
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {loanProducts.map((loan: LoanProduct) => (
                  <Card key={loan.id} className="overflow-hidden">
                    <div className="h-40 overflow-hidden">
                      <img 
                        src={loan.imageUrl} 
                        alt={loan.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader className="p-4">
                      <CardTitle className="text-xl">{loan.title}</CardTitle>
                      <CardDescription>{loan.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="font-bold text-loan-primary mb-2">Rate: {loan.rate}</p>
                      <div className="flex space-x-2 mt-4">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEdit(loan, 'loan')}
                        >
                          <Edit className="h-4 w-4 mr-1" /> Edit
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleDelete(loan.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" /> Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="home" className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Home Page Content</h2>
                <Button 
                  onClick={() => handleEdit(homeContent, 'home')}
                  className="bg-loan-primary"
                >
                  <Edit className="mr-2 h-4 w-4" /> Edit Content
                </Button>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Hero Section</CardTitle>
                </CardHeader>
                <CardContent>
                  <p><strong>Title:</strong> {homeContent?.heroTitle || 'Not set'}</p>
                  <p><strong>Subtitle:</strong> {homeContent?.heroSubtitle || 'Not set'}</p>
                </CardContent>
              </Card>
              
              <div className="flex justify-between items-center mb-4 mt-8">
                <h3 className="text-xl font-bold">Feature Cards</h3>
                <Button 
                  onClick={() => handleEdit(null, 'feature')}
                  className="bg-loan-primary"
                >
                  <Plus className="mr-2 h-4 w-4" /> Add Feature
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {featureCards.map(card => (
                  <Card key={card.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">{card.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{card.description}</p>
                      <div className="flex space-x-2 mt-4">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEdit(card, 'feature')}
                        >
                          <Edit className="h-4 w-4 mr-1" /> Edit
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleDelete(card.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" /> Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="contact" className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Contact Information</h2>
                <Button 
                  onClick={() => handleEdit(contactInfo, 'contact')}
                  className="bg-loan-primary"
                >
                  <Edit className="mr-2 h-4 w-4" /> Edit Contact Info
                </Button>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Contact Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p><strong>Address:</strong> {contactInfo?.address || 'Not set'}</p>
                  <p><strong>Phone:</strong> {contactInfo?.phone || 'Not set'}</p>
                  <p><strong>Email:</strong> {contactInfo?.email || 'Not set'}</p>
                  <div>
                    <strong>Business Hours:</strong>
                    <ul className="list-disc ml-5">
                      {contactInfo?.businessHours?.map((hour, index) => (
                        <li key={index}>{hour}</li>
                      )) || <li>Not set</li>}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="about" className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">About Page Content</h2>
                <Button 
                  onClick={() => handleEdit(aboutContent, 'about')}
                  className="bg-loan-primary"
                >
                  <Edit className="mr-2 h-4 w-4" /> Edit About Content
                </Button>
              </div>
              
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>About Us Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <p><strong>Title:</strong> {aboutContent?.title || 'Not set'}</p>
                  <p><strong>Subtitle:</strong> {aboutContent?.subtitle || 'Not set'}</p>
                  <p><strong>Description:</strong> {aboutContent?.description || 'Not set'}</p>
                </CardContent>
              </Card>
              
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Team Members</h3>
                <Button 
                  onClick={() => handleEdit(null, 'team')}
                  className="bg-loan-primary"
                >
                  <Plus className="mr-2 h-4 w-4" /> Add Team Member
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {teamMembers.map(member => (
                  <Card key={member.id}>
                    <div className="h-40 overflow-hidden">
                      <img 
                        src={member.imageUrl} 
                        alt={member.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle>{member.name}</CardTitle>
                      <CardDescription>{member.position}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm line-clamp-3">{member.bio}</p>
                      <div className="flex space-x-2 mt-4">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEdit(member, 'team')}
                        >
                          <Edit className="h-4 w-4 mr-1" /> Edit
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleDelete(member.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" /> Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="settings" className="p-4 bg-white rounded-lg border">
              <h2 className="text-2xl font-bold mb-4">Account Settings</h2>
              <p className="text-gray-600">Manage your account settings and preferences.</p>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Admin User</CardTitle>
                </CardHeader>
                <CardContent>
                  <p><strong>Email:</strong> {currentUser?.email}</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => navigate('/admin-login')}
                  >
                    Back to Login
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </Layout>
  );
};

export default AdminDashboard;
