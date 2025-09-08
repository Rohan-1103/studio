import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, ShoppingCart } from 'lucide-react';
import type { SuggestionResult } from '@/app/page';

interface PerfumeSuggestionProps {
  suggestion: SuggestionResult;
  onReset: () => void;
}

export function PerfumeSuggestion({ suggestion, onReset }: PerfumeSuggestionProps) {
  return (
    <Card className="w-full animate-in fade-in zoom-in-95 duration-700">
      <CardHeader className="text-center">
        <div className="flex justify-center items-center gap-2 text-muted-foreground">
          <Sparkles className="w-5 h-5" />
          <span>Your Personalized Suggestion</span>
        </div>
        <CardTitle className="font-headline text-4xl text-primary mt-2">
          {suggestion.perfumeSuggestion}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
        <div className="w-48 h-64 relative flex-shrink-0">
          <Image
            src={suggestion.imageUrl || "https://picsum.photos/300/400"}
            alt={suggestion.perfumeSuggestion}
            width={300}
            height={400}
            data-ai-hint="perfume bottle"
            className="rounded-lg object-contain shadow-lg"
          />
        </div>
        <div className="text-center md:text-left">
          <h3 className="font-headline text-xl text-foreground">Why it's a match</h3>
          <CardDescription className="text-base mt-2 leading-relaxed">
            {suggestion.reasoning}
          </CardDescription>
        </div>
      </CardContent>
      <CardFooter className="flex-col sm:flex-row gap-2">
        <Button onClick={onReset} variant="outline" className="w-full">
          Find Another Scent
        </Button>
        <Button asChild className="w-full">
          <Link href={suggestion.buyingLink} target="_blank" rel="noopener noreferrer">
            <ShoppingCart className="mr-2" />
            Buy Now
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
