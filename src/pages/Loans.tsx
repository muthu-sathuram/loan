
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import LoanCard from '@/components/LoanCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useQuery } from '@tanstack/react-query';
import { getLoanProducts } from '@/services/dataService';
import { Skeleton } from '@/components/ui/skeleton';

const Loans = () => {
  // Fetch loan products from Supabase
  const { data: loanProducts = [], isLoading } = useQuery({
    queryKey: ['loanProducts'],
    queryFn: getLoanProducts
  });
  
  // Get unique categories from loan products
  const categories = loanProducts.length > 0 
    ? ['all', ...new Set(loanProducts.map(loan => loan.category))]
    : ['all', 'home', 'refinance', 'investment', 'construction', 'other'];
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-loan-primary mb-4">Our Loan Products</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our range of loan products designed to suit your specific needs. Whether you're buying your first home, refinancing, or investing, we have the right solution for you.
          </p>
        </div>

        <Tabs defaultValue="all" className="max-w-4xl mx-auto mb-12">
          <TabsList className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {categories.map(category => (
              <TabsTrigger key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {isLoading ? (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array(6).fill(null).map((_, i) => (
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
            <>
              <TabsContent value="all" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {loanProducts.map(loan => (
                    <LoanCard key={loan.id} {...loan} />
                  ))}
                </div>
              </TabsContent>
              
              {categories.filter(category => category !== 'all').map(category => (
                <TabsContent key={category} value={category} className="mt-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loanProducts.filter(loan => loan.category === category).map(loan => (
                      <LoanCard key={loan.id} {...loan} />
                    ))}
                  </div>
                </TabsContent>
              ))}
            </>
          )}
        </Tabs>
      </div>
    </Layout>
  );
};

export default Loans;
