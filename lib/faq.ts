import type { Chapter } from "@/lib/types";

export type Faq = { question: string; answer: string };

/** National FAQ. The parking answer uses the chapter's parkingNote. */
export function chapterFaqs(chapter: Chapter): Faq[] {
  return [
    {
      question: "Do I need investing experience?",
      answer:
        "Not at all. Complete beginners and seasoned investors share the same room. Come curious and ask anything.",
    },
    {
      question: "Is it really free?",
      answer: `Yes. ${chapter.cost}. RSVP so we can plan the space. WREI Connected chapter meetups do not charge a ticket.`,
    },
    {
      question: "What time should I arrive?",
      answer:
        "Doors open at 6:30 PM. Come a few minutes early for a name tag and a seat before the speaker starts at 7:00 PM. Networking runs until 9:30 PM.",
    },
    {
      question: "Can I come alone?",
      answer:
        "Please do. Most women walk in on their own and leave with people they want to see again. Your hosts will make sure you are welcomed.",
    },
    {
      question: "Where do I park?",
      answer: chapter.parkingNote,
    },
  ];
}

export const AGENDA = [
  { time: "6:30 PM", label: "Doors open, drinks and food" },
  { time: "7:00 PM", label: "Speaker on the month's topic" },
  { time: "7:30 PM", label: "Networking until 9:30" },
] as const;
