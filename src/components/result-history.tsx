import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Trash2 } from 'lucide-react';
import type { SuggestionResult } from '@/app/page';

interface ResultHistoryProps {
  children: React.ReactNode;
  history: SuggestionResult[];
  setHistory: (history: SuggestionResult[]) => void;
}

export function ResultHistory({ children, history, setHistory }: ResultHistoryProps) {
  const handleClearHistory = () => {
    setHistory([]);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="font-headline">Suggestion History</SheetTitle>
          <SheetDescription>
            Here are the scents we've recommended for you in the past.
          </SheetDescription>
        </SheetHeader>
        <div className="h-[calc(100%-8rem)]">
          <ScrollArea className="h-full pr-4 mt-4">
            {history.length > 0 ? (
              <ul className="space-y-4">
                {history.map((item) => (
                  <li key={item.id} className="border p-4 rounded-lg">
                    <p className="font-headline text-lg text-primary">{item.perfumeSuggestion}</p>
                    <p className="text-sm text-muted-foreground mt-1">{item.reasoning}</p>
                    <p className="text-xs text-muted-foreground mt-2">{new Date(item.timestamp).toLocaleString()}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center text-muted-foreground mt-16">
                <p>No history yet.</p>
                <p>Complete a questionnaire to see your suggestions here.</p>
              </div>
            )}
          </ScrollArea>
        </div>
        <SheetFooter className="mt-4">
          <Button
            variant="outline"
            onClick={handleClearHistory}
            disabled={history.length === 0}
            className="w-full"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Clear History
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
