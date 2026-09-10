export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  image: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Marcus R.",
    role: "App User · Beginner",
    quote:
      "From guessing workouts to following a designed program in the app — Elite Body Fitness Pros made progress feel simple and measurable.",
    image:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=600&q=80",
  },
  {
    name: "Sofia L.",
    role: "App User · Busy Professional",
    quote:
      "I use the Elite Body Fitness Pros app on the road and at home. Personalized plans adapt to my schedule and the results showed up fast.",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=80",
  },
  {
    name: "Jordan K.",
    role: "App User · Athlete",
    quote:
      "The Elite Body Fitness Pros app kept my training locked in — smart tracking and clear progress so I finally stayed consistent.",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80",
  },
  {
    name: "Ava M.",
    role: "App User · Hybrid Training",
    quote:
      "What you get with the Elite Body Fitness Pros app is real support built into the plan. My strongest version showed up in the results.",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80",
  },
];
