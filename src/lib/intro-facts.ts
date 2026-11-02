export type IntroFitnessFact = {
  id: string;
  lead?: string;
  body: string;
};

export const introFitnessFacts: IntroFitnessFact[] = [
  {
    id: "law",
    lead: "Here's the law.",
    body:
      "After a hard session, muscle protein synthesis stays elevated for roughly 24 to 48 hours. Then it flatlines back to baseline, whether or not you've fully recovered.",
  },
  {
    id: "studies",
    body:
      "Studies measuring this directly found the elevation typically lasts 24 to 48 hours post-session, longer in untrained lifters and after unfamiliar or especially hard training.\n\nPast that point, more volume on the same muscle adds fatigue, not growth.",
  },
  {
    id: "daily",
    lead: "This is why training a muscle every single day backfires.",
    body:
      "It feels productive. It looks disciplined. But most of those sessions are landing inside a window that's already closed, so the stimulus gets wasted instead of stacked.",
  },
  {
    id: "fix",
    lead: "The fix is almost boring.",
    body:
      "Train each major muscle group roughly once or twice a week, with at least 48 hours between sessions hitting it directly. That's it. That's the whole adjustment.",
  },
];
