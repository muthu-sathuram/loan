
import React from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import LoanCard from '@/components/LoanCard';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Phone, Award, Percent, Shield, Lightbulb } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getLoanProducts, getHomeContent, getFeatureCards } from '@/services/dataService';
import { Skeleton } from '@/components/ui/skeleton';

// Helper function to get the right icon component
const IconComponent = (iconName: string) => {
  switch (iconName) {
    case 'Clock': return <Clock className="h-8 w-8 text-loan-primary" />;
    case 'Award': return <Award className="h-8 w-8 text-loan-primary" />;
    case 'Percent': return <Percent className="h-8 w-8 text-loan-primary" />;
    case 'Shield': return <Shield className="h-8 w-8 text-loan-primary" />;
    case 'Lightbulb': return <Lightbulb className="h-8 w-8 text-loan-primary" />;
    case 'Phone': return <Phone className="h-8 w-8 text-loan-primary" />;
    default: return <Clock className="h-8 w-8 text-loan-primary" />;
  }
};

const Index = () => {
  // Fetch data from Supabase
  const { data: loanProducts = [], isLoading: loadingLoans } = useQuery({
    queryKey: ['loanProducts'],
    queryFn: getLoanProducts
  });

  const { data: homeContent, isLoading: loadingHomeContent } = useQuery({
    queryKey: ['homeContent'],
    queryFn: getHomeContent
  });

  const { data: featureCards = [], isLoading: loadingFeatures } = useQuery({
    queryKey: ['featureCards'],
    queryFn: getFeatureCards
  });

  // Featured loans (first 3)
  const featuredLoans = loanProducts.slice(0, 3);

  return (
    <Layout>
      <Hero 
        title={homeContent?.heroTitle || "Your Journey to Home Ownership Starts Here"}
        subtitle={homeContent?.heroSubtitle || "Expert mortgage solutions tailored to your needs"}
        imageUrl={homeContent?.heroImageUrl}
      />
      
      {/* Featured Loan Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-loan-primary mb-4">
              {homeContent?.featuredTitle || "Popular Loan Products"}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {homeContent?.featuredDescription || "Explore our most popular loan options designed to meet your financial needs and help you achieve your property goals."}
            </p>
          </div>
          
          {loadingLoans ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border rounded-lg overflow-hidden shadow-sm">
                  <Skeleton className="h-48 w-full" />
                  <div className="p-4 space-y-3">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <div className="space-y-2 pt-4">
                      <Skeleton className="h-4 w-2/3" />
                      <Skeleton className="h-4 w-2/3" />
                      <Skeleton className="h-4 w-2/3" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredLoans.map((loan) => (
                <LoanCard key={loan.id} {...loan} />
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <Link to="/loans">
              <Button className="bg-loan-primary text-white hover:bg-opacity-90">
                View All Loan Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Why Choose Us */}
      <section className="py-16 bg-loan-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-loan-primary mb-4">
              {homeContent?.whyChooseUsTitle || "Why Choose Srinivasan Associates"}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {homeContent?.whyChooseUsDescription || "We're committed to making your home loan experience as smooth and efficient as possible."}
            </p>
          </div>
          
          {loadingFeatures ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex flex-col items-center text-center">
                    <Skeleton className="h-16 w-16 rounded-full mb-4" />
                    <Skeleton className="h-6 w-1/2 mb-2" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full mt-1" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featureCards.map((feature) => (
                <div key={feature.id} className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center card-hover">
                  <div className="p-3 bg-loan-light rounded-full mb-4">
                    {IconComponent(feature.icon)}
                  </div>
                  <h3 className="text-xl font-semibold text-loan-primary mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <Link to="/contact">
              <Button className="bg-loan-secondary text-loan-primary hover:bg-opacity-90">
                Contact Us Today
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-loan-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {homeContent?.ctaTitle || "Ready to Get Started?"}
          </h2>
          <p className="max-w-2xl mx-auto mb-8 text-gray-200">
            {homeContent?.ctaDescription || "Let us help you find the perfect loan solution for your needs. Talk to one of our loan specialists today."}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/calculator">
              <Button className="bg-white text-loan-primary hover:bg-gray-100">
                Calculate Your Loan
              </Button>
            </Link>
            <Link to="/contact">
              <Button className="bg-white text-loan-primary hover:bg-gray-100">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
