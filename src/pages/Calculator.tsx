
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator as CalcIcon } from 'lucide-react';

const Calculator = () => {
  const [loanAmount, setLoanAmount] = useState(500000);
  const [interestRate, setInterestRate] = useState(3.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [paymentFrequency, setPaymentFrequency] = useState('monthly');
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalRepayment, setTotalRepayment] = useState(0);
  
  const calculateLoan = () => {
    // Convert annual interest rate to monthly
    const monthlyRate = interestRate / 100 / 12;
    
    // Convert loan term to months
    const termMonths = loanTerm * 12;
    
    // Calculate monthly payment
    const x = Math.pow(1 + monthlyRate, termMonths);
    const monthly = (loanAmount * x * monthlyRate) / (x - 1);
    
    // Calculate total payment and interest
    const totalPaid = monthly * termMonths;
    const totalInterestPaid = totalPaid - loanAmount;
    
    // Adjust for payment frequency
    let payment = monthly;
    let totalPaidAdjusted = totalPaid;
    let totalInterestAdjusted = totalInterestPaid;
    
    if (paymentFrequency === 'fortnightly') {
      payment = (monthly * 12) / 26;
      totalPaidAdjusted = payment * 26 * loanTerm;
      totalInterestAdjusted = totalPaidAdjusted - loanAmount;
    } else if (paymentFrequency === 'weekly') {
      payment = (monthly * 12) / 52;
      totalPaidAdjusted = payment * 52 * loanTerm;
      totalInterestAdjusted = totalPaidAdjusted - loanAmount;
    }
    
    setMonthlyPayment(payment);
    setTotalRepayment(totalPaidAdjusted);
    setTotalInterest(totalInterestAdjusted);
  };
  
  useEffect(() => {
    calculateLoan();
  }, [loanAmount, interestRate, loanTerm, paymentFrequency]);
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  const handleLoanAmountChange = (value: string) => {
    const numValue = parseFloat(value.replace(/[^0-9.]/g, ''));
    if (!isNaN(numValue)) {
      setLoanAmount(numValue);
    }
  };
  
  const handleInterestRateChange = (value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      setInterestRate(numValue);
    }
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-loan-primary mb-4">Loan Calculator</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Use our calculator to estimate your loan repayments and see how different loan terms and interest rates affect your monthly payments.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalcIcon className="h-5 w-5 text-loan-primary" />
                  Loan Calculator
                </CardTitle>
                <CardDescription>
                  Adjust the values to calculate your estimated repayments
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="loanAmount">Loan Amount</Label>
                    <span className="text-sm font-medium">{formatCurrency(loanAmount)}</span>
                  </div>
                  <Slider
                    id="loanAmount"
                    min={10000}
                    max={2000000}
                    step={10000}
                    value={[loanAmount]}
                    onValueChange={(value) => setLoanAmount(value[0])}
                    className="mb-2"
                  />
                  <Input
                    type="text"
                    value={formatCurrency(loanAmount)}
                    onChange={(e) => handleLoanAmountChange(e.target.value)}
                    className="mt-2"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="interestRate">Interest Rate (%)</Label>
                    <span className="text-sm font-medium">{interestRate.toFixed(2)}%</span>
                  </div>
                  <Slider
                    id="interestRate"
                    min={0.5}
                    max={10}
                    step={0.05}
                    value={[interestRate]}
                    onValueChange={(value) => setInterestRate(value[0])}
                    className="mb-2"
                  />
                  <Input
                    type="number"
                    value={interestRate}
                    onChange={(e) => handleInterestRateChange(e.target.value)}
                    className="mt-2"
                    step="0.05"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="loanTerm">Loan Term (Years)</Label>
                    <span className="text-sm font-medium">{loanTerm} years</span>
                  </div>
                  <Tabs defaultValue="30" className="w-full" onValueChange={(value) => setLoanTerm(parseInt(value))}>
                    <TabsList className="grid grid-cols-4 w-full">
                      <TabsTrigger value="15">15</TabsTrigger>
                      <TabsTrigger value="20">20</TabsTrigger>
                      <TabsTrigger value="25">25</TabsTrigger>
                      <TabsTrigger value="30">30</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="paymentFrequency">Payment Frequency</Label>
                  <Select defaultValue="monthly" onValueChange={setPaymentFrequency}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="fortnightly">Fortnightly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button 
                  className="w-full bg-loan-primary hover:bg-opacity-90" 
                  onClick={calculateLoan}
                >
                  Calculate
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="bg-loan-light">
              <CardHeader>
                <CardTitle>Your Repayment Summary</CardTitle>
                <CardDescription>
                  Based on your loan details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="text-sm text-gray-500">{paymentFrequency.charAt(0).toUpperCase() + paymentFrequency.slice(1)} Repayment</div>
                    <div className="text-3xl font-bold text-loan-primary">{formatCurrency(monthlyPayment)}</div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="text-sm text-gray-500">Total Repayment</div>
                    <div className="text-2xl font-bold text-loan-primary">{formatCurrency(totalRepayment)}</div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="text-sm text-gray-500">Total Interest</div>
                    <div className="text-2xl font-bold text-loan-primary">{formatCurrency(totalInterest)}</div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-semibold mb-2">Loan Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Loan Amount:</span>
                      <span className="font-medium">{formatCurrency(loanAmount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Interest Rate:</span>
                      <span className="font-medium">{interestRate.toFixed(2)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Loan Term:</span>
                      <span className="font-medium">{loanTerm} years</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Payment Frequency:</span>
                      <span className="font-medium">{paymentFrequency.charAt(0).toUpperCase() + paymentFrequency.slice(1)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-center text-sm text-gray-500">
                  <p>This is an estimate only. Contact our loan specialists for a personalized assessment.</p>
                </div>
                
                <Button variant="outline" className="w-full border-loan-primary text-loan-primary hover:bg-loan-primary hover:text-white">
                  Apply For This Loan
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Calculator;
