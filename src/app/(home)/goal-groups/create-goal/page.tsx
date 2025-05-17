'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DatePicker } from '@/components/ui/datePicker';

interface GoalFormData {
  title: string;
  description: string;
  rules: string[];
  stakeAmount: string;
  registrationDate?: Date;
  endDate?: Date;
}

export default function CreateGoal() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [rules, setRules] = useState('');
  const [stakeAmount, setStakeAmount] = useState('');
  const [registrationDate, setRegistrationDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [savedData, setSavedData] = useState<GoalFormData | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = {
      title,
      description,
      rules: rules
        .split('\n')
        .map((r) => r.trim())
        .filter((r) => r),
      stakeAmount,
      registrationDate,
      endDate,
    };
    
    console.log(formData);
    
    // Save the data to state
    setSavedData(formData);
    setIsSubmitted(true);
    
    // Optional: Reset form after submission
    // resetForm();
  };
  
  const resetForm = () => {
    setTitle('');
    setDescription('');
    setRules('');
    setStakeAmount('');
    setRegistrationDate(undefined);
    setEndDate(undefined);
  };

  return (
    <div className="container mx-auto">
      {isSubmitted && savedData && (
        <div className="mb-6 p-4 bg-green-800/80 text-white rounded-md">
          <h3 className="font-bold mb-2">Goal Created Successfully!</h3>
          <p>Your goal &quot;{savedData.title}&quot; has been saved.</p>
          <Button 
            onClick={() => setIsSubmitted(false)} 
            className="mt-2 bg-green-700 hover:bg-green-600"
          >
            Create Another Goal
          </Button>
        </div>
      )}
      
      <Card className="bg-neutral-800/80 backdrop-blur-sm border border-neutral-700 shadow-xl text-zinc-200">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Create Goal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-lg font-medium mb-1">
                Title
              </label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter goal title"
                required
                className="border-neutral-700 bg-neutral-900/50"
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-lg font-medium mb-1">
                Description
              </label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter goal description"
                rows={3}
                className="border-neutral-700 bg-neutral-900/50"
              />
            </div>

            {/* Rules */}
            <div>
              <label htmlFor="rules" className="block text-lg font-medium mb-1">
                Rules (one per line)
              </label>
              <Textarea
                id="rules"
                value={rules}
                onChange={(e) => setRules(e.target.value)}
                placeholder="Enter rules, one per line"
                rows={4}
                className="border-neutral-700 bg-neutral-900/50"
              />
            </div>

            {/* Stake Amount */}
            <div>
              <label htmlFor="stakeAmount" className="block text-lg font-medium mb-1">
                Stake Amount (Per Person)
              </label>
              <Input
                id="stakeAmount"
                type="number"
                min="0"
                step="0.01"
                value={stakeAmount}
                onChange={(e) => setStakeAmount(e.target.value)}
                placeholder="Enter stake amount in SOL"
                required
                className="border-neutral-700 bg-neutral-900/50"
              />
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-lg font-medium mb-1">
                  Registration Date
                </label>
                <DatePicker
                  date={registrationDate}
                  onDateChange={setRegistrationDate}
                  placeholder="Select registration date"
                />
              </div>
              <div>
                <label className="block text-lg font-medium mb-1">
                  End Date
                </label>
                <DatePicker
                  date={endDate}
                  onDateChange={setEndDate}
                  placeholder="Select end date"
                />
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full border-neutral-700 bg-blue-800 hover:bg-blue-700 text-zinc-200 font-semibold text-md"
            >
              Create Goal
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
