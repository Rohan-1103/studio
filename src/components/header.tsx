import { History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScentSenseiLogo } from '@/components/icons';
import { ResultHistory } from '@/components/result-history';
import type { SuggestionResult } from '@/app/page';

interface HeaderProps {
  history: SuggestionResult[];
  setHistory: (history: SuggestionResult[]) => void;
}

export function Header({ history, setHistory }: HeaderProps) {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ScentSenseiLogo className="w-8 h-8 text-primary" />
          <h1 className="text-2xl font-headline text-primary">ScentSensei</h1>
        </div>
        <ResultHistory history={history} setHistory={setHistory}>
          <Button variant="ghost" size="icon">
            <History className="w-5 h-5" />
            <span className="sr-only">View History</span>
          </Button>
        </ResultHistory>
      </div>
    </header>
  );
}
