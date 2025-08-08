'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Bot, Loader2, Sparkles } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { getSentimentAnalysis } from '@/app/actions';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  poemTextUrdu: z
    .string()
    .min(10, { message: 'Please enter a poem in Urdu.' }),
  poemTextEnglish: z
    .string()
    .min(10, { message: 'Please enter the English translation.' }),
});

type FormValues = z.infer<typeof formSchema>;
type AnalysisResult = { sentimentAnalysis: string };

export function SentimentAnalyzer() {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      poemTextUrdu: '',
      poemTextEnglish: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    setAnalysis(null);
    const result = await getSentimentAnalysis(values);
    setIsLoading(false);

    if (result.error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.error,
      });
    } else if (result.data) {
      setAnalysis(result.data);
      toast({
        title: 'Analysis Complete',
        description: 'The sentiment analysis is ready below.',
      });
    }
  };

  return (
    <>
      <Card className="mx-auto max-w-4xl shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-xl">
            Analyze a Poem
          </CardTitle>
          <CardDescription>
            Enter the poem's text below to begin. For best results, provide a
            few complete verses.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="poemTextUrdu"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-headline text-lg">
                        Urdu Text (اردو)
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="خودی کو کر بلند اتنا کہ ہر تقدیر سے پہلے
خدا بندے سے خود پوچھے بتا تیری رضا کیا ہے"
                          className="h-48 resize-none font-body"
                          dir="rtl"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="poemTextEnglish"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-headline text-lg">
                        English Translation
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Elevate your self so high that before every decree of destiny
God himself asks his slave, 'Tell me, what is your will?'"
                          className="h-48 resize-none font-body"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                disabled={isLoading}
                className="ml-auto w-full md:w-auto"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Analyze Sentiment
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      {isLoading && !analysis && (
        <Card className="mx-auto mt-8 max-w-4xl">
          <CardHeader className="flex flex-row items-center gap-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-32" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3 pt-0">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </CardContent>
        </Card>
      )}

      {analysis && (
        <Card className="mx-auto mt-8 max-w-4xl">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Bot className="h-8 w-8 flex-shrink-0 text-primary" />
              <div>
                <CardTitle className="font-headline text-2xl">
                  Sentiment Analysis
                </CardTitle>
                <CardDescription>Generated by AI</CardDescription>
              </div>
            </div>
          </CardHeader>
          <Separator className="my-0" />
          <CardContent className="pt-6">
            <div className="font-body space-y-4 text-base leading-relaxed text-foreground/90">
              {analysis.sentimentAnalysis
                .split('\n')
                .filter((p) => p.trim() !== '')
                .map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
