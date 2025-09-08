'use client';

import { useState } from 'react';
import type { AnalyzeUserPreferencesOutput } from '@/ai/flows/analyze-user-preferences';
import { getPerfumeSuggestion } from '@/app/actions';
import { Header } from '@/components/header';
import { PerfumeSuggestion } from '@/components/perfume-suggestion';
import { Questionnaire } from '@/components/questionnaire';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLocalStorage } from '@/hooks/use-local-storage';

type Step = 'questionnaire' | 'loading' | 'result';

export type SuggestionResult = AnalyzeUserPreferencesOutput & {
  id: string;
  timestamp: string;
};

export default function Home() {
  const [step, setStep] = useState<Step>('questionnaire');
  const [suggestion, setSuggestion] = useState<SuggestionResult | null>(null);
  const [history, setHistory] = useLocalStorage<SuggestionResult[]>('scent-history', []);
  const { toast } = useToast();

  const handleQuestionnaireSubmit = async (responses: string[]) => {
    setStep('loading');
    try {
      const result = await getPerfumeSuggestion(responses);
      const newSuggestion: SuggestionResult = {
        ...result,
        id: new Date().getTime().toString(),
        timestamp: new Date().toISOString(),
      };
      setSuggestion(newSuggestion);
      setHistory([newSuggestion, ...history]);
      setStep('result');
    } catch (error) {
      console.error('Failed to get perfume suggestion:', error);
      toast({
        title: 'Error',
        description: 'Could not get a perfume suggestion. Please try again.',
        variant: 'destructive',
      });
      setStep('questionnaire');
    }
  };

  const handleReset = () => {
    setSuggestion(null);
    setStep('questionnaire');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header history={history} setHistory={setHistory} />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12 flex items-center justify-center">
        <div className="w-full max-w-2xl">
          {step === 'questionnaire' && (
            <Questionnaire onSubmit={handleQuestionnaireSubmit} />
          )}
          {step === 'loading' && (
            <div className="flex flex-col items-center justify-center text-center p-8">
              <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
              <h2 className="text-2xl font-headline text-primary">Finding Your Scent...</h2>
              <p className="text-muted-foreground mt-2">Our AI is analyzing your preferences.</p>
            </div>
          )}
          {step === 'result' && suggestion && (
            <PerfumeSuggestion suggestion={suggestion} onReset={handleReset} />
          )}
        </div>
      </main>
    </div>
  );
}
