
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check } from 'lucide-react';

interface LoanCardProps {
  id: string;
  title: string;
  description: string;
  rate: string;
  features: string[];
  imageUrl?: string;
}

const LoanCard: React.FC<LoanCardProps> = ({
  id,
  title,
  description,
  rate,
  features,
  imageUrl
}) => {
  return (
    <Card className="h-full card-hover">
      <CardHeader className="space-y-1">
        {imageUrl && (
          <div className="w-full h-40 rounded-t-lg overflow-hidden">
            <img 
              src={imageUrl} 
              alt={title} 
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <CardTitle className="text-2xl font-bold text-loan-primary">{title}</CardTitle>
        <div className="flex items-baseline space-x-1">
          <span className="text-3xl font-bold text-loan-secondary">{rate}</span>
          <span className="text-gray-500">p.a.</span>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start space-x-2">
              <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Link to={`/loans/${id}`} className="w-full">
          <Button className="w-full bg-loan-primary text-white hover:bg-opacity-90">
            View Details
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default LoanCard;
