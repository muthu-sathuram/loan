
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Calculator } from 'lucide-react';

interface HeroProps {
  title: string;
  subtitle: string;
  imageUrl?: string;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle, imageUrl }) => {
  const backgroundImage = imageUrl || 'https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3';

  return (
    <div className="relative bg-loan-primary text-white">
      {/* Background overlay with semi-transparent image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-25" 
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>
      
      {/* Hero content */}
      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100 max-w-2xl">
            {subtitle}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/loans">
              <Button className="bg-white text-loan-primary hover:bg-gray-100 text-lg py-6 px-8 font-medium">
                Explore Loan Options
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/calculator">
              <Button className="bg-white text-loan-primary hover:bg-gray-100 text-lg py-6 px-8 font-medium">
                Loan Calculator
                <Calculator className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Bottom wave pattern */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="fill-white">
          <path d="M0,96L120,80C240,64,480,32,720,26.7C960,21,1200,43,1320,53.3L1440,64L1440,100L1320,100C1200,100,960,100,720,100C480,100,240,100,120,100L0,100Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default Hero;
