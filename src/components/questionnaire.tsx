'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';

const questions = [
  {
    id: 'occasion',
    text: 'What occasion are you looking for a fragrance for?',
    options: [
      { value: 'For everyday wear', label: 'Everyday wear' },
      { value: 'For special events', label: 'Special events' },
      { value: 'For a romantic date', label: 'A romantic date' },
      { value: 'For office or work settings', label: 'Office/Work' },
    ],
  },
  {
    id: 'scent_family',
    text: 'Which scent family do you prefer?',
    options: [
      { value: 'I prefer fresh and zesty scents like citrus or green notes', label: 'Fresh & Zesty (Citrus, Green)' },
      { value: 'I prefer floral and sweet scents', label: 'Floral & Sweet' },
      { value: 'I prefer warm and spicy scents like oriental or woody notes', label: 'Warm & Spicy (Oriental, Woody)' },
      { value: 'I am not sure, surprise me!', label: "I'm not sure, surprise me!" },
    ],
  },
  {
    id: 'style',
    text: 'How would you describe your personal style?',
    options: [
      { value: 'My style is classic and elegant', label: 'Classic and elegant' },
      { value: 'My style is modern and bold', label: 'Modern and bold' },
      { value: 'My style is casual and relaxed', label: 'Casual and relaxed' },
      { value: 'My style is bohemian and free-spirited', label: 'Bohemian and free-spirited' },
    ],
  },
  {
    id: 'time_of_day',
    text: 'What time of day would you primarily wear this scent?',
    options: [
      { value: 'Primarily in the morning', label: 'Morning' },
      { value: 'Primarily in the afternoon', label: 'Afternoon' },
      { value: 'Primarily in the evening', label: 'Evening' },
      { value: 'All day long', label: 'All day' },
    ],
  },
  {
    id: 'environment',
    text: 'Which of these environments do you feel most drawn to?',
    options: [
      { value: 'I am drawn to a blooming garden in spring', label: 'A blooming garden in spring' },
      { value: 'I am drawn to a cozy library with old books', label: 'A cozy library with old books' },
      { value: 'I am drawn to a vibrant, bustling city', label: 'A vibrant, bustling city' },
      { value: 'I am drawn to a breezy, sun-drenched beach', label: 'A breezy, sun-drenched beach' },
    ],
  },
];

interface QuestionnaireProps {
  onSubmit: (responses: string[]) => void;
}

export function Questionnaire({ onSubmit }: QuestionnaireProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleAnswerChange = (value: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedResponses = questions.map(q => answers[q.id] || "No preference stated");
    onSubmit(formattedResponses);
  };

  const isCurrentQuestionAnswered = !!answers[currentQuestion.id];

  return (
    <Card className="w-full animate-in fade-in duration-500">
      <CardHeader>
        <Progress value={progress} className="mb-4 h-2" />
        <CardTitle className="font-headline text-3xl text-primary">
          {currentQuestion.text}
        </CardTitle>
        <CardDescription>
          Question {currentQuestionIndex + 1} of {questions.length}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <RadioGroup
            value={answers[currentQuestion.id]}
            onValueChange={handleAnswerChange}
            className="space-y-3"
          >
            {currentQuestion.options.map((option) => (
              <div key={option.value} className="flex items-center">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value} className="ml-3 text-base cursor-pointer">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            type="button"
            variant="ghost"
            onClick={handleBack}
            disabled={currentQuestionIndex === 0}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          {isLastQuestion ? (
            <Button type="submit" disabled={!isCurrentQuestionAnswered}>
              Get My Scent
            </Button>
          ) : (
            <Button type="button" onClick={handleNext} disabled={!isCurrentQuestionAnswered}>
              Next
            </Button>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}
