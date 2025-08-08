'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const poems = [
  {
    title: 'Khudi Ko Kar Buland Itna',
    englishTitle: 'Elevate Your Self So High',
    urdu: [
      'خودی کو کر بلند اتنا کہ ہر تقدیر سے پہلے',
      'خدا بندے سے خود پوچھے بتا تیری رضا کیا ہے',
    ],
    english: [
      'Elevate your self so high that before every decree of destiny,',
      'God himself asks his slave, "Tell me, what is your will?"',
    ],
  },
  {
    title: 'Sitaron Se Aage Jahan Aur Bhi Hain',
    englishTitle: 'There Are Worlds Beyond the Stars',
    urdu: [
      'ستاروں سے آگے جہاں اور بھی ہیں',
      'ابھی عشق کے امتحاں اور بھی ہیں',
    ],
    english: [
      'There are worlds beyond the stars,',
      'There are still more tests of love.',
    ],
  },
  {
    title: 'Lab Pe Aati Hai Dua',
    englishTitle: 'A Prayer Comes to My Lips',
    urdu: [
      'لب پہ آتی ہے دعا بن کے تمنا میری',
      'زندگی شمع کی صورت ہو خدایا میری',
    ],
    english: [
      'My longing comes to my lips as a prayer.',
      'May my life be like that of a candle, O Lord!',
    ],
  },
    {
    title: 'Masjid To Bana Di Shab Bhar Mein',
    englishTitle: 'You built a mosque in a night',
    urdu: [
      'مسجد تو بنا دی شب بھر میں ایماں کی حرارت والوں نے',
      'من اپنا پرانا پاپی ہے، برسوں میں نمازی بن نہ سکا',
    ],
    english: [
      'The men of zeal built the mosque in a single night,',
      'But my heart, an old sinner, could not become a worshipper in years.',
    ],
  },
];

export function PoetryDisplay() {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      {poems.map((poem, index) => (
        <Card key={index} className="overflow-hidden shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">{poem.englishTitle}</CardTitle>
            <CardDescription className="text-lg">{poem.title}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2 text-right" dir="rtl">
                {poem.urdu.map((line, lineIndex) => (
                  <p key={lineIndex} className="font-body text-xl">
                    {line}
                  </p>
                ))}
              </div>
              <div className="space-y-2">
                {poem.english.map((line, lineIndex) => (
                  <p key={lineIndex} className="font-body text-lg italic">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
