
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { ShieldCheck, Users, Award, TrendingUp, MessageSquare, Building } from 'lucide-react';

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-loan-primary mb-4">About Srinivasan Associates</h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            We're dedicated to making the home loan process easier and more accessible for everyone. 
            Our team of experienced professionals is committed to providing personalized service and expert advice.
          </p>
        </div>
        
        {/* Our Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-bold text-loan-primary mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-4">
              At Srinivasan Associates, our mission is to simplify the mortgage process and help our clients achieve their 
              property ownership dreams. We believe everyone deserves access to fair, transparent, and affordable home 
              financing options.
            </p>
            <p className="text-gray-600 mb-4">
              We're committed to demystifying the mortgage industry and empowering our clients with the knowledge 
              and tools they need to make informed decisions about their financial future.
            </p>
            <div className="flex items-center space-x-2 text-loan-primary">
              <ShieldCheck className="h-5 w-5" />
              <span className="font-medium">Trusted by thousands of homeowners nationwide</span>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <img 
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800&h=500" 
              alt="Modern home exterior" 
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
        </div>
        
        {/* Our Values */}
        <div className="bg-loan-light rounded-lg p-8 mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-loan-primary mb-4">Our Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do and help us provide the best possible service to our clients.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-white card-hover">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-loan-primary rounded-full mb-4">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-loan-primary mb-2">Customer First</h3>
                  <p className="text-gray-600">
                    We always put our clients' needs first, ensuring we find the right loan solution for each individual situation.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white card-hover">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-loan-primary rounded-full mb-4">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-loan-primary mb-2">Integrity</h3>
                  <p className="text-gray-600">
                    We operate with complete transparency and honesty, always doing what's right for our clients.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white card-hover">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-loan-primary rounded-full mb-4">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-loan-primary mb-2">Innovation</h3>
                  <p className="text-gray-600">
                    We continuously seek better ways to serve our clients and simplify the home loan process.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white card-hover">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-loan-primary rounded-full mb-4">
                    <MessageSquare className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-loan-primary mb-2">Clear Communication</h3>
                  <p className="text-gray-600">
                    We explain complex mortgage concepts in simple terms, ensuring clients fully understand their options.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white card-hover">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-loan-primary rounded-full mb-4">
                    <Building className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-loan-primary mb-2">Community Focus</h3>
                  <p className="text-gray-600">
                    We're committed to strengthening the communities we serve through homeownership and investment.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white card-hover">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-loan-primary rounded-full mb-4">
                    <ShieldCheck className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-loan-primary mb-2">Reliability</h3>
                  <p className="text-gray-600">
                    We deliver on our promises and ensure a smooth, predictable loan process from start to finish.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Our Team */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-loan-primary mb-4">Meet Our Leadership Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our experienced team of mortgage professionals is dedicated to providing exceptional service.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-40 h-40 rounded-full overflow-hidden mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200&h=200" 
                  alt="John Davis" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-loan-primary">John Davis</h3>
              <p className="text-loan-secondary font-medium">CEO & Founder</p>
              <p className="text-gray-600 mt-2">
                With over 20 years of experience in the mortgage industry, Srinivasan founded Srinivasan Associates 
                to make home financing more accessible.
              </p>
            </div>
            
            {/* Team Member 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-40 h-40 rounded-full overflow-hidden mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200" 
                  alt="Sarah Miller" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-loan-primary">Sarah Miller</h3>
              <p className="text-loan-secondary font-medium">Chief Loan Officer</p>
              <p className="text-gray-600 mt-2">
                Sarah specializes in finding creative financing solutions for complex situations and 
                has helped thousands of clients secure their dream homes.
              </p>
            </div>
            
            {/* Team Member 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-40 h-40 rounded-full overflow-hidden mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200&h=200" 
                  alt="Michael Johnson" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-loan-primary">Michael Johnson</h3>
              <p className="text-loan-secondary font-medium">Financial Director</p>
              <p className="text-gray-600 mt-2">
                Michael ensures our clients receive the most competitive rates and favorable terms 
                through his extensive network of lending partners.
              </p>
            </div>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="bg-loan-primary text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="max-w-2xl mx-auto mb-6">
            Whether you're buying your first home, refinancing, or investing in property, our team is here to help you every step of the way.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <Button className="bg-white text-loan-primary hover:bg-gray-100">
                Contact Us Today
              </Button>
            </Link>
            <Link to="/loans">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-loan-primary">
                Explore Loan Products
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
